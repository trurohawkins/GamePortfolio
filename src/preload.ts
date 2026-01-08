export class PreloadScene extends Phaser.Scene {
	private static started = false;
	private static menuLaunched = false;

	constructor() {
		super('preload');
	}

	preload() {
		//this.load.image('player', '/assets/playerHead.png'); // path is relative to public root
		if (PreloadScene.started) {
			console.warn("preload preload run twice")
			return;
		}
		PreloadScene.started = true
		console.log("preload loading ding dong")
		this.load.setBaseURL('/GamePortfolio/');
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
		const planetPath = 'assets/planet.png'
		const url = new URL(planetPath, window.location.href);
		console.log('Resolved planet url: ', url.href)
		this.load.image('planet', 'assets/planet.png');

		this.load.image('background', 'assets/mindBG.png');
		//this.load.image('space', 'assets/space.png');
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

		this.load.once('complete', () => {
			console.log("loading complete pig pog")
			PreloadScene.menuLaunched = true;
			import('./menu').then(({ Menu }) => {
				this.scene.add('Menu', Menu, true);
			});
			if (this.sys.game.device.os.mobile || navigator.maxTouchPoints > 0) {
				this.welcome.innerHTML = "WELCOME<br><br>Tap Screen to Enter"
			} else {
				this.welcome.innerHTML = "WELCOME!<br><br>Press Space to Enter"
			}
			console.log("checking planet")
			const texture = this.textures.get('planet');
			console.log("caca")
			if (!texture) {
				console.log("no texture for planet")
			} else {
				const img = texture.getSourceImage() as HTMLImageElement | HTMLCanvasElement;
				if (img) {
					console.log('Planet size:', img.width, img.height);
				} else {
					console.log("no img on planet")
				}
			}
			const texture2 = this.textures.get('space');
			if (!texture2) {
				console.log("no texture for space")
			} else {
				const img = texture2.getSourceImage() as HTMLImageElement | HTMLCanvasElement;
				if (img) {
					console.log('space size:', img.width, img.height);
				} else {
					console.log("no img on planet")
				}
			}
			const texture3 = this.textures.get('background');
			if (!texture3) {
				console.log("no texture for BG")
			} else {
				const img = texture3.getSourceImage() as HTMLImageElement | HTMLCanvasElement;
				if (img) {
					console.log('bg size:', img.width, img.height);
				} else {
					console.log("no img on planet")
				}
			}
		});
	}
}
