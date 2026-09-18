// app.js - ES6 module
// Logic: fetch data.json, render filters, realtime search, multi-filter, PDF modal

const state = {
  data: [],
  filtered: [],
  subject: '',        // '' => all
  categories: new Set(),
  search: '',
  sort: 'yearDesc'
};

const els = {
  grid: document.getElementById('grid'),
  resultsSummary: document.getElementById('resultsSummary'),
  subjectFilters: document.getElementById('subjectFilters'),
  categoryFilters: document.getElementById('categoryFilters'),
  searchInput: document.getElementById('searchInput'),
  clearSearch: document.getElementById('clearSearch'),
  clearFilters: document.getElementById('clearFilters'),
  emptyState: document.getElementById('emptyState'),
  sortSelect: document.getElementById('sortSelect'),
  pdfModal: document.getElementById('pdfModal'),
  pdfFrame: document.getElementById('pdfFrame'),
  modalTitle: document.getElementById('modalTitle'),
  modalMeta: document.getElementById('modalMeta'),
  downloadPdf: document.getElementById('downloadPdf'),
  yearNow: document.getElementById('yearNow'),
  sidebarToggle: document.getElementById('sidebarToggle'),
  sidebar: document.getElementById('sidebar')
};

// init year
if (els.yearNow) els.yearNow.textContent = new Date().getFullYear();

// helper: fetch data
async function loadData() {
  try {
    const res = await fetch('data.json', { cache: 'no-store' });
    state.data = await res.json();
    // normalize data: convert legacy `file` -> `files` and ensure files is array
    state.data = state.data.map(d => {
      const copy = Object.assign({}, d);
      if (Array.isArray(copy.files)) return copy;
      if (copy.file) {
        copy.files = [{ label: 'File', file: copy.file }];
        delete copy.file;
      } else {
        copy.files = [];
      }
      return copy;
    });
    state.filtered = [...state.data];
    renderCategoryFilters();
    if (els.sortSelect) els.sortSelect.value = state.sort || 'yearDesc';
    applyFilters();
  } catch (err) {
    console.error('Load data error', err);
    els.resultsSummary.textContent = 'Không thể tải dữ liệu. Kiểm tra data.json.';
  }
}

/* RENDERING */

// create category pills dynamically from data
function renderCategoryFilters() {
  const categories = Array.from(new Set(state.data.map(d => d.category))).sort();
  els.categoryFilters.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'category-pill glass-pill text-xs';
    btn.textContent = cat;
    btn.dataset.category = cat;
    btn.addEventListener('click', () => {
      toggleCategory(cat, btn);
    });
    els.categoryFilters.appendChild(btn);
  });
}

