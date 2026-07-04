import assert from 'node:assert/strict';
import test from 'node:test';
import { testimonials, getFeaturedTestimonials } from '../../src/lib/testimonialsData.js';

test('testimonials starts as an honest empty placeholder (no fabricated quotes)', () => {
  assert.ok(Array.isArray(testimonials));
  assert.equal(testimonials.length, 0);
});

test('getFeaturedTestimonials returns [] for the current empty dataset', () => {
  assert.deepEqual(getFeaturedTestimonials(), []);
});

test('getFeaturedTestimonials happy path returns items in order, capped at max', () => {
  const sample = [
    { quote: 'a', author: 'A', context: 'ctx-a' },
    { quote: 'b', author: 'B', context: 'ctx-b' },
    { quote: 'c', author: 'C', context: 'ctx-c' },
    { quote: 'd', author: 'D', context: 'ctx-d' },
  ];
  const result = getFeaturedTestimonials(sample, 3);
  assert.equal(result.length, 3);
  assert.deepEqual(result, sample.slice(0, 3));
});

test('getFeaturedTestimonials returns all items when fewer than max', () => {
  const sample = [{ quote: 'a', author: 'A', context: 'ctx-a' }];
  const result = getFeaturedTestimonials(sample, 3);
  assert.deepEqual(result, sample);
});

test('getFeaturedTestimonials defaults max to 3 when omitted', () => {
  const sample = [
    { quote: 'a', author: 'A', context: 'ctx-a' },
    { quote: 'b', author: 'B', context: 'ctx-b' },
    { quote: 'c', author: 'C', context: 'ctx-c' },
    { quote: 'd', author: 'D', context: 'ctx-d' },
  ];
  const result = getFeaturedTestimonials(sample);
  assert.equal(result.length, 3);
});

test('getFeaturedTestimonials handles an empty array', () => {
  assert.deepEqual(getFeaturedTestimonials([], 3), []);
});

test('getFeaturedTestimonials is defensive against non-array input', () => {
  assert.deepEqual(getFeaturedTestimonials(null, 3), []);
  assert.deepEqual(getFeaturedTestimonials(undefined, 3), []);
  assert.deepEqual(getFeaturedTestimonials('not-an-array', 3), []);
});

test('getFeaturedTestimonials treats a zero/negative/NaN max as zero results', () => {
  const sample = [{ quote: 'a', author: 'A', context: 'ctx-a' }];
  assert.deepEqual(getFeaturedTestimonials(sample, 0), []);
  assert.deepEqual(getFeaturedTestimonials(sample, -1), []);
  assert.deepEqual(getFeaturedTestimonials(sample, NaN), []);
});
