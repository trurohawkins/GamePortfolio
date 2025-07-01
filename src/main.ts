import Phaser from 'phaser';

import Player from './player';
import Archive from './archive';
import Cloud from './cloud';

export const worldSize: number = 3000;
const worldCam: boolean = false;
//worldCam supdercedes whipCam
const whipCam: boolean = false;

class MainScene extends Phaser.Scene {
	
	private player!: Player;
	private clouds: Cloud[] = [];

	constructor() {
		super('main');
	}

	//probably should add a preloader scene
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
		//const worldSize = 2000;
	 	this.add.tileSprite(0, 0, worldSize+100, worldSize+100, 'background').setOrigin(0);
		
		//homeBase.setDisplaySize(600, 600);
		this.homeBase = this.physics.add.image(worldSize/2, worldSize/2, 'player');
		this.homeBase.setScale(7);
		this.homeBase.body.setCircle(this.homeBase.width * 0.43);
		this.homeBase.body.setOffset(2, 3);
		this.homeBase.body.moves = false;
		this.homeBase.setImmovable(true);
		this.homeBase.setGravity(false);

		this.physics.world.setBounds(0, 0, worldSize, worldSize);
		//this.cameras.main.setBounds(0, 0, worldSize, worldSize);

		this.player = new Player(this, worldSize/2, worldSize/2 - (this.homeBase.displayWidth/2), 'player');
		this.player.setHome(this.homeBase);//worldSize/2, worldSize/2);
		this.physics.add.collider(this.player, this.homeBase);//, this.player.homeCollide, undefined, this);/*, () => {

		const camera = this.cameras.main;
		if (worldCam) {
			const zx = camera.width / worldSize;
			const zy = camera.height / worldSize;
			camera.setZoom(Math.min(zx, zy));
			camera.centerOn(worldSize/2, worldSize/2);
		} else {
			const buffer = 40;
			camera.setBounds(0, 0, worldSize-buffer, worldSize-buffer);
			camera.startFollow(this.player, whipCam, 0.1, 0.1);
		}
	
		//const gloryCloud = new Cloud(this, 400, 1000, 'gloryDogs', this.player);
		this.archive = new Archive(this);
		this.clouds.push(new Cloud(this, 90, 500, this.player, this.archive));
		this.clouds.push(new Cloud(this, 60, 1200, this.player, this.archive));
		this.clouds.push(new Cloud(this, 180, 700, this.player, this.archive));
		this.clouds.push(new Cloud(this, 0, 800, this.player, this.archive));
		this.clouds.push(new Cloud(this, 270, 600, this.player, this.archive));
		/*
		this.physics.add.collider(this.player, gloryCloud, () => {
			console.log('Collision!');
		});
		*/
		/*
		const video = this.add.video(400, 300, 'gloryDogs');
		video.setScale(0.5)
		video.play(true)
		*/
	}

	update() {
		this.player.update();
		for (let i = 0; i < this.clouds.length; i++) {
			this.clouds[i].update();
		}
		const cam = this.cameras.main;
		const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.homeBase.x, this.homeBase.y);
		if (dist > worldSize/2) {
			let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.homeBase.x, this.homeBase.y);
			//angle += Phaser.Math.DegToRad(-90);
			console.log(this.player.x + ", " + this.player.y);
			const ax = Math.cos(angle) * (worldSize);
			const ay = Math.sin(angle) * (worldSize);
			this.player.x += ax;
			this.player.y += ay;
			if (!worldCam && !whipCam) {
				cam.scrollX += ax;
				cam.scrollY += ay;
			}
			console.log(this.player.x + ", " + this.player.y);
		}
		/*
		if (this.player.x < 0) {
			this.player.x += worldSize;
			if (!worldCam && !whipCam) {
				cam.scrollX += worldSize;
			}
		} else if (this.player.x > worldSize) {
			this.player.x -= worldSize;
			if (!worldCam && !whipCam) {
				cam.scrollX -= worldSize;
			}
		}
		if (this.player.y < 0) {
			this.player.y += worldSize;
			if (!worldCam && !whipCam) {
				cam.scrollY += worldSize;
			}
		} else if (this.player.y > worldSize) {
			this.player.y -= worldSize;
			if (!worldCam && !whipCam) {
				cam.scrollY -= worldSize;
			}
		}
		*/
	}
}

const wrapper = document.getElementById('game-wrapper')!;
const width = wrapper.clientWidth;
const height = wrapper.clientHeight;

let game: Phaser.Game;

const config: Phaser.Types.Core.GamesConfig = {
	type: Phaser.AUTO,
	//width: width,
	//height: height,
	parent: 'game-wrapper',
	scale: {
		mode: Phaser.Scale.RESIZE,
		autoCenter: Phaser.Scale. CENTER_BOTH,
		width: '100%',
		height: '100%',
	},
	backgroundColor:'#00000',
	physics: {
		default: 'arcade',
		arcade: {
			debug: 
				true
		}
	},
	scene: MainScene,
};

game = new Phaser.Game(config);
/*
window.addEventListener('resize', () => {
	const wrapper = document.getElementById('game-wrapper')!;
	const width = wrapper.clientWidth;
	const height = wrapper.clientHeight;
	console.log(width + ", " + height);
	game.scale.resize(width, height);
});
*/

