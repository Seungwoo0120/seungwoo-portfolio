import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import rawProjects from './content/projects.json';
import profile from './content/profile.json';
import type { Project, ProjectImage } from './content/types';
import { availableSocialLinks } from './lib/content';
import { Architecture } from './components/Architecture';
import { Icon } from './components/Icon';

export const projects = rawProjects as Project[];
const socialLinks=availableSocialLinks(profile);
const casePath=(id:string)=>`/projects/${id}/`;
export const routes=['/','/projects/',...projects.map(p=>casePath(p.id))];

export function pageMeta(pathname:string) {
  const parts=pathname.split('/').filter(Boolean);
  const project=parts[0]==='projects'&&parts[1]?projects.find(p=>p.id===parts[1]):undefined;
  if(project)return{title:`${project.title} — Seungwoo Noh`,description:project.summary};
  if(parts[0]==='projects'&&parts.length===1)return{title:'Projects — Seungwoo Noh',description:'Technical case studies across full-stack software, APIs, data, FinTech prototypes, and systems.'};
  if(parts.length===0)return{title:'Seungwoo Noh — Software Engineer',description:`${profile.education}. ${profile.intro}`};
  return{title:'Page not found — Seungwoo Noh',description:'Return to the portfolio or explore the project case studies.'};
}

function Header({pathname}:{pathname:string}) {
  const [theme,setTheme]=useState('dark');
  const [menu,setMenu]=useState(false);
  useEffect(()=>{setTheme(document.documentElement.dataset.theme||'dark');},[]);
  function toggleTheme(){const next=theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;setTheme(next);try{localStorage.setItem('portfolio-theme',next);}catch{}}
  return <header className="site-header" onKeyDown={e=>{if(e.key==='Escape')setMenu(false);}}>
    <div className="header-inner">
      <a className="wordmark" href="/" aria-label="Seungwoo Noh, home"><span className="monogram">SN<span>↗</span></span><span>Seungwoo Noh</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="/" aria-current={pathname==='/'?'page':undefined}>Home</a>
        <a href="/projects/" aria-current={pathname.startsWith('/projects')?'page':undefined}>Projects</a>
        <a href="/#experience">Experience</a>
      </nav>
      <div className="header-actions">
        <a className="header-contact" href={profile.linkedin!} target="_blank" rel="noreferrer">LinkedIn <Icon name="external" width="15" height="15"/></a>
        <button className="icon-button theme-toggle" aria-label="Toggle color theme" title={`Switch to ${theme==='dark'?'light':'dark'} mode`} onClick={toggleTheme}><Icon name={theme==='dark'?'sun':'moon'}/></button>
        <button className="icon-button menu-toggle" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} aria-controls="mobile-navigation" onClick={()=>setMenu(!menu)}><Icon name={menu?'close':'menu'}/></button>
      </div>
    </div>
    <nav id="mobile-navigation" className={`mobile-nav ${menu?'open':''}`} aria-label="Mobile navigation" inert={!menu}>
      <a href="/">Home</a><a href="/projects/">Projects</a><a href="/#experience" onClick={()=>setMenu(false)}>Experience</a>
      <a href={profile.linkedin!} target="_blank" rel="noreferrer">LinkedIn <Icon name="external"/></a>
    </nav>
  </header>;
}

function Footer(){return <footer className="site-footer wrap">
  <div className="footer-top"><div><p className="eyebrow">NEXT CONVERSATION</p><h2>Good software starts<br/>with a clear problem.</h2><p>Find me on LinkedIn or explore the code.</p></div><div className="footer-links">{socialLinks.map(l=><a key={l.label} href={l.url} target="_blank" rel="noreferrer">{l.label}<Icon name="external"/></a>)}</div></div>
  <div className="footer-bottom"><span>© 2026 Seungwoo Noh</span><span>Computer Engineering · HKU</span><a href="#top">Back to top ↑</a></div>
</footer>;}

