
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
let particles = [];

function init() {
	canvas = document.getElementById('bg');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	context = canvas.getContext('2d');
}

function loop() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	if (mouse.pressed) {
		for (let i = 0; i < 5; i++) {
			particles.push(new Particle(
				Math.floor(Math.random() * Math.floor(canvas.width)),
				Math.floor(Math.random() * Math.floor(canvas.hegiht)),
				Math.floor(Math.random() * Math.floor(20)),
				Math.random() * 0.1,
				Math.floor(Math.random() * Math.floor(360)),
				Math.floor(Math.random() * Math.floor(canvas.width))
			));
		}
	}

	for (let p of particles) {
		p.update();
		p.render(context);
	}
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
});

window.addEventListener('mouseup', event => {
	mouse.pressed = false;
});


class Particle {
	constructor(x, y, radius, velocity, theta, dist) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.velocity = velocity;
		this.theta = theta;
		this.dist = dist;
		this.color = `rgb(
			0,
			${Math.floor(Math.random() * Math.floor(255))},
			255
		)`;
	}

	update() {
		this.theta += this.velocity;
		this.x = mouse.x + Math.cos(this.theta) * this.dist;
		this.y = mouse.y + Math.sin(this.theta) * this.dist;
	}

	render(context) {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		context.fillStyle = this.color;
		context.fill();
	}
}