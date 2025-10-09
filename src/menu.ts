import Archive from './archive';
import Shot from './shot';

export class Menu extends Phaser.Scene {
	private paused = false;
	private background!: Phaser.GameObjects.Rectangle;

	constructor() {
		super({ key: 'Menu' });
	}

	create() {
		this.background = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x00000, 1).setOrigin(0);
		this.background.setAlpha(0);
		this.archive = new Archive();
		this.add.existing(this.archive);
		this.archive.addShotsToScene(this);
		this.spacing = 180;
		this.numShots = 5
		this.curShot = 0
		for (let i = 0; i < this.numShots; i++) {
			this.archive.placeShot(i, this.scale.width/2, this.spacing * i);
		}
		this.selectShot(true)
		this.scale.on('resize', (gameSize: Phaser.Structs.Size) => {
			this.onResize(gameSize)
		});
		this.scene.launch('mainScene', {archive: this.archive});
		this.scene.bringToTop();
		this.input.keyboard.on('keydown-ESC', () => {
			//this.scene.stop();
			//this.scene.resume('mainScene');
			this.paused = !this.paused;
			if (this.paused) {
				this.scene.pause('mainScene');
				this.archive.showShots();
				this.background.setAlpha(0.5);
				this.selectShot(true)
			} else {
				this.scene.resume('mainScene');
				this.archive.hideShots();
				this.background.setAlpha(0);
			}
		});
		this.keys = {
			up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
			down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
		}

	}

	private onResize(gameSize: Phaser.Structs.Size) {
		for (let i = 0; i < 5; i++) {
			this.archive.placeShot(i, gameSize.width/2, this.spacing * i);
		}
		this.background.width = gameSize.width
		this.background.height = gameSize.height
	}

	update() {
		this.archive.update();
		if (this.paused) {
			if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
				this.move(-1)
			}
			if (Phaser.Input.Keyboard.JustDown(this.keys.down)) {
				this.move(1)
			}
		}
	}

	private move(dir: number) {
		this.selectShot(false)
		if (dir > 0) {
			this.curShot = (this.curShot + 1) % this.numShots
		} else {
			if (this.curShot + dir >= 0) {
				this.curShot += dir
			} else {
				this.curShot = this.numShots - 1
			}
		}
		this.selectShot(true)
	}

	private selectShot(on: boolean) {
		this.archive.highlightShot(this.curShot, on)
		if (this.paused) {
			this.archive.setVidInfoIndex(this.curShot)
		}
	}
}
