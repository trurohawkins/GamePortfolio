import Phaser from 'phaser';

import Player from './player';
import Planet from './planet';

class MainScene extends Phaser.Scene {
	private player!: Player;

	constructor() {
		super('main');
	}

	//probably should add a preloader scene
	preload() {
		this.load.image('player', '/assets/playerHead.png'); // path is relative to public root
		this.load.image('background', '/assets/skyBG.png');
		this.load.video('gloryDogs', 'assets/gloryDogsTrailer.mp4')//, 'loadeddata', true, true);
	}

	create() {
		/*
		this.add.text(100, 100, 'Hello World', {
			fontSize: '32px',
			color: '#ffffff'
		});

		this.add.image(400, 300, 'player')
		*/
	 	this.add.tileSprite(0, 0, 2000, 2000, 'background').setOrigin(0);

		this.physics.world.setBounds(0, 0, 2000, 2000);

		this.player = new Player(this, 400, 2000, 'player');

		this.cameras.main.setBounds(0, 0, 2000, 2000);

		this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
	
		const gloryPlanet = new Planet(this, 400, 1000, 'gloryDogs', this.player);
		/*
		this.physics.add.collider(this.player, gloryPlanet, () => {
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
	}
}

const config: Phaser.Types.Core.GamesConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	},
	scene: MainScene,
	backgroundColor: '#2d2d2d',
};

new Phaser.Game(config);
