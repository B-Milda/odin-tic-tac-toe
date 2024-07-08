// Objekt hráče

const Player = {
  symbol: "X",
  id: 1,
  color: "blue",
  name1: "",
  name2: "",
  name: function () {
    if (this.id == 1) {
      return this.name1;
    } else {
      return this.name2;
    }
  },
  switch: function () {
    if (this.id == 1) {
      this.symbol = "O";
      this.id = 2;
      this.color = "red";
    } else {
      this.symbol = "X";
      this.id = 1;
      this.color = "blue";
    }
  },
};

// Objekt Hry

const Game = {
  // Herní Plán
  gameboard: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],

  // Hrát
  play: function (row, column) {
    this.gameboard[row][column] = Player.symbol;

    const indexes = [];
    for (i = 0; i < this.gameboard.length; i++) {
      for (u = 0; u < this.gameboard[i].length; u++) {
        if (this.gameboard[i][u] === Player.symbol) indexes.push([i, u]);
      }
    }

    for (let i = 0; i < this.winComb.length; i++) {
      let winCondition = true;
      for (let j = 0; j < this.winComb[i].length; j++) {
        const [row, column] = this.winComb[i][j];
        if (!indexes.some(([r, c]) => r === row && c === column)) {
          winCondition = false;
          break;
        }
      }

      // Výhra

      if (winCondition) {
        document.querySelector("#anName").innerText = Player.name();
        document.querySelector("#anncell").innerText = Player.symbol;
        document.querySelector("#anncell").style.backgroundColor = Player.color;
        document.querySelector("#announcer").style.display = "flex";
        document.querySelector("#contnames").style.display = "flex";
      }
    }

    // Remíza

    const ordered = [];
    let zeroCondition = true;
    loop1: for (let i = 0; i < this.gameboard.length; i++) {
      for (let u = 0; u < this.gameboard[i].length; u++) {
        ordered.push(this.gameboard[i][u]);
        if (ordered.some((x) => x == 0)) {
          zeroCondition = false;
          break loop1;
        }
      }
    }
    if (zeroCondition) {
      document.querySelector("#draw").style.display = "flex";
      document.querySelector("#contnames").style.display = "flex";
      document.querySelector("#announc>span").innerText = "Začíná: ";
    }

    // DOM Elementy

    document.querySelector("#contnames").style.display = "none";
    document.querySelector("#announc>span").innerText = "Je na řadě: ";
  },

  // Výherní Kombinace

  winComb: [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ],

  // Hrát znovu

  again: function () {
    document.querySelector("#contnames").style.display = "flex";
    document.querySelector("#announcer").style.display = "none";
    document.querySelector("#draw").style.display = "none";
    this.gameboard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    document.querySelector("#gridcont").innerHTML = "";
    DisplayGrid.refresh();
  },
};

// Konec Objektu Hry

// Objekt Zobrazení Plánu

// Pořadí Herního Plánu
const DisplayGrid = {
  order: [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ],

  // Refresh Herního Plánu
  refresh: function () {
    let gridindex = 0;
    for (let i = 0; i < Game.gameboard.length; i++) {
      for (let u = 0; u < Game.gameboard[i].length; u++) {
        const cell = document.createElement("div");
        const [a, b] = this.order[gridindex];

        cell.addEventListener("click", () => {
          if (Game.gameboard[a][b] == 0) {
            Game.play(a, b);
            cell.style.backgroundColor = Player.color;
            cell.innerText = Player.symbol;
            Player.switch();
            document.querySelector("#startname").innerText = Player.name();
            document.querySelector("#acell").style.backgroundColor =
              Player.color;
            document.querySelector("#acell").innerText = Player.symbol;
          } else {
            alert("Pole je již obsazeno!");
          }
        });
        document.querySelector("#gridcont").appendChild(cell);
        gridindex++;
      }
    }
  },
};

// Konec Objektu Zobrazení Plánu

// Propsání Jména po Zadání

document.querySelector("#fname").addEventListener("focusout", () => {
  Player.name1 = document.querySelector("#fname").value;
  document.querySelector("#startname").innerText = Player.name();
});

document.querySelector("#sname").addEventListener("focusout", () => {
  Player.name2 = document.querySelector("#sname").value;
});

// Přepínání Tématu

let initheme = true;

document.querySelector("#themeswitch").addEventListener("click", () => {
  if (initheme) {
    document.documentElement.style.setProperty("--color2", "white");
    document.documentElement.style.setProperty("--color1", "black");
    document.documentElement.style.setProperty("--color3", "rgba(0,0,0,0.7)");
    document.documentElement.style.setProperty(
      "--color4",
      "rgba(255,255,255,0.7)"
    );
    initheme = false;
  } else {
    document.documentElement.style.setProperty("--color2", "black");
    document.documentElement.style.setProperty("--color1", "white");
    document.documentElement.style.setProperty(
      "--color3",
      "rgba(255,255,255,0.7)"
    );
    document.documentElement.style.setProperty("--color4", "rgba(0,0,0,0.7)");
    initheme = true;
  }
});

// Přepínání Symbolu a Barvy

document.querySelector("#fcell").addEventListener("click", () => {
  document.querySelector("#scell").style.backgroundColor = Player.color;
  document.querySelector("#scell").innerText = Player.symbol;
  Player.switch();

  document.querySelector("#fcell").style.backgroundColor = Player.color;
  document.querySelector("#fcell").innerText = Player.symbol;
  document.querySelector("#acell").style.backgroundColor = Player.color;
  document.querySelector("#acell").innerText = Player.symbol;

  // Výměna jmen
  const PlayerNameSwitch = Player.name1;
  Player.name1 = Player.name2;
  Player.name2 = PlayerNameSwitch;
});

// Počáteční načtení Tabulky

DisplayGrid.refresh();
