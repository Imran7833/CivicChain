// ═══════════════════════════════════════════════
// STATE & DATA STORE
// ═══════════════════════════════════════════════

const App = {
  currentUser: null,
  currentPage: 'home',
  currentTender: null,
  filterCategory: 'all',
  filterSearch: '',
  filterStatus: 'all',
  countdownIntervals: {},
};

// Seed data
const CATEGORIES = ['Road', 'Water', 'Power', 'Bridge', 'Building', 'Sewage', 'Park', 'Transport'];
const CAT_ICONS = { Road: '🛣️', Water: '💧', Power: '⚡', Bridge: '🌉', Building: '🏗️', Sewage: '🔧', Park: '🌳', Transport: '🚌' };
const CAT_CLASS = { Road: 'cat-road', Water: 'cat-water', Power: 'cat-power', Bridge: 'cat-bridge', Building: 'cat-building', Sewage: 'cat-sewage', Park: 'cat-park', Transport: 'cat-transport' };

const USERS = [
  { id: 'admin1', name: 'Ministry of Infrastructure', email: 'admin@gov.in', password: 'admin123', role: 'admin', dept: 'National Infrastructure Authority' },
  { id: 'admin2', name: 'State PWD Office', email: 'pwd@gov.in', password: 'pwd123', role: 'admin', dept: 'Public Works Department' },
  { id: 'c1', name: 'BuildTech Constructions Pvt. Ltd.', email: 'buildtech@mail.com', password: 'build123', role: 'contractor', license: 'LIC-2019-4521', rating: 4.2 },
  { id: 'c2', name: 'SkyBridge Engineering', email: 'skybridge@mail.com', password: 'sky123', role: 'contractor', license: 'LIC-2017-3312', rating: 4.7 },
  { id: 'c3', name: 'Greenway Developers', email: 'greenway@mail.com', password: 'green123', role: 'contractor', license: 'LIC-2020-5610', rating: 3.9 },
  { id: 'c4', name: 'PrimePath Infrastructure', email: 'primepath@mail.com', password: 'prime123', role: 'contractor', license: 'LIC-2018-4102', rating: 4.5 },
];

