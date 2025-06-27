import Phaser from 'phaser';

class VidFile {
	public key: string;
	public title: string;
	public tech: string;
	public gameLink: string;
	public collaborators: string;

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
		
		this.videos.push(gloryDogs);
	}

	public getVideo() {
		const vid = this.videos[this.cur];	
		this.cur++;
		return vid;
	}
}

