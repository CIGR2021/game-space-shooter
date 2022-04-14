const yourShip = document.querySelector('.hero');
const playArea = document.querySelector('.play-area');
const MOVE_SPEED = 50;
const aliensImg = ['img/monster-1.png', 'img/monster-2.png', 'img/monster-3.png'];
const startButton = document.querySelector('.start-button');
let alienInterval;

const moveUp = () => {
  let topPosition = getComputedStyle(yourShip).getPropertyValue('top');

  if(topPosition === '0px') return;
  
  let position = parseInt(topPosition);
  
  position -= MOVE_SPEED;
  yourShip.style.top = `${position}px`;
}

const moveDown = () => {
  let topPosition = getComputedStyle(yourShip).getPropertyValue('top');

  if(topPosition === '550px') return;
  
  let position = parseInt(topPosition);
  
  position += MOVE_SPEED;
  yourShip.style.top = `${position}px`;
}

const moveLaser = (laser) => {
  const TEN_MILE_SECONDS = 10;
  const POSITION = 340;

  let laserInterval = setInterval(() => {
    let xPosition = parseInt(laser.style.left);
    let aliens = document.querySelectorAll('.alien');

    aliens.forEach((alien) => { //comparando se cada alien foi atingido, caso sim, troca a imagem
      if(checkLaserCollision(laser, alien)) {
          alien.src = 'img/explosion.png';
          alien.classList.remove('alien');
          alien.classList.add('dead-alien');
      }
    });

    if(xPosition === POSITION) {
        laser.remove();
    } else {
        laser.style.left = `${xPosition + 8}px`;
    };
  }, TEN_MILE_SECONDS);
}

const moveAlien = () => {
  const THIRTY_MILE_SECONDS = 30;
  const POSITION = 50;

  let moveAlienInterval = setInterval(() => {
    let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
    
    if(xPosition <= POSITION) {
        if(Array.from(alien.classList).includes('dead-alien')) {
            alien.remove();
        } else {
            gameOver();
        }
    } else {
        alien.style.left = `${xPosition - 4}px`;
    };
  }, THIRTY_MILE_SECONDS);
}

const checkLaserCollision = () => {
  let laserTop = parseInt(laser.style.top);
  let laserLeft = parseInt(laser.style.left);
  let laserBottom = laserTop - 20;
  let alienTop = parseInt(alien.style.top);
  let alienLeft = parseInt(alien.style.left);
  let alienBottom = alienTop - 30;

  if(laserLeft != 340 && laserLeft + 40 >= alienLeft) {
      if(laserTop <= alienTop && laserTop >= alienBottom) {
          return true;
      } else {
          return false;
      }
  } else {
      return false;
  }
}

const createLaserElement = () => {
  let xPosition = parseInt(getComputedStyle(yourShip).getPropertyValue('left'));
  let yPosition = parseInt(getComputedStyle(yourShip).getPropertyValue('top'));
  let newLaser = document.createElement('img');
  
  newLaser.src = '/img/shoot.png';
  newLaser.classList.add('laser');
  newLaser.style.left = `${xPosition}px`;
  newLaser.style.top = `${yPosition - 10}px`;

  return newLaser;
}

const createAliens = () => {
  let newAlien = document.createElement('img');
  let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; //sorteio de imagens

  newAlien.src = alienSprite;
  newAlien.classList.add('alien');
  newAlien.classList.add('alien-transition');
  newAlien.style.left = '370px';
  newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
  playArea.appendChild(newAlien);
  
  moveAlien(newAlien);
}

const fireLaser = () => {
  let laser = createLaserElement();
  playArea.appendChild(laser);
  moveLaser(laser);
}

const flyShip = (event) => {
  switch(event.key) {
    case 'ArrowUp':
    case 'w':
      event.preventDefault();
      moveUp();
      break;
    case 'ArrowDown':
    case 's':
      event.preventDefault();
      moveDown();
      break;
    case ' ':
    case 'd':
      event.preventDefault();
      fireLaser();
      break;
  }
}

const playGame = () => {
  const TWO_SECONDS = 2000;

  startButton.style.display = 'none';
  instructionsText.style.display = 'none';
  window.addEventListener('keydown', flyShip);

  alienInterval = setInterval(() => {
      createAliens();
  }, TWO_SECONDS);
}

const gameOver = () => {
  window.removeEventListener('keydown', flyShip);
  
  clearInterval(alienInterval);

  let aliens = document.querySelectorAll('.alien');
  let lasers = document.querySelectorAll('.laser');

  aliens.forEach((alien) => alien.remove());
  lasers.forEach((laser) => laser.remove());
  
  setTimeout(() => {
      alert('game over!');
      yourShip.style.top = "250px";
      startButton.style.display = "block";
      instructionsText.style.display = "block";
  });
}

startButton.addEventListener('click', (event) => playGame());

window.addEventListener('keydown', flyShip);