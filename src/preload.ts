export class PreloadScene extends Phaser.Scene {
	constructor() {
		super('preload');
	}

	preload() {
		//this.load.image('player', '/assets/playerHead.png'); // path is relative to public root
		this.welcome = document.getElementById('welcome')
		this.load.on('progress', (value: number) => {
			let string = "LOADING"
			for (let i = 0; i < value * 5; i++) {
				string += "."
			}
			this.welcome.textContent = string// `Loading... ${Math.round(value * 100)}%`;
		});
		this.load.spritesheet('player', 'assets/player.png', {
			frameWidth: 32,
			frameHeight: 32
		});
		this.load.image('planet', 'assets/planet.png');
		this.load.image('background', 'assets/mindBG.png');
		this.load.image('space', 'assets/space.png');
		this.load.image('pizza', 'assets/pizza.png');
		this.load.image('cloud', 'assets/neuronCloud.png');
		this.load.video('gloryDogs', 'assets/trailers/gloryDogsTrailer.mp4');//, 'loadeddata', true, true);
		this.load.video('stroid', 'assets/trailers/StroidTrailer.mp4');
		this.load.video('trembles', 'assets/trailers/tremblesTrailer.mp4');
		this.load.video('peepeeMadness', 'assets/trailers/PPMadnessTrailer.mp4');
		this.load.video('ROHLB', 'assets/trailers/RollOnHomeLittleBuddy.mp4');

		for (let i = 0; i < 5; i++) {
			this.load.image('gd' + i, 'assets/gameScreenshots/gloryDogs'+i+'.png');
		}
		for (let i = 0; i < 6; i++) {
			this.load.image('stroid' + i, 'assets/gameScreenshots/stroid'+i+'.png');
		}
		for (let i = 0; i < 6; i++) {
			this.load.image('trembles' + i, 'assets/gameScreenshots/trembles'+i+'.png');
		}
		for (let i = 0; i < 4; i++) {
			this.load.image('pp' + i, 'assets/gameScreenshots/pp'+i+'.png');
		}
		for (let i = 0; i < 5; i++) {
			this.load.image('rohlb' + i, 'assets/gameScreenshots/rohlb'+i+'.png');
		}
	}

	update() {
		console.log("loading")
	}

	create() {
		//this.scene.start('Menu');
		import('./menu').then(({ Menu }) => {
			this.scene.add('Menu', Menu, true);
		});
		this.welcome.innerHTML = "WELCOME!<br><br>Press Space to Enter"
	}
}
