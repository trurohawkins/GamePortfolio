export class PreloadScene extends Phaser.Scene {
	constructor() {
		super('preload');
	}

	preload() {
		this.load.image('player', '/assets/playerHead.png'); // path is relative to public root
		this.load.image('background', '/assets/skyBG.png');
		this.load.image('pizza', '/assets/pizza.png');
		this.load.video('gloryDogs', 'assets/trailers/gloryDogsTrailer.mp4');//, 'loadeddata', true, true);
		this.load.video('stroid', 'assets/trailers/StroidTrailer.mp4');
		this.load.video('trembles', 'assets/trailers/tremblesTrailer.mp4');
		this.load.video('peepeeMadness', 'assets/trailers/PPMadnessTrailer.mp4');
		this.load.video('ROHLB', 'assets/trailers/RollOnHomeLittleBuddy.mp4');
	}

	create() {
		this.scene.start('main');
	}
}
