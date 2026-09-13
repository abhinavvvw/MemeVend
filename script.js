// MEMEVEND ARCADE
// Beginner JavaScript version
// Main ideas used:
// 1. Variables store our game data.
// 2. Arrays store games, ingredients and meme text.
// 3. Functions repeat common actions.
// 4. Event listeners react to button clicks.
// 5. The DOM lets JavaScript change what is shown on the page.

// ---------------- COINS ----------------

let coins = 100;

function updateCoins() {
  document.getElementById("coins").textContent = coins;
}

function addCoins(amount) {
  coins += amount;
  updateCoins();
  flashWallet();
}

// Little glow pulse on the coin badge whenever coins come in.
function flashWallet() {
  const wallet = document.getElementById("walletBadge");
  wallet.classList.remove("flash");
  void wallet.offsetWidth;
  wallet.classList.add("flash");
  setTimeout(function () {
    wallet.classList.remove("flash");
  }, 500);
}

function spendCoins(amount) {
  if (coins < amount) {
    alert("Not enough coins! Play the arcade cabinet first.");
    return false;
  }

  coins -= amount;
  updateCoins();
  return true;
}

function randomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// ---------------- CONFETTI (slot jackpot + 5-star rating) ----------------

const confettiEmojis = ["🎉", "⭐", "🪙", "🔥", "😂"];

function launchConfetti() {
  const layer = document.getElementById("confettiLayer");

  for (let i = 0; i < 24; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = randomItem(confettiEmojis);
    piece.style.left = Math.random() * 100 + "%";
    piece.style.animationDuration = 1.4 + Math.random() * 1.2 + "s";
    piece.style.fontSize = 14 + Math.random() * 14 + "px";

    layer.appendChild(piece);

    setTimeout(function () {
      piece.remove();
    }, 3000);
  }
}

// ---------------- VENDING MACHINE ----------------

const ingredients = [
  ["😎", "Cool Guy"],
  ["🐸", "Frog"],
  ["🗿", "Moai"],
  ["🧠", "Big Brain"],
  ["💀", "Skull"],
  ["🚀", "Rocket"],
  ["🍕", "Pizza"],
  ["🦆", "Duck"],
  ["🤨", "Suspicious"],
  ["📚", "Exam"]
];

let selectedIngredients = [];

const shop = document.getElementById("shop");

ingredients.forEach(function (item, index) {
  const card = document.createElement("div");
  card.className = "item";

  card.innerHTML = `
    <div class="emoji">${item[0]}</div>
    <b>${item[1]}</b>
    <small>Pick</small>
  `;

  card.addEventListener("click", function () {
    if (selectedIngredients.includes(index)) {
      selectedIngredients = selectedIngredients.filter(function (number) {
        return number !== index;
      });
      card.classList.remove("selected");
    } else {
      selectedIngredients.push(index);
      card.classList.add("selected");
    }

    showSelectedIngredients();
  });

  shop.appendChild(card);
});

function showSelectedIngredients() {
  const display = document.getElementById("selectedItems");

  if (selectedIngredients.length === 0) {
    display.textContent = "Choose ingredients below";
    return;
  }

  display.textContent = selectedIngredients
    .map(function (index) {
      return ingredients[index][0] + " " + ingredients[index][1];
    })
    .join(" · ");
}

// A small extra feature: selected emojis can make a tiny story.
const emojiStories = {
  "🐸+🍕": "The frog ordered pizza. Nobody questioned it.",
  "🧠+📚": "Big brain entered exam mode.",
  "🚀+🌕": "Mission accepted. Homework escaped.",
  "💀+📚": "The exam was stronger than the student.",
  "😎+🚀": "Too cool for Earth."
};

document.getElementById("mixBtn").addEventListener("click", function () {
  const result = document.getElementById("mixResult");

  if (selectedIngredients.length < 2) {
    result.textContent = "Pick at least 2 emojis first!";
    return;
  }

  const chosen = selectedIngredients
    .slice(0, 3)
    .map(function (index) {
      return ingredients[index][0];
    });

  const recipe = chosen.join("+");
  const reverseRecipe = chosen.slice().reverse().join("+");
  const story = emojiStories[recipe] || emojiStories[reverseRecipe];

  if (story) {
    result.textContent = "SECRET COMBO! " + story;
    addCoins(3);
  } else {
    result.textContent = chosen.join(" ") +
      " = A very questionable adventure.";
  }
});

