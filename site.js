const get = id => document.getElementById(id);

function setText(id, value) {
  if (value) get(id).textContent = value.replaceAll('*', '');
}

function make(tag, value, className) {
  const element = document.createElement(tag);
  if (value) element.textContent = value;
  if (className) element.className = className;
  return element;
}

function imageSource(value) {
  return typeof value === 'string' && /^data:image\/(?:jpeg|png|webp|gif);base64,[a-z\d+/]+=*$/i.test(value) ? value : '';
}

function addLink(container, value, type) {
  if (!value) return;
  const href = {
    tel: candidate => /^\+?[\d\s()-]+$/.test(candidate) ? 'tel:' + candidate.replace(/[\s()-]/g, '') : '',
    email: candidate => /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(candidate) ? 'mailto:' + candidate : '',
    web: candidate => /^https:\/\/[^\s]+$/i.test(candidate) && URL.canParse(candidate) ? candidate : ''
  }[type](value);
  if (href) {
    const link = make('a', type === 'web' ? new URL(href).hostname : value);
    link.href = href;
    const row = make('p');
    row.append(link);
    container.append(row);
  }
}

function renderGroup(container, title, description, items) {
  if (!items.length) return;
  const section = make('section', '', 'update-group');
  section.append(make('h2', title.replaceAll('*', '')));
  if (description) section.append(make('p', description, 'intro'));
  const grid = make('div', '', 'update-grid');
  for (const [name, text, photo] of items) {
    if (typeof name !== 'string' || !name.trim()) continue;
    const card = make('article', '', 'update-card');
    const src = imageSource(photo);
    if (src) {
      const image = make('img');
      image.src = src;
      image.alt = '';
      image.loading = 'lazy';
      card.append(image);
    }
    card.append(make('h3', name));
    if (typeof text === 'string' && text.trim()) card.append(make('p', text));
    grid.append(card);
  }
  if (!grid.childElementCount) return;
  section.append(grid);
  container.append(section);
  container.hidden = false;
}

