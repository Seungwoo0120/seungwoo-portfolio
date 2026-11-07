import fs from 'node:fs/promises';
import path from 'node:path';
import { renderToString } from 'react-dom/server';
import { App, routes, pageMeta } from '../src/App';
import projects from '../src/content/projects.json';
import profile from '../src/content/profile.json';

const out=path.resolve('dist');
const template=await fs.readFile(path.join(out,'index.html'),'utf8');
const escape=(s:string)=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
for(const route of [...routes,'/404/']){
  const meta=pageMeta(route);
  let html=template.replace('<div id="root"></div>',`<div id="root" data-route="${route}">${renderToString(<App pathname={route}/>)}</div>`);
  html=html.replace(/<title>.*?<\/title>/,`<title>${escape(meta.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/,`$1${escape(meta.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/,`$1${escape(meta.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*("\s*\/?>)/,`$1${escape(meta.description)}$2`);
  if(route==='/404/')html=html.replace('</head>','<meta name="robots" content="noindex" /></head>');
  const file=route==='/404/'?path.join(out,'404.html'):path.join(out,route,'index.html');
  await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(file,html);
}
await fs.writeFile(path.join(out,'portfolio-content.json'),JSON.stringify({schemaVersion:1,profile,projects},null,2));
await fs.writeFile(path.join(out,'robots.txt'),'User-agent: *\nAllow: /\n');
const siteUrl=process.env.SITE_URL?.replace(/\/$/,'');
if(siteUrl){
  const sitemap='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(r=>`<url><loc>${escape(siteUrl+r)}</loc></url>`).join('')+'</urlset>';
  await fs.writeFile(path.join(out,'sitemap.xml'),sitemap);
  await fs.appendFile(path.join(out,'robots.txt'),`Sitemap: ${siteUrl}/sitemap.xml\n`);
}
console.log(`Rendered ${routes.length} pages plus a 404 page. Structured PDF-ready content exported.`);