// A pool of emoji used for the small sticker in the corner of the meme.
const memeEmojis = ["🗿", "😭", "🤨", "🧠", "🚀", "🐸", "💀"];

// Real meme templates (hotlinked from Imgflip's public template library —
// the same base images that get reposted all over Reddit) — each paired
// with a few hand-written captions written specifically for that image,
// so the joke actually matches the picture instead of being random text
// slapped on a random photo.
const memeTemplates = [
  {
    name: "One Does Not Simply",
    url: "https://i.imgflip.com/1bij.jpg",
    captions: [
      { top: "ONE DOES NOT SIMPLY", bottom: "SUBMIT THE ASSIGNMENT ON TIME" },
      { top: "ONE DOES NOT SIMPLY", bottom: "UNDERSTAND POINTERS ON THE FIRST TRY" },
      { top: "ONE DOES NOT SIMPLY", bottom: "SURVIVE AN 8AM LECTURE" }
    ]
  },
  {
    name: "Drake Hotline Bling",
    url: "https://i.imgflip.com/30b1gx.jpg",
    captions: [
      { top: "READING THE TEXTBOOK", bottom: "READING THE FIRST GOOGLE RESULT" },
      { top: "WRITING CLEAN CODE", bottom: "COPY-PASTING FROM STACK OVERFLOW" },
      { top: "STUDYING A WEEK BEFORE THE EXAM", bottom: "STUDYING AT 2AM THE NIGHT BEFORE" }
    ]
  },
  {
    name: "Distracted Boyfriend",
    url: "https://i.imgflip.com/1ur9b0.jpg",
    captions: [
      { top: "ME", bottom: "A RANDOM YOUTUBE VIDEO INSTEAD OF THE ASSIGNMENT" },
      { top: "MY DEADLINE", bottom: "ONE MORE EPISODE" },
      { top: "MY TO-DO LIST", bottom: "TAKING A NAP INSTEAD" }
    ]
  },
  {
    name: "Two Buttons",
    url: "https://i.imgflip.com/1g8my4.jpg",
    captions: [
      { top: "SLEEP EARLY", bottom: "FINISH THE ASSIGNMENT" },
      { top: "GO TO CLASS", bottom: "STAY IN BED" },
      { top: "FIX ONE BUG", bottom: "CREATE THREE NEW ONES" }
    ]
  },
  {
    name: "Ancient Aliens",
    url: "https://i.imgflip.com/26am.jpg",
    captions: [
      { top: "I'M NOT SAYING IT WAS THE WIFI", bottom: "BUT MY CODE BROKE RIGHT BEFORE SUBMISSION" },
      { top: "I'M NOT SAYING THE PROFESSOR IS EVIL", bottom: "BUT THAT EXAM WAS 3 HOURS LONG" }
    ]
  },
  {
    name: "Waiting Skeleton",
    url: "https://i.imgflip.com/2fm6x.jpg",
    captions: [
      { top: "ME WAITING FOR", bottom: "THE PROFESSOR TO UPLOAD GRADES" },
      { top: "ME WAITING FOR", bottom: "MY CODE TO COMPILE WITHOUT ERRORS" }
    ]
  },
  {
    name: "Change My Mind",
    url: "https://i.imgflip.com/24y43o.jpg",
    captions: [
      { top: "GROUP PROJECTS ARE JUST", bottom: "ONE PERSON DOING ALL THE WORK" },
      { top: "SEMICOLONS ARE", bottom: "THE REAL FINAL BOSS OF CODING" }
    ]
  },
  {
    name: "Disaster Girl",
    url: "https://i.imgflip.com/23ls.jpg",
    captions: [
      { top: "ME AFTER", bottom: "DELETING THE ONLY COPY OF MY PROJECT" },
      { top: "ME WATCHING MY GROUPMATE", bottom: "PUSH TO MAIN WITHOUT TESTING" }
    ]
  }
];