function renderSchool(data) {
  const {logo, hero, about, acad, adm, contact} = data;
  const [first, emphasis, last] = hero.title.split('*', 3);
  if (emphasis) get('hero-title').replaceChildren(first, make('em', emphasis), last || '');
  else setText('hero-title', hero.title);
  for (const [id, value] of Object.entries({
    'school-name': logo.name, 'school-mark': logo.letter, 'school-tagline': logo.tag,
    'hero-location': hero.badge, 'hero-description': hero.desc,
    'hero-academics': hero.btn2, 'hero-subtitle': hero.sub,
    'about-label': about.lbl, 'about-title': about.title, 'about-description': about.desc,
    'academy-label': acad.lbl, 'academy-title': acad.title, 'academy-description': acad.desc,
    'admissions-label': adm.lbl, 'admissions-title': adm.title, 'admissions-description': adm.desc,
    'contact-label': contact.lbl, 'contact-title': contact.title, 'contact-address': contact.addr,
    'contact-description': contact.desc, 'footer-name': logo.fname, 'footer-description': logo.fdesc,
    'footer-copy': logo.copy, 'footer-subtitle': logo.fsub
  })) {
    setText(id, value);
  }
  if (hero.btn1) get('hero-admissions').firstChild.textContent = hero.btn1 + ' ';
  get('hero-subtitle').hidden = !hero.sub;
  get('footer-subtitle').hidden = !logo.fsub;
  if (about.mission) {
    setText('about-note-title', 'Our mission');
    setText('about-note-text', about.mission);
  }
  if (about.desc2) get('about-description').after(make('p', about.desc2, 'intro'));
  const logoSource = imageSource(data.logo_img);
  if (logoSource) {
    const image = make('img');
    image.src = logoSource;
    image.alt = '';
    get('school-mark').replaceChildren(image);
  }
  const heroSource = imageSource(data.hero_bg);
  if (heroSource) {
    const visual = document.querySelector('.hero-visual');
    visual.querySelector('img').src = heroSource;
    visual.querySelector('img').alt = '';
    visual.querySelector('figcaption').hidden = true;
  }
  const aboutSource = imageSource(data.about_photo);
  if (aboutSource) {
    get('about-photo').src = aboutSource;
    get('about-photo').hidden = false;
  }

  const details = get('contact-details');
  for (const number of [contact.p1, contact.p2]) addLink(details, number, 'tel');
  for (const email of [contact.e1, contact.e2]) addLink(details, email, 'email');
  for (const social of [contact.fb, contact.tw, contact.wa, contact.yt]) addLink(details, social, 'web');
  for (const hours of [contact.h1, contact.h2]) if (hours) details.append(make('p', hours));
  details.hidden = !details.childElementCount;

  const updates = get('school-updates');
  renderGroup(updates, 'Announcements', '', data.ann.items.map(a => [a.title, a.body]));
  renderGroup(updates, data.news.title, '', data.news.items.map(n => [n.title, [n.date, n.body].filter(Boolean).join(' · ')]));
  renderGroup(updates, 'School calendar', '', data.news.events.map(e => [e.title, [e.day, e.month, e.desc].filter(Boolean).join(' ')]));
  renderGroup(updates, data.fac.title, data.fac.desc, data.fac.items.map(f => [f.n, f.d]));
  renderGroup(updates, data.co.title, data.co.desc, data.co.items.map(c => [c.n, c.d]));
  renderGroup(updates, data.staff.title, data.staff.desc, data.staff.members.map(m => [m.name, [m.role, m.subj].filter(Boolean).join(' · '), m.photo]));

  const admissionLabels = ['Tuition', 'Boarding', 'Activity levy', 'Admission fee', 'Uniform and books',
    'Applications open', 'Deadline', 'Interviews', 'Results', 'Reporting date'];
  const fields = [adm.f1, adm.f2, adm.f3, adm.f4, adm.f5, adm.d1, adm.d2, adm.d3, adm.d4, adm.d5];
  const localAdmissions = get('local-admissions');
  const rows = fields.flatMap((value, index) => value ? [make('dt', admissionLabels[index]), make('dd', value)] : []);
  if (rows.length) {
    const list = make('dl');
    list.append(...rows);
    localAdmissions.append(make('h3', 'School notices for admissions'), list);
    localAdmissions.hidden = false;
  }
  renderFacts(get('hero-facts'), hero, 's');
  renderFacts(get('about-facts'), about, 'b');
  if (acad.rt) {
    const results = get('school-results');
    const figures = make('dl', '', 'extra-facts');
    renderFacts(figures, acad, 'r');
    results.append(make('h3', acad.rt), make('p', acad.rd), figures);
    results.hidden = false;
  }
}

function renderFacts(list, record, prefix) {
  for (let index = 1; index <= 4; index += 1) {
    const label = record[prefix + index + 'l'];
    const value = record[prefix + index + 'n'];
    if (!label || !value) continue;
    const item = make('div');
    item.append(make('dt', label), make('dd', value));
    list.append(item);
  }
  list.hidden = !list.childElementCount;
}

const menu = document.querySelector('.menu');
const nav = get('site-nav');
const narrow = matchMedia('(max-width: 56rem)');
function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  nav.hidden = narrow.matches && !open;
}
function syncMenu() {
  menu.hidden = !narrow.matches;
  setMenu(false);
}
menu.addEventListener('click', () => setMenu(nav.hidden));
nav.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link || !narrow.matches) return;
  setMenu(false);
  const destination = link.hash && get(link.hash.slice(1));
  if (destination) {
    destination.tabIndex = -1;
    destination.focus({preventScroll: true});
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && narrow.matches && !nav.hidden) {
    setMenu(false);
    menu.focus();
  }
});
narrow.addEventListener('change', syncMenu);
syncMenu();

async function loadSchool() {
  if (new URLSearchParams(location.search).get('preview') === '1') {
    const draft = readSchoolDraft();
    if (draft) renderSchool(mergeSchoolContent(draft));
    return;
  }
  if (location.protocol === 'file:') return;
  try {
    const response = await fetch('school-content.json');
    if (response.ok) renderSchool(mergeSchoolContent(await response.json()));
  } catch {
    // The HTML already contains the public defaults.
  }
}
loadSchool();
