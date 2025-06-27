import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {

	private boost: number = 500;
	private accelMax: number = 1500;
	private accel: number = 0;
	private decel: number = 5;

	private gravity: number = 500;
	private gravAccel: number = 1;
	private pull: number = 0;
	private grounded: boolean = false;
	private home?: Phaser.Physics.Arcade.Image;

	private rotSpd = 0;
	private rotMax = 3
	private rotAccel = 0.1;
	private rotDecel = 0.005;

	// when we stop inputting for rotation we pause be for drifting back to planet rotation
	private rotInput: number = 0;
	private rotPause: number = 15;
	//speed at which we rotate back to planet
	private rotDrift: number = 0.01;

	public watching: boolean = false;

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
		this.setDepth(1);

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
		if (this.watching) {
			if (Phaser.Input.Keyboard.JustDown(this.keys.right) || Phaser.Input.Keyboard.JustDown(this.keys.left) || Phaser.Input.Keyboard.JustDown(this.keys.up)) {
				this.watching = false;
			} else {
				return;
			}
		}
		//this.scene.physics.world.wrap(this, 0);
		if (Phaser.Input.Keyboard.JustDown(this.keys.left)) {
			this.rotInput = this.rotPause;
			if (this.rotSpd - this.rotAccel > -this.rotMax) {
				this.rotSpd -= this.rotAccel;
			} else {
				this.rotSpd = -this.rotMax;
			}
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.right)) {
			this.rotInput = this.rotPause;
			if (this.rotSpd + this.rotAccel < this.rotMax) {
				this.rotSpd += this.rotAccel;
			} else {
				this.rotSpd = this.rotMax;
			}
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
		if (this.rotSpd != 0) {
			this.rotation += this.rotSpd;
		} else {
			if (this.rotInput > 0) {
				this.rotInput--;
			} else {
				// rotate towards home
				let angle = Phaser.Math.Angle.Between(this.x, this.y, this.home.x, this.home.y);
				angle += Phaser.Math.DegToRad(-90);
				this.rotation = Phaser.Math.Angle.RotateTo(this.rotation, angle, this.rotDrift);
			}
		}

		const curAccel = this.accel / this.accelMax;
		if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
			// the faster we are going the less boost we add
			const boost = Phaser.Math.Linear(this.boost, this.boost/100, curAccel);
			if (this.accel + boost < this.accelMax) {
				this.accel += boost;
			} else {
				this.accel = this.accelMax;
			}
			this.pull = 0;
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
			if (!this.grounded) {
				this.pull = 0;
				this.grounded = true;
			}
		} else {
			this.grounded = false;
			if (this.pull + this.gravAccel < this.gravity) {
				this.pull += this.gravAccel;
			} else {
				this.pull = this.gravity;//Phaser.Math.Linear(0, this.gravity, 1-curAccel);
			}
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

	}

	public watchVideo() {
		this.setVelocity(0, 0);
		this.accel = 0;
		this.rotSpd = 0;
		this.pull = 0;
		this.watching = true;
	}

	public setHome(home: Phaser.Physics.Arcade.Image) {
		this.home = home;//new Phaser.Math.Vector2(home.x, home.y);
	}

	private onHomeCollide(home: Phaser.GameObjects.GameObject, self: Phaser.GameObjects.GameObject) {
		console.log("landed");
	}
}

