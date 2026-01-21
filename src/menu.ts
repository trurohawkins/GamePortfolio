import Archive from './archive';
import Shot from './shot';
import Controller from './controller';

export class Menu extends Phaser.Scene {
	private paused = false;
	private background!: Phaser.GameObjects.Rectangle;
	private mainCreated = false;
	private control: Controller;

	constructor() {
		super({ key: 'Menu' });
	}

	create() {
		this.background = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x00000, 1).setOrigin(0);
		this.background.setAlpha(0);
		this.archive = new Archive();
		this.add.existing(this.archive);
		this.archive.addShotsToScene(this);
		this.buffer = 120;
		this.spacing = 290;
		this.numShots = 5;
		this.displayShots = 3;
		this.curShot = 0;
		this.preShot = 4;
		this.placeShots()
		this.selectShot(true)
		this.scale.on('resize', (gameSize: Phaser.Structs.Size) => {
			this.onResize(gameSize)
		});
		/*
		this.keys = {
			up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
			down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
		}*/
		if (!this.mainCreated) {
			this.mainCreated = true;
			this.mainKey = 'MainScene';
			import('./main').then(({ MainScene }) => {
				if (!this.scene.get(this.mainKey)) {
					this.scene.add(this.mainKey, MainScene, false);
				}
				this.mainScene = this.scene.get(this.mainKey) as MainScene;
				this.mainScene.menu = this;
				console.log("creating main scene")
				if (!this.scene.isActive(this.mainKey)) {
					this.scene.launch(this.mainKey, { archive: this.archive });
				} else {
					console.warn("MaiN Scene is already active");
				}
				this.scene.bringToTop();
				this.control = new Controller(this, this.mainScene);
				document.getElementById("menu")?.addEventListener("click", () => {
					this.togglePause();
				});
			});
		} else {
			console.warn("main scene already created")
		}
	}

	async enableMotion() {
		if (
			typeof DeviceMotionEvent !== 'undefined' &&
			typeof (DeviceMotionEvent as any).requestPermission === 'function'
		) {
			this.welcome.innerHTML = "sent request"
			const permission = await (DeviceMotionEvent as any).requestPermission();
			if (permission !== 'granted') {
				this.welcome.innerHTML = "not granted";
				console.warn('Motion Permision denied');
				return;
			}
		}
		this.welcome.innerHTML = "got tilt permission"
		window.addEventListener('deviceorientation', this.mainScene.handleOrientation);
		window.addEventListener('deviceorientationabsolute', this.mainScene.handleOrientation);
		this.mainScene.motionOk = true;
	}

	private togglePause() {
		const mainScene = this.scene.get(this.mainKey);
		if (!mainScene) return;

		this.paused = !this.paused;
		if (this.paused) {
			this.scene.pause(this.mainKey);
			this.archive.showShots();
			this.background.setAlpha(0.5);
			this.selectShot(true)
		} else {
			this.scene.resume(this.mainKey);
			this.archive.hideShots();
			this.background.setAlpha(0);
		}
	}

	private onResize(gameSize: Phaser.Structs.Size) {
		this.background.width = gameSize.width
		this.background.height = gameSize.height
		this.placeShots()
	}

	private placeShots() {
		for (let i = 0; i < this.numShots; i++) {
			const shot = (this.preShot + i) % this.numShots
			if (i < this.displayShots) { 
				this.archive.placeShot(shot, this.scale.width/2, this.buffer + this.spacing * i);
			} else {
				this.archive.placeShot(shot, 99999, 99999);
			}
		}

	}

	update() {
		if (this.archive && this.control) {
			this.archive.update();
			this.control.update();
		}
	}

	private move(dir: number) {
		this.selectShot(false)
		this.curShot = this.incNum(this.curShot, dir)
		this.preShot = this.incNum(this.preShot, dir)
		this.selectShot(true)
		this.placeShots()
	}

	private incNum(val: number, dir: number) {
		if (dir > 0) {
			val = (val + 1) % this.numShots
		} else {
			if (val + dir >= 0) {
				val += dir
			} else {
				val = this.numShots - 1
			}
		}
		return val
	}

	private selectShot(on: boolean) {
		this.archive.highlightShot(this.curShot, on)
		if (this.paused) {
			this.archive.setVidInfoIndex(this.curShot, 0)
		}
	}
}
