import Phaser from 'phaser';

export default class Planet extends Phaser.Physics.Arcade.Sprite {//Phaser.GameObjects.Video {
	
	constructor(scene: Phaser.Scene, x: number, y: number, videoKey: string, player: Phaser.Physics.Arcade.Sprite) {
		super(scene, x, y, '');
		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.video = scene.add.video(x, y, videoKey)
		//this.video.play(true);
		this.video.setScale(0.5);

		this.setSize(this.video.displayWidth, this.video.displayHeight);
		this.setOffset(-this.displayWidth/2, -this.displayHeight/2);
		this.setImmovable(true);

		scene.physics.add.collider(player, this, this.onPlayerCollide, undefined, this);
	}

	private onPlayerCollide(player: Phaser.GameObjects.GameObject, self: Phaser.GameObjects.GameObject) {
		this.video.play(true);
	}
}
