document.addEventListener("DOMContentLoaded", function () {
  let currentPlayer = 'x';
  let winStatus = false;
  let winner = '';
  openModal('start', '');

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

    document.querySelector('.home').onclick = function (event) {
      modal.style.display = "none";
      openModal('start', '');
    };

    document.querySelector('.startNewGame').onclick = function (event) {
      modal.style.display = "none";
    };

    document.querySelector('.startGame').onclick = function (event) {
      modal.style.display = "none";
    };
  }

    document.querySelector('.gameWrapper').addEventListener('click', function (event) {
      if (event.target.classList.length === 1) {
        event.target.classList.add(currentPlayer);
        checkWinner();
        changePlayer();
      } else {
        snackBar();
      }
   });

  function changePlayer() {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  }

  function checkWinner() {
    let allFields = [];
    allFields.forEach.call(document.querySelectorAll('.gameField'), function (element) {
      allFields.push(element);
    });

    if (areEqual(allFields[0].classList[1], allFields[1].classList[1], allFields[2].classList[1])) {
      winStatus = true;
    } else if (areEqual(allFields[3].classList[1], allFields[4].classList[1], allFields[5].classList[1])) {
      winStatus = true;
    } else if (areEqual(allFields[6].classList[1], allFields[7].classList[1], allFields[8].classList[1])) {
      winStatus = true;
    } else if (areEqual(allFields[0].classList[1], allFields[3].classList[1], allFields[6].classList[1])) {
      winStatus = true;
    } else if (areEqual(allFields[1].classList[1], allFields[4].classList[1], allFields[7].classList[1])) {
      winStatus = true;
    } else if (areEqual(allFields[2].classList[1], allFields[5].classList[1], allFields[8].classList[1])) {
      winStatus = true;
    } else if (areEqual(allFields[0].classList[1], allFields[4].classList[1], allFields[8].classList[1])) {
      winStatus = true;
    } else if (areEqual(allFields[2].classList[1], allFields[4].classList[1], allFields[6].classList[1])) {
      winStatus = true;
    } else if (checkDraw(allFields)) {
      clearField();
      openModal('draw', '');
    }
    if (winStatus) {
      openModal('winner', winner);
      clearField();
    }
  }

  function checkDraw(all) {
    let counter = 1;
    all.forEach((field) => {
      if (field.classList[1]) {
        counter++;
      }
    });
    if (counter === 9) {
      return true;
    }
    return false;
  }

  function areEqual(a, b, c) {
    if (a === 'x' && b === 'x' && c === 'x') {
      winner = 'x';
      return true;
    } else if (a === 'o' && b === 'o' && c === 'o') {
      winner = 'o';
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
});
