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
  for (let i = 0; i < $container.children.length - 1; i++) {
    if (
      Number($container.children[i].style.height.replace("%", "")) >
      Number($container.children[i + 1].style.height.replace("%", ""))
    ) {
      setTimeout(() => {
        $container.children[i + 1].parentNode.insertBefore(
          $container.children[i + 1],
          $container.children[i]
        );
      });
    }
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
