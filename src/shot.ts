export default class Shot {
	private container: Phaser.GameObject.Container;
	private shots: Phaser.GameObjects.Sprite[] = [];
	private cur: number = 0;
	private fade: number = 10000; //ms
	public playing: boolean = false;
	private scene: Phaser.Scene;

	private pause: number = 120;
	private curPause: number = 0;
	private curShot: Phaser.GameObjects.Sprite;
	private nextShot: Phaser.GameObjects.Sprite;

	constructor(shot: string, num: number,  duration = 1000) {
		this.duration = duration;
		this.names = [];
		for (let i = 0; i < num; i++ ) {
			this.names.push(shot + i);
		}
	}

	addToScene(scene: Phaser.Scene) {
		this.scene = scene;
		this.container = scene.add.container(0, 0);
		this.names.forEach((tex, i) => {
			const sprite = scene.add.sprite(0, 0, tex)
			sprite.setAlpha(0);//i === 0 ? 0 : 0);
			sprite.setDepth(1000);
			this.container.add(sprite)
			this.shots.push(sprite);
		});
		this.container.setScale(0.15);
	}

	crossFadeTo(index: number) {
		if (index === this.cur || index < 0 || index >= this.shots.length) {
			return;
		}
		console.log("cross fade " + this.cur + " == " + index);

		this.curShot  = this.shots[this.cur];
		this.nextShot = this.shots[index];
		this.scene.tweens.add({
			targets: this.curShot,
			alpha: 0,
			duration: this.duration,
			onComplete: () => {
				this.curShot.alpha = 0;
			}
		});

		this.scene.tweens.add({
			targets: this.nextShot,
			alpha: 1,
			duration: this.duration,
			onComplete: () => {
				this.curPause = 0;
			}
		});
		this.cur = index;
	}

	public play() {
		this.playing = true;
		this.shots[this.cur].setAlpha(1);
		this.curPause = 0;
		//this.crossFadeTo((this.cur + 1) % this.shots.length);
	}

	public hide() {
		this.playing = false;
		this.scene.tweens.killTweensOf(this.curShot);
		this.scene.tweens.killTweensOf(this.nextShot);
		for (let i = 0; i < this.shots.length; i++) {
			this.shots[i].setAlpha(0);
		}
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