const today = new Date();
function futureDate(days) {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}
function pastDate(days) {
  const d = new Date(today);
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

let TENDERS = [
  {
    id: 'T-2025-001',
    title: 'Reconstruction of NH-48 Highway Stretch (Km 142-178)',
    description: 'Complete reconstruction of 36-kilometre national highway stretch including sub-grade preparation, base course, bituminous concrete layers, road markings, signage, and drainage systems.',
    category: 'Road',
    location: 'Karnataka',
    budget: 45000000,
    deadline: futureDate(18),
    postedDate: pastDate(5),
    postedBy: 'admin1',
    status: 'open',
    bids: [
      { contractorId: 'c1', amount: 42000000, note: 'We have 3 similar projects completed in Karnataka.', date: pastDate(3) },
      { contractorId: 'c2', amount: 44500000, note: 'Premium materials with 5-year warranty.', date: pastDate(2) },
      { contractorId: 'c4', amount: 43800000, note: 'ISO certified team, 18-month delivery.', date: pastDate(1) },
    ],
    winner: null,
    milestones: [
      { title: 'Tender Published', date: pastDate(5), done: true, desc: 'Tender officially published on the platform.' },
      { title: 'Bidding Open', date: pastDate(5), done: true, desc: 'Contractors can submit bids.' },
      { title: 'Bidding Closes', date: futureDate(18), done: false, desc: 'Deadline for bid submission.' },
      { title: 'Bid Evaluation', date: futureDate(21), done: false, desc: 'Review and allocation of winning bid.' },
      { title: 'Award Announced', date: futureDate(25), done: false, desc: 'Winning contractor announced publicly.' },
      { title: 'Work Begins', date: futureDate(35), done: false, desc: 'Contractor commences work on site.' },
    ]
  },
  {
    id: 'T-2025-002',
    title: 'City Water Supply Pipeline Extension — Phase III',
    description: 'Laying of 22 km underground water supply pipeline with 450mm diameter DI pipes, installation of pumping stations, consumer connections, and pressure testing.',
    category: 'Water',
    location: 'Rajasthan',
    budget: 28000000,
    deadline: futureDate(30),
    postedDate: pastDate(3),
    postedBy: 'admin2',
    status: 'open',
    bids: [
      { contractorId: 'c3', amount: 26500000, note: 'Specialized water infrastructure team.', date: pastDate(2) },
      { contractorId: 'c1', amount: 27200000, note: 'Fast execution, 14 months.', date: pastDate(1) },
    ],
    winner: null,
    milestones: [
      { title: 'Tender Published', date: pastDate(3), done: true, desc: 'Tender published.' },
      { title: 'Bidding Open', date: pastDate(3), done: true, desc: 'Open for bids.' },
      { title: 'Bidding Closes', date: futureDate(30), done: false, desc: 'Bid submission deadline.' },
      { title: 'Award Announced', date: futureDate(35), done: false, desc: 'Winner announced.' },
    ]
  },
  {
    id: 'T-2025-003',
    title: 'Solar Power Grid Installation — Rural Electrification',
    description: 'Installation of 5 MW solar power plant with transmission infrastructure covering 45 villages. Includes land preparation, panel installation, inverter stations, and grid connectivity.',
    category: 'Power',
    location: 'Uttar Pradesh',
    budget: 72000000,
    deadline: pastDate(2),
    postedDate: pastDate(25),
    postedBy: 'admin1',
    status: 'awarded',
    bids: [
      { contractorId: 'c2', amount: 70500000, note: 'Tier-1 solar experience, 20-year warranty.', date: pastDate(15) },
      { contractorId: 'c4', amount: 68000000, note: 'Cost optimised with local sourcing.', date: pastDate(12) },
      { contractorId: 'c1', amount: 71000000, note: 'Full EPC contract with monitoring.', date: pastDate(10) },
    ],
    winner: 'c2',
    milestones: [
      { title: 'Tender Published', date: pastDate(25), done: true, desc: 'Tender published.' },
      { title: 'Bidding Closed', date: pastDate(2), done: true, desc: 'Bidding period ended.' },
      { title: 'Winner Allocated', date: pastDate(1), done: true, desc: 'Highest bid automatically awarded to SkyBridge Engineering.' },
      { title: 'Contract Signed', date: futureDate(5), done: false, desc: 'Formal contract execution.' },
      { title: 'Work Begins', date: futureDate(15), done: false, desc: 'On-site mobilisation.' },
    ]
  },
  {
    id: 'T-2025-004',
    title: 'Cable-Stayed Bridge Construction over Narmada River',
    description: 'Design and construction of a 380-metre cable-stayed bridge with 4-lane carriageway, pedestrian walkways, and approach roads. To replace the aging ferry crossing.',
    category: 'Bridge',
    location: 'Madhya Pradesh',
    budget: 120000000,
    deadline: futureDate(45),
    postedDate: pastDate(1),
    postedBy: 'admin2',
    status: 'open',
    bids: [
      { contractorId: 'c2', amount: 115000000, note: 'Specialist bridge team, 6 similar projects.', date: pastDate(0) },
    ],
    winner: null,
    milestones: [
      { title: 'Tender Published', date: pastDate(1), done: true, desc: 'Tender published.' },
      { title: 'Bidding Closes', date: futureDate(45), done: false, desc: 'Deadline.' },
      { title: 'Award Announced', date: futureDate(50), done: false, desc: 'Winner announced.' },
    ]
  },
  {
    id: 'T-2025-005',
    title: 'Municipal Sewage Treatment Plant Upgrade',
    description: 'Upgradation of existing 25 MLD STP to 60 MLD capacity with advanced biological treatment, sludge management, and effluent reuse systems.',
    category: 'Sewage',
    location: 'Gujarat',
    budget: 38000000,
    deadline: pastDate(5),
    postedDate: pastDate(30),
    postedBy: 'admin1',
    status: 'closed',
    bids: [
      { contractorId: 'c3', amount: 36000000, note: 'Environmental engineering specialists.', date: pastDate(20) },
      { contractorId: 'c4', amount: 37500000, note: 'Automated control systems included.', date: pastDate(18) },
    ],
    winner: null,
    milestones: [
      { title: 'Tender Published', date: pastDate(30), done: true, desc: 'Published.' },
      { title: 'Bidding Closed', date: pastDate(5), done: true, desc: 'Bids received.' },
      { title: 'Evaluation Pending', date: pastDate(3), done: false, desc: 'Under admin review.' },
    ]
  },
  {
    id: 'T-2025-006',
    title: 'Urban Green Belt & Public Park Development',
    description: 'Development of 18-hectare urban green belt including jogging tracks, children\'s play areas, open amphitheatre, irrigation system, and plantation of 5000 trees.',
    category: 'Park',
    location: 'Maharashtra',
    budget: 15000000,
    deadline: futureDate(20),
    postedDate: pastDate(4),
    postedBy: 'admin2',
    status: 'open',
    bids: [],
    winner: null,
    milestones: [
      { title: 'Tender Published', date: pastDate(4), done: true, desc: 'Published.' },
      { title: 'Bidding Closes', date: futureDate(20), done: false, desc: 'Deadline.' },
      { title: 'Award Announced', date: futureDate(25), done: false, desc: 'Winner announced.' },
    ]
  },
];

let NEXT_ID = 7;

// ═══════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════

function formatCurrency(n) {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
  if (n >= 100000) return '₹' + (n / 100000).toFixed(2) + ' L';
  return '₹' + n.toLocaleString('en-IN');
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function daysLeft(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
  return diff;
}

function getContractor(id) {
  return USERS.find(u => u.id === id);
}
function getUser(id) {
  return USERS.find(u => u.id === id);
}

function getHighestBid(tender) {
  if (!tender.bids || !tender.bids.length) return null;
  return tender.bids.reduce((max, b) => b.amount > max.amount ? b : max, tender.bids[0]);
}

function notify(title, msg, icon = '✅') {
  const n = document.getElementById('notification');
  n.querySelector('.notification-title').textContent = title;
  n.querySelector('.notification-msg').textContent = msg;
  n.querySelector('.notification-icon').textContent = icon;
  n.classList.add('show');
  setTimeout(() => n.classList.remove('show'), 4000);
}

function saveTenders() {
  try { localStorage.setItem('dpi_tenders', JSON.stringify(TENDERS)); } catch(e) {}
}
function loadTenders() {
  try {
    const d = localStorage.getItem('dpi_tenders');
    if (d) TENDERS = JSON.parse(d);
  } catch(e) {}
}

// ═══════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════

function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
  const el = document.getElementById('page-' + page);
  if (el) {
    el.classList.add('active');
    App.currentPage = page;
    window.scrollTo(0, 0);
  }
  renderPage(page);
}

function renderPage(page) {
  if (page === 'home') renderHome();
  else if (page === 'tenders') renderTenders();
  else if (page === 'dashboard') renderDashboard();
  else if (page === 'tracker') renderTracker();
}

// ═══════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════

function updateNavbar() {
  const actionsEl = document.getElementById('nav-actions');
  const linksEl = document.getElementById('nav-links');

  if (App.currentUser) {
    const u = App.currentUser;
    const roleClass = u.role === 'admin' ? 'admin' : 'contractor';
    const roleLabel = u.role === 'admin' ? 'GOV' : 'CONTRACTOR';
    actionsEl.innerHTML = `
      <div class="user-badge">
        <span>${u.name.split(' ')[0]}</span>
        <span class="role-tag ${roleClass}">${roleLabel}</span>
      </div>
      <button class="btn btn-outline btn-sm" onclick="logout()">Sign Out</button>
    `;
    // Show dashboard link
    linksEl.innerHTML = `
      <a href="#" data-page="home" onclick="navigate('home'); return false;">Home</a>
      <a href="#" data-page="tenders" onclick="navigate('tenders'); return false;">Browse Tenders</a>
      <a href="#" data-page="tracker" onclick="navigate('tracker'); return false;">Public Tracker</a>
      <a href="#" data-page="dashboard" onclick="navigate('dashboard'); return false;">Dashboard</a>
    `;
  } else {
    actionsEl.innerHTML = `
      <button class="btn btn-outline btn-sm" onclick="openAuthModal('login')">Sign In</button>
      <button class="btn btn-primary btn-sm" onclick="openAuthModal('register')">Register</button>
    `;
    linksEl.innerHTML = `
      <a href="#" data-page="home" onclick="navigate('home'); return false;">Home</a>
      <a href="#" data-page="tenders" onclick="navigate('tenders'); return false;">Browse Tenders</a>
      <a href="#" data-page="tracker" onclick="navigate('tracker'); return false;">Public Tracker</a>
    `;
  }

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === App.currentPage);
  });
}

