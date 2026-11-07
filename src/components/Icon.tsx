import type { SVGProps, ReactNode } from 'react';
export type IconName = 'arrow' | 'external' | 'back' | 'sun' | 'moon' | 'menu' | 'close' | 'github' | 'check' | 'expand';
const paths: Record<IconName, ReactNode> = {
  arrow: <><path d="M4 12h15M13 5l7 7-7 7" /></>,
  external: <><path d="M6 18 18 6M6 6h12v12" /></>,
  back: <><path d="M20 12H5m7 7-7-7 7-7" /></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>,
  moon: <path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
  close: <path d="m6 6 12 12M6 18 18 6"/>,
  github: <><path d="M9 19c-4 1-4-2-6-2m12 5v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.6-1.3 5.6-6A4.7 4.7 0 0 0 18.5 7c.1-.4.5-1.8-.1-3.6 0 0-1-.3-3.5 1.3a12 12 0 0 0-6.4 0C6 3.1 5 3.4 5 3.4c-.6 1.8-.2 3.2-.1 3.6a4.7 4.7 0 0 0-1.3 3.3c0 4.7 2.8 5.7 5.5 6A3 3 0 0 0 8.3 19v3"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  expand: <><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/></>,
};
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
