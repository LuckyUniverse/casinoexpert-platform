# The Eggspert — Mascot & Gamification Brief

> Site mascot for casinoexpert.ai. A casino-chip-shaped-as-an-egg character that progresses through 4 phases as the visitor takes engagement actions on the site. The payoff is the egg cracking open and cash spilling out.

---

## 1. Character identity

**Name:** The Eggspert *(or just "Eggspert" — no article)*
**One-line pitch:** A casino chip with the soul of an egg and the smarts of an expert.
**Personality:** Friendly, knowledgeable, mildly cheeky. Smiles with eyes. Not slapstick — more "mascot of a curated brand" than "Saturday-morning cartoon."
**Voice:** Confident, dry, encouraging. Says things like "Let's crack this." not "WOWZA!"
**Reference temperature:** Duolingo owl > MailChimp Freddie > generic casino mascot.

## 2. Anatomy (universal across all 4 phases)

The body **is** the casino chip — viewed from the front, the chip silhouette is an oval (egg-shaped) rather than a perfect circle. This single design choice is what makes the mascot distinct from every other anthropomorphic chip mascot.

- **Body / chip silhouette:** vertical oval. Roughly 1.4:1 aspect ratio (taller than wide).
- **Chip markings:** classic casino-chip edge stripes (3 visible) running around the perimeter. Center face inset, slightly raised, where the face sits.
- **Face:** large rounded eyes (white sclera + dark iris with a tiny highlight), small simple mouth that can stretch. No nose, or a tiny dot. Cheeks pick up a small blush in higher phases.
- **Arms:** thin rubber-hose limbs (think Mickey Mouse / vintage cartoon) ending in white-gloved 4-finger hands. Articulated for gesture.
- **Legs:** same rubber-hose style, ending in simple shoes (chunky cartoon style — not realistic).
- **Proportions:** chibi-ish. Head/body is roughly 2/3 of total height; limbs are short.

## 3. Palette

Primary chip color anchors the whole brand. Pick ONE and lock it (do not mix).

- **Recommended:** Deep navy (`#0b1530`) chip body with bright cyan accent stripes (`#7dd3fc`) — matches the current holding page palette.
- **Alt 1 (warmer):** Burgundy chip (`#7a1f2b`) with gold stripes (`#e6b35a`) — more "classic Vegas."
- **Alt 2 (premium):** Charcoal chip (`#1a1a1a`) with platinum stripes (`#c8c8c8`) — more "high-roller / serious."

**Face/skin (the part visible in the inset):** soft warm cream (`#f5e6c8`) — readable on any chip color, hints at "egg" without being literal.
**Cash (phase 4):** gold coins (`#f1c34a`) + green bills (`#3e8e5a`) with white highlights. Dollar signs prominent.

## 4. The four phases

Each phase is a complete pose-able illustration, not just a "damage state." The Eggspert reacts emotionally to its own transformation — that's what sells it.

### Phase 1 — Whole

- **Body:** pristine oval chip. Stripes uninterrupted. No cracks.
- **Pose:** standing confidently, one hand on hip, the other gesturing welcome (open palm).
- **Expression:** bright eyes, small confident smile.
- **Vibe:** "Hi, I'm your guide." Onboarding state.

### Phase 2 — First crack

- **Body:** one diagonal hairline crack across the top-left of the chip, breaking one of the stripes. Cracks should look like fine pottery cracks, not gunshot fractures.
- **Pose:** Eggspert noticing the crack — head tilted, one hand pointing at the crack near its own shoulder.
- **Expression:** mild surprise + amusement. Eyebrow raise. Half-smile.
- **Vibe:** "Hm, interesting." Player is engaging.

### Phase 3 — Spider-webbed

- **Body:** the original crack has branched. 4–6 cracks now visible, web-like, covering ~40% of the chip's surface. Stripes are broken in 2–3 places. A faint warm glow leaks from one of the larger cracks (foreshadow).
- **Pose:** Eggspert is leaning forward slightly, both arms out in a "wait for it…" gesture. Slightly braced.
- **Expression:** wide eyes, big grin, anticipation. Cheeks blushing now.
- **Vibe:** "Something good is about to happen."

### Phase 4 — Crack open (the payoff)

- **Body:** the chip has split horizontally across the middle. Top half tilted back like an opening lid; bottom half intact. From the opening, a fountain of **cash** erupts upward — gold coins (with $ stamped on them), folded dollar bills, all radiating outward and falling.
- **Pose:** Eggspert is mid-celebration — arms thrown wide, head back, jaw dropped open in a delighted "AHHH!"
- **Expression:** elated, eyes closed in joy or wide-open star-shaped, mouth in a big open smile.
- **Vibe:** payoff moment. The shareable / screenshot-able frame.

