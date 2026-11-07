import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateProjectLinks, availableSocialLinks } from '../src/lib/content.ts';

test('private project source URLs cannot cross the publishable content boundary', () => {
  assert.throws(() => validateProjectLinks({ sourceVisibility: 'private', links: [{ label: 'Source', url: 'https://github.com/example/private-project' }] }), /private/i);
});

test('public evidence links are accepted but local paths and unsafe URLs are rejected', () => {
  assert.doesNotThrow(() => validateProjectLinks({ sourceVisibility: 'public', links: [{ label: 'PR', url: 'https://github.com/Seungwoo0120/Gen-AI-Hackathon/pull/23' }] }));
  for (const url of ['file:///Users/name/research/code.py', 'javascript:alert(1)', 'http://localhost:4310/']) {
    assert.throws(() => validateProjectLinks({ sourceVisibility: 'public', links: [{label: 'Unsafe', url}] }));
  }
});

test('missing LinkedIn and Resume never become placeholder links', () => {
  assert.deepEqual(availableSocialLinks({ github: 'https://github.com/Seungwoo0120', linkedin: null, resume: null }), [{label: 'GitHub', url: 'https://github.com/Seungwoo0120'}]);
});
