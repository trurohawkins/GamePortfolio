import Phaser from 'phaser';

export default class Instructor extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene) {
		super(scene, 0, 0)
		//this.keys = scene.keys
		const cam = scene.cameras.main
		this.cam = cam
		this.bg = scene.add.rectangle(cam.width/2, cam.height/2, 400, 100, 0x000000);
		this.bg.fillAlpha = 0.3
		this.bg.setDepth(999);
		this.bg.setOrigin(0.5)
		this.bg.setScrollFactor(0)

		scene.scale.on('resize', () => {
			this.onResize()
		});
		//document.fonts.load('16px Roboto').then(() => {
		this.helpText = scene.add.text(cam.centerX, cam.centerY, "Press W\nto fly through the cosmos!!!", 
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

	private onResize() {
		this.bg.x = this.cam.width/2
		this.bg.y = this.cam.height/2
		this.helpText.x = this.cam.centerX
		this.helpText.y = this.cam.centerY
	}

	public upPressed() {
		this.bg.fillAlpha = 0
		this.helpText.setVisible(false)
	}
}
