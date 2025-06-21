import Phaser from 'phaser';

export class Cloud extends Phaser.Physics.Arcade.Sprite {//Phaser.GameObjects.Video {
	
	constructor(scene: Phaser.Scene, x: number, y: number, videoKey: string, player: Phaser.Physics.Arcade.Sprite) {
		super(scene, x, y, '');
		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.video = scene.add.video(x, y, videoKey)
		//this.video.play(true);
		this.video.setScale(0.5);

		this.setSize(this.video.displayWidth, this.video.displayHeight);
		this.setOffset(-this.displayWidth/2, -this.displayHeight/2);
		this.setImmovable(true);

		scene.physics.add.collider(player, this, this.onPlayerCollide, undefined, this);
	}

	private onPlayerCollide(player: Phaser.GameObjects.GameObject, self: Phaser.GameObjects.GameObject) {
		this.video.play(true);
		const gameTitle = document.getElementById('gameTitle');
		if (gameTitle) {
			gameTitle.textContent = this.title;
		}
		const gameDescription = document.getElementById('gameDescription');
		if (gameDescription) {
			gameDescription.textContent = this.description;
		}
		const technologies = document.getElementById('technologies');
		if (technologies) {
			technologies.textContent = this.tech;
		}
		const gameLink = document.getElementById("gameLink") as HTMLAnchorElement;
		if (gameLink) {
			gameLink.textContent = "Game Page";
			gameLink.href = this.gameLink;
			gameLink.target = "_blank";
		}
		const collaborators = document.getElementById('collaborators');
		if (collaborators) {
			collaborators.textContent = this.collaborators;
		}
	}
}

export class GloryDogs extends Cloud {
	constructor(scene: Phaser.Scene, x: number, y: number, player: Phaser.Physics.Arcade.Sprite) {
		super(scene, x, y, 'gloryDogs', player);
		this.title = "GloryDogs"
		this.description = `
			2 player browser based celular automata. 
			Blast through space debris and rescue survivors
			Help the most people to WIN THE GLORY!
		`;
		this.tech = "GameMaker"

		this.gameLink = "https://gamejolt.com/games/glorydogs/638631"
		this.collaborators = "Midnight Dame"
	}
}
