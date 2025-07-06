export default class Shot extends Phaser.GameObjects.Container {

	private shots: Phaser.GameObjects.Sprite[] = [];
	private cur: number = 0;
	private fade: number = 1000; //ms
	public playing: boolean = false;
	private scene: Phaser.Scene;

	private pause: number = 500;
	private curPause: number = 0;

	constructor(scene: Phaser.Scene, shot: string, num: number,  duration = 1000) {
		super(scene, 0, 0);
		this.scene = scene;
		this.duration = duration;
		let shots = [];
		for (let i = 0; i < num; i++ ) {
			shots.push(shot + i);
		}

		shots.forEach((tex, i) => {
			const sprite = scene.add.sprite(0, 0, tex).setAlpha(i === 0 ? 1 : 0);
			this.add(sprite)
			this.shots.push(sprite);
		});

		scene.add.existing(this);
	}

	crossFadeTo(index: nummber) {
		if (index === this.cur || index < 0 || index >= this.shots.length) {
			return;
		}

		const current = this.shots[this.cur];
		const next = this.shots[index];

		this.scene.tweens.add({
			targets: current,
			alpha: 0,
			duration: this.duration,
			onComplete: () => (current.alpha = 0)
		});

		this.scene.tweens.add({
			targets: next,
			alpha: 1,
			duration: this.duration,
			onComplete: () => (this.curPause = 0)
		});

		this.cur = index;
	}

	public play() {
		this.playing = true;
		this.crossFadeTo(0);
	}

	public update() {
		if (this.curPause < this.pause) {
			this.curPause++;
			if (this.curPause == this.pause) {
				this.crossFadeTo((this.cur + 1) % this.shots.length);
			}
		}
	}

}
