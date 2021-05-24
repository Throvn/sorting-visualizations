const $container = document.getElementById("container");
const toast = new bootstrap.Toast(document.getElementById("toast"), {});

let speed = 100;
let numOfElements = 100;
let overallArray = [];

const spawnPillars = (numOfPillars) => {
  for (let i = 0; i < numOfPillars; i++) {
    const pillar = document.createElement("div");
    pillar.style.width = 100 / numOfPillars + "%";
    const randomNumber = Math.random();
    pillar.style.height = randomNumber * 100 + "%";
    pillar.classList.add("vertical-bar");
    pillar.style.backgroundColor =
      "#a3" + Math.floor(randomNumber * 255).toString(16) + "fd";
    pillar.style.backgroundColor = $container.appendChild(pillar);
  }
};

spawnPillars(numOfElements);

/*
 * @autor https://learnersbucket.com/examples/algorithms/iterative-heap-sort-in-javascript/
 */
const minHeapify = (arr, n) => {
  for (let i = 1; i < n; i++) {
    //If child is greater than parent
    if (
      Number(arr[i].style.height.replace("%", "")) >
      Number(arr[parseInt((i - 1) / 2)].style.height.replace("%", ""))
    ) {
      let j = i;

      // swap child and parent until
      // parent is smaller
      while (
        Number(arr[j].style.height.replace("%", "")) >
        Number(arr[parseInt((j - 1) / 2)].style.height.replace("%", ""))
      ) {
        //Get the indexes of both the child
        const l = j;
        const r = parseInt((j - 1) / 2);

        //Swap
        [arr[l], arr[r]] = [arr[r], arr[l]];

        //reduce
        j = parseInt((j - 1) / 2);
      }
    }
  }
};

const heapSort = (arr, n = arr.length) => {
  overallArray = [];
  minHeapify(arr, n);
  for (let i = n - 1; i > 0; i--) {
    // swap value of first indexed
    // with last indexed
    [arr[0], arr[i]] = [arr[i], arr[0]];
    // maintaining heap property
    // after each swapping
    let j = 0,
      index;

    do {
      index = 2 * j + 1;

      // if left child is smaller than
      // right child point index variable
      // to right child
      if (
        index < i - 1 &&
        Number(arr[index].style.height.replace("%", "")) <
          Number(arr[index + 1].style.height.replace("%", ""))
      ) {
        index++;
      }

      // if parent is smaller than child
      // then swapping parent with child
      // having higher value
      if (
        index < i &&
        Number(arr[j].style.height.replace("%", "")) <
          Number(arr[index].style.height.replace("%", ""))
      ) {
        [arr[j], arr[index]] = [arr[index], arr[j]];
      }

      j = index;
    } while (index < i);
    overallArray.push([].concat(arr));
  }
};

heapSort([...$container.children]);

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

  heapSort([...$container.children]);
  index = 0;
});

document.getElementById("repeat").addEventListener("click", () => {
  $container.innerHTML = "";
  spawnPillars(numOfElements);

  overallArray = [];
  heapSort([...$container.children]);
  index = 0;
});
