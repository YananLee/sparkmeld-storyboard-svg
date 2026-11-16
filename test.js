import test from 'node:test';
import assert from 'node:assert/strict';
import { renderStoryboard } from './index.js';

test('renders cards and escapes prompts', () => {
  const svg = renderStoryboard(['First <scene>', 'Next & last']);
  assert.match(svg, /Scene 2/);
  assert.match(svg, /&lt;scene&gt;/);
  assert.match(svg, /Next &amp; last/);
});

test('requires prompts', () => assert.throws(() => renderStoryboard([])));
