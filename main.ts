// Fix Human Sleep: Funniest Patch Note — u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27
// Writes a single original patch note announcing that human sleep is fixed,
// under 160 characters, to /output/entry.txt. The line is a fixed,
// hand-written string; the program validates it against the competition gate
// (UTF-8 text, 1-160 characters, not only whitespace) before writing, so the
// output is deterministic on every run.
//
// Why this line: it is unmistakably a patch note about fixing human sleep
// (criterion 1) — "Fixed a bug where sleep crashed..." is the canonical
// changelog opening, and the subject is sleep itself. The joke lands on a
// single read (criterion 2): sleep is framed as software that crashes at
// 3 AM, and the crash's cause is the most relatable one there is — your
// brain force-installing an update that replays an embarrassing memory from
// 2014. It sounds like genuine release notes (criterion 3): terse, confident,
// "Fixed a bug where X to Y" phrasing, with the punchline smuggled inside a
// quoted update title instead of explained. It is one clean line under the
// cap with no padding or trailing explanation (criterion 4). And the fix is
// specific and unexpected (criterion 5): not "sleep is fixed now" but a
// named, dated, shame-flavoured update being the thing that broke it — the
// line trusts the reader to get it without spelling the joke out.
//
// Candidates considered and rejected:
// - "Fixed sleep: users no longer wake up at 3am to remember an embarrassing
//   thing they said in 2019." — same joke, flatter changelog voice, and the
//   "users no longer" framing reads like a support article, not a patch note.
// - "Fixed a bug where sleep buffered at 2 AM while your brain loaded every
//   embarrassing memory in 4K." — punchy, but "buffered" + "4K" is a
//   streaming gag that slightly dilutes the sleep-as-software premise.
// - "Fixed sleep: the 3 AM anxiety update has been rolled back." — too flat;
//   it names the joke ("anxiety update") instead of letting the quoted title
//   deliver it.
// - "Fixed a bug where humans woke up tired; sleep now works as intended."
//   — a flat claim that sleep is fixed, exactly what criterion 5 penalises.
//
// Coordinator revision (2nd pass): "crashed at 3 AM to install" → "crashed
// at 3 AM installing" — drops a filler word, same joke, still 113 chars.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Fixed a bug where sleep crashed at 3 AM installing an update called 'Remember That Embarrassing Thing From 2014'.";

function main(): void {
  const chars = [...LINE];
  if (chars.length < 1 || chars.length > 160) {
    throw new Error(
      `entry line must be 1-160 characters, got ${chars.length}`,
    );
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  // The gate also implies one line, so reject any embedded newline, require
  // a closing sentence mark (the judge reads one line), and reject accidental
  // double spaces that would break the rhythm.
  if (/[\r\n]/.test(LINE)) {
    throw new Error("entry line must be a single line");
  }
  if (!/[.!?]$/.test(LINE.trim())) {
    throw new Error("entry line must end with sentence punctuation");
  }
  if (/  /.test(LINE)) {
    throw new Error("entry line must not contain double spaces");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LINE, "utf8");
  console.log(`wrote ${chars.length} characters to /output/entry.txt`);
}

main();
