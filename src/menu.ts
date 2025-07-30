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
		const spacing = 150;
		for (let i = 0; i < 5; i++) {
			this.archive.placeShot(i, 200, spacing * i);
		}
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
			} else {
				this.scene.resume('mainScene');
				this.archive.hideShots();
				this.background.setAlpha(0);
			}
		});
	}

	update() {
		this.archive.update();
	}
}
