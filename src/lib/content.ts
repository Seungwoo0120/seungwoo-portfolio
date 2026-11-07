export function validateProjectLinks(project: { sourceVisibility: string; links: { label: string; url: string }[] }): void {
  for (const link of project.links) {
    const url = new URL(link.url);
    if (url.protocol !== 'https:' || ['localhost', '127.0.0.1'].includes(url.hostname)) throw new Error('Only public HTTPS URLs can be published');
    if (project.sourceVisibility !== 'public' && url.hostname === 'github.com') throw new Error('Private project source links must stay out of publishable content');
  }
}

export function availableSocialLinks(profile: { github: string; linkedin: string | null; resume: string | null }): { label: string; url: string }[] {
  return [
    { label: 'GitHub', url: profile.github },
    ...(profile.linkedin ? [{ label: 'LinkedIn', url: profile.linkedin }] : []),
    ...(profile.resume ? [{ label: 'Resume', url: profile.resume }] : []),
  ];
}
