import Phaser from 'phaser';
import { worldSize } from './main';

export class Cloud extends Phaser.Physics.Arcade.Sprite {//Phaser.GameObjects.Video {
	private player: Phaser.Physics.Arcade.Sprite;
	private overlapping: boolean = false;
		
	constructor(scene: Phaser.Scene, angle: number, distance: number, videoKey: string, player: Phaser.Physics.Arcade.Sprite) {

		const rad = Phaser.Math.DegToRad(angle);
		const x = worldSize/2 + Math.cos(rad) * distance;
		const y = worldSize/2 - Math.sin(rad) * distance;
		super(scene, x, y, '');
		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.video = scene.add.video(x, y, videoKey)
		this.video.setScale(0.5);
		this.video.video.loop = false;//setLoop(false);
		this.video.video.playbackRate = 3;
		this.video.video.addEventListener('ended', this.onVideoComplete.bind(this));
		this.video.setDepth(0);

		//this.video.play(true);
		this.setSize(this.video.displayWidth, this.video.displayHeight);
		//this.setOffset(-this.displayWidth/2, -this.displayHeight/2);
		this.setImmovable(true);
		
		this.player = player;

		//scene.physics.add.overlap(player, this, this.onPlayerCollide, undefined, this);
	}


	update() {
		const curOverlap = this.scene.physics.overlap(this, this.player);
		if (curOverlap && !this.overlapping) {
			this.onPlayerCollide(this.player, this);
		} else if (!curOverlap && this.overlapping) {
			//console.log("overlap end");
		}
		this.overlapping = curOverlap;
	}

	private onPlayerCollide(player: Phaser.GameObjects.GameObject, self: Phaser.GameObjects.GameObject) {
		if (this.video.video.currentTime != 0) {
			return;
		}
		player.watchVideo();
		this.video.setVisible(true);
		this.video.play(false);
		const gameTitle = document.getElementById('gameTitle');
		if (gameTitle) {
			gameTitle.textContent = this.title;
		}
		const gameDescription = document.getElementById('gameDescription');
		if (gameDescription) {
			gameDescription.textContent = this.description;
		}
		const technologies = document.getElementById('technologies');
		if (technologies) {
			technologies.textContent = this.tech;
		}
		const gameLink = document.getElementById("gameLink") as HTMLAnchorElement;
		if (gameLink) {
			gameLink.textContent = "Game Page";
			gameLink.href = this.gameLink;
			gameLink.target = "_blank";
		}
		const collaborators = document.getElementById('collaborators');
		if (collaborators) {
			collaborators.textContent = this.collaborators;
		}
	}

	private onVideoComplete() {
		console.log("video over");
		this.video.setVisible(false);
		this.video.video.currentTime = 0;
		this.player.watching = false;
	}
}

export class GloryDogs extends Cloud {
	constructor(scene: Phaser.Scene, angle: number, distance: number, player: Phaser.Physics.Arcade.Sprite) {
		super(scene, angle, distance, 'gloryDogs', player);
		this.title = "GloryDogs"
		this.description = `
			2 player browser based celular automata. 
			Blast through space debris and rescue survivors
			Help the most people to WIN THE GLORY!
		`;
		this.tech = "GameMaker"

		this.gameLink = "https://gamejolt.com/games/glorydogs/638631"
		this.collaborators = "Midnight Dame"
	}
}
