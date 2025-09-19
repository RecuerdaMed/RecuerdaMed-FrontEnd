/* eslint-env node */
import fs from "node:fs";
import path from "node:path";
import { Buffer } from "node:buffer";

const sr = 44100;
const reps = 4;
const f = 1000;
const beepMs = 180;
const gapMs = 140;
const fadeMs = 12;
const amp = 0.65;

const beepSamp = Math.round((beepMs / 1000) * sr);
const gapSamp  = Math.round((gapMs  / 1000) * sr);
const fadeSamp = Math.max(1, Math.round((fadeMs / 1000) * sr));

const totalSamples = reps * beepSamp + (reps - 1) * gapSamp;
const samples = new Int16Array(totalSamples);

let idx = 0;
for (let r = 0; r < reps; r++) {
  for (let i = 0; i < beepSamp; i++) {
    const t = i / sr;
    let env = 1;
    if (i < fadeSamp) env = i / fadeSamp;
    else if (i > beepSamp - fadeSamp) env = (beepSamp - i) / fadeSamp;
    const v = Math.sin(2 * Math.PI * f * t) * amp * env;
    samples[idx++] = v * 0x7fff;
  }
  if (r < reps - 1) {
    for (let i = 0; i < gapSamp; i++) samples[idx++] = 0;
  }
}

const byteRate = sr * 2;
const blockAlign = 2;
const dataSize = samples.length * 2;
const u32 = (n) => Buffer.from([n & 255, (n>>8)&255, (n>>16)&255, (n>>24)&255]);
const u16 = (n) => Buffer.from([n & 255, (n>>8)&255]);

const header = Buffer.concat([
  Buffer.from("RIFF"),
  u32(36 + dataSize),
  Buffer.from("WAVE"),
  Buffer.from("fmt "),
  u32(16),
  u16(1),
  u16(1),
  u32(sr),
  u32(byteRate),
  u16(blockAlign),
  u16(16),
  Buffer.from("data"),
  u32(dataSize),
]);

const pcm = Buffer.alloc(dataSize);
for (let i = 0; i < samples.length; i++) pcm.writeInt16LE(samples[i], i * 2);

const outDir = path.join(process.cwd(), "public");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "beep4.wav"), Buffer.concat([header, pcm]));

console.log("✅ Generado: public/beep4.wav");
