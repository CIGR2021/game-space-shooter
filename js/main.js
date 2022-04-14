// const moveUp = () => {
  
// }
const yourShip = document.querySelector('.hero');
const playArea = document.querySelector('.play-area');

const moveUp = () => {
  let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
  if(topPosition === '0px') return;
  let position = parseInt(topPosition);
  console.log('Move Up', position);
  position -= 50;
  yourShip.style.top = `${position}px`;
}

const moveDown = () => {
  let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
  if(topPosition === '550px') return;
  let position = parseInt(topPosition);
  console.log('Move Down', position);
  position += 50;
  yourShip.style.top = `${position}px`;
}

const moveLaser = () => {
  console.log('Move Laser');
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

const fireLaser = () => {
  let laser = createLaserElement();
  playArea.appendChild(laser);
  moveLaser();
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

window.addEventListener('keydown', flyShip);