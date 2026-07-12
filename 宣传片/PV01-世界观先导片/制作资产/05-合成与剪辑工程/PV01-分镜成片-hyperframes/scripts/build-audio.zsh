#!/bin/zsh
set -euo pipefail

PROJECT_ROOT="${0:A:h:h}"
FFMPEG="$PROJECT_ROOT/bin/ffmpeg"
FFPROBE="$PROJECT_ROOT/bin/ffprobe"
RAW="$PROJECT_ROOT/assets/audio/raw"
WAV="$PROJECT_ROOT/assets/audio/raw-wav"
FINAL="$PROJECT_ROOT/assets/audio/final"

mkdir -p "$WAV" "$FINAL" "$FINAL/sfx"

for source in "$RAW"/*.aiff; do
  name="${source:t:r}"
  afconvert -f WAVE -d LEI16@44100 "$source" "$WAV/$name.wav"
done

for name in \
  01-daily-memory \
  02-daily-self-deception \
  03-daily-door \
  04-daily-welcome \
  05-daily-not-wine \
  07-daily-first-look \
  09-daily-let-pass \
  11-daily-not-forget; do
  "$FFMPEG" -y -v error -i "$WAV/$name.wav" \
    -af "volume=0.94,loudnorm=I=-19:TP=-2:LRA=7" \
    -ar 44100 -ac 1 -c:a pcm_s16le "$FINAL/$name.wav"
done

for name in 06-feral-secrets 08-feral-missing 10-feral-decency; do
  "$FFMPEG" -y -v error -i "$WAV/$name.wav" \
    -filter_complex "[0:a]asetrate=40572,aresample=44100,atempo=1.03,volume=0.92[main];[0:a]asetrate=40572,aresample=44100,atempo=1.03,volume=0.12,adelay=38[whisper];[main][whisper]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-18:TP=-2:LRA=8[out]" \
    -map "[out]" -ar 44100 -ac 1 -c:a pcm_s16le "$FINAL/$name.wav"
done

for name in 12-contempt-expose 13-contempt-invite; do
  "$FFMPEG" -y -v error -i "$WAV/$name.wav" \
    -af "asetrate=39249,aresample=44100,atempo=1.08,volume=0.94,loudnorm=I=-18.5:TP=-2:LRA=6" \
    -ar 44100 -ac 1 -c:a pcm_s16le "$FINAL/$name.wav"
done

node "$PROJECT_ROOT/scripts/generate-sound-bed.mjs"

for file in "$FINAL"/*.wav "$FINAL"/sfx/*.wav; do
  duration="$($FFPROBE -v error -show_entries format=duration -of default=nw=1:nk=1 "$file")"
  printf '%-34s %s\n' "${file:t}" "$duration"
done
