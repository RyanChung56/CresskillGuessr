document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.getElementById("start-button");
  const gameScreen = document.getElementById("game-screen");
  const guessButton = document.getElementById("guess-button");
  const restartButton = document.getElementById("restart-button");
  const finalScoreElement = document.getElementById("final-score");
  let scoreCount = document.getElementById("score-count");
  let strikeCount = document.getElementById("strike-count");
  let gameOverScreen = document.getElementById("game-over-screen");
  let guessInput = document.getElementById("location-input");
  let successMessage = document.getElementById("success-message");
  let errorMessage = document.getElementById("error-message");
  
  startButton.addEventListener("click", function() {
    startGame();
  });

  guessButton.addEventListener("click", function() {
    checkGuess();
  });

  restartButton.addEventListener("click", function() {
    restartGame();
  });

  var maxStrikes = 3;
  var strikes = 0;
  var score = 0;
  var imageCount = 17;
  var currentImageIndex = 0;
  var images = [
    {
      image: 'Image1.jpg',
      location: 'B-9',
    },
    {
      image: 'Image2.jpg',
      location: 'C-15',
    },
    {
      image: 'Image3.jpg',
      location: 'B-WING',
    },
    {
      image: 'Image4.jpg',
      location: 'B-WING',
    },
    {
      image: 'Image5.jpg',
      location: 'D-WING',
    },
    {
      image: 'Image6.jpg',
      location: 'C-WING',
    },
    {
      image: 'Image7.jpg',
      location: 'D-1',
    },
    {
      image: 'Image8.jpg',
      location: 'MEDIA CENTER',
    },
    {
      image: 'Image9.jpg',
      location: 'ENTRANCE',
    },
    {
      image: 'Image10.jpg',
      location: 'C-5',
    },
    {
      image: 'Image11.jpg',
      location: 'CAFE',
    },
    {
      image: 'Image12.jpg',
      location: 'KITCHEN',
    },
    {
      image: 'Image13.jpg',
      location: 'UPPER CAFE',
    },
    {
      image: 'Image14.jpg',
      location: 'CAFE',
    },
    {
      image: 'Image15.jpg',
      location: 'THEATER',
    },
    {
      image: 'Image16.jpg',
      location: 'A-WING',
    },
    {
      image: 'Image17.jpg',
      location: 'GYM',
    },
  ];

  function startGame() {
    var startScreen = document.getElementById('start-screen');
    var gameScreen = document.getElementById('game-screen');
    var guessButton = document.getElementById('guess-button');

    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    var mapImage = document.querySelector('.map');
    var locationInput = document.getElementById('location-input');
    var strikeContainer = document.getElementById('strike-container');
    var strikeCount = document.getElementById('strike-count');
    var scoreCount = document.getElementById('score-count');

    locationInput.value = '';
    strikes = 0;
    score = 0;
    strikeCount.textContent = strikes;
    scoreCount.textContent = score;

    currentImageIndex = Math.floor(Math.random() * imageCount);

    var currentImage = images[currentImageIndex];
    var leftImage = document.querySelector('.left-image');
    leftImage.src = currentImage.image;

    if (guessButton) {
      guessButton.style.backgroundColor = 'gray';
    }

    if (mapImage) {
      mapImage.addEventListener('click', checkGuess);
    }

    locationInput.removeEventListener('keydown', handleKeyPress);

    locationInput.addEventListener('keydown', handleKeyPress);

  }

  function checkGuess() {
    var enteredLocation = guessInput.value;

    if (enteredLocation.toUpperCase() === images[currentImageIndex].location) {
      console.log('Guess is correct!');
      strikeCount.textContent = strikes;
      score++;
      scoreCount.textContent = score;

      successMessage.textContent = 'SUCCESS!';
      successMessage.style.color = 'green';
      successMessage.style.fontSize = '48px';

      setTimeout(function() {
        successMessage.textContent = '';
        if (score >= 5) {
          console.log('Game Over! Score:', score);
          endGame();
        } else {
          nextImage();
        }
      }, 2000); 
    } else {
      strikes++; 
      strikeCount.textContent = strikes;

      errorMessage.textContent = 'Incorrect Guess!';
      errorMessage.style.color = 'red';
      errorMessage.style.fontSize = '48px';

      setTimeout(function() {
        errorMessage.textContent = '';
        if (strikes >= maxStrikes) {
          console.log('Game Over! Score:', score);
          endGame();
        } else 
        {
          nextImage();
        }
        
      }, 2000);
      }

    guessInput.value = '';
  }

  function endGame() {
    gameScreen.style.display = 'none';
    gameOverScreen.style.display = 'block';
    finalScoreElement.textContent = scoreCount.textContent;
  }
  
  function restartGame() {
  gameScreen.style.display = 'block';
  gameOverScreen.style.display = 'none';

  let mapImage = document.querySelector('.map');
  let locationInput = document.getElementById('location-input');
  if (mapImage) {
    mapImage.removeEventListener('click', checkGuess);
  }
  
  
  locationInput.removeEventListener('keydown', handleKeyPress);

  startGame();
}

  
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      checkGuess();
    }
  }
  
  function nextImage() {
    currentImageIndex++;

    if (currentImageIndex < imageCount) {
      var currentImage = images[currentImageIndex];
      var leftImage = document.querySelector('.left-image');
      leftImage.src = currentImage.image;

    } else {
      console.log('Game Over! Score:', score);
      endGame();
    }
  }
});
