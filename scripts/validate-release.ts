import fs from 'node:fs/promises';
import path from 'node:path';
import projects from '../src/content/projects.json';
import profile from '../src/content/profile.json';
import { validateProjectLinks, availableSocialLinks } from '../src/lib/content';

const errors:string[]=[];
const out=path.resolve('dist');
const ids=new Set<string>();
for(const p of projects){
  if(ids.has(p.id))errors.push(`Duplicate project slug: ${p.id}`);ids.add(p.id);
  try{validateProjectLinks(p);}catch(e){errors.push(`${p.id}: ${String(e)}`);}
  for(const im of p.images){try{await fs.access(path.join(out,im.src));}catch{errors.push(`Missing image ${im.src}`);}}
}
for(const link of availableSocialLinks(profile)){
  if(!link.url.startsWith('https://')&&!link.url.startsWith('/'))errors.push(`Invalid social URL: ${link.label}`);
}
async function walk(dir:string):Promise<string[]>{const entries=await fs.readdir(dir,{withFileTypes:true});return(await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]))).flat();}
const files=await walk(out);let bytes=0;
const forbidden=[/Seungwoo-Daniel-Cho\/on_to_off/i,/kimddo1\/(StockSeek|i4_Tech_Projects)/i,/mck0124\/ai_study_planner/i,/\/Users\/nohseungwoo/,/local-demo-session/,/postgresql:\/\//,/sk-[a-zA-Z0-9_-]{20,}/];
for(const file of files){
  bytes+=(await fs.stat(file)).size;
  if(!/\.(html|js|json|css|txt|svg|xml)$/.test(file))continue;
  const text=await fs.readFile(file,'utf8');
  for(const pattern of forbidden)if(pattern.test(text))errors.push(`Private/internal content in ${path.relative(out,file)}: ${pattern}`);
  if(file.endsWith('.html')){
    for(const match of text.matchAll(/(?:href|src)="([^"#]+)"/g)){
      const value=match[1].replaceAll('&amp;','&');
      if(!value.startsWith('/')||value.startsWith('//'))continue;
      const pathname=value.split(/[?#]/)[0];
      const target=path.join(out,pathname);
      try{const stat=await fs.stat(target);if(stat.isDirectory())await fs.access(path.join(target,'index.html'));}catch{errors.push(`Broken local URL ${value} in ${path.relative(out,file)}`);}
    }
  }
}
if(bytes>15*1024*1024)errors.push(`Static output exceeds budget: ${bytes} bytes`);
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`Release check passed: ${projects.length} projects, ${files.filter(x=>x.endsWith('.html')).length} HTML pages, ${files.length} files, ${(bytes/1024/1024).toFixed(2)} MB. No private source URLs or local research paths in the build.`);
