import Plaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {

	private boost: number = 500;
	private accelMax: number = 1500;
	private accel: number = 0;
	private decel: number = 5;

	private gravity: number = 50;
	private pull: number = 0;
	private grounded: boolean = false;
	private home?: Phaser.Physics.Arcade.Image;

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

		this.setCollideWorldBounds(false);
		const radius = Math.min(this.width, this.height) / 2;
		this.body.setCircle(radius);

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
		//this.scene.physics.world.wrap(this, 0);
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
		const curAccel = this.accel / this.accelMax;

		if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
			// the faster we are going the less boost we add
			const boost = Phaser.Math.Linear(this.boost, this.boost/100, curAccel);
			if (this.accel + boost < this.accelMax) {
				this.accel += boost;
			} else {
				this.accel = this.accelMax;
			}
		} else {
			if (this.accel - this.decel > 0) {
				this.accel -= this.decel;
			} else {
				this.accel = 0;
			}
		}
		const dist = Phaser.Math.Distance.Between(this.x, this.y, this.home.x, this.home.y);
		// 5 buffer needed, could be 3 maybe change with size
		if (dist < this.home.displayWidth/2 + 5) {
			this.pull = 0;
		} else {
			this.pull = this.gravity;//Phaser.Math.Linear(0, this.gravity, 1-curAccel);
		}
		const pos = new Phaser.Math.Vector2(this.x, this.y); 
		const home = new Phaser.Math.Vector2(this.home.x, this.home.y);
		const homeDir = home.subtract(pos);
		homeDir.normalize();
		homeDir.scale(this.pull);
		//console.log(this.pull);

		//this.setVelocity(0)
		const dir = new Phaser.Math.Vector2(Math.cos(this.rotation), Math.sin(this.rotation));
		// rotate 90 to right
		const rotDir = new Phaser.Math.Vector2(dir.y, -dir.x)
		//this.body.velocity.y = rotDir.y * this.accel;//-= this.accel;
		//this.body.velocity.x = rotDir.x * this.accel;
		this.setVelocity((rotDir.x * this.accel) + homeDir.x, (rotDir.y * this.accel) + homeDir.y);

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

	public setHome(home: Phaser.Physics.Arcade.Image) {
		this.home = home;//new Phaser.Math.Vector2(home.x, home.y);
	}
}
