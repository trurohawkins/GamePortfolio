import Plaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {

	private accel: number= 0;
	private decel: number = 5;
	
	private rotSpd = 0;
	private rotMax = 3
	private rotAccel = 0.1;
	private rotDecel = 0.005;

	private keys!: {
		up: Phaser.Input.Keyboard.Key,
		down: Phaser.Input.Keyboard.Key,
		left: Phaser.Input.Keyboard.Key,
		right: Phaser.Input.Keybaord.Key
	};

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
		super(scene, x, y, texture);
		//console.log("player start")
		// Add the player to the scene
		scene.add.existing(this);
		scene.physics.add.existing(this)

		this.setCollideWorldBounds(true);
		this.cursors = scene.input.keyboard.createCursorKeys();
		this.keys = {
			up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
			down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
			left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
			right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
			boost: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
		};
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.keys.left)) {
		//if (this.keys.left?.isDown) {
			//this.setVelocityX(-this.accel);
			if (this.rotSpd - this.rotAccel > -this.rotMax) {
				this.rotSpd -= this.rotAccel;
			} else {
				this.rotSpd = -this.rotMax;
			}
			//this.rotation -= 0.1
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.right)) {
		//} else if (this.keys.right?.isDown) {
			if (this.rotSpd + this.rotAccel < this.rotMax) {
				this.rotSpd += this.rotAccel;
			} else {
				this.rotSpd = this.rotMax;
			}
			//this.rotation += 0.1
			//this.setVelocityX(this.accel);
		} else {
			if (this.rotSpd != 0) {
				let dir = Math.sign(this.rotSpd);
				if (Math.abs(this.rotSpd) - this.rotDecel > 0) {
					this.rotSpd -= dir * this.rotDecel;
				} else {
					this.rotSpd = 0;
				}
			}
		}
		this.rotation += this.rotSpd;

		if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
			this.accel = 500
		} else {
			if (this.accel - this.decel > 0) {
				this.accel -= this.decel;
			} else {
				this.accel = 0;
			}
		}
		//this.setVelocity(0)
		const dir = new Phaser.Math.Vector2(Math.cos(this.rotation), Math.sin(this.rotation));
		// rotate 90 to right
		const rotDir = new Phaser.Math.Vector2(dir.y, -dir.x)
		this.body.velocity.y = rotDir.y * this.accel;//-= this.accel;
		this.body.velocity.x = rotDir.x * this.accel;

		/*
		const curSpd = Math.abs(this.body.velocity.y)
		if (curSpd > 0) {
			if (curSpd - this.decel <= 0) {
				this.body.velocity.y = 0
			} else {
				this.body.velocity.y -= Math.sign(this.body.velocity.y) * this.decel
			}
		}
		*/
/*
		else if (this.keys.down?.JustDown) {
			this.body.velocity.y += this.accel;
		}
		if (this.keys.up?.JustDown) {
			this.body.velocity.y -= this.accel;
		} else if (this.keys.down?.JustDown) {
			this.body.velocity.y += this.accel;
		}
	*/
	}
}