function openAuthModal(tab) {
  const modal = document.getElementById('auth-modal');
  modal.classList.add('open');
  switchAuthTab(tab);
}

function closeAuthModal() {
  document.getElementById('auth-modal').classList.remove('open');
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  const u = USERS.find(u => u.email === email && u.password === pass);
  if (!u) {
    document.getElementById('login-error').textContent = 'Invalid email or password.';
    return;
  }
  App.currentUser = u;
  document.getElementById('login-error').textContent = '';
  closeAuthModal();
  updateNavbar();
  notify('Welcome back!', u.name + ' signed in successfully.', '👋');
  navigate('dashboard');
}

function doRegister() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass = document.getElementById('reg-pass').value;
  const role = document.getElementById('reg-role').value;
  const license = document.getElementById('reg-license').value.trim();
  const errEl = document.getElementById('reg-error');

  if (!name || !email || !pass || !role) { errEl.textContent = 'Please fill all required fields.'; return; }
  if (role === 'contractor' && !license) { errEl.textContent = 'Licence number is required for contractors.'; return; }
  if (USERS.find(u => u.email === email)) { errEl.textContent = 'Email already registered.'; return; }

  const newUser = {
    id: 'u' + Date.now(),
    name, email, password: pass, role,
    ...(role === 'contractor' ? { license, rating: 4.0 } : { dept: 'Government Office' })
  };
  USERS.push(newUser);
  App.currentUser = newUser;
  errEl.textContent = '';
  closeAuthModal();
  updateNavbar();
  notify('Account Created!', 'Welcome to DPIP, ' + name + '.', '🎉');
  navigate('dashboard');
}

function logout() {
  App.currentUser = null;
  updateNavbar();
  navigate('home');
  notify('Signed Out', 'You have been signed out successfully.', '👋');
}

// ═══════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════

function renderHome() {
  const openTenders = TENDERS.filter(t => t.status === 'open');
  const preview = openTenders.slice(0, 4);
  const list = document.getElementById('hero-tender-list');
  if (!list) return;
  list.innerHTML = preview.map(t => {
    const highest = getHighestBid(t);
    return `
      <div class="tender-preview-item" onclick="openTenderDetail('${t.id}')">
        <div class="tp-info">
          <div class="tp-title">${t.title}</div>
          <div class="tp-meta">${CAT_ICONS[t.category]} ${t.category} · ${t.location}</div>
        </div>
        <div class="tp-bid">
          <div class="tp-bid-value">${highest ? formatCurrency(highest.amount) : '—'}</div>
          <div class="tp-bid-label">${t.bids.length} bid${t.bids.length !== 1 ? 's' : ''}</div>
        </div>
      </div>
    `;
  }).join('');

  // Update stats
  const totalBudget = TENDERS.reduce((s, t) => s + t.budget, 0);
  document.getElementById('stat-tenders').textContent = TENDERS.length;
  document.getElementById('stat-open').textContent = openTenders.length;
  document.getElementById('stat-budget').textContent = formatCurrency(totalBudget);
}

// ═══════════════════════════════════════════════
// TENDERS PAGE
// ═══════════════════════════════════════════════

function renderTenders() {
  let filtered = [...TENDERS];
  if (App.filterCategory !== 'all') filtered = filtered.filter(t => t.category === App.filterCategory);
  if (App.filterStatus !== 'all') filtered = filtered.filter(t => t.status === App.filterStatus);
  if (App.filterSearch) {
    const q = App.filterSearch.toLowerCase();
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.location.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  }

  const grid = document.getElementById('tenders-grid');
  if (!grid) return;

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-icon">🔍</div>
        <h3>No Tenders Found</h3>
        <p>Try adjusting your filters or search query.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(t => renderTenderCard(t)).join('');
}

