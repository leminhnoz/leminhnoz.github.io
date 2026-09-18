param(
    [string]$Root = "D:\CP-BLOG",
    [int]$Port = 8000
)

Add-Type -AssemblyName System.Web
$listener = New-Object System.Net.HttpListener
$prefix = "http://+:{0}/" -f $Port
$listener.Prefixes.Add($prefix)
try {
    $listener.Start()
    Write-Output "Serve: listening on $prefix, root=$Root"
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        Start-Job -ScriptBlock {
            param($context, $Root)
            try {
                $req = $context.Request
                $resp = $context.Response
                $localPath = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath.TrimStart('/'))
                if ([string]::IsNullOrEmpty($localPath)) { $localPath = 'index.html' }
                $filePath = Join-Path $Root $localPath
                if (Test-Path $filePath) {
                    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                    $mime = 'application/octet-stream'
                    switch ($ext) {
                        '.html' { $mime = 'text/html; charset=utf-8' }
                        '.htm'  { $mime = 'text/html; charset=utf-8' }
                        '.css'  { $mime = 'text/css' }
                        '.js'   { $mime = 'application/javascript' }
                        '.json' { $mime = 'application/json' }
                        '.pdf'  { $mime = 'application/pdf' }
                        '.png'  { $mime = 'image/png' }
                        '.jpg' { $mime = 'image/jpeg' }
                        '.jpeg' { $mime = 'image/jpeg' }
                        '.svg' { $mime = 'image/svg+xml' }
                        default { $mime = 'application/octet-stream' }
                    }
                    $bytes = [System.IO.File]::ReadAllBytes($filePath)
                    $resp.ContentType = $mime
                    $resp.ContentLength64 = $bytes.Length
                    $resp.OutputStream.Write($bytes, 0, $bytes.Length)
                } else {
                    $resp.StatusCode = 404
                    $buf = [Text.Encoding]::UTF8.GetBytes("404 - Not Found")
                    $resp.ContentLength64 = $buf.Length
                    $resp.OutputStream.Write($buf,0,$buf.Length)
                }
                $resp.OutputStream.Close()
            } catch {
                # ignore
            }
        } -ArgumentList $context, $Root | Out-Null
    }
} catch {
    Write-Output "Serve error: $_"
} finally {
    if ($listener -and $listener.IsListening) { $listener.Stop(); $listener.Close() }
}
