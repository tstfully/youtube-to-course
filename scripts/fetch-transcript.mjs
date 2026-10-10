#!/usr/bin/env node
// Fetch a YouTube transcript from YouTubeTranscript.dev and print it as JSON.
//
// Usage:
//   YOUTUBETRANSCRIPT_API_KEY=... node scripts/fetch-transcript.mjs <youtube-url-or-id> [language]
//
// Output (stdout):
//   { "video_id", "title", "language", "segments": [{ "start", "text" }], "text" }
//
// Requires Node 18+ (built-in fetch). No dependencies.

// Call the www host directly: the apex domain redirects, and fetch drops the
// Authorization header on cross-origin redirects.
const API_URL = "https://www.youtubetranscript.dev/api/v2/transcribe";

const [, , video, language] = process.argv;
const apiKey = process.env.YOUTUBETRANSCRIPT_API_KEY;

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!video) {
  fail("Usage: node scripts/fetch-transcript.mjs <youtube-url-or-id> [language]");
}
if (!apiKey) {
  fail(
    "Missing YOUTUBETRANSCRIPT_API_KEY.\n" +
      "Get a free key at https://youtubetranscript.dev (Dashboard → API Keys),\n" +
      "then set it as an environment variable. Do not paste it into a chat."
  );
}

const body = { video, format: "timestamp" };
if (language) body.language = language;

const res = await fetch(API_URL, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

let payload;
try {
  payload = await res.json();
} catch {
  fail(`YouTubeTranscript.dev returned HTTP ${res.status} with a non-JSON body.`);
}

if (!res.ok) {
  const err = payload?.error;
  const msg =
    payload?.message ??
    (typeof err === "string" ? err : err?.message) ??
    JSON.stringify(payload);
  fail(`YouTubeTranscript.dev error (HTTP ${res.status}): ${msg}`);
}

const data = payload?.data ?? payload;

if (data?.status && data.status !== "completed") {
  fail(
    `Transcript not ready (status: ${data.status}).\n` +
      "If the video has no captions, it needs AI audio transcription, which costs extra credits.\n" +
      "Confirm with the user before requesting it, or paste a transcript instead."
  );
}

const rawSegments = Array.isArray(data?.transcript)
  ? data.transcript
  : Array.isArray(data?.segments)
    ? data.segments
    : [];

const segments = rawSegments
  .map((s) => ({
    start: Math.floor(Number(s.start ?? s.offset ?? 0)),
    text: String(s.text ?? "").replace(/\s+/g, " ").trim(),
  }))
  .filter((s) => s.text);

const text =
  typeof data?.text === "string" && data.text
    ? data.text
    : segments.map((s) => s.text).join(" ");

if (!text) {
  fail("No transcript text returned for this video.");
}

// Fall back to the ID in the URL the user passed if the API doesn't echo it.
function videoIdFrom(input) {
  const m = String(input).match(/(?:v=|youtu\.be\/|shorts\/|embed\/|live\/)([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  return /^[A-Za-z0-9_-]{11}$/.test(input) ? input : null;
}

const out = {
  video_id: data?.video_id ?? data?.videoId ?? videoIdFrom(video),
  title: data?.video_title ?? data?.title ?? null,
  language: data?.language ?? language ?? null,
  segments,
  text,
};

process.stdout.write(JSON.stringify(out, null, 2) + "\n");