function renderTenderCard(t) {
  const highest = getHighestBid(t);
  const dl = daysLeft(t.deadline);
  const isUrgent = dl <= 5 && dl >= 0;
  const statusMap = { open: 'status-open', closed: 'status-closed', awarded: 'status-awarded' };
  const statusLabel = { open: '● OPEN', closed: '■ CLOSED', awarded: '★ AWARDED' };

  return `
    <div class="tender-card" onclick="openTenderDetail('${t.id}')">
      <div class="card-header">
        <div class="card-title">${t.title}</div>
        <span class="status-badge ${statusMap[t.status]}">${statusLabel[t.status]}</span>
      </div>
      <div class="card-desc">${t.description}</div>
      <div class="card-meta">
        <span class="meta-item">
          <span class="category-tag ${CAT_CLASS[t.category]}">${CAT_ICONS[t.category]} ${t.category}</span>
        </span>
        <span class="meta-item">📍 ${t.location}</span>
        <span class="meta-item">📋 ${t.id}</span>
      </div>
      <div class="card-bid-section">
        <div class="bid-info">
          <div class="bid-label">Budget Est.</div>
          <div style="font-size:0.85rem;font-weight:500;color:var(--text2)">${formatCurrency(t.budget)}</div>
        </div>
        <div style="width:1px;background:var(--border);align-self:stretch"></div>
        <div class="bid-info" style="text-align:center">
          <div class="bid-label">Highest Bid</div>
          <div class="bid-amount">${highest ? formatCurrency(highest.amount) : '—'}</div>
          <div class="bid-count">${t.bids.length} bid${t.bids.length !== 1 ? 's' : ''}</div>
        </div>
        ${t.status === 'awarded' && t.winner ? `
        <div class="bid-info" style="text-align:right">
          <div class="bid-label">Winner</div>
          <div style="font-size:0.78rem;font-weight:500;color:var(--gold)">${getContractor(t.winner)?.name?.split(' ')[0] || 'N/A'}</div>
        </div>` : ''}
      </div>
      <div class="card-footer">
        <span class="deadline ${isUrgent ? 'urgent' : ''}">
          ${isUrgent ? '⚠️' : '📅'}
          ${dl < 0 ? 'Deadline passed' : dl === 0 ? 'Closes today!' : `${dl} days left`}
        </span>
        <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); openTenderDetail('${t.id}')">View Details →</button>
      </div>
    </div>
  `;
}

function setFilter(type, value) {
  if (type === 'category') App.filterCategory = value;
  if (type === 'status') App.filterStatus = value;
  document.querySelectorAll(`.filter-group-${type} .filter-btn`).forEach(b => {
    b.classList.toggle('active', b.dataset.value === value);
  });
  renderTenders();
}

function doSearch(q) {
  App.filterSearch = q;
  renderTenders();
}

// ═══════════════════════════════════════════════
// TENDER DETAIL MODAL
// ═══════════════════════════════════════════════

function openTenderDetail(id) {
  const t = TENDERS.find(t => t.id === id);
  if (!t) return;
  App.currentTender = t;
  const modal = document.getElementById('tender-modal');
  renderTenderModal(t);
  modal.classList.add('open');
}

function closeTenderModal() {
  document.getElementById('tender-modal').classList.remove('open');
  App.currentTender = null;
}

