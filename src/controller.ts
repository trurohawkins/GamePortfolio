const TAP_MAX_DISTANCE = 10;//px
const TAP_MAX_DURATION = 250;//ms
const SWIPE_MIN_DISTANCE = 30;//px
const deadZone = 5 
let curTilt = 0

export default class Controller {
	public menu: Menu;
	public main: MainScene;
	
	private leftDown: boolean = false;
	private rightDown: boolean = false;
	
	//touch controls
	private startX: number = 0;
	private startY: number = 0;
	private startTime: number = 0;
	private moved: boolean = false;

	constructor(menuScene: Phaser.Scene, mainScene: Phaser.Scene) {
		this.menu = menuScene;
		this.main = mainScene;
		this.menu.input.keyboard.on('keydown-ESC', () => {
			this.menu.togglePause();
		});
		this.menu.input.keyboard.on('keydown-W', () => {
			this.upPress();
		});
		this.menu.input.keyboard.on('keydown-S', () => {
			this.downPress();
		});

		this.menu.input.keyboard.on('keydown-A', () => {
			this.leftPress();
		});
		this.menu.input.keyboard.on('keyup-A', () => {
			this.leftRelease();
		});

		this.menu.input.keyboard.on('keydown-D', () => {
			this.rightPress();
		});
		this.menu.input.keyboard.on('keyup-D', () => {
			this.rightRelease();
		});

		this.menu.input.keyboard.on('keydown-SPACE', () => {
			this.tap();
		});

		this.menu.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			this.startX = pointer.x;
			this.startY = pointer.y;
			this.startTime = pointer.downTime;
			this.moved = false;
		});

		this.menu.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
			if (!pointer.isDown) return;
			const dx = pointer.x - this.startX;
			const dy = pointer.y - this.startY;

			if (Math.sqrt(dx * dx  + dy * dy) > TAP_MAX_DISTANCE) {
				this.moved = true;
			}
		});

		this.menu.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
			const endX = pointer.x;
			const endY = pointer.y;

			const dx = endX - this.startX;
			const dy = endY - this.startY;
			const distance = Math.sqrt(dx * dx + dy * dy);

			const duration = pointer.upTime - this.startTime;

			if (distance <= TAP_MAX_DISTANCE && duration <= TAP_MAX_DURATION) {
				//TAP
				this.tap();
				return;
			}
			if (distance >= SWIPE_MIN_DISTANCE) {
				//SWIPE
				this.swipe(dx, dy);
				return;
			}

		});
		this.setupMotionUnlock();
		console.log("controllr created");
	}

	public update() {
		if (!this.menu) {
			return;
		}
		if (this.menu.sys.game.device.mobile || navigator.maxTouchPoints > 0) {
			if (this.menu.input.activePointer.isDown) {
				this.tap();
			}
		}
	}

	private tap() {
		if (!this.menu.paused && this.main.motionOk) {
			if (this.main.lightsOff) {
				this.main.startGame();
			} else {
				this.main.upPress();
			}
		}
	}

	private swipe(dx: number, dy: number) {
		if (this.menu.paused) {
			if (dy > 0) {
				this.menu.move(-1);
			} else if (dy < 0) {
				this.menu.move(1);
			}
		}
	}

	private upPress() {
		if (this.menu.paused) {
			this.menu.move(-1);
		} else {
			this.main.upPress();
		}
	}

	private downPress() {
		if (this.menu.paused) {
			this.menu.move(1);
		}
	}

	private leftPress() {
		if (!this.leftDown) {
			this.leftDown = true;
			if (!this.menu.paused) {
				this.main.leftPress();
			}
		}
	}

	private leftRelease() {
		if (this.leftDown) {
			this.leftDown = false;
			this.main.player.leftReleased();
		}
	}

	private rightPress() {
		if (!this.rightDown) {
			this.rightDown = true;
			if (!this.menu.paused) {
				this.main.rightPress();
			}
		}
	}

	private rightRelease() {
		if (this.rightDown) {
			this.rightDown = false;
			this.main.player.rightReleased();
		}
	}

	private setupMotionUnlock() {
		this.welcome = document.getElementById('welcome')
		if (!(this.menu.sys.game.device.os.mobile || navigator.maxTouchPoints > 0)) {
			this.main.motionOk = true;
			return;
		}
		if (
				typeof DeviceMotionEvent !== 'undefined' &&
				typeof (DeviceMotionEvent as any).requestPermission === 'function'
			) {
				console.log("apple");
				const overlay = document.createElement('div');
				overlay.style.position = 'fixed';
				overlay.style.top = '0';
				overlay.style.left = '0';
				overlay.style.width = '100vw';
				overlay.style.height = '100vh';
				overlay.style.zIndex = '9999999'; // above canvas
				overlay.style.background = 'transparent';
				overlay.style.pointerEvents = 'all';
				document.body.appendChild(overlay);

				const unlock = (event: Event) => {
					event.stopPropagation();
					event.preventDefault();

					(DeviceMotionEvent as any).requestPermission().then((permission: string) => {
						if (permission === 'granted') {
							this.main.motionOk = true;
							window.addEventListener('deviceorientation', this.handleOrientation);
							this.main.startGame();
						} else {
							console.warn("Motion permission denied");
						}
						// Remove overlay after requestPermission() completes
						overlay?.removeEventListener("touchstart", unlock);
						overlay?.removeEventListener("mousedown", unlock);
						if (overlay?.parentElement) document.body.removeChild(overlay);
						requestAnimationFrame(() => {
							// Reset Phaser pointer state
							this.menu.input.manager.pointers.forEach(p => {
									p.isDown = false;
									p.primaryDown = false;
									p.downTime = 0;
							});	
						});
					}).catch((err)=> {
						console.log(err);
					});
				};
				overlay?.addEventListener("mousedown", unlock, { once: true });
				overlay?.addEventListener("touchstart", unlock, { once: true });
			} else {
				// Non-iOS or already allowed
				this.main.motionOk = true;
				window.addEventListener('deviceorientation', this.handleOrientation);
			}
	}

	private handleOrientation = (event: DeviceOrientationEvent) => {
		if (!this.main.controlsOn) {
			return;
		}
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
					this.main.player.leftReleased()
				} else if (curTilt > 0) {
					this.main.player.rightReleased()
				}
			} else {
				//this.instructor.testText("setting to " + tiltVal + " " + direction);
				this.main.player.setRotation(tiltVal, direction);
				this.main.instructor.turnPressed();
				//this.instructor.testText("rot speed " + this.player.rotSpd);
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


}