**Important:** in phase 4 the *character is unbroken* — the chip cracked, but Eggspert is fine and thrilled. Read it as "victory" not "destruction." (If you were to draw a stunned/dazed/sad Eggspert in phase 4, that's the wrong read.)

## 5. Do's and Don'ts

| Do                                                          | Don't                                                                  |
| ----------------------------------------------------------- | ---------------------------------------------------------------------- |
| Keep the chip oval — vertical orientation                   | Make it a true circle (loses the egg DNA)                              |
| Use rubber-hose limbs in cartoon style                      | Use realistic anatomy                                                  |
| Let cracks feel like deliberate progression                 | Make cracks look like impact damage / shattering                       |
| Show cash spilling *up and outward* in phase 4              | Show Eggspert "leaking" — keep it as a fountain, not a wound           |
| Keep the palette locked across all 4 phases                 | Change chip color between phases                                       |
| Use one consistent line weight / illustration style         | Mix flat-color and shaded illustration approaches across phases        |
| Express progression through *expression and pose changes*   | Just show the same pose with more cracks — that reads as wear & tear   |

## 6. AI image-generation prompts

Use the **same seed / character reference** across all 4 phases for visual consistency. Midjourney's `--cref` (character reference) is the best tool for this — generate phase 1 first, then use its URL as `--cref` for phases 2/3/4. Same for DALL·E (use the gen-id of phase 1 as a reference) and Imagen (use the same seed).

### Anchor prompt (shared style block — paste at the START of every phase prompt)

```
A friendly cartoon casino mascot character: an oval-shaped casino chip with a face, small arms with white gloves, and short rubber-hose legs with chunky cartoon shoes. The chip body is deep navy (#0b1530) with three bright cyan (#7dd3fc) edge stripes around its perimeter. A cream-colored circular face inset is in the center of the chip showing large expressive cartoon eyes and a small mouth. Clean vector illustration style, flat colors, subtle cel shading, thick consistent outlines, white background, centered character, full body visible, soft drop shadow on the floor.
```

### Phase 1 — Whole

```
[ANCHOR PROMPT] Phase 1: the chip body is whole and pristine, no cracks anywhere, stripes uninterrupted. The mascot stands confidently with one hand on hip and the other open in a welcoming gesture. Bright confident smile, friendly eyes looking at the viewer. Mood: introduction, welcoming.
```

### Phase 2 — First crack

```
[ANCHOR PROMPT] Phase 2: a single fine diagonal hairline crack runs across the upper-left of the chip body, breaking one cyan stripe. The mascot is looking at its own shoulder, head tilted, pointing at the crack with one hand. Mild surprised-but-amused expression, one eyebrow raised, half-smile. Mood: "Hm, what's this?"
```

### Phase 3 — Spider-webbed cracks

```
[ANCHOR PROMPT] Phase 3: spider-web cracks now cover roughly 40% of the chip body — five branching cracks radiating from the original crack point, breaking multiple stripes. A faint warm gold glow leaks subtly from one of the larger cracks. The mascot leans forward with both arms outstretched in a "wait for it" gesture, wide grin, big anticipating eyes, cheeks blushing pink. Mood: building excitement.
```

### Phase 4 — Cracks open, cash spills out

```
[ANCHOR PROMPT] Phase 4: the chip has split horizontally across the middle. The top half is tilted back like the lid of a treasure chest, the bottom half stays in place. A spectacular fountain of cash erupts upward from the opening — gold coins stamped with dollar signs ($) and folded green dollar bills bursting upward and outward in all directions, with sparkles and motion lines. The mascot's arms are thrown wide in celebration, head tilted back, mouth open in a big delighted laugh, eyes shut in joy. Mood: triumphant payoff. The character is unharmed and ecstatic — this is celebration, not destruction.
```

### Production tips

- **Generate phase 1 first.** Iterate until you love it. THEN use it as the character reference for phases 2/3/4.
- **Lock the camera.** Same framing, same body angle, same height-in-frame across all 4. Otherwise the progression won't read.
- **Aspect ratio:** square (`--ar 1:1`) for asset use. Generate transparent-background variants too if your tool supports it (for overlay use).
- **Output sizes to deliver:** 1024×1024 master, 512×512 retina, 256×256 standard, 128×128 favicon-adjacent.

## 7. Progression — what moves the Eggspert forward

The mechanic itself is implemented in `components/eggspert/`. Default mapping:

| Action                              | Points |
| ----------------------------------- | -----: |
| Visit 3 different pages             |      1 |
| Ask a question to the AI/chat       |      2 |
| Subscribe to the email list         |      3 |
| Click out to a recommended operator |      3 |
| Complete an onboarding quiz         |      4 |

**Phase thresholds (out of 10):** Phase 1 = 0, Phase 2 = 3, Phase 3 = 6, Phase 4 = 10.

(Numbers are tunable — defined in `lib/eggspert-config.ts`. Adjust based on whatever feels "earnable in one session" vs "across a few visits.")

## 8. Where it lives in the UI

- **Persistent:** fixed bottom-right corner of every page (above mobile menu, below modals). About 80px square at default size, scales down on mobile.
- **State transitions:** when an action triggers a phase advance, the avatar plays a 1.2s celebration animation (small bounce + glow pulse) and the new phase swaps in.
- **Phase 4 special:** plays a longer ~2.5s "burst" animation and unlocks a one-time celebration toast. After viewing once, the Eggspert resets to phase 1 OR stays at phase 4 as a "completed" badge — both behaviors are toggleable.
- **Click behavior:** clicking the Eggspert opens a small popover showing the user's progress, the actions available to advance, and a tease of the next phase ("One more step to crack me open…").

## 9. What's already built (placeholder version)

- React component: `<Eggspert />` with all 4 phases as inline SVG placeholders (so the gamification works *now*, before final art lands).
- Progression hook: `useEggspertProgress()` — localStorage-backed, exposes `progress`, `phase`, `addPoints(action)`.
- Demo route: `/eggspert-demo` — shows all 4 phases side-by-side and a button to step through them.
- Config: `lib/eggspert-config.ts` — single source of truth for thresholds, point values, animation timings.

When final art is ready, swap the SVG bodies in `components/eggspert/phases/Phase1.tsx` through `Phase4.tsx` — interface is identical, no other code needs to change.
