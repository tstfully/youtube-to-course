# YouTube to Course

**Turn any YouTube video into an interactive course in one prompt.**

A free, open-source skill for Claude Code (and other AI coding agents). Paste a YouTube link, such as a lecture, tutorial, podcast, or conference talk, and get back a beautiful interactive course with modules, quizzes, flashcards, and plain-English explanations. It's one HTML file that works in any browser.

Learn a 1-hour video in 20 minutes, and actually remember it.

---

## What you get

- **4–6 bite-sized modules** that follow the video's logic, not just its running order
- **Metaphor + reality blocks.** Every concept starts with an everyday comparison, then shows what the speaker actually said
- **Scenario quizzes** that test whether you can *apply* the idea, not whether you memorized a detail
- **Flashcards** that flip on tap, for quick review
- **Glossary tooltips.** Hover or tap any jargon for a plain-English definition
- **Timestamp links.** Every quote and key claim jumps to that second of the video
- **Progress tracking.** A progress bar, module dots, a final quiz score, and "I can now…" checklists, saved on your device
- **Light and dark mode**, mobile-friendly, and printable

## Who it's for

- **Students** turning lectures into study guides
- **Self-learners** working through long tutorials and podcasts
- **Teachers and trainers** building lessons from YouTube content
- **Teams** turning a conference talk into onboarding material
- **Language learners** studying content in the original language

## Install with your coding agent

You don't need to use the command line. Send this to Claude Code (or your coding agent):

> Install the youtube-to-course skill from https://github.com/tstfully/youtube-to-course into my Claude skills folder (`~/.claude/skills/youtube-to-course`). Then help me connect a free YouTubeTranscript.dev API key, without me pasting the key into this chat.

### Or install manually

```bash
git clone https://github.com/tstfully/youtube-to-course ~/.claude/skills/youtube-to-course
```

## Connect transcripts (free)

The skill reads the video's transcript, so it needs a transcript source. Pick one.

**Option 1: MCP server (recommended for Claude Code, Claude Desktop, Cursor)**

```bash
claude mcp add --transport http youtubetranscript https://mcp.youtubetranscript.dev --header "x-api-token: YOUR_API_KEY"
```

**Option 2: Environment variable.** Set `YOUTUBETRANSCRIPT_API_KEY` to your key. The skill's built-in script (`scripts/fetch-transcript.mjs`, no dependencies) uses it.

Get your key free at [youtubetranscript.dev](https://youtubetranscript.dev) under **Dashboard → API Keys**. The free plan includes 10 credits a month and needs no card. Most videos cost 1 credit. Videos without captions can be transcribed from the audio too.

> 🔒 Never paste an API key into an AI chat, a screenshot, or a public file. Type it directly into your terminal or settings.

**Option 3: Paste a transcript.** Already have one? Paste it in and no key is needed. Without timestamps, the course won't link back to the video.

## Use it

Just ask:

- *"Turn this video into a course: https://youtube.com/watch?v=…"*
- *"Make a beginner course from this lecture, I have an exam Friday"*
- *"Teach me this podcast episode, with lots of quizzes"*
- *"Course from these three videos: …"*

### Taking the course

Open the HTML file in any browser and scroll. Press **n** / **p** to jump between modules. Your quiz answers and checklists are saved on your device, so you can come back later.

## How it works

```
YouTube URL(s)
   │
   ▼
Transcript (YouTubeTranscript.dev: captions in 100+ languages, AI transcription when there are none)
   │
   ▼
Your AI agent reads the full transcript → maps concepts, steps, examples, warnings, jargon
   │
   ▼
Designs outcomes and 4–6 modules → writes metaphors, quizzes, flashcards
   │
   ▼
Fills a pre-built template → one self-contained HTML course
```

## Repo structure

```
youtube-to-course/
├── SKILL.md                      # Instructions the AI agent follows
├── assets/template.html          # Course template with all CSS + JS built in
├── references/
│   ├── course-design.md          # Teaching principles: outcomes, modules, quizzes
│   └── components.md             # Every building block as copy-ready HTML
└── scripts/fetch-transcript.mjs  # Zero-dependency transcript fetcher
```

## Companion skills

- [youtube-to-case-study](https://github.com/tstfully/youtube-to-case-study): turn a video into a business, marketing, or UX case-study slideshow
- [youtube-to-ai-chat](https://github.com/tstfully/youtube-to-ai-chat): chat with any YouTube video, with answers cited to the second

## Built on YouTubeTranscript.dev

- [Free online tools](https://www.youtubetranscript.dev/tools): transcripts, summaries, chapters, and more, no login required
- [YouTube Transcript API](https://github.com/Youtube-Transcript-Dev/Youtube-Transcript-API), the [MCP server](https://github.com/Youtube-Transcript-Dev/youtube-transcript-mcp), and SDKs for [Node.js](https://github.com/Youtube-Transcript-Dev/youtube-transcript-sdk) and [Python](https://github.com/Youtube-Transcript-Dev/youtube-transcript-python-sdk)

## License

MIT. Use it, fork it, and build on it.
