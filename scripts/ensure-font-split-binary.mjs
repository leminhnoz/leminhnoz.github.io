import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

function getPlatformBinaryInfo() {
  const platform = process.platform;
  const arch = process.arch;

  if (platform === 'linux') {
    if (arch === 'x64') return 'libffi-x86_64-unknown-linux-gnu.so';
    if (arch === 'arm64') return 'libffi-aarch64-unknown-linux-gnu.so';
    if (arch === 'riscv64') return 'libffi-riscv64gc-unknown-linux-gnu.so';
    if (arch === 's390x') return 'libffi-s390x-unknown-linux-gnu.so';
  } else if (platform === 'win32') {
    if (arch === 'x64') return 'libffi-x86_64-pc-windows-msvc.dll';
    if (arch === 'arm64') return 'libffi-aarch64-pc-windows-msvc.dll';
  } else if (platform === 'darwin') {
    if (arch === 'x64') return 'libffi-x86_64-apple-darwin.dylib';
    if (arch === 'arm64') return 'libffi-aarch64-apple-darwin.dylib';
  } else if (platform === 'freebsd') {
    if (arch === 'x64') return 'libffi-x86_64-unknown-freebsd.so';
  }

  return 'libffi-wasm32-wasip1.wasm';
}

function findCnFontSplitDistDirs() {
  const dirs = new Set();

  try {
    const pkgPath = require.resolve('cn-font-split/package.json');
    const dist = path.join(path.dirname(pkgPath), 'dist');
    if (fs.existsSync(dist)) dirs.add(dist);
  } catch {}

  // Search inside node_modules/.pnpm if pnpm virtual store exists
  const pnpmStore = path.resolve('node_modules/.pnpm');
  if (fs.existsSync(pnpmStore)) {
    try {
      const entries = fs.readdirSync(pnpmStore);
      for (const entry of entries) {
        if (entry.startsWith('cn-font-split@')) {
          const dist = path.join(pnpmStore, entry, 'node_modules', 'cn-font-split', 'dist');
          if (fs.existsSync(dist)) dirs.add(dist);
        }
      }
    } catch {}
  }

  const directDist = path.resolve('node_modules/cn-font-split/dist');
  if (fs.existsSync(directDist)) dirs.add(directDist);

  return Array.from(dirs);
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const request = (currentUrl, redirectCount = 0) => {
      if (redirectCount > 10) {
        return reject(new Error('Too many redirects while downloading binary'));
      }

      https.get(currentUrl, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return request(res.headers.location, redirectCount + 1);
        }

        if (res.statusCode !== 200) {
          return reject(new Error(`Download failed with HTTP ${res.statusCode} from ${currentUrl}`));
        }

        const tempPath = `${destPath}.tmp-${Date.now()}`;
        const fileStream = fs.createWriteStream(tempPath);

        res.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close(() => {
            try {
              fs.renameSync(tempPath, destPath);
              if (process.platform !== 'win32') {
                fs.chmodSync(destPath, 0o755);
              }
              resolve();
            } catch (err) {
              reject(err);
            }
          });
        });

        fileStream.on('error', (err) => {
          fs.unlink(tempPath, () => {});
          reject(err);
        });
      }).on('error', reject);
    };

    request(url);
  });
}

async function main() {
  const currentBin = getPlatformBinaryInfo();
  const binariesToEnsure = new Set([currentBin, 'libffi-x86_64-unknown-linux-gnu.so']);
  const distDirs = findCnFontSplitDistDirs();

  if (distDirs.length === 0) {
    console.log('[ensure-font-split-binary] cn-font-split directory not found yet in node_modules, skipping.');
    return;
  }

  const pinnedVersion = '7.6.8';

  for (const distDir of distDirs) {
    for (const binaryName of binariesToEnsure) {
      const targetFile = path.join(distDir, binaryName);
      const downloadUrl = `https://github.com/KonghaYao/cn-font-split/releases/download/${pinnedVersion}/${binaryName}`;

      if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 0) {
        console.log(`[ensure-font-split-binary] Binary already present: ${binaryName}`);
        continue;
      }

      console.log(`[ensure-font-split-binary] Downloading ${binaryName} (pinned ${pinnedVersion})...`);
      try {
        await downloadFile(downloadUrl, targetFile);
        console.log(`[ensure-font-split-binary] Successfully downloaded ${binaryName}`);
      } catch (err) {
        console.warn(`[ensure-font-split-binary] Warning: failed to download ${binaryName}: ${err.message}`);
      }
    }
  }
}

main().catch((err) => {
  console.warn(`[ensure-font-split-binary] Non-fatal error: ${err.message}`);
});