document.getElementById("vendBtn").addEventListener("click", function () {
  if (selectedIngredients.length === 0) {
    alert("Pick at least one ingredient!");
    return;
  }

  // One meme costs 20 coins.
  if (!spendCoins(20)) {
    return;
  }

  const chosenEmoji = selectedIngredients.map(function (index) {
    return ingredients[index][0];
  });

  // Pick one template, then pick one of ITS caption pairs — so the
  // joke always matches the picture instead of being random text on a
  // random photo.
  const template = randomItem(memeTemplates);
  const caption = randomItem(template.captions);

  document.getElementById("memeTop").textContent = caption.top;
  document.getElementById("memeBottom").textContent = caption.bottom;
  document.getElementById("memeEmoji").textContent =
    randomItem(chosenEmoji.concat(memeEmojis));

  const memeImage = document.getElementById("memeImage");
  memeImage.classList.remove("visible");
  memeImage.src = template.url;
  memeImage.alt = template.name;

  memeImage.onload = function () {
    memeImage.classList.add("visible");
  };
  memeImage.onerror = function () {
    // No internet or the host is blocked? The meme still works fine
    // with just the emoji and captions, so just skip the image.
    memeImage.classList.remove("visible");
  };

  // A little screen-zap so the new meme feels like it just got vended.
  const canvas = document.getElementById("memeCanvas");
  canvas.classList.remove("zap");
  void canvas.offsetWidth;
  canvas.classList.add("zap");

  // Clear the selected ingredients.
  selectedIngredients = [];
  document.querySelectorAll(".item").forEach(function (item) {
    item.classList.remove("selected");
  });

  showSelectedIngredients();
  resetRating();
  document.getElementById("ratingResult").textContent =
    "New meme generated! Give it a rating.";
});

// ---------------- RATING ----------------

let selectedRating = 0;
let totalRatings = 20;
let totalScore = 84; // 20 ratings with an average of 4.2

const ratingButtons = document.querySelectorAll("#stars button");
const rateSubmit = document.getElementById("rateSubmit");
const ratingLabel = document.getElementById("ratingLabel");

const ratingMessages = [
  "Not for me 😐",
  "Could be better 😬",
  "Pretty decent 🙂",
  "Now we're talking 🔥",
  "ABSOLUTE CINEMA 🗿"
];

ratingButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedRating = Number(button.dataset.rate);

    ratingButtons.forEach(function (star) {
      star.classList.toggle(
        "active",
        Number(star.dataset.rate) <= selectedRating
      );
    });

    ratingLabel.textContent = ratingMessages[selectedRating - 1];

    button.classList.remove("pop");
    void button.offsetWidth;
    button.classList.add("pop");

    rateSubmit.disabled = false;
    rateSubmit.classList.add("ready");
    rateSubmit.classList.remove("voted");
    rateSubmit.innerHTML = "<span>⭐</span> Rate this meme";
  });
});

rateSubmit.addEventListener("click", function () {
  if (selectedRating === 0) {
    return;
  }

  // Add the new rating to our simple community score.
  totalScore += selectedRating;
  totalRatings += 1;

  const average = (totalScore / totalRatings).toFixed(1);
  document.getElementById("communityScore").textContent = average + " / 5";

  document.getElementById("ratingResult").textContent =
    "You gave it " +
    selectedRating +
    "/5 ⭐ — " +
    (selectedRating >= 4
      ? "Certified meme material!"
      : "The vending machine can do better.");

  // Reward good memes.
  if (selectedRating >= 4) {
    addCoins(5);
  }

  // A perfect score gets a little confetti celebration.
  if (selectedRating === 5) {
    launchConfetti();
  }

  rateSubmit.innerHTML = "✓ Rating submitted";
  rateSubmit.classList.remove("ready");
  rateSubmit.classList.add("voted");
  rateSubmit.disabled = true;
});

function resetRating() {
  selectedRating = 0;

  ratingButtons.forEach(function (star) {
    star.classList.remove("active");
  });

  ratingLabel.textContent = "Tap a star to rate";
  rateSubmit.disabled = true;
  rateSubmit.classList.remove("ready", "voted");
  rateSubmit.innerHTML = "<span>⭐</span> Rate this meme";
}

// =========================================================
// ARCADE CABINET — one shared frame, three games
// =========================================================

