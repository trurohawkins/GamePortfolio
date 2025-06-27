import Phaser from 'phaser';
import { worldSize } from './main';

export default class Cloud extends Phaser.Physics.Arcade.Sprite {//Phaser.GameObjects.Video {
	private player: Phaser.Physics.Arcade.Sprite;
	private overlapping: boolean = false;
	private scene: Phaser.Scene;
	private archive: Archive;
	private set: boolean = false;

	constructor(scene: Phaser.Scene, angle: number, distance: number, player: Phaser.Physics.Arcade.Sprite, archive: Archive) {

		const rad = Phaser.Math.DegToRad(angle);
		const x = worldSize/2 + Math.cos(rad) * distance;
		const y = worldSize/2 - Math.sin(rad) * distance;
		super(scene, x, y, '');
		this.scene = scene;
		this.archive = archive;
		scene.add.existing(this);
		scene.physics.add.existing(this);

		/*
		this.video.video.addEventListener('loadedmetadata', () => {
			const vWidth = this.video.video.videoWidth;
			const vHeight = this.video.video.videoHeight;
			this.video.setDisplaySize(100, 100);//vWidth/10, vHeight/10);
		});
		*/

		//this.video.play(false);
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

	public setVideo(file: VideFile) {
		this.title = file.title;
		this.description = file.description;
		this.tech = file.tech;
		this.gameLink = file.gameLink;
		this.collaborators = file.collaborators;

		this.video = this.scene.add.video(this.x, this.y, file.key)
		this.video.setScale(0.5);
		this.video.setLoop(false);
		this.video.video.loop = false;//setLoop(false);
		//this.video.video.playbackRate = 5;
		this.video.video.addEventListener('ended', this.onVideoComplete.bind(this));
		this.video.setDepth(0);

		this.setSize(this.video.displayWidth, this.video.displayHeight);
	}

	private onPlayerCollide(player: Phaser.GameObjects.GameObject, self: Phaser.GameObjects.GameObject) {
		if (!this.set) {
			this.setVideo(this.archive.getVideo());
			this.set = true;
		}
		if (this.video.video.currentTime != 0) {
			return;
		}
		player.watchVideo();
		this.video.setVisible(true);
		this.video.play(false);
		const leftPanel = document.getElementById('left-panel');
		if (leftPanel) {
			leftPanel.style.backgroundColor = '#333';
		}
		const gameTitle = document.getElementById('gameTitle');
		if (gameTitle) {
			gameTitle.textContent = this.title;
			gameTitle.className = 'block';
		}
		const gameDescription = document.getElementById('gameDescription');
		if (gameDescription) {
			gameDescription.textContent = this.description;
			gameDescription.className = 'block';
		}
		const technologies = document.getElementById('technologies');
		if (technologies) {
			technologies.textContent = this.tech;
			technologies.className = 'block'; 
		}
		const rightPanel = document.getElementById('right-panel');
		if (rightPanel) {
			rightPanel.style.backgroundColor = '#333';
		}
		const page = document.getElementById('page');
		if (page) {
			page.className = 'block';
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
			collaborators.className = 'block'; 
		}
	}

	private onVideoComplete() {
		console.log("video over");
		// maybe adjust for different videos
		//this.video.video.currentTime = this.video.video.duration - 0.05;
		this.scene.tweens.add({
			targets: this.video,
			alpha: 0,
			duration: 1000,
			ease: 'Linear',
			onComplete: () => {
				this.video.setVisible(false);
				this.video.video.currentTime = 0;
				this.video.alpha = 1;
			}
		});
		//this.video.video.currentTime = 0;
		//this.video.setVisible(false);
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
