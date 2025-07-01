import Phaser from 'phaser';

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
	private cur: number = 0;	

	constructor(scene: Phaser.Scene) {
		scene.add.existing(this);
		
		const gdDesc = `
			2 player browser based celular automata. 
			Blast through space debris and rescue survivors
			Help the most people to WIN THE GLORY!
		`;
		const gloryDogs = new VidFile("gloryDogs", "GloryDogs", gdDesc, "GameMaker", "https://gamejolt.com/games/glorydogs/638631", "Midnight Dame");
		gloryDogs.scale = 0.5;	
		this.videos.push(gloryDogs);

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
	}

	public getVideo() {
		const vid = this.videos[this.cur];
		this.cur = (this.cur + 1) % this.videos.length;
		return vid;
	}
}

