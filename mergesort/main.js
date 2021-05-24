const $container = document.getElementById("container");

const toast = new bootstrap.Toast(document.getElementById("toast"), {});

const spawnPillars = (numOfPillars) => {
  for (let i = 0; i < numOfPillars; i++) {
    const pillar = document.createElement("div");
    pillar.style.width = 100 / numOfPillars + "%";
    const randomNumber = Math.random();
    pillar.style.height = randomNumber * 100 + "%";
    pillar.classList.add("vertical-bar");
    pillar.style.backgroundColor =
      "#f6" + Math.floor(randomNumber * 255).toString(16) + "e4";
    pillar.style.backgroundColor = $container.appendChild(pillar);
  }
};

let speed = 100;
let numOfElements = 100;

spawnPillars(numOfElements);

let overallArray = [];

const mergeSort = (arr) => {
  //Create two arrays for sorting
  let sorted = Array.from(arr);
  let n = sorted.length;
  let buffer = new Array(n);

  for (let size = 1; size < n; size *= 2) {
    for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
      //Get the two sub arrays
      let left = leftStart,
        right = Math.min(left + size, n),
        leftLimit = right,
        rightLimit = Math.min(right + size, n);

      //Merge the sub arrays
      merge(left, right, leftLimit, rightLimit, sorted, buffer);
    }
    //Swap the sorted sub array and merge them
    let temp = sorted;
    sorted = buffer;
    buffer = temp;
    overallArray.push([...sorted]);
  }
  overallArray.push([...sorted]);
  return sorted;
};

const merge = (left, right, leftLimit, rightLimit, sorted, buffer) => {
  let i = left;
  //Compare the two sub arrays and merge them in the sorted order
  while (left < leftLimit && right < rightLimit) {
    if (
      Number(sorted[left].style.height.replace("%", "")) <=
      Number(sorted[right].style.height.replace("%", ""))
    ) {
      buffer[i++] = sorted[left++];
    } else {
      buffer[i++] = sorted[right++];
    }
  }
  //If there are elements in the left sub arrray then add it to the result
  while (left < leftLimit) {
    buffer[i++] = sorted[left++];
  }
  //If there are elements in the right sub array then add it to the result
  while (right < rightLimit) {
    buffer[i++] = sorted[right++];
  }
};

mergeSort([...$container.children]);

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

  overallArray = [];
  mergeSort([...$container.children]);
  index = 0;
});

document.getElementById("repeat").addEventListener("click", () => {
  $container.innerHTML = "";
  spawnPillars(numOfElements);

  overallArray = [];
  mergeSort([...$container.children]);
  index = 0;
});
