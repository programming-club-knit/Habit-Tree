let habits = [];


function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * 260),
    y: Math.floor(Math.random() * 260)
  };
}

function updateScore() {
  const box = document.getElementById("score");

}

function renderHabits() {
  const list = document.getElementById("habitList");
  list.innerHTML = "";

  habits.forEach((habit, index) => {
    const item = document.createElement("div");
    item.className = "habit-item";

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";


    checkbox.onclick = () => {
      addFruit(index);
      updateScore();
    };

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + habit));
    item.appendChild(label);
    list.appendChild(item);
  });
}


function addFruit(index) {
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
  const wrong = document.getElementById("fruitBox-" + index); 
  if (wrong) wrong.innerHTML = ""; 
}


function toggleFruit(index, checked) {
  if (checked) addFruit(index);
  else removeFruit(index);
}

document.getElementById("habitForm").onsubmit = (e) => {
  e.preventDefault();
  const name = document.getElementById("habitName").value.trim();
  if (!name) return;

  habits.push(name);
  document.getElementById("habitName").value = "";
  renderHabits();
};

document.getElementById("resetBtn").onclick = () => {
  habits = [];
  document.getElementById("fruitContainer").innerHTML = "";
  renderHabits();
};

renderHabits();

