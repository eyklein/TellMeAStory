

// var loadScreen;

class LoadScreen{

	constructor(){
		this.numAudioFiles=0;
		this.loadedAudioFiles=0;
		this.html={};
		this.createDivs();
		this.show();

		this.loaded=0;
		this.easedLoaded=0;
		this.easing=.05;

		this.updateInterval=setInterval(this.draw.bind(this),10);
	}

	createDivs(){
		this.html.loadDisplay = document.createElement("div");
		this.html.loadBar = document.createElement("div");
		this.html.loadDisplay.append(this.html.loadBar);

		this.html.rocketContainer = document.createElement("div");
		this.html.rocketContainer.style.position='absolute';
		this.html.rocketContainer.style.top= window.innerHeight*(1-this.easedLoaded/100) +'px';
		this.html.rocketContainer.style.left='50%';

		this.html.loadDisplay.append(this.html.rocketContainer);

		console.log('LODING ROCKET')
		this.html.rocket = document.createElement("img");
		this.html.rocket.src='img/Rocket.gif';
		this.html.rocketContainer.append(this.html.rocket);
		this.html.rocket.style.position='absolute';
		this.html.rocket.style.top='0px';
		this.html.rocket.style['z-index']=10;
		this.html.rocket.onload=function(){
			console.log("rocket loaded")
		}

		
		



		this.html.rocketFire = document.createElement("img");
		this.html.rocketFire.src='img/Rocket-Fire.gif';
		this.html.rocketFire.style.position='absolute';
		this.html.rocketFire.style.top='165px';
		this.html.rocketFire.style.width='107px';
		this.html.rocketFire.style.height='10px';
		this.fireHeight=0;

		this.html.rocketContainer.append(this.html.rocketFire);
		this.html.rocketFire.style.position='absolute';
		this.html.rocket.style['z-index']=9;




		
		document.getElementById('content').style.height = window.innerHeight + "px";
		document.getElementById('content').style.width = window.innerWidth + "px";

		this.html.loadDisplay.style.height="100%";
		this.html.loadDisplay.style.width="100%";

		this.html.loadBar.style.height="100%";
		this.html.loadDisplay.style['background-color']="#292929";
		this.html.loadBar.style['background-color']="#424242";



	}

	show(){
		currentStory.windowManager.html.content.appendChild(this.html.loadDisplay);
	}
	hide(){
		clearInterval(this.updateInterval);
		currentStory.windowManager.html.content.removeChild(this.html.loadDisplay);
	}

	update(){
		if(this.numAudioFiles > 0){
			this.loaded = (this.loadedAudioFiles/this.numAudioFiles*100) 

			if(this.loaded == 100){
				currentStory.start();
			}
			//console.log((this.loadedAudioFiles/this.numAudioFiles*100));
		}
	}

	
	draw(){
		//console.log(this.loaded + " : " + this.easedLoaded)
		let speed = (this.loaded-this.easedLoaded)*this.easing
		this.easedLoaded = speed + this.easedLoaded;
		this.html.loadBar.style.width=this.easedLoaded+"%";

		this.html.rocketContainer.style.top= window.innerHeight*(1-this.easedLoaded/100) +'px';
		this.fireHeight+=(speed*600-this.fireHeight)*.01
		//console.log(this.fireHeight)
		this.html.rocketFire.style.height= this.fireHeight + 'px';
		
	}


}