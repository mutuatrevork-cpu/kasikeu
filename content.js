const SCHOOL_DEFAULTS = {
  logo: {name: 'Kasikeu Girls', tag: 'Secondary School', letter: 'K', fname: 'Kasikeu Girls Secondary School', fsub: '', fdesc: 'Mukaa Sub-County · Makueni County, Kenya', copy: 'Kasikeu Girls Secondary School'},
  logo_img: null,
  hero_bg: null,
  about_photo: null,
  hero: {
    badge: 'Mukaa · Makueni County, Kenya',
    title: 'Kasikeu Girls *Secondary School*',
    sub: '',
    desc: 'Welcome to Kasikeu Girls, a public girls’ boarding school in Mukaa, Makueni County. Explore our history, see what we study, and discover life beyond the classroom.',
    btn1: 'Explore our school',
    btn2: 'Find our campus',
    s1n: '', s1l: '', s2n: '', s2l: '', s3n: '', s3l: '', s4n: '', s4l: ''
  },
  about: {
    lbl: 'Our history',
    title: 'Rooted in Kasikeu',
    desc: 'Our story is rooted in Kasikeu, where we have grown as a girls’ school in Mukaa Sub-County, Makueni County.',
    mission: '', desc2: '', b1n: '', b1l: '', b2n: '', b2l: '', b3n: '', b3l: '', b4n: '', b4l: ''
  },
  acad: {
    lbl: 'Senior school academics',
    title: 'Grade 10 subject combinations',
    desc: 'We offer six Grade 10 subject combinations across our STEM and Social Sciences pathways.',
    rt: '', rd: '', r1n: '', r1l: '', r2n: '', r2l: '', r3n: '', r3l: '', r4n: '', r4l: ''
  },
  fac: {lbl: 'Facilities', title: 'Campus facilities', desc: '', items: []},
  co: {lbl: 'Activities', title: 'Life beyond the classroom', desc: '', items: []},
  adm: {
    lbl: 'Admissions',
    title: 'Joining Grade 10',
    desc: 'To join us in Grade 10, use the Ministry of Education’s KEMIS portal for senior school selection and placement. Search for Kasikeu Girls High School using our institution code, CV7S.',
    f1: '', f2: '', f3: '', f4: '', f5: '', d1: '', d2: '', d3: '', d4: '', d5: ''
  },
  staff: {lbl: 'Staff', title: 'Meet our staff', desc: '', members: []},
  news: {lbl: 'News and events', title: 'School updates', items: [], events: []},
  contact: {
    lbl: 'Visit the school', title: 'Find Kasikeu Girls', desc: '',
    addr: 'Kasikeu, Mukaa Sub-County\nMakueni County, Kenya',
    p1: '', p2: '', e1: '', e2: '', h1: '', h2: '', fb: '', tw: '', wa: '', yt: ''
  },
  ann: {items: []}
};

const SCHOOL_STORAGE_KEY = 'kgss_v1';

function readSchoolDraft() {
  try {
    return JSON.parse(localStorage.getItem(SCHOOL_STORAGE_KEY));
  } catch {
    return null;
  }
}

function mergeSchoolContent(source) {
  const result = structuredClone(SCHOOL_DEFAULTS);
  for (const [key, defaultValue] of Object.entries(SCHOOL_DEFAULTS)) {
    const value = source?.[key];
    if (defaultValue === null && typeof value === 'string') {
      result[key] = value;
    } else if (defaultValue && value && typeof value === 'object') {
      for (const [field, fallback] of Object.entries(defaultValue)) {
        const candidate = value[field];
        if (Array.isArray(fallback)) {
          if (Array.isArray(candidate)) {
            result[key][field] = candidate.filter(item => item && typeof item === 'object' && !Array.isArray(item));
          }
        } else if (typeof candidate === 'string') {
          result[key][field] = candidate;
        }
      }
    }
  }
  return result;
}
