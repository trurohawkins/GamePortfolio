import Phaser from 'phaser';
import Shot from './shot';

function wait(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

class VidFile {
	public key: string;
	public title: string;
	public tech: string;
	public gameLink: string;
	public collaborators: string;

	public scale: number = 1;
	constructor(key: string, title: string, description: string, tech: string, link: string, team: string) {
		this.key = key;
		this.title = title;
		this.description = description;
		this.tech = tech;
		this.gameLink = link;
		this.collaborators = team;
	}
}

export default class Archive {

	private videos: VidFile[] = [];
	private shots: Shot[] = [];

	private cur: number = 0;	
	private curCloud?: cloud;
	
	constructor() {
		const gdDesc = 
			"Pilot a giant mecha and rescue human survivors from space debris.<br>Play with your friends to kill aliens, blow up obstacles and save people!<br>Help the most people to WIN THE GLORY!"
		const gdTech = `
			Procedurally generated fully destructuble and moving maps.<br>
			Programmed in GML in Gamamaker. <br>Exported to HTML5 to run in the browser.
		`
		const gdTeam = `
			Made with the Midnight Dame development team.<br>
			Team Lead and Sprite Artist Eli Maki.<br>
			Programming and Design Tru Hawkins.<br>
		`
		const gloryDogs = new VidFile("gloryDogs", "GloryDogs", gdDesc, gdTech, "https://gamejolt.com/games/glorydogs/638631", gdTeam);
		gloryDogs.scale = 0.75
		this.videos.push(gloryDogs);
		this.shots.push(new Shot('gd', 5));

		const stroidDesc = 
			`
			Mobile Game for Android. Fly around procedurally generated levels.
			Collect pieces to customize your spaceship.
			Mine valuable minerals to upgrade your ship.
			Infinite level and upgrade scaling!
			`
		const stroidTeam =
		`
		Programming and Design by Tru Hawkins
		Artwork by Emma Fitzpatrick
		Music by Gabe Zapata
		`
		const stroid = new VidFile("stroid", "Stroid", stroidDesc, "Unity", "_", stroidTeam);
		this.videos.push(stroid);
		this.shots.push(new Shot('stroid', 6));

		const tremblesDesc =
		`
		Made for GameJolt Week long Game Jam.
		Based on the movie Tremors as per Game Jam theme.
		Guide your miners to travel through worm infested ground.
		Collect valuable ores and blow up the worm nest to win!
		`
		const tremblesTeam =
		`
		Design by Eli Maki and Tru Hawkins
		Programming by Tru Hawkins
		Artwork by Eli Maki
		Music by Gabe Zapata
		`
		const trembles = new VidFile("trembles", "Trembles", tremblesDesc, "Unity", "https://gamejolt.com/games/trembles/729503", tremblesTeam);
		trembles.scale = 0.5;
		this.videos.push(trembles);
		this.shots.push(new Shot('trembles', 6));

		const ppDesc =
		`
		Run around chugging beer and peeing on people!
		You are the life of the party!
		Just don't stop peeing or drinking beer!
		`
		const ppTeam =
		`
		Design by Acie Schiff and Tru Hawkins
		Programming by Tru Hawkins
		Artwork by Tru Hawkins
		Music by Brandon Mckie and Tru Hawkins
		`
		const peepee = new VidFile("peepeeMadness", "PeePee Madness", ppDesc, "Unity", "https://trugames.itch.io/peepee-madness", ppTeam);
		this.videos.push(peepee);
		this.shots.push(new Shot('pp', 4));

		const rollDesc =
		`
		Mobile game where you control 1 of 3 chubby buddies.
		Roll them through 5 maze levels to get them home saafely.
		Collect candy to speed up and get the best time possible!
		Won best Mobile Game Award at CSU Chico.
		`
		const rollTeam =
		`
		Design by Tru Hawkins and Sarah Vaughn
		Programming by Tru Hawkins
		Artwork by Sarah Vaughn
		`
		const roll = new VidFile("ROHLB", "Roll On Home Little Buddy", rollDesc, "Unity", "_", rollTeam);
		this.videos.push(roll);
		this.shots.push(new Shot('rohlb', 5));
	}


	public setVidInfoIndex(index: number, pause: number) {
		this.setVidInfo(this.videos[index], pause)
	}

	public async setVidInfo(file: VidFile, pause: number) {
		const leftPanel = document.getElementById('left-panel');
		if (leftPanel) {
			leftPanel.style.backgroundColor = '#333';
		}
		const rightPanel = document.getElementById('right-panel');
		if (rightPanel) {
			rightPanel.style.backgroundColor = '#333';
		}
		const gameTitle = document.getElementById('gameTitle');
		if (gameTitle) {
			gameTitle.textContent = file.title;
			gameTitle.className = 'block';
			await wait(pause);
		}
		const gameDescription = document.getElementById('gameDescription');
		if (gameDescription) {
			//gameDescription.textContent = file.description;
			gameDescription.innerHTML = "Description:<br>"+file.description;
			gameDescription.className = 'block';
			await wait(pause);
		}
		const technologies = document.getElementById('technologies');
		if (technologies) {
			technologies.innerHTML = "Technology:<br>"+file.tech;
			technologies.className = 'block'; 
			await wait(pause);
		}
		const page = document.getElementById('page');
		if (page) {
			page.className = 'block';
			await wait(pause);
		}
		const gameLink = document.getElementById("gameLink") as HTMLAnchorElement;
		if (gameLink) {
			gameLink.textContent = "Game Page";
			gameLink.href = file.gameLink + "?fres"
			gameLink.target = "_blank";
			await wait(pause);
		}
		const collaborators = document.getElementById('collaborators');
		if (collaborators) {
			collaborators.innerHTML = "Team:<br>"+file.collaborators;
			collaborators.className = 'block'; 
			await wait(pause);
		}
	}

	public playVideo(cloud: Cloud) {
		if (this.curCloud !== undefined) {
			this.curCloud.video.stop();
			this.curCloud.resetVideo();
		}
		this.curCloud = cloud;
		cloud.video.setVisible(true);
		cloud.video.play(false);
	}

	public getVideo() {
		const vid = this.videos[this.cur];
		this.cur = (this.cur + 1) % this.videos.length;
		return vid;
	}

	public addShotsToScene(scene: Phaser.Scene) {
		for (let i = 0; i < this.shots.length; i++) {
			this.shots[i].addToScene(scene);
		}
	}

	public placeShot(shot: number, x: number, y: number) {
		if (shot >= 0 && shot < this.shots.length) {
			this.shots[shot].container.x = x;
			this.shots[shot].container.y = y;
		}
	}

	public highlightShot(shot: number, on: boolean) {
		this.shots[shot].highlight(on)
	}

	public showShots() {
		for (let i = 0; i < this.shots.length; i++) {
			this.shots[i].play();
		}
	}

	public hideShots() {
		for (let i = 0; i < this.shots.length; i++) {
			this.shots[i].hide();
		}
	}

	update() {
		for (let i = 0; i < this.shots.length; i++) {
			if (this.shots[i].playing) {
				this.shots[i].update();
			}
		}
	}
}

