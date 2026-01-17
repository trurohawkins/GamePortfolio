import './style.css';
import Phaser from 'phaser';
import {PreloadScene} from './preload';
//import {Menu} from './menu';
import Player from './player';
import Archive from './archive';
import Cloud from './cloud';
import Shot from './shot';
import Instructor from './instructor';

export const worldSize: number = 4500;
const worldCam: boolean = false;
//worldCam supdercedes whipCam
const whipCam: boolean = false;
let paused = false;
let lightsOff: boolean = true;
let turningOn: boolean = false;
const deadZone = 5 
let curTilt = 0
let controlsOn = false;

export class MainScene extends Phaser.Scene {
	
	private player!: Player;
	private clouds: Cloud[] = [];
	public videos: Phaser.GameObjects.Video[] = [];
	private archive!: Archive;
	private instructor!: Instructor;

	constructor() {
		super({key: 'MainScene'});
	}

	create() {
		this.keys = {
			up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
			left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
			right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
			boost: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
		};
		this.events.on('pause', this.onPause, this);
		this.events.on('resume', this.onResume, this);
	 	this.add.tileSprite(0, 0, worldSize+100, worldSize+100, 'background').setOrigin(0);
		
		//homeBase.setDisplaySize(600, 600);
		/*
		this.space = this.physics.add.image(worldSize/2, worldSize/2, 'space');
		this.space.setDepth(2);
		*/
		this.homeBase = this.physics.add.image(worldSize/2, worldSize/2, 'planet');
		//this.homeBase.setScale(7);
		const radius = Math.min(this.homeBase.height, this.homeBase.width)/2;
		const buffer = 10;
		this.homeBase.body.setCircle(radius - buffer);
		this.homeBase.body.setOffset(buffer, buffer);
		this.homeBase.body.moves = false;
		this.homeBase.setImmovable(true);
		this.homeBase.setGravity(false);

		this.physics.world.setBounds(0, 0, worldSize, worldSize);
		//this.cameras.main.setBounds(0, 0, worldSize, worldSize);

		this.player = new Player(this, worldSize/2, worldSize/2 - (this.homeBase.displayWidth/2));
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
	 	this.instructor = new Instructor(this, this.sys.game.device.os.mobile || navigator.maxTouchPoints > 0)
	
		this.clouds.push(new Cloud(this, 90, 500, this.player, this.archive));
		this.clouds.push(new Cloud(this, 60, 1000, this.player, this.archive));
		this.clouds.push(new Cloud(this, 180, 700, this.player, this.archive));
		this.clouds.push(new Cloud(this, 0, 800, this.player, this.archive));
		this.clouds.push(new Cloud(this, 270, 600, this.player, this.archive));
	}

	init(data: Archive) {
		this.archive = data.archive;
	}

