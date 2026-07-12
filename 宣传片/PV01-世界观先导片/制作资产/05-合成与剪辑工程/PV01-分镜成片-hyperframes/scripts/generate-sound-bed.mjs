import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const outputDir = path.join(projectRoot, "assets", "audio", "final");
const sfxDir = path.join(outputDir, "sfx");
fs.mkdirSync(sfxDir, { recursive: true });

const sampleRate = 44100;

function writeWav(filePath, duration, channels, sampleAt) {
  const frameCount = Math.round(duration * sampleRate);
  const bytesPerSample = 2;
  const dataSize = frameCount * channels * bytesPerSample;
  const buffer = Buffer.allocUnsafe(44 + dataSize);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(channels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * channels * bytesPerSample, 28);
  buffer.writeUInt16LE(channels * bytesPerSample, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let frame = 0; frame < frameCount; frame += 1) {
    const t = frame / sampleRate;
    for (let channel = 0; channel < channels; channel += 1) {
      const value = Math.max(-1, Math.min(1, sampleAt(t, channel, frame)));
      buffer.writeInt16LE(Math.round(value * 32767), offset);
      offset += 2;
    }
  }
  fs.writeFileSync(filePath, buffer);
}

let seed = 0x5a17c0de;
function noise() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return (seed / 0x100000000) * 2 - 1;
}

const rainState = [0, 0];
const dropState = [0, 0];
writeWav(path.join(outputDir, "ambience-rain-room.wav"), 60, 2, (t, channel) => {
  const white = noise();
  rainState[channel] = rainState[channel] * 0.86 + white * 0.14;
  if (noise() > 0.99945) dropState[channel] = 1;
  const drop = dropState[channel];
  dropState[channel] *= 0.9925;
  const hum = Math.sin(2 * Math.PI * 48 * t) * 0.012 + Math.sin(2 * Math.PI * 96 * t) * 0.004;
  const stereoRain = white * 0.018 + rainState[channel] * 0.046 + drop * 0.055;
  const fadeIn = Math.min(1, t / 0.5);
  const fadeOut = Math.min(1, (60 - t) / 0.5);
  return (hum + stereoRain) * fadeIn * fadeOut;
});

writeWav(path.join(sfxDir, "door-bell.wav"), 0.95, 1, (t) => {
  const env = Math.exp(-4.8 * t);
  return env * (Math.sin(2 * Math.PI * 932 * t) * 0.34 + Math.sin(2 * Math.PI * 1398 * t) * 0.17);
});

writeWav(path.join(sfxDir, "glass-memory-hum.wav"), 1.35, 1, (t) => {
  const env = Math.exp(-3.4 * t);
  return env * (Math.sin(2 * Math.PI * 418 * t) * 0.2 + Math.sin(2 * Math.PI * 836 * t) * 0.11 + Math.sin(2 * Math.PI * 1254 * t) * 0.07);
});

writeWav(path.join(sfxDir, "switch-pulse.wav"), 0.48, 1, (t) => {
  const env = Math.exp(-10 * t);
  return env * (Math.sin(2 * Math.PI * 52 * t) * 0.58 + noise() * 0.09);
});

writeWav(path.join(sfxDir, "cup-rim-echo.wav"), 1.1, 1, (t) => {
  const env = Math.exp(-4.6 * t);
  return env * (Math.sin(2 * Math.PI * 782 * t) * 0.24 + Math.sin(2 * Math.PI * 1173 * t) * 0.12);
});

