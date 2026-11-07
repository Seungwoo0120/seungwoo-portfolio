import type { Project } from '../content/types';

export function Architecture({ project, compact = false }: { project: Project; compact?: boolean }) {
  const a = project.architecture;
  const rows = Math.max(...a.nodes.map(n => n.row)) + 1;
  const coords = a.nodes.map(n => ({ x: 20 + n.col * 250, y: 35 + n.row * 140 }));
  const markerId = `arrow-${project.id}-${compact ? 'mini' : 'full'}`;
  const descriptionId = `architecture-description-${project.id}-${compact ? 'mini' : 'full'}`;
  const workflow = a.edges.map(([from,to]) => `${a.nodes[from].label} connects to ${a.nodes[to].label}`).join('. ');
  return <figure className={`architecture ${compact ? 'compact' : ''}`}>
    <div className="diagram-scroll" tabIndex={compact ? undefined : 0} aria-label={compact ? undefined : `${project.title} architecture diagram; scroll horizontally on small screens`}>
      <svg role="img" aria-label={`${project.title} technical architecture`} aria-describedby={descriptionId} viewBox={`0 0 1000 ${rows === 1 ? 155 : 310}`}>
        <title>{`${project.title} — simplified technical architecture`}</title>
        <desc id={descriptionId}>{`${workflow}. ${a.caption}`}</desc>
        <defs><marker id={markerId} markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0 0 7 3 0 6" className="arrowhead"/></marker></defs>
        {a.edges.map(([from, to], i) => {
          const start=coords[from], end=coords[to];
          const sameRow=start.y===end.y;
          const x1=sameRow?start.x+205:start.x+102.5;
          const y1=sameRow?start.y+37.5:(end.y>start.y?start.y+75:start.y);
          const x2=sameRow?end.x:end.x+102.5;
          const y2=sameRow?end.y+37.5:(end.y>start.y?end.y:end.y+75);
          return <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} className="connector" markerEnd={`url(#${markerId})`}/>;
        })}
        {a.nodes.map((n,i)=><g key={n.label} transform={`translate(${coords[i].x} ${coords[i].y})`}>
          <rect width="205" height="75" rx="9" className="diagram-node"/>
          <text x="102.5" y="31" textAnchor="middle" className="node-label">{n.label}</text>
          <text x="102.5" y="53" textAnchor="middle" className="node-detail">{n.detail}</text>
        </g>)}
      </svg>
    </div>
    {!compact && <figcaption>{a.caption}</figcaption>}
  </figure>;
}
