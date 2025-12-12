const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-Dfg7lIkU.js","assets/phaser-BOgQtUoh.js","assets/index-CPD4XyB7.css"])))=>i.map(i=>d[i]);
var k=Object.defineProperty;var T=(o,t,e)=>t in o?k(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var i=(o,t,e)=>T(o,typeof t!="symbol"?t+"":t,e);import{_ as v}from"./index-Dfg7lIkU.js";import"./phaser-BOgQtUoh.js";class u{constructor(t,e,s=1e3,h=.25){i(this,"container");i(this,"shots",[]);i(this,"cur",0);i(this,"fade",1e4);i(this,"playing",!1);i(this,"scene");i(this,"pause",120);i(this,"curPause",0);i(this,"curShot");i(this,"nextShot");this.duration=s,this.names=[];for(let a=0;a<e;a++)this.names.push(t+a);this.scale=h}addToScene(t){this.scene=t,this.container=t.add.container(0,0),this.names.forEach((e,s)=>{const h=t.add.sprite(0,0,e);h.setAlpha(0),h.setDepth(1e3),h.setTint(8421504),this.container.add(h),this.shots.push(h)}),this.container.setScale(this.scale)}highlight(t){this.shots.forEach(e=>{t?e.setTint(16777215):e.setTint(8421504)})}crossFadeTo(t){t===this.cur||t<0||t>=this.shots.length||(this.curShot=this.shots[this.cur],this.nextShot=this.shots[t],this.scene.tweens.add({targets:this.curShot,alpha:0,duration:this.duration,onComplete:()=>{this.curShot.alpha=0}}),this.scene.tweens.add({targets:this.nextShot,alpha:1,duration:this.duration,onComplete:()=>{this.curPause=0}}),this.cur=t)}play(){this.playing=!0,this.shots[this.cur].setAlpha(1),this.curPause=0}hide(){this.playing=!1,this.scene.tweens.killTweensOf(this.curShot),this.scene.tweens.killTweensOf(this.nextShot);for(let t=0;t<this.shots.length;t++)this.shots[t].setAlpha(0)}update(){this.curPause<this.pause&&(this.curPause++,this.curPause==this.pause&&this.crossFadeTo((this.cur+1)%this.shots.length))}}function l(o){return new Promise(t=>setTimeout(t,o))}class p{constructor(t,e,s,h,a,n){i(this,"key");i(this,"title");i(this,"tech");i(this,"gameLink");i(this,"collaborators");i(this,"scale",1);this.key=t,this.title=e,this.description=s,this.tech=h,this.gameLink=a,this.collaborators=n}}class P{constructor(){i(this,"videos",[]);i(this,"shots",[]);i(this,"cur",0);i(this,"curCloud");const t="Pilot a giant mecha and rescue human survivors from space debris.<br>Play with your friends to kill aliens, blow up obstacles and save people!<br>Help the most people to WIN THE GLORY!",e=`
			Procedurally generated fully destructuble and moving maps.<br>
			Programmed in GML in Gamamaker. <br>Exported to HTML5 to run in the browser.
		`,s=`
			Made with the Midnight Dame development team.<br>
			Team Lead and Sprite Artist Eli Maki.<br>
			Programming and Design Tru Hawkins.<br>
		`,h=new p("gloryDogs","GloryDogs",t,e,"https://gamejolt.com/games/glorydogs/638631",s);h.scale=.4,this.videos.push(h),this.shots.push(new u("gd",5));const a=`
			Mobile Game for Android. Fly around procedurally generated levels.
			Collect pieces to customize your spaceship.
			Mine valuable minerals to upgrade your ship.
			Infinite level and upgrade scaling!
			`,n=`
		Programming and Design by Tru Hawkins
		Artwork by Emma Fitzpatrick
		Music by Gabe Zapata
		`,d=new p("stroid","Stroid",a,"Unity","_",n);this.videos.push(d),this.shots.push(new u("stroid",6));const m=`
		Made for GameJolt Week long Game Jam.
		Based on the movie Tremors as per Game Jam theme.
		Guide your miners to travel through worm infested ground.
		Collect valuable ores and blow up the worm nest to win!
		`,r=`
		Design by Eli Maki and Tru Hawkins
		Programming by Tru Hawkins
		Artwork by Eli Maki
		Music by Gabe Zapata
		`,c=new p("trembles","Trembles",m,"Unity","https://gamejolt.com/games/trembles/729503",r);c.scale=.4,this.videos.push(c),this.shots.push(new u("trembles",6));const g=`
		Run around chugging beer and peeing on people!
		You are the life of the party!
		Just don't stop peeing or drinking beer!
		`,b=`
		Design by Acie Schiff and Tru Hawkins
		Programming by Tru Hawkins
		Artwork by Tru Hawkins
		Music by Brandon Mckie and Tru Hawkins
		`,y=new p("peepeeMadness","PeePee Madness",g,"Unity","https://trugames.itch.io/peepee-madness",b);this.videos.push(y),this.shots.push(new u("pp",4));const f=`
		Mobile game where you control 1 of 3 chubby buddies.
		Roll them through 5 maze levels to get them home saafely.
		Collect candy to speed up and get the best time possible!
		Won best Mobile Game Award at CSU Chico.
		`,S=`
		Design by Tru Hawkins and Sarah Vaughn
		Programming by Tru Hawkins
		Artwork by Sarah Vaughn
		`,w=new p("ROHLB","Roll On Home Little Buddy",f,"Unity","_",S);this.videos.push(w),this.shots.push(new u("rohlb",5))}setVidInfoIndex(t,e){this.setVidInfo(this.videos[t],e)}async setVidInfo(t,e){const s=document.getElementById("left-panel");s&&(s.style.backgroundColor="#333");const h=document.getElementById("right-panel");h&&(h.style.backgroundColor="#333");const a=document.getElementById("gameTitle");a&&(a.textContent=t.title,a.className="block",await l(e));const n=document.getElementById("gameDescription");n&&(n.innerHTML="Description:<br>"+t.description,n.className="block",await l(e));const d=document.getElementById("technologies");d&&(d.innerHTML="Technology:<br>"+t.tech,d.className="block",await l(e));const m=document.getElementById("page");m&&(m.className="block",await l(e));const r=document.getElementById("gameLink");r&&(r.textContent="Game Page",r.href=t.gameLink+"?fres",r.target="_blank",await l(e));const c=document.getElementById("collaborators");c&&(c.innerHTML="Team:<br>"+t.collaborators,c.className="block",await l(e))}playVideo(t){this.curCloud!==void 0&&(this.curCloud.video.stop(),this.curCloud.resetVideo()),this.curCloud=t,t.video.setVisible(!0),t.video.play(!1)}getVideo(){const t=this.videos[this.cur];return this.cur=(this.cur+1)%this.videos.length,t}addShotsToScene(t){for(let e=0;e<this.shots.length;e++)this.shots[e].addToScene(t)}placeShot(t,e,s){t>=0&&t<this.shots.length&&(this.shots[t].container.x=e,this.shots[t].container.y=s)}highlightShot(t,e){this.shots[t].highlight(e)}showShots(){for(let t=0;t<this.shots.length;t++)this.shots[t].play()}hideShots(){for(let t=0;t<this.shots.length;t++)this.shots[t].hide()}update(){for(let t=0;t<this.shots.length;t++)this.shots[t].playing&&this.shots[t].update()}}class C extends Phaser.Scene{constructor(){super({key:"Menu"});i(this,"paused",!1);i(this,"background")}create(){this.background=this.add.rectangle(0,0,this.scale.width,this.scale.height,0,1).setOrigin(0),this.background.setAlpha(0),this.archive=new P,this.add.existing(this.archive),this.archive.addShotsToScene(this),this.buffer=120,this.spacing=290,this.numShots=5,this.displayShots=3,this.curShot=0,this.preShot=4,this.placeShots(),this.selectShot(!0),this.scale.on("resize",s=>{this.onResize(s)});const e="MainScene";v(async()=>{const{MainScene:s}=await import("./index-Dfg7lIkU.js").then(h=>h.m);return{MainScene:s}},__vite__mapDeps([0,1,2])).then(({MainScene:s})=>{this.scene.add(e,s,!1),this.scene.launch(e,{archive:this.archive}),this.scene.bringToTop(),this.input.keyboard.on("keydown-ESC",()=>{this.scene.get(e)&&(this.paused=!this.paused,this.paused?(this.scene.pause(e),this.archive.showShots(),this.background.setAlpha(.5),this.selectShot(!0)):(this.scene.resume(e),this.archive.hideShots(),this.background.setAlpha(0)))})}),this.keys={up:this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),down:this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)}}onResize(e){this.background.width=e.width,this.background.height=e.height,this.placeShots()}placeShots(){for(let e=0;e<this.numShots;e++){const s=(this.preShot+e)%this.numShots;e<this.displayShots?this.archive.placeShot(s,this.scale.width/2,this.buffer+this.spacing*e):this.archive.placeShot(s,99999,99999)}}update(){this.archive.update(),this.paused&&(Phaser.Input.Keyboard.JustDown(this.keys.up)&&this.move(-1),Phaser.Input.Keyboard.JustDown(this.keys.down)&&this.move(1))}move(e){this.selectShot(!1),this.curShot=this.incNum(this.curShot,e),this.preShot=this.incNum(this.preShot,e),this.selectShot(!0),this.placeShots()}incNum(e,s){return s>0?e=(e+1)%this.numShots:e+s>=0?e+=s:e=this.numShots-1,e}selectShot(e){this.archive.highlightShot(this.curShot,e),this.paused&&this.archive.setVidInfoIndex(this.curShot,0)}}export{C as Menu};
