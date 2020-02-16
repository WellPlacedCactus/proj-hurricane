
/* 
                                          `-.`'.-'
                                       `-.        .-'.
                                    `-.    -./\.-    .-'
                                        -.  /_|\  .-
                                    `-.   `/____\'   .-'.
                                 `-.    -./.-""-.\.-      '
                                    `-.  /< (()) >\  .-'
                                  -   .`/__`-..-'__\'   .-
                                ,...`-./___|____|___\.-'.,.
                                   ,-'   ,` . . ',   `-,
                                ,-'   ________________  `-,
                                   ,'/____|_____|_____\
                                  / /__|_____|_____|___\
                                 / /|_____|_____|_____|_\
                                ' /____|_____|_____|_____\
                              .' /__|_____|_____|_____|___\
                             ,' /|_____|_____|_____|_____|_\
,,---''--...___...--'''--.. /../____|_____|_____|_____|_____\ ..--```--...___...--``---,,
                           '../__|_____|_____|_____|_____|___\
      \    )              '.:/|_____|_____|_____|_____|_____|_\               (    /
      )\  / )           ,':./____|_____|_____|_____|_____|_____\             ( \  /(
     / / ( (           /:../__|_____|_____|_____|_____|_____|___\             ) ) \ \
    | |   \ \         /.../|_____|_____|_____|_____|_____|_____|_\           / /   | |
 .-.\ \    \ \       '..:/____|_____|_____|_____|_____|_____|_____\         / /    / /.-.
(=  )\ `._.' |       \:./ _|_____|_____|_____|_____|_____|_____|___\        | `._.' /(  =)
 \ (_)       )       \./|_____|_____|_____|_____|_____|_____|_____|_\       (       (_) /
  \    `----'         """"""""""""""""""""""""""""""""""""""""""""""""       `----'    /
   \   ____\__                                                              __/____   /
    \ (=\     \                                                            /     /-) /
     \_)_\     \                                                          /     /_(_/
          \     \                                                        /     /
           )     )  _                                                _  (     (
          (     (,-' `-..__                                    __..-' `-,)     )
           \_.-''          ``-..____                  ____..-''          ``-._/
            `-._                    ``--...____...--''                    _.-'
                `-.._                                                _..-'
                     `-..__           HE KNOWS ALL           __..-'
                           ``-..____                  ____..-''
                                    ``--...____...--''
*/

let canvas;
let context;

let mouse = {};
let keyboard = [];
let waters = [];
let fires = [];

let fof;
let nope;

let eyeX;
let eyeY;
let windSpeed;
let storming;

function init() {
	canvas = document.getElementById('bg');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	context = canvas.getContext('2d');
	fof = document.querySelector('.fof');
	nope = document.querySelector('.nope');
	eyeX = canvas.width / 2;
	eyeY = canvas.height / 2;
	windSpeed = 1;
}

function loop() {
	context.fillStyle = 'rgba(255, 255, 255, 0.5)';
	context.fillRect(0, 0, canvas.width, canvas.height);

	if (storming) waters.push(new WaterParticle());
	if (mouse.pressed) fires.push(new FireParticle());
	// if (mouse.x > eyeX) eyeX += windSpeed;
	// if (mouse.x < eyeX) eyeX -= windSpeed;
	// if (mouse.y > eyeY) eyeY += windSpeed;
	// if (mouse.y < eyeY) eyeY -= windSpeed;

	waters.forEach((particle, index, array) => {
		particle.update();
		particle.render(context);
		if (particle.dead) array.splice(index, 1);
	});
	fires.forEach((particle, index, array) => {
		particle.update();
		particle.render(context);
		if (particle.dead) array.splice(index, 1);
	});

	fires.forEach((fire, index, array) => {
		waters.forEach((water, index, array) => {
			if (test(fire, water)) {
				water.dead = true;
			}
		});
	});
	requestAnimationFrame(loop);
}

window.onload = function() {
	init();
	requestAnimationFrame(loop);
}

window.onresize = function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

window.addEventListener('mousemove', event => {
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener('mousedown', event => {
	mouse.pressed = true;
	storming = true;
	fof.style.display = 'none';
	nope.style.display = 'none';
});

window.addEventListener('mouseup', event => {
	mouse.pressed = false;
});

window.addEventListener('keydown', event => {
	keyboard[event.keyCode] = true;
});

window.addEventListener('keyup', event => {
	keyboard[event.keyCode] = false;
});

function randi(min, max) {
	let minimum = Math.ceil(min);
	let maximum = Math.floor(max);
	return Math.floor(Math.random() * (maximum - minimum)) + minimum;
}

function parseColor(params) {
	return `rgb(${params[0]}, ${params[1]}, ${params[2]})`;
}

function neg() {
	if (Math.random() > 0.5) {
		return 1;
	} else {
		return -1;
	}
}

function test(particle1, particle2) {
	let deltaX = particle2.x - particle1.x;
	let deltaY = particle2.y - particle1.y;

	let rad1 = particle1.radius;
	let rad2 = particle2.radius;
	let rad = rad1 + rad2;

	let distance = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
	if (distance < rad) {
		return true;
	} else {
		return false;
	}
}

class WaterParticle {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.radius = randi(0, 20);
		this.theta = Math.random() * 7;
		this.distance = randi(10, 1000);
		this.angVel = Math.random() * 0.1;
		this.color = [0, randi(0, 255), 255];
		this.dead = false;
	}

	update() {
		this.theta += this.angVel;
		this.x = eyeX + Math.cos(this.theta) * this.distance;
		this.y = eyeY + Math.sin(this.theta) * this.distance;
	}

	render(context) {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		context.fillStyle = parseColor(this.color);
		context.fill();
	}
}

class FireParticle {
	constructor() {
		this.x = mouse.x;
		this.y = mouse.y;
		this.radius = randi(5, 20);
		this.velX = Math.random() * 2 * neg();
		this.velY = -randi(5, 10) * this.radius * 0.1;
		this.color = [255, randi(0, 255), 0];
		this.dead = false;
	}

	update() {
		this.x += this.velX;
		this.y += this.velY;
		if (this.y < -100) this.dead = true;
	}

	render(context) {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		context.fillStyle = parseColor(this.color);
		context.fill();
	}
}