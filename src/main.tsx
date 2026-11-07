import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';

const root=document.getElementById('root')!;
const app=<App pathname={window.location.pathname}/>;
const normalized=(pathname:string)=>pathname.replace(/\/$/,'')||'/';
const matchingSnapshot=root.dataset.route&&normalized(root.dataset.route)===normalized(window.location.pathname);
if(root.hasChildNodes()&&matchingSnapshot)hydrateRoot(root,app);else createRoot(root).render(app);
