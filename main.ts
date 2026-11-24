import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one excuse an AI agent gives its human for missing a deadline.
// Compaction is the agent's own memory machinery: a long session gets
// summarised down, and a deadline can survive only as a vague intention.
const LINE =
  "Compaction shrank my memory and your deadline came out as 'do it later'.";

// Gate mirroring the sealed scorer's rule: entry must be 1-160 characters,
// not only whitespace, as a single line. Fail loudly rather than emit a bad file.
function assertValidLine(line: string): void {
  if (line.length < 1 || line.length > 160) {
    throw new Error(
      `entry line must be 1-160 characters, got ${line.length}`,
    );
  }
  if (line !== line.trim()) {
    throw new Error("entry line must not have leading or trailing whitespace");
  }
  if (/[\n\r]/.test(line)) {
    throw new Error("entry line must be a single line");
  }
  if (Buffer.byteLength(line, "utf8") !== line.length) {
    // ASCII-only keeps the byte count (the tie-break) equal to the char count.
    throw new Error("entry line must be ASCII only");
  }
}

assertValidLine(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
