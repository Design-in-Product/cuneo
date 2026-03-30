# Wedgestock Cowork Session Transcript

**Session**: epic-happy-noether (Cowork, isolated sandbox)
**Account**: xian@designinproduct.com
**Date**: Undated (pre-migration, likely Feb–Mar 2026)
**Preserved**: 2026-03-29 by Janus during infrastructure audit

## Session Summary

First Cowork experiment. Built cuneiform learning tools alongside an Opus Chat tutor in the Wedgestock Claude Project. The session produced three artifacts and discovered significant Unicode accuracy issues (9/20 codepoints wrong in the initial quiz app, corrected during session).

## Artifacts Produced

1. **cuneiform-study.jsx** (21.8 KB) — Flashcard/quiz app with 20 signs, Unicode-audited
2. **cuneiform-evolution.html** (29.8 KB) — Sign evolution visualizer with SVG pictographs for 8 signs
3. **cuneiform-signs.json** (24.7 KB) — Canonical 51-sign data file verified against Unicode 16.0

## Key Findings

- Unicode cuneiform (U+12000 block) is treacherous for LLMs — signs with similar names have different codepoints (LU vs LU₂, NINDA vs NINDA2)
- 9 of 20 original quiz signs had wrong codepoints; all corrected against Unicode Character Database
- The published GitHub Pages reader (cuneo.dinp.xyz) had 49/51 correct, 2 ambiguous (KUŠ and ŠUM)
- Cowork sessions are isolated sandboxes — no cross-session persistence, no project access
- The transcript lives cloud-side only; output files were in the session's outputs/ folder

## Pedagogical Approach

- Conversational tutoring (Opus Chat in Wedgestock project) for understanding and context
- Interactive tools (Cowork) for drilling and retention
- GitHub repo as shared source of truth for verified sign data
- Goal: progressive learning from basic logograms → syllabograms → determinatives → reading real tablets

## Notable Quotes

- "Big sheep would be a very different kind of title" (on LU vs LU₂ in LUGAL)
- "The harder question is whether you want one consolidated app or whether the conversational tutoring + reference tool split is actually working for you pedagogically"
- "Each of us is a stateless helper... the Wedgestock project chat is the natural center of gravity"

---

## Full Transcript

If I wanted to have Claude teach me (gradually, patiently, in a pedagogically sound and fun way) to read cuneiform, do you recommend I engage in a long conversation with an Opus chat or use something like Cowork to make an "app" for me to use? I am aware that there is the Sumerian substrate and then the old Persian and Akkadian variations etc. and that there are thousands of symbols. I don't expect to get a Ph.D. or become a fluent reader but I'd like to start learning the basics in a self-directed, fun way.

**Claude:** Great question — and a fun one. Here's my honest take on the tradeoffs:

A long conversation with Opus is fantastic for the tutoring dimension: Socratic back-and-forth, adapting to your pace, answering "why does this sign look like a duck?" tangents, and building on what you've already absorbed. Claude can introduce signs gradually, quiz you, tell you the fun etymological stories (like how the sign for "barley" evolved into an abstract wedge pattern), and adjust when you're confused. The downside is that conversations are ephemeral — once they get long enough, earlier context fades, and you can't easily "pick up where you left off" across sessions.

Cowork building you an app plays to different strengths. I could create an interactive HTML or React tool with things like a visual sign gallery you can browse, spaced-repetition flashcard drilling, progressive lessons (start with logograms, then syllabic values, then simple phrases), and maybe even a "draw the wedges" exercise. That artifact persists — you can come back to it tomorrow. The downside is it's less adaptive in the moment; it won't riff with you the way a live conversation does.

My recommendation: do both, in sequence. Start with a conversation to get oriented — have Opus walk you through the basics of how cuneiform works (the difference between logograms and syllabograms, why the same sign can have multiple readings, how Sumerian and Akkadian use the script differently). That conceptual foundation is where conversational tutoring really shines. Then, once you have a mental model, come back here and I'll build you a study app with flashcards, a sign reference, and progressive quizzes so you can drill and retain what you've learned at your own pace.

For scope, a reasonable starting goal would be learning the ~30-40 most common Sumerian logograms and syllabic signs — enough to start recognizing words in transliterated texts and maybe puzzle through a simple royal inscription. That's achievable and satisfying without being overwhelming.

