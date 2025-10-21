const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let fruit;

function setup() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();
    
    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            fruit.pickLocation();
        }

        snake.checkCollision();
        document.querySelector('.score').innerText = snake.total;
    }, 100);
}

function randomPosition() {
    return Math.floor(Math.random() * rows) * scale;
}

class Snake {
    constructor() {
        this.body = [{x: 0, y: 0}];
        this.xSpeed = scale * 1;
        this.ySpeed = 0;
        this.total = 0;
    }

    draw() {
        ctx.fillStyle = "green";
        for (let i = 0; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, scale, scale);
        }
    }

    update() {
        const head = {x: this.body[0].x + this.xSpeed, y: this.body[0].y + this.ySpeed};
        this.body.unshift(head);
        if (this.body.length > this.total) {
            this.body.pop();
        }
    }

    changeDirection(direction) {
        switch(direction) {
            case 'Up':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = -scale * 1;
                }
                break;
            case 'Down':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = scale * 1;
                }
                break;
            case 'Left':
                if (this.xSpeed === 0) {
                    this.xSpeed = -scale * 1;
                    this.ySpeed = 0;
                }
                break;
            case 'Right':
                if (this.xSpeed === 0) {
                    this.xSpeed = scale * 1;
                    this.ySpeed = 0;
                }
                break;
        }
    }

    eat(fruit) {
        if (this.body[0].x === fruit.x && this.body[0].y === fruit.y) {
            this.total++;
            return true;
        }
        return false;
    }

    checkCollision() {
        for (let i = 1; i < this.body.length; i++) {
            if (this.body[i].x === this.body[0].x && this.body[i].y === this.body[0].y) {
                this.total = 0;
                this.body = [{x: 0, y: 0}];
                break;
            }
        }
        const hitLeftWall = this.body[0].x < 0;
        const hitRightWall = this.body[0].x > canvas.width - scale;
        const hitTopWall = this.body[0].y < 0;
        const hitBottomWall = this.body[0].y > canvas.height - scale;

        if (hitLeftWall || hitRightWall || hitTopWall || hitBottomWall) {
            this.total = 0;
            this.body = [{x: 0, y: 0}];
        }
    }
}

class Fruit {
    constructor() {
        this.x = randomPosition();
        this.y = randomPosition();
    }

    pickLocation() {
        this.x = randomPosition();
        this.y = randomPosition();
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, scale, scale);
    }
}

setup();

window.addEventListener('keydown', (e) => {
    const direction = e.key.replace('Arrow', '');
    snake.changeDirection(direction);
});