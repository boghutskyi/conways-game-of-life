const iterationArr = (itemClass, x, y) => {
    const itArr = [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1]
    ];
    let neighbors = 0;
    for (let i = 0; i < itArr.length; i++) {
      if (
        document.querySelector(
          `.desk-rect[data-x="${itArr[i][0]}"][data-y="${itArr[i][1]}"]`
        ) &&
        document
          .querySelector(
            `.desk-rect[data-x="${itArr[i][0]}"][data-y="${itArr[i][1]}"]`
          )
          .classList.contains("active")
      ) {
        neighbors++;
      }
    }
    switch (neighbors) {
      case 3:
        return ["active", x, y];
        break;
      case 2:
        return [itemClass, x, y];
        break;
      default:
        return ["desk-rect", x, y];
    }
  };
  
  const playIcon = '<span class="material-icons-round">play_arrow</span>';
  const pauseIcon = '<span class="material-icons-round">pause</span>';
  
  const playBtn = document.querySelector("#play-btn");
  const shuffleBtn = document.querySelector("#shuffle-btn");
  const clearBtn = document.querySelector("#clear-btn");
  
  let desk = document.querySelector("#desk");
  let genInfo = document.querySelector("#nav-info");
  let startGame;
  
  const render = () => {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        desk.innerHTML += `<div class="desk-rect" data-x="${j}" data-y="${i}"></div>`;
      }
    }
  };
  
  render();
  
  document.querySelectorAll(".desk-rect").forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
  
  const randomizeField = () => {
    document.querySelectorAll(".desk-rect").forEach((item) => {
      if (Math.random() * 2 > 1.3) {
        item.classList.add("active");
      }
    });
  };
  
  const clearFields = () => {
    clearInterval(startGame);
    genInfo.innerHTML = `Genration: 0`;
    document.querySelectorAll(".desk-rect").forEach((item) => {
      item.classList.remove("active");
    });
  };
  
  randomizeField();
  
  let iteration = 0;
  
  const turn = () => {
    let nextArr = [];
    document.querySelectorAll(".desk-rect").forEach((item) => {
      let result = iterationArr(
        item.classList,
        parseInt(item.dataset.x),
        parseInt(item.dataset.y)
      );
      nextArr.push(result);
    });
    iteration++;
    genInfo.innerHTML = `Genration: ${iteration}`;
    nextArr.forEach((i) => {
      switch (i[0]) {
        case "desk-rect":
          document
            .querySelector(`.desk-rect[data-x="${i[1]}"][data-y="${i[2]}"]`)
            .classList.remove("active");
          break;
        case "active":
          document
            .querySelector(`.desk-rect[data-x="${i[1]}"][data-y="${i[2]}"]`)
            .classList.add("active");
  
          break;
        default:
          document
            .querySelector(`.desk-rect[data-x="${i[1]}"][data-y="${i[2]}"]`)
            .classList.add(i[0][1]);
      }
    });
  };
  
  playBtn.addEventListener("click", () => {
    if (playBtn.innerHTML == playIcon) {
      startGame = setInterval(turn, 250);
      playBtn.innerHTML = pauseIcon;
    } else {
      clearInterval(startGame);
      playBtn.innerHTML = playIcon;
    }
  });
  
  shuffleBtn.addEventListener("click", () => {
    playBtn.innerHTML = playIcon;
    clearFields();
    randomizeField();
  });
  
  clearBtn.addEventListener("click", () => {
    playBtn.innerHTML = playIcon;
    clearFields();
  });
  