	update(time: number, delta: number) {
		if (!lightsOff) {
			if (controlsOn) {
					if (this.sys.game.device.os.mobile || navigator.maxTouchPoints > 0) {
 						if (this.input.pointer1.isDown) {
							if (this.instructor) {
								this.instructor.upPressed()
							}
							this.player.upPressed()
						}
					} else {
						if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
							if (this.instructor) {
								this.instructor.upPressed()
							}
							this.player.upPressed()
						}
						if (Phaser.Input.Keyboard.JustDown(this.keys.left)) {
							this.leftPress()
						}
						if (!this.keys.left.isDown && this.player.leftPress) {
							this.player.leftReleased()
						}
						if (Phaser.Input.Keyboard.JustDown(this.keys.right)) {
							this.rightPress()
						}
						if (!this.keys.right.isDown && this.player.rightPress) {
							this.player.rightReleased()
						}
					}
			}
			this.player.update(time, delta);
			this.archive.update();
			for (let i = 0; i < this.clouds.length; i++) {
				this.clouds[i].update();
			}
			
			const cam = this.cameras.main;
			const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.homeBase.x, this.homeBase.y);
			if (dist > worldSize/2) {
				let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.homeBase.x, this.homeBase.y);
				//angle += Phaser.Math.DegToRad(-90);
				const ax = Math.cos(angle) * (worldSize);
				const ay = Math.sin(angle) * (worldSize);
				this.player.x += ax;
				this.player.y += ay;
				if (!worldCam && !whipCam) {
					cam.scrollX += ax;
					cam.scrollY += ay;
				}
			}
		} else {
			if (!turningOn) {
				if (Phaser.Input.Keyboard.JustDown(this.keys.boost) || this.input.pointer1.isDown) {
					this.enableMotion();
					turningOn = true;
					lightsOff = false;
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
							if (value > 0.75) {
								controlsOn = true;
							}
							left.style.transform = `translateX(${-value}%)`;
							right.style.transform = `translateX(${value}%)`;
							welcome.style.opacity = 1 - value;
						},
						onComplete: () => {
							lightsOff = false;
							left.style.zIndex = "0"
							right.style.zIndex = "0"
							welcome.style.zIndex = "0"
							this.instructor.boostText()
						}
					});
				}
			}
		}

	}

	public hasMotion() {
		return 'DeviceOrientationEvent' in window || 'DeviceMotionEvent' in window; 
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

	async enableMotion() {
		if (
			typeof DeviceMotionEvent !== 'undefined' &&
			typeof (DeviceMotionEvent as any).requestPermission === 'function'
		) {
			const permission = await (DeviceMotionEvent as any).requestPermission();
			if (permission !== 'granted') {
				console.warn('Motion Permision denied');
				return;
			}
		}
		window.addEventListener('deviceorientation', this.handleOrientation);
		window.addEventListener('deviceorientationabsolute', this.handleOrientation);
	}


	handleOrientation = (event: DeviceOrientationEvent) => {
		let landscape = this.checkLandscape()//window.innerWidth > window.innerHeight
		const gamma = parseInt(event.gamma ?? 0);
		const beta = parseInt(event.beta ?? 0);
		let maxTilt = landscape ? 45 : 60;
		let gyro = landscape ? beta : gamma;
		let tiltVal = Math.abs(gyro) / maxTilt
		let direction = 0
		if (gyro < -deadZone) {
			direction = -1;
		} else if (gyro > deadZone) {
			direction = 1;
		}
		let tilt = tiltVal * direction;
		if (curTilt != tilt) {
			if (tilt === 0) {// || Math.sign(tilt) != Math.sign(curTilt)) {
				if (curTilt < 0) {
					this.player.leftReleased()
				} else if (curTilt > 0) {
					this.player.rightReleased()
				}
			} else {
				//this.instructor.testText("setting to " + tiltVal + " " + direction);
				this.player.setRotation(tiltVal, direction);
				this.instructor.testText("rot speed " + this.player.rotSpd);
			}
			curTilt = tilt;
		}
	}

	public checkLandscape() {
    if (screen.orientation && screen.orientation.type) {
        return screen.orientation.type.startsWith("landscape");
    }
    if (window.matchMedia("(orientation: landscape)").matches) {
        return true;
    }
    if (typeof window.orientation !== "undefined") {
        return Math.abs(window.orientation as number) === 90;
    }
    // fallback: compare width/height
    return window.innerWidth > window.innerHeight;
	}

	private leftPress() {
		this.player.leftPressed()
		this.instructor.turnPressed()
	}

	private rightPress() {
		this.player.rightPressed()
		this.instructor.turnPressed()
	}

	private onPause() {
		console.log("main scene is pausing");
		this.videos.forEach(video => video.pause());
	}

	private onResume() {
		this.videos.forEach(video => video.resume());
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
	scene: [PreloadScene],
	audio: {
		disableWebAudio: false
	}
};

if (!window.game) {
	window.game = new Phaser.Game(config);
}
