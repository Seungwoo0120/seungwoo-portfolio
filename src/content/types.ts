export type ProjectImage = { src: string; alt: string; caption: string; sourceVisibility: 'public' | 'private' };
export type Project = {
  id: string; title: string; subtitle: string; category: string; categories: string[];
  kind: string; role: string; sourceVisibility: 'public' | 'private' | 'documented'; status: string;
  summary: string; overview: string; contributions: string[]; stack: string[];
  features: { title: string; body: string }[];
  challenges: { title: string; problem: string; solution: string }[];
  results: { value: string; label: string; detail: string }[];
  boundaries: string[]; evidenceNote: string; images: ProjectImage[];
  links: { label: string; url: string }[];
  architecture: { caption: string; nodes: { label: string; detail: string; col: number; row: number }[]; edges: [number,number][] };
  cover: string | null; visual: string; accent: string; featured: boolean;
};