function renderTenderModal(t) {
  const highest = getHighestBid(t);
  const isAdmin = App.currentUser?.role === 'admin';
  const isContractor = App.currentUser?.role === 'contractor';
  const dl = daysLeft(t.deadline);
  const canBid = isContractor && t.status === 'open' && dl >= 0;
  const alreadyBid = isContractor && t.bids.some(b => b.contractorId === App.currentUser?.id);

  const modal = document.getElementById('tender-modal');
  modal.querySelector('.modal-title').textContent = t.id;

  const body = modal.querySelector('.modal-body');
  body.innerHTML = `
    <div style="margin-bottom:1.25rem">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-bottom:0.75rem">
        <h2 style="font-family:'Rajdhani',sans-serif;font-size:1.4rem;font-weight:700;line-height:1.2">${t.title}</h2>
        <span class="status-badge ${t.status === 'open' ? 'status-open' : t.status === 'awarded' ? 'status-awarded' : 'status-closed'}" style="flex-shrink:0">
          ${t.status.toUpperCase()}
        </span>
      </div>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
        <span class="category-tag ${CAT_CLASS[t.category]}">${CAT_ICONS[t.category]} ${t.category}</span>
        <span class="category-tag" style="background:rgba(255,255,255,0.05);color:var(--text2)">📍 ${t.location}</span>
        <span class="category-tag" style="background:rgba(255,255,255,0.05);color:var(--text2)">📅 Posted ${formatDate(t.postedDate)}</span>
      </div>
    </div>

    <div class="info-block">
      <h3>PROJECT DESCRIPTION</h3>
      <p style="font-size:0.88rem;color:var(--text2);line-height:1.65">${t.description}</p>
    </div>

    <div class="info-block">
      <h3>FINANCIAL DETAILS</h3>
      <div class="info-row">
        <span class="info-key">Estimated Budget</span>
        <span class="info-val">${formatCurrency(t.budget)}</span>
      </div>
      <div class="info-row">
        <span class="info-key">Highest Bid</span>
        <span class="info-val" style="color:var(--gold)">${highest ? formatCurrency(highest.amount) : 'No bids yet'}</span>
      </div>
      <div class="info-row">
        <span class="info-key">Total Bids Received</span>
        <span class="info-val">${t.bids.length}</span>
      </div>
      <div class="info-row">
        <span class="info-key">Bidding Deadline</span>
        <span class="info-val ${dl <= 5 && dl >= 0 ? 'text-red' : ''}" style="${dl <= 5 && dl >= 0 ? 'color:var(--red)' : ''}">${formatDate(t.deadline)} ${dl >= 0 ? `(${dl} days left)` : '(Closed)'}</span>
      </div>
    </div>

    ${t.status === 'awarded' && t.winner ? `
    <div class="award-card" style="margin-bottom:1rem">
      <div class="award-icon">🏆</div>
      <div class="award-info">
        <div class="award-title">Contract Awarded</div>
        <div class="award-detail">
          Won by <strong>${getContractor(t.winner)?.name}</strong> with a bid of 
          <strong style="color:var(--gold)">${formatCurrency(getHighestBid(t)?.amount)}</strong>
        </div>
      </div>
    </div>` : ''}

    <div class="info-block">
      <h3>BID HISTORY (${t.bids.length})</h3>
      ${t.bids.length === 0 ? '<p style="color:var(--text3);font-size:0.85rem;text-align:center;padding:1rem 0">No bids submitted yet.</p>' :
        [...t.bids]
          .sort((a, b) => b.amount - a.amount)
          .map((b, i) => {
            const c = getContractor(b.contractorId);
            const isWinner = t.winner === b.contractorId;
            const isTop = i === 0;
            const showContractor = isAdmin || (isContractor && b.contractorId === App.currentUser?.id) || t.status === 'awarded';
            return `
            <div class="bid-item ${isWinner ? 'winner' : ''}">
              <div>
                <div class="bid-contractor">${showContractor || isTop ? (c?.name || 'Unknown') : 'Contractor #' + (i+1)}</div>
                <div class="bid-contractor-meta">Submitted ${formatDate(b.date)}</div>
                ${isWinner ? '<span class="status-badge status-awarded" style="margin-top:0.3rem">🏆 WINNER</span>' : ''}
                ${b.note && (isAdmin || b.contractorId === App.currentUser?.id) ? `<div style="font-size:0.75rem;color:var(--text2);margin-top:0.3rem;font-style:italic">"${b.note}"</div>` : ''}
              </div>
              <div class="bid-amount-display ${isTop ? 'top' : ''}">${formatCurrency(b.amount)}</div>
            </div>
          `}).join('')
      }
    </div>

    <div class="info-block">
      <h3>PROJECT TIMELINE</h3>
      <div class="timeline">
        ${t.milestones.map((m, i) => {
          const isCurrent = !m.done && (i === 0 || t.milestones[i-1]?.done);
          return `
          <div class="timeline-item">
            <div class="timeline-dot ${m.done ? 'done' : isCurrent ? 'current' : ''}"></div>
            <div class="timeline-date">${formatDate(m.date)}</div>
            <div class="timeline-title">${m.title}</div>
            <div class="timeline-desc">${m.desc}</div>
          </div>`;
        }).join('')}
      </div>
    </div>

    ${canBid && !alreadyBid ? `
    <div class="info-block" id="bid-section">
      <h3>SUBMIT YOUR BID</h3>
      <div class="form-group">
        <label>Bid Amount (₹)</label>
        <input type="number" id="bid-amount-input" placeholder="Enter your bid amount" min="1">
        <div class="form-help">Budget estimate: ${formatCurrency(t.budget)} | Highest bid: ${highest ? formatCurrency(highest.amount) : 'None yet'}</div>
      </div>
      <div class="form-group">
        <label>Note / Proposal Summary (Optional)</label>
        <textarea id="bid-note-input" placeholder="Briefly describe your approach, timeline, or USP..."></textarea>
      </div>
      <button class="btn btn-gold" style="width:100%" onclick="submitBid('${t.id}')">
        🏦 Submit Bid
      </button>
    </div>` : ''}

    ${canBid && alreadyBid ? `
    <div style="background:rgba(0,200,150,0.08);border:1px solid rgba(0,200,150,0.2);border-radius:10px;padding:1rem;text-align:center;color:var(--green);font-size:0.85rem">
      ✅ You have already submitted a bid for this tender.
    </div>` : ''}

    ${isAdmin && t.status === 'open' && dl < 0 && !t.winner ? `
    <div class="info-block" style="border-color:rgba(240,168,0,0.3)">
      <h3>⚡ ADMIN ACTION</h3>
      <p style="font-size:0.83rem;color:var(--text2);margin-bottom:1rem">Bidding deadline has passed. Allocate the contract to the highest bidder.</p>
      ${highest ? `
        <div class="award-card" style="margin-bottom:1rem">
          <div class="award-icon">🏆</div>
          <div>
            <div class="award-title">Highest Bidder: ${getContractor(highest.contractorId)?.name}</div>
            <div class="award-detail">Bid Amount: <strong style="color:var(--gold)">${formatCurrency(highest.amount)}</strong></div>
          </div>
        </div>
        <button class="btn btn-gold" style="width:100%" onclick="allocateBid('${t.id}')">
          🏆 Allocate Contract to Highest Bidder
        </button>` : '<p style="color:var(--text3);font-size:0.85rem">No bids received for this tender.</p>'
      }
    </div>` : ''}

    ${isAdmin && t.status === 'open' && dl >= 0 ? `
    <div style="display:flex;gap:0.75rem">
      <button class="btn btn-danger btn-sm" style="width:100%" onclick="closeTenderAdmin('${t.id}')">⛔ Close Bidding Early</button>
    </div>` : ''}
  `;
}

