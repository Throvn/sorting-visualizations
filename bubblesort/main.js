const $container = document.getElementById("container"); // "canvas" where all the bars are created in
const toast = new bootstrap.Toast(document.getElementById("toast"), {}); // toast to indicate end of sorting

let speed = 100; // pause between steps in milliseconds
let numOfElements = 100; // number of bars that have to be sorted
let overallArray = [];

/**
 * Appends the amount of numOfPillars to the $container div
 * @param {number} numOfPillars
 */
const spawnPillars = (numOfPillars = 100) => {
  for (let i = 0; i < numOfPillars; i++) {
    const pillar = document.createElement("div");

    // give all pillars the same width
    pillar.style.width = 100 / numOfPillars + "%";

    // give pillar random height (between 0 and 100%)
    const randomNumber = Math.random();
    pillar.style.height = randomNumber * 100 + "%";
    pillar.classList.add("vertical-bar");

    // adjust color of pillar based on the pillars height
    pillar.style.backgroundColor =
      "#ff" + Math.floor(randomNumber * 255).toString(16) + "be";
    // pillar.style.backgroundColor =
    //   "#19" + Math.floor(randomNumber * 255).toString(16) + "907c";

    // add pillar to the DOM
    $container.appendChild(pillar);
  }
};

// initialize a random set of pillars at startup
spawnPillars(numOfElements);

/**
 * Sorts the given array with the bubble sort
 * method and records every change in the
 * overallArray.
 * @param {array} arr
 */
const bubbleSort = (arr = []) => {
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

/**
 * Replays the recorded steps of overallArray one by one.
 */
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

// running animation - else undefined
let running = undefined;

// start animation if it hasn't started already
document.getElementById("start").addEventListener("click", () => {
  if (!running) {
    running = setInterval(sortPillars, speed);
  }
});

// stop animation on click of the pause button
document.getElementById("stop").addEventListener("click", () => {
  clearInterval(running);
  running = undefined;
});

// update the speed of the animation
document.getElementById("speed").addEventListener("input", () => {
  speed = 1500 - Number(document.getElementById("speed").value);
  if (running) {
    clearInterval(running);
    running = setInterval(sortPillars, speed);
  }
});

// update the number of pillars
document.getElementById("numOfElements").addEventListener("input", () => {
  numOfElements = document.getElementById("numOfElements").value;
  $container.innerHTML = "";
  spawnPillars(numOfElements);

  overallArray = [];
  bubbleSort([...$container.children]);
  index = 0;
});

// repeat the whole algorithm
document.getElementById("repeat").addEventListener("click", () => {
  $container.innerHTML = "";
  spawnPillars(numOfElements);

  overallArray = [];
  bubbleSort([...$container.children]);
  index = 0;
});
