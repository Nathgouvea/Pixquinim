// Initialize Fun Corner features
document.addEventListener("DOMContentLoaded", () => {
  // Calculate and display days together
  function updateDaysTogether() {
    // Set the start date: February 5th, 2022
    const startDate = new Date("2022-02-05T00:00:00");
    const today = new Date();

    // Calculate the difference in days
    const diffTime = today.getTime() - startDate.getTime();
    const daysTogether = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Get the element and update it
    const daysElement = document.getElementById("daysTogether");
    if (daysElement) {
      // Animate the counter
      let start = 0;
      const duration = 2000; // 2 seconds
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);

        const currentCount = Math.floor(daysTogether * percentage);
        daysElement.textContent = currentCount;

        if (percentage < 1) {
          window.requestAnimationFrame(step);
        } else {
          daysElement.textContent = daysTogether;
        }
      };

      window.requestAnimationFrame(step);

      // Add hover effect
      daysElement.title = `Together since February 5th, 2022`;
    }
  }

  // Run initial update
  updateDaysTogether();

  // Update daily at midnight
  const now = new Date();
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );
  const timeUntilMidnight = tomorrow - now;

  setTimeout(() => {
    updateDaysTogether();
    // After first midnight update, run every 24 hours
    setInterval(updateDaysTogether, 24 * 60 * 60 * 1000);
  }, timeUntilMidnight);

  // Memory Game
  initMemoryGame();

  // Random Memory Generator
  initRandomMemories();

  // Mood Tracker
  initMoodTracker();
});

// Memory Game
function initMemoryGame() {
  const memories = [
    { id: 1, image: "rainbow.jpeg" },
    { id: 2, image: "fun_uk.jpeg" },
    { id: 3, image: "boom_festival.jpeg" },
    { id: 4, image: "italy.jpeg" },
    // Duplicate each image for pairs
  ].flatMap((item) => [item, { ...item }]);

  document.querySelector(".start-button").addEventListener("click", () => {
    const gameGrid = document.querySelector(".game-grid");
    gameGrid.innerHTML = "";

    // Shuffle and create cards
    memories
      .sort(() => Math.random() - 0.5)
      .forEach((memory) => {
        const card = createMemoryCard(memory);
        gameGrid.appendChild(card);
      });
  });
}

// Random Memories
function initRandomMemories() {
  const memories = [
    "Remember when we got lost in Porto's narrow streets? 😅",
    "That time we dressed up as medieval characters in the UK! 👑",
    "Dancing together at Boom Festival 🎵",
    "Our first francesinha together in Porto 🍽️",
    "Getting caught in the rain and finding that rainbow 🌈",
    // Add more memories
  ];

  document.querySelector(".generate-button").addEventListener("click", () => {
    const randomMemory = memories[Math.floor(Math.random() * memories.length)];
    document.querySelector(".quote-text").textContent = randomMemory;
  });
}

// Mood Tracker
function initMoodTracker() {
  const moodButtons = document.querySelectorAll(".mood-btn");
  const moodText = document.querySelector(".mood-text");

  moodButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove previous selection
      moodButtons.forEach((b) => b.classList.remove("selected"));
      // Add new selection
      btn.classList.add("selected");
      // Update text
      moodText.textContent = `You're feeling ${btn.dataset.mood} today!`;
    });
  });
}
