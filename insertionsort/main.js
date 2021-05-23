const $container = document.getElementById("container");
const spawnPillars = (numOfPillars) => {
  for (let i = 0; i < numOfPillars; i++) {
    const pillar = document.createElement("div");
    pillar.style.width = 100 / numOfPillars + "%";
    const randomNumber = Math.random();
    pillar.style.height = randomNumber * 100 + "%";
    pillar.classList.add("vertical-bar");
    // pillar.style.backgroundColor =
    //  "#" + "f9" + Math.floor(randomNumber * 255).toString(16) + "5d";
    pillar.style.backgroundColor =
      "#19" + Math.floor(randomNumber * 255).toString(16) + "907c";
    pillar.style.backgroundColor = $container.appendChild(pillar);
  }
};

let speed = 100;
let numOfElements = 100;

spawnPillars(numOfElements);

const sortPillars = () => {
  let i, key, j;
  let arr = [...$container.children];
  for (i = 1; i < arr.length; i++) {
    key = arr[i];
    j = i - 1;

    /* Move elements of arr[0..i-1], that are 
        greater than key, to one position ahead 
        of their current position */
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
};
let running = undefined;
document.getElementById("start").addEventListener("click", () => {
  if (!running) {
    running = setInterval(sortPillars, speed);
  }
});
document.getElementById("stop").addEventListener("click", () => {
  clearInterval(running);
  running = undefined;
});

document.getElementById("speed").addEventListener("input", () => {
  speed = 1500 - Number(document.getElementById("speed").value);
  if (running) {
    clearInterval(running);
    running = setInterval(sortPillars, speed);
  }
});

document.getElementById("numOfElements").addEventListener("input", () => {
  numOfElements = document.getElementById("numOfElements").value;
  $container.innerHTML = "";
  spawnPillars(numOfElements);
});
