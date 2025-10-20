import Phaser from 'phaser';
import { worldSize } from './main';

export default class Cloud extends Phaser.Physics.Arcade.Sprite {//Phaser.GameObjects.Video {
	private player: Phaser.Physics.Arcade.Sprite;
	private overlapping: boolean = false;
	private scene: Phaser.Scene;
	private archive: Archive;
	private file?: VidFile;

	constructor(scene: Phaser.Scene, angle: number, distance: number, player: Phaser.Physics.Arcade.Sprite, archive: Archive) {

		const rad = Phaser.Math.DegToRad(angle);
		const x = worldSize/2 + Math.cos(rad) * distance;
		const y = worldSize/2 - Math.sin(rad) * distance;
		super(scene, x, y, 'pizza');
		this.scene = scene;
		this.archive = archive;
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setScale(7);
		const radius = Math.min(this.width, this.height) / 3;
		this.body.setCircle(radius);
		this.body.setOffset(15, 7);

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

	public setVideo(file: VidFile) {
		this.file = file;
		this.video = this.scene.add.video(this.x, this.y, file.key);
		this.scene.videos.push(this.video);
		this.video.setScale(file.scale);
		this.video.setLoop(false);
		this.video.video.loop = false;//setLoop(false);
		this.video.video.playbackRate = 5;
		this.video.video.addEventListener('ended', this.onVideoComplete.bind(this));
		this.video.setDepth(0);
		//this.setSize(this.video.displayWidth, this.video.displayHeight);
	}

	public resetVideo() {
		this.video.setVisible(false);
		this.video.video.currentTime = 0;
		this.video.alpha = 1;
	}

	private onPlayerCollide(player: Phaser.GameObjects.GameObject, self: Phaser.GameObjects.GameObject) {
		if (this.file === undefined) {
			this.setVideo(this.archive.getVideo());
		} else if (this.video.video.currentTime != 0) {
			console.log("video time not done " + this.video.video.currentTime);
			return;
		}
		player.watchVideo();
		this.archive.playVideo(this);
		this.archive.setVidInfo(this.file, 500);
	}

	private onVideoComplete() {
		// maybe adjust for different videos
		//this.video.video.currentTime = this.video.video.duration - 0.05;
		this.scene.tweens.add({
			targets: this.video,
			alpha: 0,
			duration: 1000,
			ease: 'Linear',
			onComplete: () => {
				this.resetVideo();
			}
		});
		//this.video.video.currentTime = 0;
		//this.video.setVisible(false);
		this.player.stopWatching();
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