function submitBid(tenderId) {
  const t = TENDERS.find(t => t.id === tenderId);
  if (!t || !App.currentUser) return;
  const amount = parseInt(document.getElementById('bid-amount-input').value);
  const note = document.getElementById('bid-note-input').value.trim();
  if (!amount || amount <= 0) { alert('Please enter a valid bid amount.'); return; }

  t.bids.push({
    contractorId: App.currentUser.id,
    amount,
    note,
    date: new Date().toISOString().split('T')[0]
  });
  saveTenders();
  notify('Bid Submitted!', `Your bid of ${formatCurrency(amount)} has been recorded.`, '✅');
  renderTenderModal(t);
  renderTenders();
  renderHome();
}

function allocateBid(tenderId) {
  const t = TENDERS.find(t => t.id === tenderId);
  if (!t) return;
  const highest = getHighestBid(t);
  if (!highest) return;

  if (!confirm(`Allocate contract to ${getContractor(highest.contractorId)?.name} for ${formatCurrency(highest.amount)}?`)) return;

  t.winner = highest.contractorId;
  t.status = 'awarded';
  t.milestones.push({ title: 'Contract Awarded', date: new Date().toISOString().split('T')[0], done: true, desc: `Contract allocated to ${getContractor(highest.contractorId)?.name} (highest bidder).` });
  saveTenders();
  notify('Contract Awarded!', `${getContractor(highest.contractorId)?.name} has been awarded the contract.`, '🏆');
  renderTenderModal(t);
  renderTenders();
}

function closeTenderAdmin(tenderId) {
  const t = TENDERS.find(t => t.id === tenderId);
  if (!t) return;
  if (!confirm('Close bidding for this tender early?')) return;
  t.status = 'closed';
  t.deadline = new Date().toISOString().split('T')[0];
  saveTenders();
  notify('Tender Closed', 'Bidding has been closed for this tender.', '⛔');
  renderTenderModal(t);
  renderTenders();
}

// ═══════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════

function renderDashboard() {
  if (!App.currentUser) { navigate('home'); return; }
  const isAdmin = App.currentUser.role === 'admin';

  if (isAdmin) renderAdminDashboard();
  else renderContractorDashboard();
}

function renderAdminDashboard() {
  const u = App.currentUser;
  const myTenders = TENDERS.filter(t => t.postedBy === u.id);
  const openCount = myTenders.filter(t => t.status === 'open').length;
  const awardedCount = myTenders.filter(t => t.status === 'awarded').length;
  const totalBudget = myTenders.reduce((s, t) => s + t.budget, 0);
  const totalBids = myTenders.reduce((s, t) => s + t.bids.length, 0);

  const dash = document.getElementById('dashboard-content');
  dash.innerHTML = `
    <div class="section">
      <div class="section-header">
        <div>
          <div class="section-title">Government Dashboard</div>
          <div class="section-sub">${u.dept || u.name} · Admin Panel</div>
        </div>
        <button class="btn btn-gold" onclick="openPostTenderModal()">+ Post New Tender</button>
      </div>

      <div class="dashboard-grid">
        <div class="dash-card">
          <div class="dash-value" style="color:var(--accent)">${myTenders.length}</div>
          <div class="dash-label">Total Tenders Posted</div>
          <div class="dash-change neutral">All time</div>
        </div>
        <div class="dash-card">
          <div class="dash-value" style="color:var(--green)">${openCount}</div>
          <div class="dash-label">Currently Open</div>
          <div class="dash-change up">Active bids accepted</div>
        </div>
        <div class="dash-card">
          <div class="dash-value" style="color:var(--gold)">${awardedCount}</div>
          <div class="dash-label">Contracts Awarded</div>
          <div class="dash-change neutral">Work in progress</div>
        </div>
        <div class="dash-card">
          <div class="dash-value" style="color:var(--text)">${totalBids}</div>
          <div class="dash-label">Total Bids Received</div>
          <div class="dash-change neutral">Across all tenders</div>
        </div>
      </div>

      <div class="section-header">
        <div class="section-title" style="font-size:1.2rem">My Tenders</div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>TENDER ID</th>
              <th>TITLE</th>
              <th>CATEGORY</th>
              <th>BUDGET</th>
              <th>BIDS</th>
              <th>DEADLINE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            ${myTenders.length ? myTenders.map(t => {
              const dl = daysLeft(t.deadline);
              return `
              <tr>
                <td><span style="font-family:'IBM Plex Mono',monospace;font-size:0.78rem;color:var(--accent)">${t.id}</span></td>
                <td style="max-width:200px"><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:0.85rem">${t.title}</div></td>
                <td><span class="category-tag ${CAT_CLASS[t.category]}">${CAT_ICONS[t.category]} ${t.category}</span></td>
                <td style="font-family:'Rajdhani',sans-serif;font-size:1rem;font-weight:700">${formatCurrency(t.budget)}</td>
                <td style="text-align:center"><span style="font-weight:600">${t.bids.length}</span></td>
                <td style="font-size:0.78rem;font-family:'IBM Plex Mono',monospace;color:${dl < 0 ? 'var(--red)' : dl <= 5 ? 'var(--gold)' : 'var(--text2)'}">${dl < 0 ? 'Passed' : dl + 'd left'}</td>
                <td><span class="status-badge ${t.status === 'open' ? 'status-open' : t.status === 'awarded' ? 'status-awarded' : 'status-closed'}">${t.status.toUpperCase()}</span></td>
                <td><button class="btn btn-outline btn-sm" onclick="openTenderDetail('${t.id}')">View</button></td>
              </tr>`;
            }).join('') : '<tr><td colspan="8" style="text-align:center;color:var(--text3);padding:2rem">No tenders posted yet.</td></tr>'}
          </tbody>
        </table>
      </div>

      <div style="margin-top:2rem">
        <div class="section-header">
          <div class="section-title" style="font-size:1.2rem">Pending Allocations</div>
        </div>
        ${(() => {
          const pending = TENDERS.filter(t => t.status !== 'awarded' && daysLeft(t.deadline) < 0 && t.bids.length > 0);
          if (!pending.length) return '<p style="color:var(--text3);font-size:0.85rem">No pending allocations.</p>';
          return pending.map(t => {
            const h = getHighestBid(t);
            return `
            <div class="award-card" style="margin-bottom:0.75rem;cursor:pointer" onclick="openTenderDetail('${t.id}')">
              <div class="award-icon">⚡</div>
              <div style="flex:1">
                <div class="award-title">${t.title}</div>
                <div class="award-detail">${t.bids.length} bids · Highest: <strong style="color:var(--gold)">${formatCurrency(h?.amount || 0)}</strong> by ${getContractor(h?.contractorId)?.name || 'N/A'}</div>
              </div>
              <button class="btn btn-gold btn-sm" onclick="event.stopPropagation();openTenderDetail('${t.id}')">Allocate →</button>
            </div>`;
          }).join('');
        })()}
      </div>
    </div>
  `;
}

