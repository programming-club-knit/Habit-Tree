let habits = [];
let count=localStorage.getItem("habitScore")? parseInt(localStorage.getItem("habitScore")) : 0;
updateScore();


function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * 260),
    y: Math.floor(Math.random() * 260)
  };
}
function updateScore() {
  const box = document.getElementById("scoreText");
  localStorage.setItem("habitScore", count);
  const habitscore = localStorage.getItem("habitScore");
  if (!habitscore) {
    box.innerText = 0;
    return;
  }
  box.innerText = habitscore;



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




    checkbox.onclick = (e) => {
      if (e.target.checked) count++;
      else count--;
      addFruit(index);
      updateScore(count);
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

document.getElementById("habitForm").onsubmit = (event) => {
  event.preventDefault();
  const name = document.getElementById("habitName").value.trim();
  if (!name) return;

  habits.push(name);
  document.getElementById("habitName").value = "";
  renderHabits();
};

renderHabits();

