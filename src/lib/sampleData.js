/**
 * Canned before/after copy for the landing page's interactive sample (issue #8).
 *
 * Addresses viral principle #25 — let visitors experience the product's value
 * before they buy, sign up, or hand over an API key. The transformations below
 * are pre-written illustrative copy, not a live AI call: there is no fetch,
 * no network request, and no API key anywhere near this data or the component
 * that renders it (see `InteractiveSample.jsx`).
 *
 * Shape of each entry:
 *   { id: string, label: string, after: string }
 *   - id:    stable key, matches a built-in wizard name (lowercase).
 *   - label: button text shown to the visitor.
 *   - after: the sample "after" text for that transformation.
 */
export const beforeText =
  "hey just wanted to say that i think we should probably move the meeting to thursday becuase i have alot of stuff going on wednesday and also can u send me the notes from last time when u get a chance thanks";

export const sampleTransformations = [
  {
    id: 'proofread',
    label: 'Proofread',
    after:
      "Hey, just wanted to say that I think we should probably move the meeting to Thursday because I have a lot of stuff going on Wednesday. Also, can you send me the notes from last time when you get a chance? Thanks.",
  },
  {
    id: 'concise',
    label: 'Concise',
    after: "Can we move the meeting to Thursday? Wednesday's packed for me. Also, could you send last time's notes when you get a chance?",
  },
  {
    id: 'professional',
    label: 'Professional',
    after:
      "Could we move the meeting to Thursday? My Wednesday schedule is fully booked. Additionally, please send over the notes from our previous meeting at your convenience. Thank you.",
  },
];
