# MemeVend Arcade

A beginner-friendly HTML, CSS and JavaScript web toy.

## What does it do?

The website has three mini-games. The player earns coins from the games and uses those coins in a virtual vending machine to generate a random meme. The player can then rate the meme.

## Technologies

- HTML - creates the structure of the page
- CSS - controls the design, layout and animations
- JavaScript - controls games, coins, the vending machine and ratings

## JavaScript concepts used

The project intentionally uses beginner concepts:

- variables
- arrays
- functions
- `if` statements
- `forEach`
- event listeners
- DOM manipulation
- `setInterval`
- `setTimeout`
- `Math.random()`

## How the flow works

1. The player starts with 100 coins.
2. Mini-games reward coins.
3. A meme costs 20 coins.
4. The player chooses one or more ingredients.
5. The Emoji Lab can combine 2 or 3 emojis into a tiny story.
6. JavaScript randomly selects meme text and an emoji.
7. The player selects a 1-5 star rating.
8. The community average is updated.
9. A 4 or 5 star rating gives 5 bonus coins.

## Why we built it

The goal was not to make a complicated application. It was to make a small web toy with multiple interactions where the screen changes based on what the user does.

## Interview explanation

A simple explanation:

> "We separated the project into HTML, CSS and JavaScript. HTML handles the structure, CSS handles the visual design, and JavaScript handles the interactions. We used arrays for the game and meme data, functions for repeated actions like adding coins, and DOM manipulation to update the page without refreshing it."

## Important note

The "community score" is simulated locally for the demo. There is no backend or database in this beginner version.

Meme template images are hotlinked from Imgflip's public template library (not downloaded or re-hosted), since Reddit's own image host blocks hotlinking from other sites. If the images can't load, the meme still works fine with just the emoji and text captions.


## Our small unique feature: Emoji Lab

The Emoji Lab is inside the vending machine. The user selects emojis and presses
"MIX EMOJIS". The program checks the selected emojis against a few secret
combinations. If a combination is found, it displays a funny mini-story and
gives 3 bonus coins. Otherwise, it creates a simple adventure message.

This feature uses arrays, `slice()`, `map()`, `join()`, an object, and `if`
statements. It is simple enough to explain in a beginner interview.
