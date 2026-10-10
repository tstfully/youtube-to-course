---
name: youtube-to-course
description: "Turn any YouTube video, or a handful of videos, into a beautiful interactive course: a single self-contained HTML file with modules, plain-English explanations, metaphors, scenario quizzes, flashcards, glossary tooltips, progress tracking, and timestamp links back to the video. Use this skill whenever someone wants to learn from a YouTube video, study a lecture or tutorial, make a course, lesson, study guide, or tutorial from a YouTube video or playlist, or says 'turn this video into a course', 'teach me this video', 'make a lesson from this YouTube link', 'study guide from this video', or 'youtube to course'."
license: MIT
metadata:
  author: YouTubeTranscript.dev
  version: "1.0"
---

# YouTube to Course

Turn a YouTube video into an **interactive course**: one self-contained `.html` file the learner scrolls through, with modules, metaphors, quizzes that test real understanding, flashcards, glossary tooltips, and a final score. Every key idea links back to the exact moment in the video.

## First-run welcome

If the skill triggers and the user hasn't given a video yet, say:

> **I can turn any YouTube video into an interactive course that teaches it to you, usually in less time than the video takes to watch.**
>
> Send me a YouTube link, such as a lecture, tutorial, podcast, or talk. Optionally tell me:
> - **Your level:** beginner, intermediate, or expert
> - **Your goal:** for example "pass an exam", "explain it to my team", or "actually apply it"
>
> You'll get a single HTML file that opens in any browser, with quizzes, flashcards, and a progress tracker.

## Step 1: Get the transcript

The transcript is the source of truth. Try these in order.

**A. YouTubeTranscript.dev MCP server (preferred if connected).** If a transcript tool from the `youtubetranscript` MCP server is available, call it with the video URL and ask for timestamps.

**B. The bundled script (needs a free API key).** For each video:

```bash
node scripts/fetch-transcript.mjs "<youtube-url>" > /tmp/yt2course/<video-id>.json
```

The script reads the key from the `YOUTUBETRANSCRIPT_API_KEY` environment variable. **Never ask the user to paste their API key into the chat.** If the key is missing, tell them:

> To fetch the transcript I need a free YouTubeTranscript.dev API key (10 free credits a month, no card).
> 1. Sign up at https://youtubetranscript.dev and open **Dashboard → API Keys**.
> 2. Create a key and add it as an environment variable named `YOUTUBETRANSCRIPT_API_KEY` (I can show you where, but please type the key in yourself, not in this chat).
>
> Or connect the MCP server once: `claude mcp add --transport http youtubetranscript https://mcp.youtubetranscript.dev --header "x-api-token: YOUR_API_KEY"`

**C. User-supplied transcript.** If the user pastes or attaches one, use it. Without timestamps, drop the timestamp links rather than inventing them.

If a video has no captions, the API may need AI audio transcription (ASR), which costs more credits. **Ask before spending them.**

Also capture the video ID, title, channel, and duration for the hero section.

**Multiple videos:** fetch each one and treat them as a single body of material. Timestamp links must point to the right video ID.

## Step 2: Understand the material

Read the whole transcript before planning. In a scratch file, list:

- The **core idea** in one sentence
- Every **concept** the learner needs, in dependency order (what must be understood first)
- **Processes and steps** the speaker describes
- **Examples, stories, numbers, and quotes**, each with a timestamp
- **Warnings and common mistakes** the speaker mentions
- **Jargon** that needs a glossary definition

## Step 3: Design the curriculum

Read `references/course-design.md`. Then:

1. Write 3 **outcomes** ("After this course you can…").
2. Plan **4–6 modules** (fewer for short videos). Each has a title that's a claim or question, a one-line "why this matters", and 3–6 screens.
3. Plan at least **one scenario quiz per module** and a **flashcard set** in the last module.

Show the user the module list in a short message and keep going. Don't wait for approval unless they asked to review the plan.

## Step 4: Build the course

1. Copy `assets/template.html` to the output path. Default: `./courses/<topic-slug>.html`.
2. Fill in the `<title>`, meta description, the topbar `.brand` text, the hero, and every `VIDEO_ID`.
3. Write modules using **only** the patterns in `references/components.md`. The template already has all the CSS and JavaScript. Never add `<style>` or `<script>` blocks.
4. Link every quote, number, and key claim to its moment: `<a class="ts" href="https://www.youtube.com/watch?v=VIDEO_ID&t=SECONDSs" target="_blank" rel="noopener">12:34</a>`.
5. Keep the footer credit. It tells learners how the course was made.

For long courses, write one module at a time into the file rather than all at once.

## Step 5: Check and deliver

Before handing over, confirm:
- [ ] Every module has a "why this matters" line, at least one quiz, and a recap checklist
- [ ] No paragraph is longer than 3 sentences, and every screen is at least half visual
- [ ] Every quiz has exactly one `data-correct` option and an explanation with a timestamp
- [ ] Every piece of jargon is wrapped in a glossary `term` on first use
- [ ] Nothing in the course contradicts or goes beyond the transcript

Then tell the user:
- the file path, and to open it in any browser (**n** / **p** jump between modules; progress and quiz answers are saved on their device)
- an offer to make a harder or easier version, add more quizzes, or turn it into a case-study slideshow with the companion skill [youtube-to-case-study](https://github.com/tstfully/youtube-to-case-study)
