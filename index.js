var wordlist = getWordList();
var answer = wordlist[Math.floor(Math.random() * wordlist.length)];
var row = 0;
var col = 0;
var gameOver = false;

document.addEventListener("keypress", keyPressHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
populateAllWords();

function keyPressHandler(e) {
  if (gameOver) {
    return;
  }
  if (col == 5) {
    if (e.code == "Enter") {
      var word = '';
      for (var c = 0; c < 5; c++) {
        var box = document.getElementsByClassName("box")[(row) * 5 + c];
        word += box.textContent;
      }
      if (!allWords.includes(word)) {
        var niwl = document.getElementsByClassName("notInWordList")[0];
        niwl.classList.remove("wordListHide");
        setTimeout(() => niwl.classList.add("wordListHide"), 1500);
        return;
      }
      col = 0;
      row++;

      var answerLeft = answer;

      for (var c = 0; c < 5; c++) {
        var box = document.getElementsByClassName("box")[(row - 1) * 5 + c];
        var boxLetter = box.textContent;
        if (boxLetter == answer.charAt(c)) {
          answerLeft = answerLeft.replace(boxLetter, '');
        }
      }

      for (var c = 0; c < 5; c++) {
        var box = document.getElementsByClassName("box")[(row - 1) * 5 + c];
        var boxLetter = box.textContent;
        var key = document.getElementsByClassName(boxLetter)[0];

        if (boxLetter == answer.charAt(c)) {
          box.classList.add("boxGreen");
          key.classList.add("keyGreen");
          key.classList.remove("keyYellow");
          key.classList.remove("keyGray");

        } else if (answerLeft.includes(boxLetter)) {
          box.classList.add("boxYellow");
          if (!key.classList.contains("keyGreen")) {
            key.classList.add("keyYellow");
            key.classList.remove("keyGray");
          }
          answerLeft = answerLeft.replace(boxLetter, '');

        } else {
          box.classList.add("boxGray");
          if (!key.classList.contains("keyYellow") && !key.classList.contains("keyGreen")) {
            key.classList.add("keyGray");
          }
        }
      }

      if (answerLeft == '') {
        var win = document.getElementsByClassName("win")[0];
        win.classList.remove("winHide");
        gameOver = true;
      } else if (row == 6) {
        var lose = document.getElementsByClassName("lose")[0];
        lose.classList.remove("loseHide");
        document.getElementsByClassName("wordWas")[0].textContent = "The word was " + answer + ".";

      }
    }
    return;
  }

  if (isLetter(e.key)) {
    document.getElementsByClassName("box")[row * 5 + col].textContent = e.key.toLowerCase();

    col++;
  }
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function keyDownHandler(e) {
  if (col == 0) {
    return;
  }
  if (e.code == "Backspace") {
    document.getElementsByClassName("box")[row * 5 + col - 1].textContent = '';
    col--

  }
}

const keys = document.querySelectorAll('.key');

for (var i = 0; i < keys.length; i++) {
  keys[i].addEventListener('click', function(event) {
    keyPressHandler({
      key: event.target.innerText
    });
  });
}

const enter = document.querySelectorAll('.enter');
enter[0].addEventListener('click', function(event) {
  keyPressHandler({
    code: "Enter"
  });
});

const backspace = document.querySelectorAll('.delete');
backspace[0].addEventListener('click', function(event) {
  keyDownHandler({
    code: "Backspace"
  });
});

const darkMode = document.querySelectorAll('.darkModeButton');
darkMode[0].addEventListener('click', function(event) {
  const body = document.querySelectorAll('body');
  body[0].classList.add("dark");
  body[0].classList.remove("light");
});

const lightMode = document.querySelectorAll('.lightModeButton');
lightMode[0].addEventListener('click', function(event) {
  const body = document.querySelectorAll('body');
  body[0].classList.remove("dark");
  body[0].classList.add("light");
});

const highContrastMode = document.querySelectorAll('.highContrastModeButton');
highContrastMode[0].addEventListener('click', function(event) {
  const body = document.querySelectorAll('body');
  body[0].classList.add("highContrast");
  body[0].classList.remove("lowContrast");
});

const lowContrastMode = document.querySelectorAll('.lowContrastModeButton');
lowContrastMode[0].addEventListener('click', function(event) {
  const body = document.querySelectorAll('body');
  body[0].classList.remove("highContrast");
  body[0].classList.add("lowContrast");
});

//Word List:

function getWordList() {
  return [
    'block',
    'spawn',
    'witch',
    'biome',
    'armor',
    'build',
    'drops',
    'grief',
    'tools',
    'steve',
    'magma',
    'forge',
    'anvil',
    'miner',
    'shift',
    'smelt',
    'smite',
    'torch',
    'steak',
    'trade',
    'shear',
    'sheep',
    'mason',
    'sneak',
    'breed',
    'hacks',
    'chunk',
    'coord',
    'coral',
    'craft',
    'caves',
    'ender',
    'apple',
    'golem',
    'melee',
    'farms',
    'ocean',
    'pearl',
    'picks',
    'seeds',
    'stack',
    'admin',
    'ghast',
    'noobs',
    'skins',
    'troll',
    'dupes',
    'arrow',
    'books',
    'bones',
    'chest',
    'clock',
    'death',
    'flint',
    'stone',
    'trees',
    'blaze',
    'slime',
    'honey',
    'ingot',
    'bread',
    'cakes',
    'cocoa',
    'beans',
    'melon',
    'sugar',
    'world',
    'birch',
    'bowls',
    'brick',
    'boots',
    'sword',
    'fence',
    'gates',
    'ferns',
    'fuels',
    'glass',
    'coals',
    'berry',
    'clays',
    'bales',
    'wheat',
    'stair',
    'tunic',
    'lilac',
    'poppy',
    'carts',
    'slice',
    'plank',
    'tulip',
    'paper',
    'peony',
    'rails',
    'signs',
    'igloo',
    'stick',
    'squid',
    'allay',
    'vines',
    'water',
    'doors',
    'llama',
    'flesh',
    'stews',
    'beets',
    '',
  ];
}

var allWords;

function populateAllWords() {
  // read text from URL location
  var request = new XMLHttpRequest();
  request.open('GET', 'https://raw.githubusercontent.com/tabatkins/wordle-list/main/words', true);
  request.send(null);
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var type = request.getResponseHeader('Content-Type');
      if (type.indexOf("text") !== 1) {
        allWords = request.responseText.split('\n');
      }
    }
  }
}
