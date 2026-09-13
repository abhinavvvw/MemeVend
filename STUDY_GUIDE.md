# MemeVend Arcade — Study Guide (read this before the interview)

This explains **every piece** of the project in plain English. Read it once,
then try changing one small thing yourself (see "Try this" at the bottom) —
actually touching the code for five minutes will make you far more confident
than reading alone.

## 1. The three files, and why there are three

- **index.html** — the skeleton. Every button, heading, and container the
  page needs, with no styling or behavior.
- **style.css** — the paint job. Colors, fonts, spacing, animations.
- **script.js** — the brain. Listens for clicks, does math, changes what's
  on screen.

Browsers load them in that order: HTML first (so there's something to look
at), then CSS (so it looks right), then JS (so it can react to you).

## 2. The big picture flow

1. Page loads with `coins = 100`.
2. You play a game in the arcade cabinet → win coins.
3. You spend 20 coins in the vending machine to generate a random meme.
4. You rate the meme 1–5 stars → good ratings pay out a small coin bonus.

Everything on screen is driven by that one `coins` number and a handful of
arrays (lists) of possible content (meme phrases, emoji, slot symbols).

## 3. Core JavaScript ideas used, and exactly where

| Concept | What it means | Where it's used |
|---|---|---|
| **Variables** | A named box that holds a value | `let coins = 100;` |
| **Arrays** | An ordered list | `memeTemplates`, `ingredients`, `memorySymbols` |
| **Objects** | Named key → value pairs | `emojiStories`, `gamePanels` |
| **Functions** | A reusable block of steps | `addCoins()`, `spendCoins()`, `randomItem()` |
| **Event listeners** | "When this happens, run this" | `button.addEventListener("click", ...)` |
| **DOM manipulation** | Changing what's on screen from JS | `.textContent =`, `.classList.add()`, `document.createElement()` |
| **setInterval** | Repeat something every X milliseconds | game countdown timers, slot spin animation |
| **setTimeout** | Run something once, after a delay | flipping a wrong memory card back over |
| **Math.random()** | A random decimal between 0 and 1 | picking random meme text, random slot symbols, deciding whether a bomb appears |

If an interviewer points at any part of the code, it's almost certainly one
of these eight ideas.

## 4. Coins — the simplest part, understand this first

```js
function addCoins(amount) {
  coins += amount;
  updateCoins();
}

function spendCoins(amount) {
  if (coins < amount) {
    alert("Not enough coins!");
    return false;
  }
  coins -= amount;
  updateCoins();
  return true;
}
```

`addCoins` and `spendCoins` are the **only** two places that change the
`coins` number. Every game and the vending machine just calls one of these
two functions — nobody edits `coins` directly. That's a deliberate pattern:
one function "owns" a piece of data, everything else asks it politely.
`updateCoins()` just copies the number onto the screen (`textContent`).

## 5. The vending machine

- `ingredients` is an array of `[emoji, name]` pairs, e.g. `["🐸", "Frog"]`.
- Clicking an ingredient card adds or removes its **index number** (its
  position in the array, 0, 1, 2...) from `selectedIngredients`.
- Clicking "Vend meme" spends 20 coins, then picks one random object from
  `memeTemplates` (through `randomItem()`) — each object holds a real meme
  picture's URL plus its own small array of `{ top, bottom }` caption
  pairs written specifically for that picture. A second `randomItem()`
  call picks one of that template's caption pairs. Picking the captions
  *from inside* the chosen template — instead of two separate random
  arrays — is what makes the joke actually match the photo.
- That template's picture is set as an `<img>`'s `src`. Two small handlers
  make this safe: `img.onload` fades the picture in (adds a `visible`
  class), and `img.onerror` quietly hides it again if the image can't
  load (no internet, host blocked, etc.) so the meme still works with
  just the emoji and captions.
- The images are **hotlinked** from Imgflip's public template library
  (`i.imgflip.com/...`) rather than downloaded and stored in the project.
  That's deliberate: Reddit's own image host (`i.redd.it`) blocks
  hotlinking from other websites, but Imgflip's blank templates are the
  same base images that get reposted all over Reddit, and they're
  designed to be linked to directly.
- A random ingredient/emoji you picked (or a fallback from `memeEmojis`)
  shows as a small rotated sticker in the corner of the photo, instead of
  covering it, via `position:absolute` in the CSS.
- The Emoji Lab checks if your chosen emoji combo exists as a key in the
  `emojiStories` object (like a dictionary lookup) and shows a bonus story
  if it matches.

## 6. The rating panel

- Five star buttons, each with `data-rate="1"` through `"5"` in the HTML.
- Clicking one reads that number with `Number(button.dataset.rate)` and
  lights up every star at or below it.
- `totalScore` and `totalRatings` are running totals — the average shown
  is just `totalScore / totalRatings`, recalculated every time you vote.

## 7. The arcade cabinet (the trickiest part — focus here)

All three games live inside **one** cabinet. The tabs and the single
"START GAME" / "PULL LEVER" button are shared:

```js
let activeGame = "memory";

tabButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    activeGame = button.dataset.game;      // remember which game is picked
    // ...hide every panel except the one that matches activeGame
    cabAction.textContent = cabActionLabels[activeGame]; // relabel the button
  });
});

cabAction.addEventListener("click", function () {
  if (activeGame === "memory") startMemoryGame();
  else if (activeGame === "whack") startWhackRound();
  else if (activeGame === "slots") spinSlots();
});
```

