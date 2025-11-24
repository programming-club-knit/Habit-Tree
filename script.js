let habits = [];
let habitStates = {}; // ✅ stores checkbox status per habit index

let count = localStorage.getItem("habitScore")
  ? parseInt(localStorage.getItem("habitScore"))
  : 0;

updateScore();

// -------------------- Random Fruit Position --------------------
function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * 260),
    y: Math.floor(Math.random() * 260)
  };
}

// -------------------- Score Update --------------------
function updateScore() {
  const box = document.getElementById("scoreText");
  localStorage.setItem("habitScore", count);
  box.innerText = count;
}

// -------------------- Render Habits --------------------
function renderHabits() {
  const list = document.getElementById("habitList");
  list.innerHTML = "";

  habits.forEach((habit, index) => {
    const item = document.createElement("div");
    item.className = "habit-item";

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // ✅ Restore saved state
    checkbox.checked = habitStates[index] === true;

    checkbox.onclick = () => {
      habitStates[index] = checkbox.checked; // save state
      toggleFruit(index, checkbox.checked);
    };

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + habit));
    item.appendChild(label);
    list.appendChild(item);
  });
}

// -------------------- Fruit Functions --------------------
function addFruit(index) {
  // ❌ Prevent duplicate fruit
  if (document.getElementById("fruit-" + index)) return;

  const fruit = document.createElement("img");
  fruit.src = "apple.webp";
  fruit.className = "fruit";
  fruit.id = "fruit-" + index;

  const pos = getRandomPosition();
  fruit.style.left = pos.x + "px";
  fruit.style.top = pos.y + "px";

  document.getElementById("fruitContainer").appendChild(fruit);
}

function removeFruit(index) {
  const fruit = document.getElementById("fruit-" + index);
  if (fruit) fruit.remove();
}

// -------------------- Toggle Fruit --------------------
function toggleFruit(index, checked) {
  if (checked) addFruit(index);
  else removeFruit(index);
}

// -------------------- Add Habit --------------------
document.getElementById("habitForm").onsubmit = (event) => {
  event.preventDefault();
  const name = document.getElementById("habitName").value.trim();
  if (!name) return;

  habits.push(name);
  habitStates[habits.length - 1] = false; // new habit default unchecked

  document.getElementById("habitName").value = "";
  renderHabits();
};

// -------------------- Reset --------------------
document.getElementById("resetBtn").onclick = () => {
  habits = [];
  habitStates = {};
  document.getElementById("fruitContainer").innerHTML = "";
  renderHabits();
};

renderHabits();