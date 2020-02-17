document.addEventListener("DOMContentLoaded", function () {
  let currentPlayer = 'x';
  let winStatus = false;
  let winner = '';
  let bot = false;
  openModal('start', '');


  // Modal
  function openModal(status, winner) {
    clearField();
    let modal = document.querySelector('#gameModal');
    let startGame = document.querySelector('#start');
    let endGame = document.querySelector('#end');
    modal.style.display = "block";
    switch (status) {
      case 'start':
        startGame.style.display = 'block';
        endGame.style.display = 'none';
        break;
      case 'draw':
        startGame.style.display = 'none';
        endGame.style.display = 'block';
        document.querySelector('.result').innerHTML = 'draw';
        break;
      case 'winner':
        startGame.style.display = 'none';
        endGame.style.display = 'block';
        document.querySelector('.result').innerHTML = 'Player ' + winner + ' has won the round';
        break;
    }

    // Modal Start
    document.querySelector('.home').onclick = function (event) {
      modal.style.display = "none";
      openModal('start', '');
    };

    // start new round
    document.querySelector('.startNewGame').onclick = function (event) {
      modal.style.display = "none";
    };

    // initial game start
    document.querySelector('.startGame').onclick = function (event) {
      preparations();
      modal.style.display = "none";
      document.querySelector('.turn').style.display = 'block';
      document.querySelector('.currentPlayer').innerHTML = currentPlayer;
    };
  }

  function preparations() {
    if (document.querySelector('#pvb').checked) {
      bot = true;
      let startPlayer = Math.floor(Math.random() * 2) + 1;
      // launch Berty if he is player 1
      if (startPlayer === 1) {
        launchBot();
      }
    }
  }

  // click listener
  document.querySelector('.gameWrapper').addEventListener('click', function (event) {
    if (event.target.classList.length === 1) {
      event.target.classList.add(currentPlayer);
      checkWinner();
      changePlayer();
      triggerBot();
    } else {
      snackBar();
    }
  });

  function getField() {
    let allFields = [];
    allFields.forEach.call(document.querySelectorAll('.gameField'), function (element) {
      allFields.push(element);
    });
    return allFields;
  }

  // change current Player
  function changePlayer() {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    document.querySelector('.currentPlayer').innerHTML = currentPlayer;
  }

  // check win conditions
  function checkWinner() {
    if (areEqual(0, 1, 2)) {
      winStatus = true;
    } else if (areEqual(3, 4, 5)) {
      winStatus = true;
    } else if (areEqual(6, 7, 8)) {
      winStatus = true;
    } else if (areEqual(0, 3, 6)) {
      winStatus = true;
    } else if (areEqual(1, 4, 7)) {
      winStatus = true;
    } else if (areEqual(2, 5, 8)) {
      winStatus = true;
    } else if (areEqual(0, 4, 8)) {
      winStatus = true;
    } else if (areEqual(2, 4, 6)) {
      winStatus = true;
    } else if (checkDraw()) {
      clearField();
      openModal('draw', '');
    }
    if (winStatus) {
      openModal('winner', winner);
      clearField();
    }
  }

  function checkDraw() {
    let allFields = getField();
    let counter = 0;
    allFields.forEach((field) => {
      if (field.classList[1]) {
        counter++;
      }
    });
    return counter === 9;
  }

  function areEqual(a, b, c) {
    let allFields = getField();

    if (allFields[a].classList[1] === 'x' && allFields[b].classList[1] === 'x' && allFields[c].classList[1] === 'x') {
      winner = 'x';
      return true;
    } else if (allFields[a].classList[1] === 'o' && allFields[b].classList[1] === 'o' && allFields[c].classList[1] === 'o') {
      winner = 'o';
      return true;
    }
    return false;
  }

  function twoInRow(a, b, c) {
    let allFields = getField();

    if (allFields[a].classList[1] === 'x' && allFields[b].classList[1] === 'x' && allFields[c].classList[1] === ''
      || allFields[c].classList[1] === 'x' && allFields[b].classList[1] === 'x' && allFields[a].classList[1] === ''
      || allFields[a].classList[1] === 'x' && allFields[c].classList[1] === 'x' && allFields[b].classList[1] === '') {
      return true;
    } else if (allFields[a].classList[1] === 'o' && allFields[b].classList[1] === 'o'
      || allFields[c].classList[1] === 'o' && allFields[b].classList[1] === 'o'
      || allFields[a].classList[1] === 'o' && allFields[c].classList[1] === 'o') {
      return true;
    }
    return false;
  }

  function clearField() {
    winner = '';
    winStatus = false;
    currentPlayer = 'x';
    document.querySelectorAll('.gameField').forEach((element) => {
      if (element.classList[1] === 'x') {
        element.classList.remove('x');
      } else {
        element.classList.remove('o');
      }
    });
  }

  function snackBar() {
    let snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
    setTimeout(function () {
      snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
  }

  // +++++++++++++++++++++++ Bot Berty ++++++++++++++++++++++++++++++++++++++++++++++++++
  function launchBot() {
    currentPlayer = 'x';
    let allFields = getField();
    let corner = Math.floor(Math.random() * 4) + 1;
    switch (corner) {
      case 1:
        allFields[0].classList.add(currentPlayer);
        break;
      case 2:
        allFields[2].classList.add(currentPlayer);
        break;
      case 3:
        allFields[6].classList.add(currentPlayer);
        break;
      case 4:
        allFields[8].classList.add(currentPlayer);
        break;
    }
    changePlayer();
  }

  function triggerBot() {
    console.log('trigger bot');
    let allFields = getField();
    if (enemyIsWinning()) {

    } else {
      let field = Math.floor(Math.random() * 8) + 1;
      try {
        allFields[field].classList.add(currentPlayer);
      } catch (e) {
        allFields[field + 1].classList.add(currentPlayer);
      }
    }
    changePlayer();
  }

  function enemyIsWinning(){
    if (twoInRow(0, 1, 2)) {
      console.log('zeile 1');
    } else if (twoInRow(3, 4, 5)) {
      console.log('zeile 2');
    } else if (twoInRow(6, 7, 8)) {
      console.log('zeile 3');
    } else if (twoInRow(0, 3, 6)) {
      console.log('reihe 1');
    } else if (twoInRow(1, 4, 7)) {
      console.log('reihe 2');
    } else if (twoInRow(2, 5, 8)) {
      console.log('reihe 3');
    } else if (twoInRow(0, 4, 8)) {
      console.log('diagonal 1');
    } else if (twoInRow(2, 4, 6)) {
      console.log('diagonal 2');
    }
  }
});
