const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-Cbmai1GH.js","assets/phaser-BOgQtUoh.js","assets/index-_9qSmR-E.css"])))=>i.map(i=>d[i]);
var T=Object.defineProperty;var M=(h,e,t)=>e in h?T(h,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):h[e]=t;var i=(h,e,t)=>M(h,typeof e!="symbol"?e+"":e,t);import{_ as P}from"./index-Cbmai1GH.js";import"./phaser-BOgQtUoh.js";class u{constructor(e,t,s=1e3,o=.25){i(this,"container");i(this,"shots",[]);i(this,"cur",0);i(this,"fade",1e4);i(this,"playing",!1);i(this,"scene");i(this,"pause",120);i(this,"curPause",0);i(this,"curShot");i(this,"nextShot");this.duration=s,this.names=[];for(let n=0;n<t;n++)this.names.push(e+n);this.scale=o}addToScene(e){this.scene=e,this.container=e.add.container(0,0),this.names.forEach((t,s)=>{const o=e.add.sprite(0,0,t);o.setAlpha(0),o.setDepth(1e3),o.setTint(8421504),this.container.add(o),this.shots.push(o)}),this.container.setScale(this.scale)}highlight(e){this.shots.forEach(t=>{e?t.setTint(16777215):t.setTint(8421504)})}crossFadeTo(e){e===this.cur||e<0||e>=this.shots.length||(this.curShot=this.shots[this.cur],this.nextShot=this.shots[e],this.scene.tweens.add({targets:this.curShot,alpha:0,duration:this.duration,onComplete:()=>{this.curShot.alpha=0}}),this.scene.tweens.add({targets:this.nextShot,alpha:1,duration:this.duration,onComplete:()=>{this.curPause=0}}),this.cur=e)}play(){this.playing=!0,this.shots[this.cur].setAlpha(1),this.curPause=0}hide(){this.playing=!1,this.scene.tweens.killTweensOf(this.curShot),this.scene.tweens.killTweensOf(this.nextShot);for(let e=0;e<this.shots.length;e++)this.shots[e].setAlpha(0)}update(){this.curPause<this.pause&&(this.curPause++,this.curPause==this.pause&&this.crossFadeTo((this.cur+1)%this.shots.length))}}function c(h){return new Promise(e=>setTimeout(e,h))}class m{constructor(e,t,s,o,n,a){i(this,"key");i(this,"title");i(this,"tech");i(this,"gameLink");i(this,"collaborators");i(this,"scale",1);this.key=e,this.title=t,this.description=s,this.tech=o,this.gameLink=n,this.collaborators=a}}class E{constructor(){i(this,"videos",[]);i(this,"shots",[]);i(this,"cur",0);i(this,"curCloud");const e="Pilot a giant mecha and rescue human survivors from space debris.<br>Play with your friends to kill aliens, blow up obstacles and save people!<br>Help the most people to WIN THE GLORY!",t=`
			Procedurally generated fully destructuble and moving maps.<br>
			Programmed in GML in Gamamaker. <br>Exported to HTML5 to run in the browser.
		`,s=`
			Made with the Midnight Dame development team.<br>
			Team Lead and Sprite Artist Eli Maki.<br>
			Programming Tru Hawkins.<br>
			Design and concept by Tru Hawkins and Eli Maki
		`,o=new m("gloryDogs","GloryDogs",e,t,"https://gamejolt.com/games/glorydogs/638631",s);o.scale=.4,this.videos.push(o),this.shots.push(new u("gd",5));const n=`
			Fly spaceship through procedurally generated levels.<br>
			Collect pieces to customize your spaceship.<br>
			Mine valuable minerals to upgrade your ship.<br>
			Algorithmically infinite level and upgrade scaling!<br>
		`,a=`
			Mobile game developed for Android in Unity3D<br>
			programmed in C#
		`,l=`
			Programming and Design by Tru Hawkins<br>
			Artwork by Emma Fitzpatrick<br>
			Music by Gabe Zapata<br>
		`,g=new m("stroid","Stroid",n,a,"_",l);this.videos.push(g),this.shots.push(new u("stroid",6));const r=`
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
		`,p=new m("trembles","Trembles",r,d,"https://gamejolt.com/games/trembles/729503",b);p.scale=.4,this.videos.push(p),this.shots.push(new u("trembles",6));const y=`
		Run around chugging beer and peeing on people!
		You are the life of the party!
		Just don't stop peeing or drinking beer!
		`,w=`
		Design by Acie Schiff and Tru Hawkins
		Programming by Tru Hawkins
		Artwork by Tru Hawkins
		Music by Brandon Mckie and Tru Hawkins
		`,f=new m("peepeeMadness","PeePee Madness",y,"Unity","https://trugames.itch.io/peepee-madness",w);this.videos.push(f),this.shots.push(new u("pp",4));const S=`
		Mobile game where you control 1 of 3 chubby buddies.
		Roll them through 5 maze levels to get them home saafely.
		Collect candy to speed up and get the best time possible!
		Won best Mobile Game Award at CSU Chico.
		`,v=`
		Design by Tru Hawkins and Sarah Vaughn
		Programming by Tru Hawkins
		Artwork by Sarah Vaughn
		`,k=new m("ROHLB","Roll On Home Little Buddy",S,"Unity","_",v);this.videos.push(k),this.shots.push(new u("rohlb",5))}setVidInfoIndex(e,t){this.setVidInfo(this.videos[e],t)}async setVidInfo(e,t){const s=document.getElementById("left-panel");s&&(s.style.backgroundColor="#333");const o=document.getElementById("right-panel");o&&(o.style.backgroundColor="#333");const n=document.getElementById("gameTitle");n&&(n.textContent=e.title,n.className="block",await c(t));const a=document.getElementById("gameDescription");a&&(a.innerHTML="Description:<br>"+e.description,a.className="block",await c(t));const l=document.getElementById("technologies");l&&(l.innerHTML="Technology:<br>"+e.tech,l.className="block",await c(t));const g=document.getElementById("page");g&&(g.className="block",await c(t));const r=document.getElementById("gameLink");r&&(r.textContent="Game Page",r.href=e.gameLink+"?fres",r.target="_blank",await c(t));const d=document.getElementById("collaborators");d&&(d.innerHTML="Team:<br>"+e.collaborators,d.className="block",await c(t))}playVideo(e){this.curCloud!==void 0&&(this.curCloud.video.stop(),this.curCloud.resetVideo()),this.curCloud=e,e.video.setVisible(!0),e.video.play(!1)}getVideo(){const e=this.videos[this.cur];return this.cur=(this.cur+1)%this.videos.length,e}addShotsToScene(e){for(let t=0;t<this.shots.length;t++)this.shots[t].addToScene(e)}placeShot(e,t,s){e>=0&&e<this.shots.length&&(this.shots[e].container.x=t,this.shots[e].container.y=s)}highlightShot(e,t){this.shots[e].highlight(t)}showShots(){for(let e=0;e<this.shots.length;e++)this.shots[e].play()}hideShots(){for(let e=0;e<this.shots.length;e++)this.shots[e].hide()}update(){for(let e=0;e<this.shots.length;e++)this.shots[e].playing&&this.shots[e].update()}}class C extends Phaser.Scene{constructor(){super({key:"Menu"});i(this,"paused",!1);i(this,"background");i(this,"mainCreated",!1)}create(){this.background=this.add.rectangle(0,0,this.scale.width,this.scale.height,0,1).setOrigin(0),this.background.setAlpha(0),this.archive=new E,this.add.existing(this.archive),this.archive.addShotsToScene(this),this.buffer=120,this.spacing=290,this.numShots=5,this.displayShots=3,this.curShot=0,this.preShot=4,this.placeShots(),this.selectShot(!0),this.scale.on("resize",t=>{this.onResize(t)}),this.keys={up:this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),down:this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)},this.mainCreated?console.warn("main scene already created"):(this.mainCreated=!0,this.mainKey="MainScene",P(async()=>{const{MainScene:t}=await import("./index-Cbmai1GH.js").then(s=>s.m);return{MainScene:t}},__vite__mapDeps([0,1,2])).then(({MainScene:t})=>{var s;this.scene.get(this.mainKey)||this.scene.add(this.mainKey,t,!1),this.mainScene=this.scene.get(this.mainKey),console.log("creating main scene"),this.scene.isActive(this.mainKey)?console.warn("MaiN Scene is already active"):this.scene.launch(this.mainKey,{archive:this.archive}),this.setupMotionUnlock(),this.scene.bringToTop(),this.input.keyboard.on("keydown-ESC",()=>{this.togglePause()}),(s=document.getElementById("menu"))==null||s.addEventListener("click",()=>{this.togglePause()})}))}setupMotionUnlock(){if(this.welcome=document.getElementById("welcome"),!(this.sys.game.device.os.mobile||navigator.maxTouchPoints>0))this.mainScene.motionOk=!0;else{const t=s=>{this.welcome.innerHTML="getting permison",typeof DeviceMotionEvent<"u"&&typeof DeviceMotionEvent.requestPermission=="function"?DeviceMotionEvent.requestPermission().then(n=>{n==="granted"?(this.mainScene.motionOk=!0,this.welcome.innerHTML="got tilt permission",window.addEventListener("deviceorientation",this.mainScene.handleOrientation)):(this.welcome.innerHTML="not granted",console.warn("Motion permission denied"))}):(this.mainScene.motionOk=!0,window.addEventListener("deviceorientation",this.mainScene.handleOrientation)),window.removeEventListener("touchstart",t),window.removeEventListener("mousedown",t)};window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("mousedown",t,{once:!0}),this.welcome.innerHTML="waiting for touch permission"}}async enableMotion(){if(typeof DeviceMotionEvent<"u"&&typeof DeviceMotionEvent.requestPermission=="function"&&(this.welcome.innerHTML="sent request",await DeviceMotionEvent.requestPermission()!=="granted")){this.welcome.innerHTML="not granted",console.warn("Motion Permision denied");return}this.welcome.innerHTML="got tilt permission",window.addEventListener("deviceorientation",this.mainScene.handleOrientation),window.addEventListener("deviceorientationabsolute",this.mainScene.handleOrientation),this.mainScene.motionOk=!0}togglePause(){this.scene.get(this.mainKey)&&(this.paused=!this.paused,this.paused?(this.scene.pause(this.mainKey),this.archive.showShots(),this.background.setAlpha(.5),this.selectShot(!0)):(this.scene.resume(this.mainKey),this.archive.hideShots(),this.background.setAlpha(0)))}onResize(t){this.background.width=t.width,this.background.height=t.height,this.placeShots()}placeShots(){for(let t=0;t<this.numShots;t++){const s=(this.preShot+t)%this.numShots;t<this.displayShots?this.archive.placeShot(s,this.scale.width/2,this.buffer+this.spacing*t):this.archive.placeShot(s,99999,99999)}}update(){this.archive.update(),this.paused&&(Phaser.Input.Keyboard.JustDown(this.keys.up)&&this.move(-1),Phaser.Input.Keyboard.JustDown(this.keys.down)&&this.move(1))}move(t){this.selectShot(!1),this.curShot=this.incNum(this.curShot,t),this.preShot=this.incNum(this.preShot,t),this.selectShot(!0),this.placeShots()}incNum(t,s){return s>0?t=(t+1)%this.numShots:t+s>=0?t+=s:t=this.numShots-1,t}selectShot(t){this.archive.highlightShot(this.curShot,t),this.paused&&this.archive.setVidInfoIndex(this.curShot,0)}}export{C as Menu};
