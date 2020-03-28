
let canvas;
let context;
let mouse = {};
let keyboard = [];
let entities = [];
let running = false;

let timer = 0;
let cooldown = 0;
let eyeX;
let eyeY;
let windspeed = 5;

window.onload = init;
window.onresize = resize;
window.onkeydown = keydown;
window.onkeyup = keyup;

function init() {
	canvas = document.getElementById('viewport');
	context = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.onmousemove = mousemove;
	canvas.onmousedown = mousedown;
	canvas.onmouseup = mouseup;
	requestAnimationFrame(loop);

	eyeX = canvas.width / 2;
	eyeY = canvas.height / 2;
}

function loop() {
	if (running) {
		context.fillStyle = 'rgba(255, 255, 255, 0.5)';
		context.fillRect(0, 0, canvas.width, canvas.height);

		if (keyboard[37]) eyeX -= windspeed;
		if (keyboard[38]) eyeY -= windspeed;
		if (keyboard[39]) eyeX += windspeed;
		if (keyboard[40]) eyeY += windspeed;

		timer += 1;
		if (timer > cooldown) {
			for (let i = 0; i < 2; i++) {
				entities.push(new HurricaneParticle(
					randi(5, 20),
					randi(10, canvas.width),
					randi(1, 10),
					[0, randi(0, 255), 255, 1],
					randi(0, Math.PI * 2)
				));
			}
			timer = 0;
		}

		entities.forEach((value, index, array) => {
			value.update();
			value.render(context);

			if (!value.alive) array.splice(index, 1);
		});
	}
	requestAnimationFrame(loop);
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function keydown(e) {
	keyboard[e.keyCode] = true;
}

function keyup(e) {
	keyboard[e.keyCode] = false;
}

function mousemove(e) {
	mouse.x = e.x;
	mouse.y = e.y;
}

function mousedown() {
	mouse.down = true;
	running = true;
	document.getElementById('start').style.visibility = 'hidden';
}

function mouseup() {
	mouse.down = false;
}

function randi(a, b) {
	return Math.floor(Math.random() * (b - a) + a);
}

function randf(a, b) {
	return Math.random() * (b - a) + a;
}

function rgba(color) {
	return `rgb(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
}

function np() {
	return Math.random() < 0.5 ? 1 : -1;
}

function radians(d) {
	return d * (Math.PI / 180);
}


class Entity {
	constructor (x, y, radius) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = [255, 255, 255];
		this.alive = true;
	}

	draw(c) {
		c.fillStyle = rgba(this.color);
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		c.fill();
	}

	die() {}
}

class HurricaneParticle extends Entity {
	constructor(radius, dist, vel, color, theta) {
		super(0, 0, radius);
		this.dist = dist;
		this.vel = vel;
		this.color = color;
		this.theta = theta;
	}

	move() {
		this.theta += radians(this.vel);
		this.x = eyeX + this.dist * Math.cos(this.theta);
		this.y = eyeY + this.dist * Math.sin(this.theta);
	}

	update() {
		this.move();
	}

	render(c) {
		this.draw(c);
	}
}