const tabButtons = document.querySelectorAll(".tab-btn");
const gamePanels = {
  memory: document.getElementById("memoryPanel"),
  whack: document.getElementById("whackPanel"),
  slots: document.getElementById("slotsPanel")
};
const cabAction = document.getElementById("cabActionBtn");

const cabActionLabels = {
  memory: "START GAME",
  whack: "START GAME",
  slots: "PULL LEVER"
};

let activeGame = "memory";

tabButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Leaving the Whack-a-Meme tab mid-round should stop its timers.
    if (activeGame === "whack") {
      cancelWhackRound();
    }

    activeGame = button.dataset.game;

    tabButtons.forEach(function (otherButton) {
      otherButton.classList.remove("active");
    });
    button.classList.add("active");

    Object.keys(gamePanels).forEach(function (key) {
      gamePanels[key].classList.toggle("hidden", key !== activeGame);
    });

    cabAction.textContent = cabActionLabels[activeGame];
  });
});

cabAction.addEventListener("click", function () {
  if (activeGame === "memory") {
    startMemoryGame();
  } else if (activeGame === "whack") {
    startWhackRound();
  } else if (activeGame === "slots") {
    spinSlots();
  }
});

// ---------------- GAME 1: MEMORY MATCH ----------------

const memorySymbols = ["😎", "🐸", "🗿", "🧠", "💀", "🚀", "🍕", "🦆"];

let memoryFirstCard = null;
let memorySecondCard = null;
let memoryLocked = false;
let memoryMoves = 0;
let memoryPairsFound = 0;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function startMemoryGame() {
  const grid = document.getElementById("memoryGrid");
  grid.innerHTML = "";

  memoryFirstCard = null;
  memorySecondCard = null;
  memoryLocked = false;
  memoryMoves = 0;
  memoryPairsFound = 0;

  document.getElementById("memoryMoves").textContent = memoryMoves;
  document.getElementById("memoryPairs").textContent = memoryPairsFound;

  const deck = memorySymbols.concat(memorySymbols);
  shuffleArray(deck);

  deck.forEach(function (symbol) {
    const card = document.createElement("button");
    card.className = "memory-card";
    card.dataset.symbol = symbol;
    card.innerHTML =
      '<span class="card-face card-front">❓</span>' +
      '<span class="card-face card-back">' + symbol + "</span>";

    card.addEventListener("click", function () {
      flipMemoryCard(card);
    });

    grid.appendChild(card);
  });
}

function flipMemoryCard(card) {
  if (memoryLocked) {
    return;
  }

  if (card.classList.contains("flipped") || card.classList.contains("matched")) {
    return;
  }

  card.classList.add("flipped");

  if (!memoryFirstCard) {
    memoryFirstCard = card;
    return;
  }

  memorySecondCard = card;
  memoryLocked = true;
  memoryMoves++;
  document.getElementById("memoryMoves").textContent = memoryMoves;

  if (memoryFirstCard.dataset.symbol === memorySecondCard.dataset.symbol) {
    memoryFirstCard.classList.add("matched");
    memorySecondCard.classList.add("matched");
    memoryPairsFound++;
    document.getElementById("memoryPairs").textContent = memoryPairsFound;

    memoryFirstCard = null;
    memorySecondCard = null;
    memoryLocked = false;

    if (memoryPairsFound === memorySymbols.length) {
      const reward = Math.max(10, 50 - memoryMoves * 2);
      addCoins(reward);
      setTimeout(function () {
        alert(
          "Memory Match complete in " + memoryMoves +
          " moves! You earned " + reward + " coins."
        );
      }, 250);
    }
  } else {
    setTimeout(function () {
      memoryFirstCard.classList.remove("flipped");
      memorySecondCard.classList.remove("flipped");
      memoryFirstCard = null;
      memorySecondCard = null;
      memoryLocked = false;
    }, 700);
  }
}

// ---------------- GAME 2: WHACK-A-MEME ----------------

const whackCritters = ["🐸", "😎", "🗿", "🤨"];
const whackBomb = "💣";

let whackTimer;
let whackSpawnTimer;
let whackRunning = false;
let whackScore = 0;

