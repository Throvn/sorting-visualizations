const $container = document.getElementById("container");

const toast = new bootstrap.Toast(document.getElementById("toast"), {});

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
let overallArray = [];

spawnPillars(numOfElements);

const bubbleSort = (arr) => {
  for (let j = 0; j < arr.length; j++) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (
        Number(arr[i].style.height.replace("%", "")) >
        Number(arr[i + 1].style.height.replace("%", ""))
      ) {
        const temp = arr[i + 1];
        arr[i + 1] = arr[i];
        arr[i] = temp;
      }
    }
    overallArray.push([...arr]);
  }
};

bubbleSort([...$container.children]);

let index = 0;

const sortPillars = () => {
  if (index < overallArray.length) {
    $container.innerHTML = "";
    $container.append(...overallArray[index++]);
  } else {
    clearInterval(running);
    running = undefined;
    toast.show();
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

  bubbleSort([...$container.children]);
  index = 0;
});

document.getElementById("repeat").addEventListener("click", () => {
  $container.innerHTML = "";
  spawnPillars(numOfElements);

  overallArray = [];
  bubbleSort([...$container.children]);
  index = 0;
});
