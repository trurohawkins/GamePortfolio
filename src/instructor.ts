import Phaser from 'phaser';

export default class Instructor extends Phaser.GameObjects.Container {
	private up: boolean = false
	private turn: boolean = false
	private watched: boolean = false
	private watchUp: boolean = false
	private bgAlpha: number = 0.3
	private mobile: boolean = false
	private teach: boolean = true

	constructor(scene: Phaser.Scene, onMobile: boolean) {
		super(scene, 0, 0)
		this.player = scene.player
		this.mobile = onMobile
		//this.scene = scene
		const cam = scene.cameras.main
		this.cam = cam
		this.bg = scene.add.rectangle(cam.width/2, cam.height/2, 400, 100, 0x000000);
		this.bg.fillAlpha = 0
		this.bg.setDepth(999);
		this.bg.setOrigin(0.5)
		this.bg.setScrollFactor(0)

		scene.scale.on('resize', () => {
			this.onResize()
		});
		//document.fonts.load('16px Roboto').then(() => {
		this.helpText = scene.add.text(cam.centerX, cam.centerY, "", 
		{
				fontFamily: 'Orbitron',//, san-seriff, Arial',
				fontSize: '24px',
				color: '#ffffff',
				align: 'center',
		})
		this.helpText.setOrigin(0.5)
		this.helpText.setDepth(1000)
		this.helpText.setScrollFactor(0)
	}

	public boostText() {
		if (!this.teach) {
			return;
		}
		if (!this.up) {
			if (this.mobile) {
				this.setBox("Tap Screen\nto fly through the cosmos!!!")
			} else {
				this.setBox("Press W\nto fly through the cosmos!!!")
			}
		}
	}

	public watchText() {
		if (!this.teach) {
			return;
		}
		if (!this.watched) {
			if (this.mobile) {
				this.setBox("tap screen or tilt device\n to stop watching")
			} else {
				this.setBox("Press W, A, or D to stop watching")
			}
			this.watchUp = true
		}
	}

	public testText(text: string) {
		this.setBox(text);
	}

	private turnText() {
		if (!this.teach) {
			return;
		}
		if (!this.turn) {
			if (this.mobile) {
				this.setBox("Tilt device to turn!!!")
			} else {
				this.setBox("Press A and D to turn!!!")
			}
		}
	}

	private setBox(words: string) {
		this.helpText.setText(words)
		this.bg.fillAlpha = this.bgAlpha
	}

	private onResize() {
		this.bg.x = this.cam.width/2
		this.bg.y = this.cam.height/2
		this.helpText.x = this.cam.centerX
		this.helpText.y = this.cam.centerY
	}

	private endWatch() {
		if (this.watchUp) {
			if (!this.turn) {
				this.scene.time.delayedCall(2000, () => {
					this.turnText()
				});
				this.watchUp = false
			}
			this.resetBox()
		}
	}

	public upPressed() {
		if (this.watchUp) {
			this.endWatch()
		} else {
			this.up = true
			this.resetBox()
			this.scene.time.delayedCall(2000, () => {
				if (this.player.watching) {
					this.watchText()
				} else {
					this.turnText()
				}
			});
		}
	}

	public turnPressed() {
		if (this.watchUp) {
			this.endWatch()
		} else {
			this.turn = true
			this.resetBox()
		}
	}

	private resetBox() {
		this.bg.fillAlpha = 0
		this.helpText.setText("")
	}
}
