let habits = [];
let cnt=0;

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
      if(checkbox.checked){
        cnt++;
      }

      else{
        cnt--;
      }

      addFruit(index,checkbox.checked);
      updateScore();
    };

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + habit));
    item.appendChild(label);
    list.appendChild(item);
  });
}

let m=0;

function addFruit(index,v) {
  let percent = (cnt/habits.length)*100;

  let fruit;

  if(percent<=50){
    if(m==1){
      const e=document.querySelectorAll(".fruit")
      e.forEach((img)=>img.src="apple.webp")
      m=1;
    }

    if(v==1){
      fruit = document.createElement("img");
    fruit.src = "apple.webp";
    fruit.className = "fruit";
    fruit.id = "fruit-" + index;
    }
  }

  else{
    if(m==0){
      const e=document.querySelectorAll(".fruit")
      e.forEach((img)=>img.src="mango.jpeg")
      m=0;
    }

    if(v==1){
      fruit = document.createElement("img");
    fruit.src = "mango.jpeg";
    fruit.className = "fruit";
    fruit.id = "fruit-" + index;
    }
  }

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
  cnt=0;
  document.getElementById("fruitContainer").innerHTML="";
};

renderHabits();