function ProjectVisual({project,small=false}:{project:Project;small?:boolean}){
  return <div className={`project-visual visual-${project.visual} ${small?'small':''}`} data-accent={project.accent}>
    {project.visual==='phones'?<div className="phone-composition">{project.images.slice(0,2).map((im,i)=><div key={im.src} className={`phone phone-${i}`}><img src={im.src} alt={i===0?`${project.title} interface preview`:''} loading="lazy" decoding="async"/></div>)}</div>:
    project.visual==='photo'?<div className="hardware-cover"><img src={project.cover!} alt={project.images[0].alt} width="327" height="286" loading="lazy" decoding="async"/></div>:
    project.visual==='diagram'?<div className="confidential-visual"><div className="system-mark"><span>INPUT</span><i/><span>LOGIC</span><i/><span>PREVIEW</span></div><p>Simulation tooling</p><span className="mono">COMPANY WORK / HIGH-LEVEL SUMMARY</span></div>:
    <div className={project.visual==='terminal'?'terminal-frame':'browser-frame'}>{project.visual!=='terminal'&&<div className="browser-chrome"><i/><i/><i/><span>{project.title}</span></div>}<img src={project.cover!} alt={`${project.title} ${project.visual==='terminal'?'recorded terminal output':'interface preview'}`} loading="lazy" decoding="async"/></div>}
    <span className="visual-tag">{project.id==='signalforge'?'SIMULATED DATA':project.id==='stockseek'?'STATIC EXAMPLE':project.id==='studypilot'?'UI PREVIEW':project.id==='i4-rth'?'CONFIDENTIAL':project.visual==='photo'?'HARDWARE DEMO':'PROJECT SNAPSHOT'}</span>
  </div>;
}

function ProjectCard({project,index=0,compact=false}:{project:Project;index?:number;compact?:boolean}){
  return <a className={`project-card ${compact?'compact-card':''}`} href={casePath(project.id)} aria-label={`${project.title} — read case study`}>
    <ProjectVisual project={project}/>
    <div className="project-card-copy"><div className="project-card-meta"><span>{String(index+1).padStart(2,'0')} / {project.category}</span><span>{project.kind}</span></div><div className="card-title-row"><h3>{project.title}</h3><span className="card-arrow"><Icon name="external"/></span></div><p>{project.summary}</p><div className="card-bottom"><span>{project.role}</span><span className="read-label">Read case study <Icon name="arrow" width="15" height="15"/></span></div></div>
  </a>;
}

function SectionHeading({number,title,children}:{number:string;title:string;children?:ReactNode}){return <div className="section-heading"><div><p className="eyebrow">{number} / {title.toUpperCase()}</p><h2>{children||title}</h2></div></div>;}

function Home(){
  const featured=projects.filter(p=>p.featured);
  return <>
    <section className="hero wrap">
      <div className="hero-kicker"><span className="status-dot"/><span>SEUNGWOO NOH</span><span className="kicker-divider"/><span>COMPUTER ENGINEERING @ HKU</span></div>
      <h1>Building across<br/><span>the stack.</span></h1>
      <div className="hero-lower"><div className="hero-copy"><p>{profile.intro}</p><p className="hero-education">Computer Engineering at<br className="mobile-break"/> The University of Hong Kong.</p><div className="hero-buttons"><a className="button button-primary" href="#selected-work">Explore my work <Icon name="arrow"/></a><a className="button button-quiet" href={profile.github} target="_blank" rel="noreferrer"><Icon name="github"/> GitHub <Icon name="external" width="15" height="15"/></a></div></div><div className="hero-focus"><p className="eyebrow">WHERE I WORK</p><span>Software engineering</span><span>Full-stack development</span><span>Backend & data</span></div></div>
      <div className="skill-strip"><span className="eyebrow">CORE TOOLKIT</span><div>{profile.skills.map(s=><span key={s}>{s}</span>)}</div></div>
    </section>
    <section id="selected-work" className="selected-work wrap section-space">
      <div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Different problems.<br/>Connected thinking.</h2></div><p className="section-intro">From product interfaces and APIs to the sensors on a patrol robot. Each case study shows what I contributed.</p></div>
      <div className="featured-grid">{featured.map((p,i)=><ProjectCard key={p.id} project={p} index={i}/>)}</div>
      <a className="text-link all-projects-link" href="/projects/">Explore all projects <Icon name="arrow"/></a>
    </section>
    <section className="engineering wrap section-space"><SectionHeading number="02" title="Engineering approach">Beyond the first<br/>working screen.</SectionHeading><div className="principles-grid">
      <article><span className="principle-number">01</span><h3>Follow the boundary.</h3><p>A form, API, and database share a contract. I look at what happens when input or state crosses between them.</p><a className="text-link" href={casePath('onoff')}>Input validation in ONOFF <Icon name="arrow" width="17"/></a></article>
      <article><span className="principle-number">02</span><h3>Make setup repeatable.</h3><p>Schema changes, environment configuration, and readiness checks are part of the development experience.</p><a className="text-link" href={casePath('tutorcoach')}>Database setup in TutorCoach <Icon name="arrow" width="17"/></a></article>
      <article><span className="principle-number">03</span><h3>Keep claims testable.</h3><p>A prototype can be useful without pretending to be production. I separate implementation, local verification, and what is still untested.</p><a className="text-link" href={casePath('signalforge')}>Typed prototypes in SignalForge <Icon name="arrow" width="17"/></a></article>
    </div></section>
    <section id="experience" className="experience wrap section-space"><SectionHeading number="03" title="Experience">Software in a<br/>physical-world context.</SectionHeading><div className="experience-panel"><div className="experience-label"><span className="company-initial">i4</span><div><h3>{profile.experience.company}</h3><span>{profile.experience.location}</span></div></div><div className="experience-copy"><p className="eyebrow">{profile.experience.role}</p><h3>Simulation tools for<br/>robotics workflows.</h3><p>{profile.experience.summary}</p><ul>{profile.experience.details.map(d=><li key={d}>{d}</li>)}</ul><a className="text-link" href={casePath('i4-rth')}>Read the internship summary <Icon name="arrow"/></a></div></div></section>
  </>;
}

