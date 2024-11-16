// Client-side storage using localStorage
const counters = {
  jamal: {
    total: parseInt(localStorage.getItem("jamalTotal")) || 0,
    today: parseInt(localStorage.getItem("jamalToday")) || 0,
    week: parseInt(localStorage.getItem("jamalWeek")) || 0,
    lastUpdate:
      localStorage.getItem("jamalLastUpdate") || new Date().toDateString(),
  },
  nathielle: {
    total: parseInt(localStorage.getItem("nathielleTotal")) || 0,
    today: parseInt(localStorage.getItem("nathielleToday")) || 0,
    week: parseInt(localStorage.getItem("nathielleWeek")) || 0,
    lastUpdate:
      localStorage.getItem("nathielleLastUpdate") || new Date().toDateString(),
  },
};

// Update display
function updateDisplay() {
  // Update counters
  document.getElementById("jamalCount").textContent = counters.jamal.total;
  document.getElementById("jamalTodayCount").textContent = counters.jamal.today;
  document.getElementById("jamalWeekCount").textContent = counters.jamal.week;

  document.getElementById("nathielleCount").textContent =
    counters.nathielle.total;
  document.getElementById("nathielleTodayCount").textContent =
    counters.nathielle.today;
  document.getElementById("nathielleWeekCount").textContent =
    counters.nathielle.week;

  // Update total poops in fun corner
  const totalPoops = document.getElementById("totalPoops");
  if (totalPoops) {
    totalPoops.textContent = counters.jamal.total + counters.nathielle.total;
  }

  // Update battle progress
  const total = counters.jamal.today + counters.nathielle.today;
  const jamalPercentage = total ? (counters.jamal.today / total) * 100 : 50;
  document.getElementById("battleProgress").style.width = `${jamalPercentage}%`;

  // Update battle result
  let battleText = "Who will win today? 🤔";
  if (counters.jamal.today > counters.nathielle.today) {
    battleText = "Jamal is winning! 🏆";
  } else if (counters.nathielle.today > counters.jamal.today) {
    battleText = "Nathielle is winning! 🏆";
  } else if (counters.jamal.today > 0) {
    battleText = "It's a tie! 🤝";
  }
  document.getElementById("battleResult").textContent = battleText;
}

// Check and reset daily/weekly counts
function checkResetCounts() {
  const today = new Date().toDateString();
  const currentDay = new Date().getDay();

  ["jamal", "nathielle"].forEach((person) => {
    // Reset daily counts if it's a new day
    if (counters[person].lastUpdate !== today) {
      counters[person].today = 0;
      counters[person].lastUpdate = today;
      localStorage.setItem(`${person}Today`, "0");
      localStorage.setItem(`${person}LastUpdate`, today);
    }

    // Reset weekly counts if it's Monday
    if (currentDay === 1 && !localStorage.getItem(`${person}WeekReset`)) {
      counters[person].week = 0;
      localStorage.setItem(`${person}Week`, "0");
      localStorage.setItem(`${person}WeekReset`, today);
    } else if (currentDay !== 1) {
      localStorage.removeItem(`${person}WeekReset`);
    }
  });
}

// Increment poop count
function incrementPoop(person) {
  checkResetCounts();

  counters[person].total++;
  counters[person].today++;
  counters[person].week++;

  // Save to localStorage
  localStorage.setItem(`${person}Total`, counters[person].total);
  localStorage.setItem(`${person}Today`, counters[person].today);
  localStorage.setItem(`${person}Week`, counters[person].week);

  // Add bounce animation
  const counterElement = document.getElementById(`${person}Count`);
  gsap.from(counterElement, {
    duration: 0.5,
    scale: 1.2,
    ease: "elastic.out",
  });

  updateDisplay();
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  checkResetCounts();
  updateDisplay();
});