Want me to build you that learning app now, or would you rather start with the conversational lesson first (in which case I'd suggest opening a new Opus chat for that)?

---

**xian:** How about this? Please write me a prompt for that Opus chat _and_ while I'm having it whip me up a yolo / doesn't have to be production-ready proof of concept of the study app. One thing I worry is that chats are pretty textual and less good at conveying imagery or shapes. Though at least there are probably UTC ways to render the cuneiform characters?

**Claude:** Good call on Unicode — the Cuneiform block (U+12000–U+1254F) renders actual signs right in the browser. Let me write you the prompt and build the app simultaneously.

Here's your prompt for the Opus conversation:

> I want you to be my patient, enthusiastic cuneiform tutor. I'm a complete beginner but intellectually curious — I know there are Sumerian, Akkadian, and Old Persian traditions and that the system has thousands of signs, but I'm starting from zero.
>
> Start with the big picture: Give me a 5-minute overview of cuneiform as a writing system — how it evolved from pictographs pressed into clay to abstract wedge marks, how it served multiple unrelated languages, and why that matters for reading it. Use Unicode cuneiform characters (U+12000 block) so I can see actual signs inline.
>
> Then teach me signs gradually. Start with 5–8 of the most visually distinctive and common Sumerian logograms. For each one, show me the Unicode character, tell me its Sumerian reading and meaning, explain what the original pictograph depicted, and give me a mnemonic or visual hook. I want to build intuition, not just memorize.
>
> Quiz me after each batch — make it feel like a game. Mix recognition ("what does 𒀭 mean?") with guessing games ("look at this sign's shape — what do you think it originally depicted?"). Don't move on until I'm solid.
>
> Build progressively: After core logograms, introduce syllabograms, then determinatives, then polyvalence (same sign, multiple readings). Go slow — I'll say when I'm ready.
>
> Keep it fun: Weave in stories — the world's oldest complaint letter, what scribe school was like, how Rawlinson dangled off a cliff at Behistun to copy inscriptions, what makes a given sign's evolution surprising or beautiful.
>
> I have a separate flashcard app for drilling, so focus our conversation on understanding and context rather than rote memorization. Teach me to think like a reader, not a decoder.
>
> Let's begin!

[Claude then built the study app, audited Unicode codepoints, built the evolution visualizer, and audited the published GitHub Pages site. See artifacts above for details.]

---

**xian:** ok so i've been doing the conversational learning thing for a bit and also we made a sort of html reference for me to study. I can share the latest version with you. I did notice that Opus was grabbing the wrong unicode symbols sometimes! Very confusing. We are now auditing everything but whew.

Also, while I understand that how the signs evolved is sort of a meta-thing if I'm just trying to learn to read the most common signs, but I find myself really wanting to understand how much we know about the intermediate forms from pure pictorial symbols to the abstracted wedges (it's so similar to chinese it's sort of amazing, imho, and it's not such a different path from hieroglyphics to early semitic scripts to our alphabet).

**Claude:** You're absolutely right to flag the Unicode accuracy issue — and yes, I should audit mine too. Cuneiform Unicode is treacherous because the standard uses its own naming scheme that doesn't always map neatly to the Sumerological names we use.

[Unicode audit found 9/20 wrong codepoints. All corrected. Evolution visualizer built for 8 signs showing pictograph → wedge progression.]

---

**xian:** hmm, your Lu is different from what the chat showed me. What is Lu supposed to be shaped like?

**Claude:** There are two distinct signs here:

- 𒇻 (U+121FB) = LU — this is a different sign, used as a syllabic value and for some other readings
- 𒇽 (U+121FD) = LU₂ — this is the standard logogram for "man, person" in Sumerian

The subscript ₂ matters a lot in cuneiform. LU and LU₂ are different signs with different shapes and different meanings.

**xian:** Yes, it showed LU (the square with a small + inside it). So it's just a syllabic? LU2 makes more sense in Lugal now!

**Claude:** Exactly right. LUGAL = LU₂ + GAL ("big person" = king) only works if you're starting from the "person" sign, not the "sheep" one. "Big sheep" would be a very different kind of title.

---

[Session continued with site audit (49/51 correct, 2 ambiguous), consolidation discussion, and canonical JSON creation. Session ended with infrastructure audit for account migration.]