function renderGrid(items) {
  els.grid.innerHTML = '';
  if (!items.length) {
    els.emptyState.classList.remove('hidden');
    els.resultsSummary.textContent = '0 đề thi trùng khớp.';
    return;
  } else {
    els.emptyState.classList.add('hidden');
  }

  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'glass-card card-hover relative';
    const primary = (Array.isArray(item.files) && item.files[0]) ? item.files[0] : null;
    const filesCount = Array.isArray(item.files) ? item.files.length : 0;

    card.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div>
          <div class="text-lg font-semibold mb-1">${escapeHtml(item.title)}</div>
          <div class="meta mb-3">${escapeHtml(item.subject)} — ${escapeHtml(item.category)} • ${item.year}</div>

          <div class="flex items-center gap-2">
            <span class="card-subject">${escapeHtml(item.subject)}</span>
            <span class="glass-pill text-xs">${escapeHtml(item.category)}</span>
            <span class="text-xs text-slate-400 ml-2">${filesCount} file(s)</span>
          </div>
        </div>

        <div class="flex flex-col items-end gap-3">
          <div class="text-slate-400 text-xs">${item.year}</div>
          <div class="flex gap-2 items-center">
            <button class="glass-btn view-btn" data-id="${escapeHtml(item.id)}"><i class="fa-solid fa-eye"></i></button>
            ${primary ? `<a class="glass-pill text-sm" href="${encodeURI(primary.file)}" download><i class="fa-solid fa-download mr-2"></i>Tải</a>` : `<span class="glass-pill text-sm opacity-60">No file</span>`}
            <label class="glass-pill text-sm cursor-pointer upload-label"><i class="fa-solid fa-upload mr-2"></i>Upload</label>
            <input type="file" accept="application/pdf" multiple class="hidden file-input" />
          </div>
        </div>
      </div>
    `;

    // attach view handler
    const viewBtn = card.querySelector('.view-btn');
    viewBtn.addEventListener('click', () => openPdfModal(item));

    // upload handling (client-side only)
    const uploadLabel = card.querySelector('.upload-label');
    const fileInput = card.querySelector('.file-input');
    uploadLabel.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (ev) => {
      const chosen = Array.from(ev.target.files || []);
      if (!chosen.length) return;
      chosen.forEach(f => {
        const url = URL.createObjectURL(f);
        item.files.push({ label: f.name, file: url, uploaded: true });
      });
      applyFilters();
    });

    els.grid.appendChild(card);
  });

  els.resultsSummary.textContent = `${items.length} đề thi hiển thị.`;
}

/* FILTER / SEARCH / SORT */

// main filter function
function applyFilters() {
  let out = [...state.data];

  // subject
  if (state.subject) {
    out = out.filter(d => d.subject === state.subject);
  }

  // categories (if any selected)
  if (state.categories.size > 0) {
    out = out.filter(d => state.categories.has(d.category));
  }

  // search (title, year)
  const q = state.search.trim().toLowerCase();
  if (q) {
    out = out.filter(d => {
      return (
        d.title.toLowerCase().includes(q) ||
        String(d.year).includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.subject.toLowerCase().includes(q)
      );
    });
  }

  // sort
  out.sort((a, b) => {
    switch (state.sort) {
      case 'yearAsc': return a.year - b.year;
      case 'yearDesc': return b.year - a.year;
      case 'titleAsc': return a.title.localeCompare(b.title);
      default: return b.year - a.year;
    }
  });

  state.filtered = out;
  renderGrid(out);
}

/* UI helpers */

function toggleCategory(cat, btn) {
  if (state.categories.has(cat)) {
    state.categories.delete(cat);
    btn.classList.remove('active');
  } else {
    state.categories.add(cat);
    btn.classList.add('active');
  }
  applyFilters();
}

function setSubject(subj, el) {
  // remove active from others
  document.querySelectorAll('.subject-pill').forEach(b => b.classList.remove('active'));
  // set
  state.subject = subj || '';
  if (el) el.classList.add('active');
  applyFilters();
}

function clearAllFilters() {
  state.subject = '';
  state.categories.clear();
  state.search = '';
  // reset UI
  document.querySelectorAll('.subject-pill').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.subject-pill')[0]?.classList.add('active'); // first is "Tất cả"
  els.searchInput.value = '';
  els.clearSearch.classList.add('hidden');
  applyFilters();
}

/* PDF modal */

let modalState = { item: null, index: 0 };
function openPdfModal(item) {
  modalState.item = item;
  modalState.index = 0;
  els.modalTitle.textContent = item.title;
  els.modalMeta.textContent = `${item.subject} • ${item.category} • ${item.year}`;

  // build file list
  const list = document.getElementById('modalFileList');
  list.innerHTML = '';
  if (Array.isArray(item.files) && item.files.length) {
    item.files.forEach((f, idx) => {
      const btn = document.createElement('button');
      btn.className = 'w-full text-left p-2 mb-2 glass-pill category-pill';
      btn.textContent = f.label || (`File ${idx+1}`);
      btn.dataset.index = idx;
      btn.addEventListener('click', () => {
        selectModalFile(idx);
      });
      list.appendChild(btn);
    });
    selectModalFile(0);
  } else {
    list.innerHTML = '<div class="text-slate-400">Không có file để hiển thị.</div>';
    els.pdfFrame.src = '';
    els.downloadPdf.href = '#';
  }

  els.pdfModal.classList.remove('hidden');
  els.pdfModal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function selectModalFile(index) {
  const item = modalState.item;
  if (!item || !Array.isArray(item.files) || !item.files[index]) return;
  modalState.index = index;
  const f = item.files[index];
  els.pdfFrame.src = f.file;
  els.downloadPdf.href = f.file;
  // highlight active
  document.querySelectorAll('#modalFileList button').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`#modalFileList button[data-index='${index}']`);
  if (btn) btn.classList.add('active');
}

function closePdfModal() {
  els.pdfModal.classList.add('hidden');
  els.pdfModal.classList.remove('flex');
  els.pdfFrame.src = '';
  document.body.style.overflow = '';
}

/* UTIL */

function escapeHtml(unsafe) {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* EVENT LISTENERS */

// subject filter clicks
document.querySelectorAll('.subject-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    setSubject(btn.dataset.subject, btn);
  });
});

// clear filters
els.clearFilters.addEventListener('click', clearAllFilters);

// search (debounced)
let debounceTimer = null;
els.searchInput.addEventListener('input', (e) => {
  const v = e.target.value;
  state.search = v;
  if (v.length) els.clearSearch.classList.remove('hidden'); else els.clearSearch.classList.add('hidden');
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => applyFilters(), 220);
});
els.clearSearch.addEventListener('click', () => {
  els.searchInput.value = '';
  state.search = '';
  els.clearSearch.classList.add('hidden');
  applyFilters();
});

// sort change
els.sortSelect.addEventListener('change', (e) => {
  state.sort = e.target.value;
  applyFilters();
});

// modal close
document.getElementById('closeModal').addEventListener('click', closePdfModal);
document.querySelector('#pdfModal [data-close="true"]').addEventListener('click', closePdfModal);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePdfModal();
});

// sidebar toggle for mobile
els.sidebarToggle?.addEventListener('click', () => {
  if (!els.sidebar) return;
  const isHidden = els.sidebar.classList.contains('hidden');
  if (isHidden) {
    els.sidebar.classList.remove('hidden');
    els.sidebar.classList.add('block');
  } else {
    els.sidebar.classList.add('hidden');
  }
});

// close sidebar when clicking outside on small screens
document.addEventListener('click', (e) => {
  if (!els.sidebar) return;
  if (window.innerWidth <= 768) {
    if (!els.sidebar.contains(e.target) && !els.sidebarToggle.contains(e.target)) {
      els.sidebar.classList.add('hidden');
    }
  }
});

// initialize app
loadData();
