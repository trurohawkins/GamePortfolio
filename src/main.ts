import Phaser from 'phaser';
import {PreloadScene} from './preload';
import {Menu} from './menu';
import Player from './player';
import Archive from './archive';
import Cloud from './cloud';
import Shot from './shot';

export const worldSize: number = 4500;
const worldCam: boolean = false;
//worldCam supdercedes whipCam
const whipCam: boolean = false;
let paused = false;
let lightsOff: boolean = true;
let turningOn: boolean = false;

class MainScene extends Phaser.Scene {
	
	private player!: Player;
	private clouds: Cloud[] = [];
	public videos: Phaser.GameObjects.Video[] = [];
	private archive!: Archive;
	private doorLeft!: Phaser.Gameobjects.Rectangle;

	constructor() {
		super({key: 'mainScene'});
	}

	create() {
		//const worldSize = 2000;
		//this.scene.launch('Menu');
		/*
		this.input.keyboard.on('keydown-ESC', () => {
			if (this.scene.isPaused('mainScene')) {
				this.scene.resume('mainScene');
				this.scene.stop('Menu');
			} else {
				this.scene.pause('mainScene');
				this.scene.launch('Menu', {archive: this.archive});
			}
		});
		*/
		this.doorLeft = this.add.rectangle(0, -1, this.scale.width/2, this.scale.height, 0x000000, 1).setOrigin(0);
		this.doorLeft.setDepth(999999);
		this.doorLeft.setAlpha(0);
		this.doorLeft.setScrollFactor(0);
		this.doorRight = this.add.rectangle(this.scale.width/2, -1, this.scale.width/2, this.scale.height, 0x000000, 1).setOrigin(0);
		this.doorRight.setDepth(999999);
		this.doorRight.setAlpha(0);
		this.doorRight.setScrollFactor(0);
		this.scale.on('resize', (gameSize: Phaser.Structs.Size) => {
			this.onResize(gameSize)
		});

		console.log("pooo bakc:");
		this.events.on('pause', this.onPause, this);
		this.events.on('resume', this.onResume, this);
	 	this.add.tileSprite(0, 0, worldSize+100, worldSize+100, 'background').setOrigin(0);
		
		//homeBase.setDisplaySize(600, 600);
		this.space = this.physics.add.image(worldSize/2, worldSize/2, 'space');
		this.space.setDepth(5);
		this.homeBase = this.physics.add.image(worldSize/2, worldSize/2, 'planet');
		//this.homeBase.setScale(7);
		const radius = Math.min(this.homeBase.height, this.homeBase.width)/2;
		const buffer = 10;
		this.homeBase.body.setCircle(radius - buffer);
		console.log("home base radius " + radius)
		this.homeBase.body.setOffset(buffer, buffer);
		this.homeBase.body.moves = false;
		this.homeBase.setImmovable(true);
		this.homeBase.setGravity(false);

		this.physics.world.setBounds(0, 0, worldSize, worldSize);
		//this.cameras.main.setBounds(0, 0, worldSize, worldSize);

		this.player = new Player(this, worldSize/2, worldSize/2 - (this.homeBase.displayWidth/2), 'player');
		this.player.setHome(this.homeBase);//worldSize/2, worldSize/2);
		this.physics.add.collider(this.player, this.homeBase);//, this.player.homeCollide, undefined, this);/*, () => {

		const camera = this.cameras.main;
		if (worldCam) {
			const zx = camera.width / worldSize;
			const zy = camera.height / worldSize;
			camera.setZoom(Math.min(zx, zy));
			camera.centerOn(worldSize/2, worldSize/2);
		} else {
			const buffer = 40;
			camera.setBounds(0, 0, worldSize-buffer, worldSize-buffer);
			camera.startFollow(this.player, whipCam, 0.1, 0.1);
		}
	
		//const gloryCloud = new Cloud(this, 400, 1000, 'gloryDogs', this.player);
		this.clouds.push(new Cloud(this, 90, 500, this.player, this.archive));
		this.clouds.push(new Cloud(this, 60, 1200, this.player, this.archive));
		this.clouds.push(new Cloud(this, 180, 700, this.player, this.archive));
		this.clouds.push(new Cloud(this, 0, 800, this.player, this.archive));
		this.clouds.push(new Cloud(this, 270, 600, this.player, this.archive));

		this.keys = {
			up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
		}
	}

