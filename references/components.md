# Components

> **When to read this:** Step 4, while writing modules. Use only these patterns. `assets/template.html` already contains all the CSS and JavaScript for them, so never add `<style>` or `<script>` blocks.

Timestamp links always look like this (replace `VIDEO_ID` and the seconds):

```html
<a class="ts" href="https://www.youtube.com/watch?v=VIDEO_ID&t=754s" target="_blank" rel="noopener">12:34</a>
```

---

## Module shell

Every module is a `<section class="module">`. Paste modules where the template says `MODULES GO HERE`.

```html
<section class="module" id="module-1">
  <div class="wrap">
    <p class="module-num">01</p>
    <h2>What a compound interest curve actually looks like</h2>
    <p class="why">Most people quit investing in year 3, right before the curve bends.</p>

    <div class="screen"> … one idea … </div>
    <div class="screen"> … one idea … </div>

    <div class="module-next"><a class="next-btn" href="#module-2">Next: Module 2 →</a></div>
  </div>
</section>
```

The last module's next button links to `#finish`.

## Lead paragraph

```html
<div class="screen">
  <p class="lead">Two or three sentences, max. If you need a fourth, use a visual instead.</p>
</div>
```

## Concept + metaphor (the core teaching block)

Left: an everyday metaphor. Right: what the video actually says.

```html
<div class="screen">
  <h3>Compounding</h3>
  <div class="concept">
    <div class="metaphor"><span class="label">Think of it like</span><p>A snowball rolling downhill: it picks up more snow because it's already big.</p></div>
    <div class="reality"><span class="label">In the video</span><p>Returns earn their own returns, so growth speeds up over time. <a class="ts" href="…&t=212s" target="_blank" rel="noopener">3:32</a></p></div>
  </div>
</div>
```

## Key moment (quote)

```html
<div class="screen">
  <div class="moment">
    <blockquote>The first $100,000 is the hardest. After that, the money starts doing the work.</blockquote>
    <p class="who">Speaker name <a class="ts" href="…&t=845s" target="_blank" rel="noopener">14:05</a></p>
  </div>
</div>
```

## Cards (3–5 related ideas)

```html
<div class="screen">
  <div class="cards">
    <div class="card"><span class="icon">⏳</span><h3>Time</h3><p>Starting 10 years earlier beats saving twice as much.</p></div>
    <div class="card"><span class="icon">📈</span><h3>Rate</h3><p>Small differences in return compound into huge gaps.</p></div>
    <div class="card"><span class="icon">🔁</span><h3>Consistency</h3><p>Monthly contributions smooth out bad years.</p></div>
  </div>
</div>
```

## Steps (process, sequence, how-to)

```html
<div class="screen">
  <ol class="steps">
    <li><div><strong>Open an index fund account</strong><span>Any low-fee broker works <a class="ts" href="…&t=402s" target="_blank" rel="noopener">6:42</a></span></div></li>
    <li><div><strong>Automate a monthly transfer</strong><span>Set it on payday so you never see the money</span></div></li>
    <li><div><strong>Don't touch it for 10 years</strong><span>The video's one hard rule</span></div></li>
  </ol>
</div>
```

## Compare (myth vs reality, before vs after, wrong vs right)

```html
<div class="screen">
  <div class="compare">
    <div class="left"><span class="label">Common belief</span><p>You need a lot of money to start investing.</p></div>
    <div class="right"><span class="label">What the video shows</span><p>$50 a month from age 25 beats $200 a month from age 40.</p></div>
  </div>
</div>
```

Change the labels to fit: "Before / After", "Myth / Reality", "Beginner / Expert".

## Callouts

```html
<div class="screen"><p class="callout tip">A practical tip in one or two sentences.</p></div>
<div class="screen"><p class="callout warn">A common mistake the video warns about.</p></div>
```

## Glossary term (hover or tap for a definition)

Wrap the first use of every piece of jargon:

```html
<span class="term" data-def="A fund that buys every stock in an index, like the S&P 500, so you own a tiny slice of all of them.">index fund</span>
```

Keep definitions under 30 words and in plain English.

## Quiz (multiple choice, scenario-based)

Mark the right answer with `data-correct`. The template grades it, shows the explanation, remembers the answer, and adds it to the final score.

```html
<div class="screen">
  <div class="quiz">
    <p class="q-label">Quick check</p>
    <h3>Your friend is 35 and says it's too late to start. Based on the video, what's the best reply?</h3>
    <div class="options">
      <button class="opt">Wait until you have a bigger lump sum</button>
      <button class="opt" data-correct>Start small now; 30 years is still plenty of compounding time</button>
      <button class="opt">Pick individual stocks to catch up faster</button>
    </div>
    <p class="explain">The video's chart at <a class="ts" href="…&t=530s" target="_blank" rel="noopener">8:50</a> shows that starting at 35 still roughly triples contributions by 65.</p>
  </div>
</div>
```

## Flashcards (end of module or course)

```html
<div class="screen">
  <h3>Flashcards</h3>
  <div class="flashcards">
    <button class="flashcard"><span class="inner"><span class="face front">What makes compounding speed up?</span><span class="face back">Returns earn their own returns, so the base keeps growing.</span></span></button>
    <button class="flashcard"><span class="inner"><span class="face front">The video's one hard rule?</span><span class="face back">Don't touch the money for at least 10 years.</span></span></button>
  </div>
</div>
```

## Recap checklist (end of each module)

Learners tick what they can now do. Their ticks are remembered on their device.

```html
<div class="screen">
  <div class="recap">
    <h3>I can now…</h3>
    <label><input type="checkbox"> Explain compounding with the snowball example</label>
    <label><input type="checkbox"> Say why starting early beats saving more</label>
  </div>
</div>
```
