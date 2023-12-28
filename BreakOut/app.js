// variable declaration
const grid = document.querySelector('.grid');
const score = document.querySelector('#score');
// custom variable
const blockWidth = 100;
const blockHeight = 20;
const userPosition = [230, 10];
let currentPosition = userPosition;
const boardWidth = 560;
const boardHeight = 300;
const ballPosition = [270, 30];
let currentBallPosition = ballPosition;
let timerId
const ballDiameter = 20;
let xDirection = 2;
let yDirection = 2;
let result = 0;

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

// add blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
];

// draw my blocks
function addBlocks () {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}
addBlocks();

// user add
    const user = document.createElement('div');
    user.classList.add('user');
    drawPosition()
    grid.appendChild(user);

// global draw position
function drawPosition () {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}
// draw ball position
function drawBallPosition () {
    ball.style.left = currentBallPosition[0] + 'px';
    ball.style.bottom =  currentBallPosition[1] + 'px';
}
//move user
function moveUser (e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0]> 0) {
                currentPosition[0] -= 10
                drawPosition();
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0]< boardWidth-blockWidth) {
                currentPosition[0] += 10
                drawPosition();
            }
            break;
    }
}

document.addEventListener('keydown', moveUser);

// add ball
const ball = document.createElement('div');
    ball.classList.add('ball');
    drawBallPosition()
    grid.appendChild(ball);

// move ball
function moveBall () {
    currentBallPosition[0] += xDirection;
    currentBallPosition[1] += yDirection;
    drawBallPosition();
    checkForCollision()
}

timerId = setInterval(moveBall, 25);

// check for collisions
function checkForCollision () {
    // check for block collisions
    for (let i = 0; i < blocks.length; i++) {
        if (
            (currentBallPosition[0] > blocks[i].bottomLeft[0] && currentBallPosition[0] < blocks[i].bottomRight[0]) &&
            ((currentBallPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && currentBallPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks =  Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i, 1);
            result++;
            score.textContent=result;

            //check for win
            if (blocks.length===0) {
                score.textContent = 'YOU WIN!';
                ball.style.animation = 'none';
                clearInterval(timerId);
                document.removeEventListener('keydown', moveUser)
            }
        }
        
    }

    // check for wall collisions
    if (currentBallPosition[0] >= (boardWidth-ballDiameter) || 
        currentBallPosition[1] >= (boardHeight-ballDiameter) ||
        currentBallPosition[0] <= 0
    ) {
        changeDirection();
    }

    // check for user collisions
    if (
        (currentBallPosition[0] > currentPosition[0] && currentBallPosition[0]< currentPosition[0] + blockWidth) &&
        (currentBallPosition[1] > currentPosition[1] && currentBallPosition[1]< currentPosition[1] + blockHeight) 
    ) {
        changeDirection()
    }

    // check for game over 
    if (currentBallPosition[1]<=0) {
        clearInterval(timerId);
        ball.style.animation = 'none';
        score.innerHTML = 'You lose!';
        document.removeEventListener('keydown', moveUser);
    }
}

// change ball direction

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        return yDirection = -2;
    }
    if (xDirection === 2 && yDirection === -2) {
        return xDirection = -2;
    }
    if (xDirection === -2 && yDirection === -2) {
        return yDirection = 2;
    }
    if (xDirection === -2 && yDirection === 2) {
        return xDirection = 2;
    }

}