This is an `if/else if` chain deciding which function to call based on a
variable — a very common beginner pattern for "one button, several modes."

### Memory Match

1. `memorySymbols` has 8 emoji. `deck = memorySymbols.concat(memorySymbols)`
   duplicates it into 16 (8 pairs).
2. `shuffleArray()` mixes the deck using a classic technique: loop from the
   end of the array to the start, and at each step swap the current card
   with a random earlier (or same) card. This is called a Fisher–Yates
   shuffle — you don't need the fancy name, just "loop backwards and swap
   with something random."
3. Each card is a button with two hidden/visible faces (`❓` and the emoji)
   controlled by CSS classes `flipped` / `matched`.
4. Clicking tracks `memoryFirstCard` and `memorySecondCard`. If their
   `data-symbol` matches, mark both `matched`. If not, `setTimeout` flips
   them back after 0.7 seconds so you have time to see them.
5. Fewer moves = more coins: `Math.max(10, 50 - memoryMoves * 2)`.

### Whack-a-Meme

1. 9 "holes" are created as buttons.
2. Every 550ms (`setInterval`), a random hole is picked and shown a critter
   (or a 20% chance bomb) for 700ms, then hidden again (`setTimeout`).
3. Clicking a hole while its critter is up scores a point; clicking a bomb
   subtracts 2.
4. A second `setInterval` counts the 15-second clock down. At 0, both
   intervals are stopped with `clearInterval()` and coins are paid out.

### Slot Spin

1. Clicking "Pull Lever" starts a fast `setInterval` (every 80ms) that
   keeps swapping each reel's emoji — that's the "spinning" look.
2. After 12 ticks (~1 second) it stops, picks final random symbols, and
   checks: all 3 the same → jackpot; exactly 2 the same → small win;
   otherwise nothing.

## 8. Likely interview questions and short answers

**"Walk me through what happens when I click a button."**
> The button has an event listener attached with `addEventListener`. When
> clicked, the function inside it runs — it might update a variable, change
> text on the screen, or start a timer.

**"What is the DOM?"**
> The Document Object Model — the browser's live, in-memory version of the
> HTML page that JavaScript can read and change without reloading the page.

**"Why do you use `let` instead of `const` for things like `coins`?"**
> `const` can't be reassigned. `coins` changes every time you earn or spend,
> so it has to be `let`.

**"What's the difference between `setInterval` and `setTimeout`?**
> `setTimeout` runs once after a delay. `setInterval` keeps repeating on a
> fixed delay until you call `clearInterval` on it. The whack-a-meme
> countdown uses `setInterval` (repeats every second); flipping a wrong
> memory card back uses `setTimeout` (happens once).

**"How do you stop the whack-a-meme timers from stacking up if I mash
start?"**
> `startWhackRound()` calls `cancelWhackRound()` first, which clears any
> existing intervals before starting new ones.

**"Why is this all vanilla JavaScript instead of a framework like React?"**
> The project only needed to react to clicks and update small pieces of
> text — plain DOM methods are enough, and it keeps everything readable in
> one file without a build step.

**Likely question: "Why hotlink the images instead of saving them in the
project?"**
> Fewer files to manage, and it always shows the current version of the
> template. The trade-off is it needs internet access to load — which is
> why there's an `onerror` fallback so the meme still works without one.

## 9. The retro/arcade visual pass (CSS only, no new JS)

A later pass made the page look more like an actual arcade cabinet. All of
it is CSS — no new JavaScript concepts, so it doesn't add anything new to
memorize, just a few more things you can point at:

- **"INSERT COIN" blink** (top right) — one `@keyframes` that flips
  `opacity` between 1 and 0 every half second (`coinBlink`), applied to a
  `<span>`. Nothing but CSS.
- **Scrolling ticker tape** (the thin strip above the cabinet screen) —
  the same sentence is written out **twice** in a row inside a flex
  container, and `@keyframes tickerScroll` slides that container from
  `translateX(0)` to `translateX(-50%)`. Since the text is duplicated, the
  moment the first copy scrolls fully offscreen the second copy is exactly
  in its place, so the loop looks seamless.
- **Neon glow pulse** on the logo and the hero title's highlighted word —
  an `@keyframes neonPulse` animates `text-shadow` between a soft glow and
  a brighter one.
- **CRT vignette** — every screen (cabinet, vending machine, meme canvas)
  already had scanlines from a `::before` pseudo-element; a `::after`
  pseudo-element was added with an inset `box-shadow` to darken the edges
  like a curved glass tube, plus a tiny `crtFlicker` keyframe so it isn't
  perfectly static.

**Likely question: "Why two pseudo-elements (`::before` and `::after`) on
the same screens?"**
> Each element can only have one `::before` and one `::after`, but you can
> use both at once. `::before` draws the scanlines, `::after` draws the
> dark vignette on top of them — layering two separate visual effects
> without adding extra `<div>`s to the HTML.

## 10. Try this before the interview

Pick one, actually do it, and you'll be able to say "I changed this myself":

- Change the meme cost from 20 to 15 coins (`spendCoins(20)` → `spendCoins(15)`,
  and update the button text in the HTML).
- Add a new caption pair to one of the templates in `memeTemplates` in `script.js`.
- Change the Memory Match grid from 8 pairs to 6 (edit `memorySymbols`).
- Change the whack-a-meme bomb chance from 20% to 30% (`Math.random() < 0.2`
  → `< 0.3`).

Small, safe edits like these are exactly the kind of thing an interviewer
might ask you to do live.