const categories=['All work','Full-stack','Backend & data','FinTech','Systems'];
function ProjectIndex(){const [category,setCategory]=useState('All work');const filtered=category==='All work'?projects:projects.filter(p=>p.categories.includes(category));return <div className="wrap index-page">
  <div className="index-heading"><p className="eyebrow">PROJECT INDEX</p><h1>Work, in detail.</h1><p>What I built, where I contributed,<br/>and what the evidence actually supports.</p></div>
  <div className="filter-row" role="group" aria-label="Filter projects by focus">{categories.map(c=><button key={c} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}<span className="project-count" aria-live="polite">{filtered.length} case studies</span></div>
  <div className="projects-grid">{filtered.map(p=><ProjectCard key={p.id} project={p} index={projects.indexOf(p)} compact/>)}</div>
</div>;}

function ImageGallery({project}:{project:Project}){
  const [active,setActive]=useState<ProjectImage|null>(null);const dialog=useRef<HTMLDialogElement>(null);
  useEffect(()=>{const d=dialog.current;if(active&&d){d.showModal();const before=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{if(d.open)d.close();document.body.style.overflow=before;};}},[active]);
  if(!project.images.length)return <div className="visuals-withheld"><span className="eyebrow">COMPANY MATERIALS</span><p>Company screenshots, catalogs, and source are not published here. The high-level architecture above explains the workflow without exposing those materials.</p></div>;
  return <><div className={`image-gallery ${project.visual==='phones'?'portrait-gallery':project.visual==='photo'?'hardware-gallery':''}`}>{project.images.map(im=><figure key={im.src}><button className="gallery-image" onClick={()=>setActive(im)} aria-label={`Enlarge image: ${im.alt}`}><img src={im.src} alt={im.alt} loading="lazy" decoding="async"/><span className="image-expand"><Icon name="expand"/></span></button><figcaption>{im.caption}</figcaption></figure>)}</div>
    <dialog className="image-dialog" aria-label={`Enlarged ${project.title} ${project.visual==='photo'?'project image':'screenshot'}`} ref={dialog} onClose={()=>setActive(null)} onClick={e=>{if(e.target===e.currentTarget)setActive(null);}}>{active&&<div className="dialog-content"><button className="icon-button dialog-close" aria-label="Close enlarged image" onClick={()=>setActive(null)} autoFocus><Icon name="close"/></button><img src={active.src} alt={active.alt}/><p>{active.caption}</p></div>}</dialog>
  </>;
}

function CaseSection({id,label,title,children}:{id:string;label:string;title:string;children:ReactNode}){return <section id={id} className="case-section"><p className="eyebrow">{label}</p><h2>{title}</h2>{children}</section>;}

function CaseStudy({project:p}:{project:Project}){
  const next=projects[(projects.indexOf(p)+1)%projects.length];
  return <div className="case-page">
    <section className="case-hero wrap"><a className="back-link" href="/projects/"><Icon name="back" width="17"/> All projects</a><div className="case-title-grid"><div><p className="eyebrow">{p.kind.toUpperCase()} / {p.category.toUpperCase()}</p><h1>{p.title}</h1></div><div><p className="case-subtitle">{p.subtitle}</p><p className="case-summary">{p.summary}</p></div></div><div className="case-meta"><div><span className="eyebrow">MY ROLE</span><strong>{p.role}</strong></div><div><span className="eyebrow">PROJECT STATUS</span><strong>{p.status}</strong></div><div><span className="eyebrow">SOURCE</span><strong>{p.sourceVisibility==='documented'?'Project documentation':p.sourceVisibility==='private'?'Private repository':'Public repository'}</strong></div></div>
      <div className="case-cover"><ProjectVisual project={p}/></div>
    </section>
    <div className="case-body wrap"><aside className="case-toc"><p className="eyebrow">IN THIS CASE STUDY</p><nav aria-label="Case study sections"><a href="#overview">Overview</a><a href="#contribution">My contribution</a><a href="#decisions">Engineering decisions</a><a href="#architecture">Architecture</a><a href="#screenshots">{p.visual==='photo'?'Project visuals':'Screenshots'}</a><a href="#verification">Results & evidence</a></nav><div className="toc-stack"><span className="eyebrow">TECH STACK</span><div className="stack-tags">{p.stack.map(t=><span key={t}>{t}</span>)}</div></div></aside>
      <div className="case-article">
        <CaseSection id="overview" label="01 / CONTEXT" title="The project"><p className="lead-paragraph">{p.overview}</p><div className="feature-list">{p.features.map(f=><article key={f.title}><h3>{f.title}</h3><p>{f.body}</p></article>)}</div></CaseSection>
        <CaseSection id="contribution" label="02 / OWNERSHIP" title="My contribution"><p className="role-note">{p.kind==='Personal project'?'A personal implementation.':`A ${p.kind.toLowerCase()}. The work below describes my contribution, not sole ownership of the complete product.`}</p><ol className="contribution-list">{p.contributions.map((c,i)=><li key={c}><span>{String(i+1).padStart(2,'0')}</span><p>{c}</p></li>)}</ol></CaseSection>
        <CaseSection id="decisions" label="03 / TECHNICAL CASE STUDY" title="Challenges & decisions">{p.challenges.map((c,i)=><article className="challenge" key={c.title}><span className="challenge-number">0{i+1}</span><div><h3>{c.title}</h3><p>{c.problem}</p><div className="solution"><span className="eyebrow">APPROACH</span><p>{c.solution}</p></div></div></article>)}</CaseSection>
        <CaseSection id="architecture" label="04 / STRUCTURE" title="How the pieces connect"><Architecture project={p}/><div className="mobile-stack"><p className="eyebrow">TECH STACK</p><div className="stack-tags">{p.stack.map(t=><span key={t}>{t}</span>)}</div></div></CaseSection>
        <CaseSection id="screenshots" label={p.visual==='photo'?'05 / HARDWARE DEMO':'05 / THE INTERFACE'} title={p.visual==='photo'?'The robot in action':p.images.length?'Screens from the project':'A confidential workflow'}><ImageGallery project={p}/></CaseSection>
        <CaseSection id="verification" label="06 / VERIFICATION SNAPSHOT" title="Results, with boundaries"><div className="evidence-grid">{p.results.map(r=><article key={r.label}><span className="evidence-value">{r.value}</span><h3>{r.label}</h3><p>{r.detail}</p></article>)}</div><div className="boundaries"><h3>{p.sourceVisibility==='documented'?'Scope of the evidence':'What this does — and does not — establish'}</h3><ul>{p.boundaries.map(b=><li key={b}>{b}</li>)}</ul></div><p className="evidence-note">{p.evidenceNote}</p><p className="verification-date mono">{p.sourceVisibility==='documented'?'Original project portfolio and team demo':'Reviewed 06 Nov 2026 · Fixed source snapshot'}</p>{p.links.length>0&&<div className="source-links">{p.links.map(l=><a key={l.url} href={l.url} target="_blank" rel="noreferrer">{l.label}<Icon name="external" width="17"/></a>)}</div>}</CaseSection>
      </div>
    </div>
    <section className="next-case wrap"><p className="eyebrow">NEXT CASE STUDY</p><a href={casePath(next.id)}><span>{next.title}</span><Icon name="arrow" width="36" height="36"/></a></section>
  </div>;
}


function NotFound(){return <section className="wrap pending-page"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>A different path.</h1><p>The case study you’re looking for isn’t here.</p><a className="button button-primary" href="/projects/">Explore the projects <Icon name="arrow"/></a></section>;}

export function App({pathname}:{pathname:string}){
  const clean='/' + pathname.split('/').filter(Boolean).join('/');const parts=clean.split('/').filter(Boolean);
  const project=parts[0]==='projects'&&parts.length===2?projects.find(p=>p.id===parts[1]):undefined;
  useEffect(()=>{document.title=pageMeta(pathname).title;},[pathname]);
  const page=clean==='/'?<Home/>:clean==='/projects'?<ProjectIndex/>:project?<CaseStudy project={project}/>:<NotFound/>;
  return <><a href="#main" className="skip-link">Skip to content</a><div id="top"/><Header pathname={pathname}/><main id="main" tabIndex={-1}>{page}</main><Footer/></>;
}