	init(data: Archive) {
		this.archive = data.archive;
		console.log("got archive data");
	}

	update() {
		if (!lightsOff) {
			this.archive.update();
			for (let i = 0; i < this.clouds.length; i++) {
				this.clouds[i].update();
			}
			
			this.player.update();
			const cam = this.cameras.main;
			const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.homeBase.x, this.homeBase.y);
			if (dist > worldSize/2) {
				let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.homeBase.x, this.homeBase.y);
				//angle += Phaser.Math.DegToRad(-90);
				console.log(this.player.x + ", " + this.player.y);
				const ax = Math.cos(angle) * (worldSize);
				const ay = Math.sin(angle) * (worldSize);
				this.player.x += ax;
				this.player.y += ay;
				if (!worldCam && !whipCam) {
					cam.scrollX += ax;
					cam.scrollY += ay;
				}
				console.log(this.player.x + ", " + this.player.y);
			}
		} else {
			if (!turningOn && Phaser.Input.Keyboard.JustDown(this.keys.up)) {
				turningOn = true;
				const left = document.getElementById('doorLeft');
				const right = document.getElementById('doorRight');
				const welcome = document.getElementById('welcome');
				let dummy = {progress: 0};
				this.tweens.add({
					targets: dummy,
					progress: 100,
					duration: 1500,
					ease: 'Expo.inOut',
					onUpdate: () => {
						const value = dummy.progress;
						left.style.transform = `translateX(${-value}%)`;
						right.style.transform = `translateX(${value}%)`;
						welcome.style.opacity = 1 - value;
					},
					onComplete: () => {
						lightsOff = false;
					}
				});
				/*
				this.tweens.add({
					targets: [this.doorLeft, this.doorRight],
					x: (target: Phaser.GameObjects.Rectangle) => {
						return target == this.doorLeft ? -target.width : this.scale.width;
					},
					duration: 1500,
					ease: 'Expo.inOut',
					onComplete: () => {
						this.doorsOpen();
					}
				});
				*/
			}
		}

	}

	openDoors() {

	}

	doorsOpen() {
		this.doorRight.setAlpha(0);
		this.doorLeft.setAlpha(0);
		const leftPanel = document.getElementById('left-panel');
		if (leftPanel) {
			leftPanel.className = "panel";
		}
		const rightPanel = document.getElementById('right-panel');
		if (rightPanel) {
			rightPanel.className = "panel";
		}

		const banner = document.getElementById('banner');
		if (banner) {
			banner.className = "banner";
		}
		lightsOff = false;

	}

	private onPause() {
		console.log("main scene is pausing");
		this.videos.forEach(video => video.pause());
	}

	private onResume() {
		this.videos.forEach(video => video.resume());
	}

	private onResize(gameSize: Phaser.Structs.Size) {
		this.doorLeft.width = gameSize.width/2;
		this.doorLeft.height = gameSize.height;
		
		this.doorRight.width = gameSize.width/2;
		this.doorRight.height = gameSize.height;
		this.doorRight.x = gameSize.width/2;
	}

}

const wrapper = document.getElementById('game-wrapper')!;
let game: Phaser.Game;

const config: Phaser.Types.Core.GamesConfig = {
	type: Phaser.AUTO,
	parent: 'game-wrapper',
	scale: {
		mode: Phaser.Scale.RESIZE,
		parent: 'game-wrapper',
		autoCenter: Phaser.Scale. CENTER_BOTH,
	},
	backgroundColor:'#000000',
	physics: {
		default: 'arcade',
		arcade: {
			debug: 
				false
		}
	},
	scene: [PreloadScene, Menu, MainScene],
};

game = new Phaser.Game(config);
/*
window.addEventListener('resize', () => {
	const wrapper = document.getElementById('game-wrapper')!;
	const width = wrapper.clientWidth;
	const height = wrapper.clientHeight;
	console.log(width + ", " + height);
	game.scale.resize(width, height);
});
*/

