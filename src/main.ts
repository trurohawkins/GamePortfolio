import Phaser from 'phaser';

import Player from './player';
import * as cloud from './cloud';

const worldSize: number = 2000;
const worldCam: boolean = false;
//worldCam supdercedes whipCam
const whipCam: boolean = false;

class MainScene extends Phaser.Scene {
	private player!: Player;
	constructor() {
		super('main');
	}

	//probably should add a preloader scene
	preload() {
		this.load.image('player', '/assets/playerHead.png'); // path is relative to public root
		this.load.image('background', '/assets/skyBG.png');
		this.load.image('home', '/assets/pizza.png');
		this.load.video('gloryDogs', 'assets/gloryDogsTrailer.mp4')//, 'loadeddata', true, true);
	}

	create() {
		//const worldSize = 2000;
	 	this.add.tileSprite(0, 0, worldSize, worldSize, 'background').setOrigin(0);
		
		//homeBase.setDisplaySize(600, 600);
		const homeBase = this.physics.add.image(worldSize/2, worldSize/2, 'player');
		homeBase.setScale(7);
		homeBase.body.setCircle(homeBase.width * 0.43);
		homeBase.body.setOffset(2, 3);
		homeBase.body.moves = false;
		homeBase.setImmovable(true);
		homeBase.setGravity(false);

		this.physics.world.setBounds(0, 0, worldSize, worldSize);
		//this.cameras.main.setBounds(0, 0, worldSize, worldSize);

		this.player = new Player(this, worldSize/2, worldSize/2 - (homeBase.displayWidth/2), 'player');
		this.player.setHome(homeBase);//worldSize/2, worldSize/2);
		this.physics.add.collider(this.player, homeBase);//, this.player.homeCollide, undefined, this);/*, () => {

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
		//const gloryCloud = new cloud.GloryDogs(this, worldSize/2, 1000, this.player);
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
		this.player.update()
		const cam = this.cameras.main;

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
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	},
	scene: MainScene,
	backgroundColor: '#2d2d2d',
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