function renderContractorDashboard() {
  const u = App.currentUser;
  const myBids = TENDERS.filter(t => t.bids.some(b => b.contractorId === u.id));
  const won = TENDERS.filter(t => t.winner === u.id);
  const totalBidValue = myBids.reduce((s, t) => {
    const b = t.bids.find(b => b.contractorId === u.id);
    return s + (b?.amount || 0);
  }, 0);

  const dash = document.getElementById('dashboard-content');
  dash.innerHTML = `
    <div class="section">
      <div class="section-header">
        <div>
          <div class="section-title">Contractor Dashboard</div>
          <div class="section-sub">${u.name} · Licence: ${u.license || 'N/A'}</div>
        </div>
        <button class="btn btn-primary" onclick="navigate('tenders')">Browse Tenders →</button>
      </div>

      <div class="dashboard-grid">
        <div class="dash-card">
          <div class="dash-value" style="color:var(--accent)">${myBids.length}</div>
          <div class="dash-label">Tenders Bid On</div>
          <div class="dash-change neutral">Active applications</div>
        </div>
        <div class="dash-card">
          <div class="dash-value" style="color:var(--gold)">${won.length}</div>
          <div class="dash-label">Contracts Won</div>
          <div class="dash-change up">Successfully awarded</div>
        </div>
        <div class="dash-card">
          <div class="dash-value" style="color:var(--green)">${formatCurrency(totalBidValue)}</div>
          <div class="dash-label">Total Bid Value</div>
          <div class="dash-change neutral">Sum of all bids</div>
        </div>
        <div class="dash-card">
          <div class="dash-value" style="color:var(--text)">${u.rating || '—'} ★</div>
          <div class="dash-label">Contractor Rating</div>
          <div class="dash-change neutral">Platform score</div>
        </div>
      </div>

      <div class="section-header">
        <div class="section-title" style="font-size:1.2rem">My Bid History</div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>TENDER</th>
              <th>CATEGORY</th>
              <th>MY BID</th>
              <th>HIGHEST BID</th>
              <th>STATUS</th>
              <th>RESULT</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${myBids.length ? myBids.map(t => {
              const myBid = t.bids.find(b => b.contractorId === u.id);
              const highest = getHighestBid(t);
              const isWinner = t.winner === u.id;
              const isLeading = highest?.contractorId === u.id;
              return `
              <tr>
                <td style="max-width:180px"><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:0.83rem">${t.title}</div><div style="font-size:0.7rem;color:var(--text3);font-family:'IBM Plex Mono',monospace">${t.id}</div></td>
                <td><span class="category-tag ${CAT_CLASS[t.category]}">${CAT_ICONS[t.category]} ${t.category}</span></td>
                <td style="font-family:'Rajdhani',sans-serif;font-size:1rem;font-weight:700;color:var(--accent)">${formatCurrency(myBid?.amount || 0)}</td>
                <td style="font-family:'Rajdhani',sans-serif;font-size:1rem;font-weight:700;color:var(--gold)">${highest ? formatCurrency(highest.amount) : '—'}</td>
                <td><span class="status-badge ${t.status === 'open' ? 'status-open' : t.status === 'awarded' ? 'status-awarded' : 'status-closed'}">${t.status.toUpperCase()}</span></td>
                <td>
                  ${isWinner ? '<span class="status-badge status-awarded">🏆 WON</span>' : 
                    isLeading && t.status === 'open' ? '<span class="status-badge status-open">↑ LEADING</span>' :
                    t.status === 'awarded' ? '<span class="status-badge status-closed">✗ LOST</span>' :
                    '<span style="color:var(--text3);font-size:0.78rem">Pending</span>'}
                </td>
                <td><button class="btn btn-outline btn-sm" onclick="openTenderDetail('${t.id}')">View</button></td>
              </tr>`;
            }).join('') : '<tr><td colspan="7" style="text-align:center;color:var(--text3);padding:2rem">No bids submitted yet. <a href="#" onclick="navigate(\'tenders\')" style="color:var(--accent)">Browse open tenders →</a></td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════
// POST TENDER MODAL
// ═══════════════════════════════════════════════

function openPostTenderModal() {
  document.getElementById('post-tender-modal').classList.add('open');
}
function closePostTenderModal() {
  document.getElementById('post-tender-modal').classList.remove('open');
}

function submitTender() {
  const title = document.getElementById('pt-title').value.trim();
  const desc = document.getElementById('pt-desc').value.trim();
  const category = document.getElementById('pt-category').value;
  const location = document.getElementById('pt-location').value.trim();
  const budget = parseInt(document.getElementById('pt-budget').value);
  const deadline = document.getElementById('pt-deadline').value;
  const errEl = document.getElementById('pt-error');

  if (!title || !desc || !category || !location || !budget || !deadline) {
    errEl.textContent = 'Please fill all required fields.'; return;
  }
  if (new Date(deadline) <= new Date()) {
    errEl.textContent = 'Deadline must be a future date.'; return;
  }

  const id = `T-${new Date().getFullYear()}-${String(NEXT_ID++).padStart(3, '0')}`;
  const tender = {
    id,
    title, description: desc, category, location, budget, deadline,
    postedDate: new Date().toISOString().split('T')[0],
    postedBy: App.currentUser.id,
    status: 'open',
    bids: [],
    winner: null,
    milestones: [
      { title: 'Tender Published', date: new Date().toISOString().split('T')[0], done: true, desc: 'Tender officially published on the platform.' },
      { title: 'Bidding Open', date: new Date().toISOString().split('T')[0], done: true, desc: 'Contractors can now submit bids.' },
      { title: 'Bidding Closes', date: deadline, done: false, desc: 'Deadline for bid submissions.' },
      { title: 'Bid Evaluation & Award', date: deadline, done: false, desc: 'Winning bid allocated by the platform.' },
      { title: 'Public Announcement', date: deadline, done: false, desc: 'Winner announced publicly on the tracker.' },
    ]
  };

  TENDERS.unshift(tender);
  saveTenders();
  closePostTenderModal();
  document.getElementById('post-tender-form').reset();
  errEl.textContent = '';
  notify('Tender Posted!', `${id} is now live for bidding.`, '📋');
  renderDashboard();
  renderTenders();
  renderHome();
}

// ═══════════════════════════════════════════════
// PUBLIC TRACKER
// ═══════════════════════════════════════════════

function renderTracker() {
  const grid = document.getElementById('tracker-grid');
  if (!grid) return;
  const awardedTenders = TENDERS.filter(t => t.status === 'awarded' || t.status === 'closed' || t.status === 'open');
  const sorted = [...awardedTenders].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));

  grid.innerHTML = sorted.map(t => {
    const winner = t.winner ? getContractor(t.winner) : null;
    const highest = getHighestBid(t);
    return `
    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:1.25rem;margin-bottom:1rem">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-bottom:0.85rem">
        <div>
          <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.4rem">
            <span class="category-tag ${CAT_CLASS[t.category]}">${CAT_ICONS[t.category]} ${t.category}</span>
            <span class="status-badge ${t.status === 'open' ? 'status-open' : t.status === 'awarded' ? 'status-awarded' : 'status-closed'}">${t.status.toUpperCase()}</span>
          </div>
          <div style="font-family:'Rajdhani',sans-serif;font-size:1.1rem;font-weight:700">${t.title}</div>
          <div style="font-size:0.75rem;color:var(--text3);font-family:'IBM Plex Mono',monospace;margin-top:0.2rem">${t.id} · ${t.location}</div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-size:0.65rem;color:var(--text3)">Budget</div>
          <div style="font-family:'Rajdhani',sans-serif;font-size:1.2rem;font-weight:700;color:var(--accent)">${formatCurrency(t.budget)}</div>
        </div>
      </div>

      ${winner ? `
      <div style="background:rgba(240,168,0,0.07);border:1px solid rgba(240,168,0,0.2);border-radius:8px;padding:0.75rem;margin-bottom:0.85rem;display:flex;align-items:center;gap:0.75rem">
        <span style="font-size:1.2rem">🏆</span>
        <div>
          <div style="font-size:0.78rem;color:var(--text3)">Contract Awarded To</div>
          <div style="font-weight:600;font-size:0.9rem">${winner.name}</div>
          <div style="font-size:0.75rem;color:var(--gold);font-family:'IBM Plex Mono',monospace">Winning Bid: ${formatCurrency(highest?.amount || 0)}</div>
        </div>
      </div>` : ''}

      <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.78rem;color:var(--text3);flex-wrap:wrap;gap:0.5rem">
        <span>📅 Posted: ${formatDate(t.postedDate)}</span>
        <span>📋 ${t.bids.length} bids received</span>
        <span>⏰ Deadline: ${formatDate(t.deadline)}</span>
        <button class="btn btn-outline btn-sm" onclick="openTenderDetail('${t.id}')">Full Details →</button>
      </div>
    </div>`;
  }).join('');
}

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  loadTenders();
  updateNavbar();
  navigate('home');

  // Countdown timer
  setInterval(() => {
    document.querySelectorAll('[data-countdown]').forEach(el => {
      // handled inline
    });
  }, 1000);

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        App.currentTender = null;
      }
    });
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => {
        m.classList.remove('open');
        App.currentTender = null;
      });
    }
  });

  // Role toggle on register
  document.getElementById('reg-role')?.addEventListener('change', function() {
    document.getElementById('license-group').style.display = this.value === 'contractor' ? 'block' : 'none';
  });
});