function startWhackRound() {
  cancelWhackRound();

  whackRunning = true;
  whackScore = 0;
  let time = 15;

  const grid = document.getElementById("whackGrid");
  grid.innerHTML = "";
  document.getElementById("whackScore").textContent = whackScore;
  document.getElementById("whackTime").textContent = time;

  const holes = [];

  for (let i = 0; i < 9; i++) {
    const hole = document.createElement("button");
    hole.className = "hole";
    hole.innerHTML = '<span class="critter"></span>';

    hole.addEventListener("click", function () {
      whackHole(hole);
    });

    grid.appendChild(hole);
    holes.push(hole);
  }

  whackSpawnTimer = setInterval(function () {
    const hole = randomItem(holes);

    if (hole.classList.contains("up")) {
      return;
    }

    const isBomb = Math.random() < 0.2;
    hole.dataset.bomb = isBomb ? "true" : "false";
    hole.querySelector(".critter").textContent = isBomb
      ? whackBomb
      : randomItem(whackCritters);

    hole.classList.add("up");

    setTimeout(function () {
      hole.classList.remove("up");
    }, 700);
  }, 550);

  whackTimer = setInterval(function () {
    time--;
    document.getElementById("whackTime").textContent = time;

    if (time <= 0) {
      finishWhackRound();
    }
  }, 1000);
}

function whackHole(hole) {
  if (!whackRunning || !hole.classList.contains("up")) {
    return;
  }

  if (hole.dataset.bomb === "true") {
    whackScore = Math.max(0, whackScore - 2);
    hole.classList.add("bombed");
    setTimeout(function () {
      hole.classList.remove("bombed");
    }, 300);
  } else {
    whackScore++;
    hole.classList.add("hit");
    setTimeout(function () {
      hole.classList.remove("hit");
    }, 300);
  }

  hole.classList.remove("up");
  document.getElementById("whackScore").textContent = whackScore;
}

function finishWhackRound() {
  cancelWhackRound();

  const reward = Math.min(40, whackScore * 3);
  if (reward > 0) {
    addCoins(reward);
  }

  alert("Whack-a-Meme finished! You earned " + reward + " coins.");
}

// Stops timers without paying out — used when the round runs out
// naturally (after paying out) and when the player switches tabs.
function cancelWhackRound() {
  whackRunning = false;
  clearInterval(whackTimer);
  clearInterval(whackSpawnTimer);

  document.querySelectorAll("#whackGrid .hole").forEach(function (hole) {
    hole.classList.remove("up");
  });
}

// ---------------- GAME 3: SLOT SPIN ----------------

const slotSymbols = ["🍒", "🍋", "🔔", "⭐", "💎", "7️⃣"];
let slotSpinning = false;

function spinSlots() {
  if (slotSpinning) {
    return;
  }

  slotSpinning = true;

  const reelEls = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3")
  ];
  const resultEl = document.getElementById("slotResult");
  resultEl.textContent = "Spinning...";

  let ticks = 0;

  const spinInterval = setInterval(function () {
    reelEls.forEach(function (reel) {
      reel.textContent = randomItem(slotSymbols);
    });

    ticks++;

    if (ticks > 12) {
      clearInterval(spinInterval);
      finishSlotSpin(reelEls, resultEl);
    }
  }, 80);
}

function finishSlotSpin(reelEls, resultEl) {
  const finalSymbols = reelEls.map(function () {
    return randomItem(slotSymbols);
  });

  reelEls.forEach(function (reel, index) {
    reel.textContent = finalSymbols[index];
  });

  const allMatch =
    finalSymbols[0] === finalSymbols[1] && finalSymbols[1] === finalSymbols[2];
  const twoMatch =
    !allMatch &&
    (finalSymbols[0] === finalSymbols[1] ||
      finalSymbols[1] === finalSymbols[2] ||
      finalSymbols[0] === finalSymbols[2]);

  if (allMatch) {
    const reward = 30;
    addCoins(reward);
    resultEl.textContent = "JACKPOT! +" + reward + " coins!";
    launchConfetti();
  } else if (twoMatch) {
    const reward = 8;
    addCoins(reward);
    resultEl.textContent = "Small win! +" + reward + " coins.";
  } else {
    resultEl.textContent = "No match. Spin again!";
  }

  slotSpinning = false;
}

// Start with the initial 100 coins.
updateCoins();
