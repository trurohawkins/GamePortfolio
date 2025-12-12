const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DMbL1oaG.js","assets/phaser-BOgQtUoh.js","assets/index-CPD4XyB7.css"])))=>i.map(i=>d[i]);
var v=Object.defineProperty;var P=(h,e,t)=>e in h?v(h,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):h[e]=t;var s=(h,e,t)=>P(h,typeof e!="symbol"?e+"":e,t);import{_ as M}from"./index-DMbL1oaG.js";import"./phaser-BOgQtUoh.js";class u{constructor(e,t,i=1e3,o=.25){s(this,"container");s(this,"shots",[]);s(this,"cur",0);s(this,"fade",1e4);s(this,"playing",!1);s(this,"scene");s(this,"pause",120);s(this,"curPause",0);s(this,"curShot");s(this,"nextShot");this.duration=i,this.names=[];for(let a=0;a<t;a++)this.names.push(e+a);this.scale=o}addToScene(e){this.scene=e,this.container=e.add.container(0,0),this.names.forEach((t,i)=>{const o=e.add.sprite(0,0,t);o.setAlpha(0),o.setDepth(1e3),o.setTint(8421504),this.container.add(o),this.shots.push(o)}),this.container.setScale(this.scale)}highlight(e){this.shots.forEach(t=>{e?t.setTint(16777215):t.setTint(8421504)})}crossFadeTo(e){e===this.cur||e<0||e>=this.shots.length||(this.curShot=this.shots[this.cur],this.nextShot=this.shots[e],this.scene.tweens.add({targets:this.curShot,alpha:0,duration:this.duration,onComplete:()=>{this.curShot.alpha=0}}),this.scene.tweens.add({targets:this.nextShot,alpha:1,duration:this.duration,onComplete:()=>{this.curPause=0}}),this.cur=e)}play(){this.playing=!0,this.shots[this.cur].setAlpha(1),this.curPause=0}hide(){this.playing=!1,this.scene.tweens.killTweensOf(this.curShot),this.scene.tweens.killTweensOf(this.nextShot);for(let e=0;e<this.shots.length;e++)this.shots[e].setAlpha(0)}update(){this.curPause<this.pause&&(this.curPause++,this.curPause==this.pause&&this.crossFadeTo((this.cur+1)%this.shots.length))}}function c(h){return new Promise(e=>setTimeout(e,h))}class p{constructor(e,t,i,o,a,n){s(this,"key");s(this,"title");s(this,"tech");s(this,"gameLink");s(this,"collaborators");s(this,"scale",1);this.key=e,this.title=t,this.description=i,this.tech=o,this.gameLink=a,this.collaborators=n}}class C{constructor(){s(this,"videos",[]);s(this,"shots",[]);s(this,"cur",0);s(this,"curCloud");const e="Pilot a giant mecha and rescue human survivors from space debris.<br>Play with your friends to kill aliens, blow up obstacles and save people!<br>Help the most people to WIN THE GLORY!",t=`
			Procedurally generated fully destructuble and moving maps.<br>
			Programmed in GML in Gamamaker. <br>Exported to HTML5 to run in the browser.
		`,i=`
			Made with the Midnight Dame development team.<br>
			Team Lead and Sprite Artist Eli Maki.<br>
			Programming Tru Hawkins.<br>
			Design and concept by Tru Hawkins and Eli Maki
		`,o=new p("gloryDogs","GloryDogs",e,t,"https://gamejolt.com/games/glorydogs/638631",i);o.scale=.4,this.videos.push(o),this.shots.push(new u("gd",5));const a=`
			Fly spaceship through procedurally generated levels.<br>
			Collect pieces to customize your spaceship.<br>
			Mine valuable minerals to upgrade your ship.<br>
			Algorithmically infinite level and upgrade scaling!<br>
		`,n=`
			Mobile game developed for Android in Unity3D<br>
			programmed in C#
		`,l=`
			Programming and Design by Tru Hawkins<br>
			Artwork by Emma Fitzpatrick<br>
			Music by Gabe Zapata<br>
		`,m=new p("stroid","Stroid",a,n,"_",l);this.videos.push(m),this.shots.push(new u("stroid",6));const r=`
			Control a group of up to 10 miners<br>
			Guide your little guys through worm infested ground.<br>
			Collect valuable ores for points!<br>
			Place the bomb to blow up the worm nest!<br>
			And guide your team out to safety!
		`,d=`
			Made for GameJolt Week long Game Jam. <br>
			Based on the movie Tremors as per Game Jam theme. <br>
			Built in Unity3D using C#
		`,b=`
			Design by Eli Maki and Tru Hawkins<br>
			Programming by Tru Hawkins<br>
			Artwork by Eli Maki<br>
			Music by Gabe Zapata<br>
		`,g=new p("trembles","Trembles",r,d,"https://gamejolt.com/games/trembles/729503",b);g.scale=.4,this.videos.push(g),this.shots.push(new u("trembles",6));const y=`
		Run around chugging beer and peeing on people!
		You are the life of the party!
		Just don't stop peeing or drinking beer!
		`,f=`
		Design by Acie Schiff and Tru Hawkins
		Programming by Tru Hawkins
		Artwork by Tru Hawkins
		Music by Brandon Mckie and Tru Hawkins
		`,S=new p("peepeeMadness","PeePee Madness",y,"Unity","https://trugames.itch.io/peepee-madness",f);this.videos.push(S),this.shots.push(new u("pp",4));const w=`
		Mobile game where you control 1 of 3 chubby buddies.
		Roll them through 5 maze levels to get them home saafely.
		Collect candy to speed up and get the best time possible!
		Won best Mobile Game Award at CSU Chico.
		`,k=`
		Design by Tru Hawkins and Sarah Vaughn
		Programming by Tru Hawkins
		Artwork by Sarah Vaughn
		`,T=new p("ROHLB","Roll On Home Little Buddy",w,"Unity","_",k);this.videos.push(T),this.shots.push(new u("rohlb",5))}setVidInfoIndex(e,t){this.setVidInfo(this.videos[e],t)}async setVidInfo(e,t){const i=document.getElementById("left-panel");i&&(i.style.backgroundColor="#333");const o=document.getElementById("right-panel");o&&(o.style.backgroundColor="#333");const a=document.getElementById("gameTitle");a&&(a.textContent=e.title,a.className="block",await c(t));const n=document.getElementById("gameDescription");n&&(n.innerHTML="Description:<br>"+e.description,n.className="block",await c(t));const l=document.getElementById("technologies");l&&(l.innerHTML="Technology:<br>"+e.tech,l.className="block",await c(t));const m=document.getElementById("page");m&&(m.className="block",await c(t));const r=document.getElementById("gameLink");r&&(r.textContent="Game Page",r.href=e.gameLink+"?fres",r.target="_blank",await c(t));const d=document.getElementById("collaborators");d&&(d.innerHTML="Team:<br>"+e.collaborators,d.className="block",await c(t))}playVideo(e){this.curCloud!==void 0&&(this.curCloud.video.stop(),this.curCloud.resetVideo()),this.curCloud=e,e.video.setVisible(!0),e.video.play(!1)}getVideo(){const e=this.videos[this.cur];return this.cur=(this.cur+1)%this.videos.length,e}addShotsToScene(e){for(let t=0;t<this.shots.length;t++)this.shots[t].addToScene(e)}placeShot(e,t,i){e>=0&&e<this.shots.length&&(this.shots[e].container.x=t,this.shots[e].container.y=i)}highlightShot(e,t){this.shots[e].highlight(t)}showShots(){for(let e=0;e<this.shots.length;e++)this.shots[e].play()}hideShots(){for(let e=0;e<this.shots.length;e++)this.shots[e].hide()}update(){for(let e=0;e<this.shots.length;e++)this.shots[e].playing&&this.shots[e].update()}}class A extends Phaser.Scene{constructor(){super({key:"Menu"});s(this,"paused",!1);s(this,"background");s(this,"mainCreated",!1)}create(){if(this.background=this.add.rectangle(0,0,this.scale.width,this.scale.height,0,1).setOrigin(0),this.background.setAlpha(0),this.archive=new C,this.add.existing(this.archive),this.archive.addShotsToScene(this),this.buffer=120,this.spacing=290,this.numShots=5,this.displayShots=3,this.curShot=0,this.preShot=4,this.placeShots(),this.selectShot(!0),this.scale.on("resize",t=>{this.onResize(t)}),this.keys={up:this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),down:this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)},this.mainCreated)console.warn("main scene already created");else{this.mainCreated=!0;const t="MainScene";M(async()=>{const{MainScene:i}=await import("./index-DMbL1oaG.js").then(o=>o.m);return{MainScene:i}},__vite__mapDeps([0,1,2])).then(({MainScene:i})=>{this.scene.get(t)||this.scene.add(t,i,!1),this.scene.isActive(t)?console.warn("MaiN Scene is already active"):this.scene.launch(t,{archive:this.archive}),this.scene.bringToTop(),this.input.keyboard.on("keydown-ESC",()=>{this.scene.get(t)&&(this.paused=!this.paused,this.paused?(this.scene.pause(t),this.archive.showShots(),this.background.setAlpha(.5),this.selectShot(!0)):(this.scene.resume(t),this.archive.hideShots(),this.background.setAlpha(0)))})})}}onResize(t){this.background.width=t.width,this.background.height=t.height,this.placeShots()}placeShots(){for(let t=0;t<this.numShots;t++){const i=(this.preShot+t)%this.numShots;t<this.displayShots?this.archive.placeShot(i,this.scale.width/2,this.buffer+this.spacing*t):this.archive.placeShot(i,99999,99999)}}update(){this.archive.update(),this.paused&&(Phaser.Input.Keyboard.JustDown(this.keys.up)&&this.move(-1),Phaser.Input.Keyboard.JustDown(this.keys.down)&&this.move(1))}move(t){this.selectShot(!1),this.curShot=this.incNum(this.curShot,t),this.preShot=this.incNum(this.preShot,t),this.selectShot(!0),this.placeShots()}incNum(t,i){return i>0?t=(t+1)%this.numShots:t+i>=0?t+=i:t=this.numShots-1,t}selectShot(t){this.archive.highlightShot(this.curShot,t),this.paused&&this.archive.setVidInfoIndex(this.curShot,0)}}export{A as Menu};
