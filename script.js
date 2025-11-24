let habits = [];


function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * 260),
    y: Math.floor(Math.random() * 260)
  };
}
let count=0;
function updateScore() {
  const box = document.getElementById("scrp");
    count++;
    console.log(count);
    
    box.textContent = `⭐ Score: ${count}`;
}
function deScore() {
  const box = document.getElementById("scrp");
    count--;
    console.log(count);
    
    box.textContent = `⭐ Score: ${count}`;
}
function renderHabits() {
  const list = document.getElementById("habitList");
  list.innerHTML = "";

  habits.forEach((habit, index) => {
    const item = document.createElement("div");
    item.className = "habit-item";

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.id="chk";
    checkbox.type = "checkbox";


    checkbox.onclick = () => {
     if(checkbox.checked==true) {addFruit(index);
      updateScore();}
      else {removeFruit(index);
      deScore();
    
    }
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
  const wrong = document.getElementById("fruit-" + index); 
   wrong.remove(); 
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
let re=document.getElementById("res")
re.addEventListener('click',()=>{
    document.getElementById("fruitContainer").innerHTML="";
    const ch=document.getElementById("chk")
    ch.checked=false;
    count=0;
    const box = document.getElementById("scrp");
    box.textContent = `⭐ Score: ${count}`;
    
})
renderHabits();