

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

		this.loadStartTime=Date.now();

		this.updateInterval=setInterval(this.draw.bind(this),10);

		this.favicon = document.getElementById('favicon');
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

		
		this.html.rocket = document.createElement("img");
		this.html.rocket.src='img/Rocket.gif';
		this.html.rocketContainer.append(this.html.rocket);
		this.html.rocket.style.position='absolute';
		this.html.rocket.style.top='0px';
		this.html.rocket.style['z-index']=10;
		
		this.html.loadText = document.createElement("div");
		this.html.loadText.id='load-amount'
		this.html.rocketContainer.append(this.html.loadText);
		this.html.loadText.style.position='absolute';
		this.html.loadText.style.top='50px';
		this.html.loadText.style.width="200px"
		this.html.loadText.style.color='gray';
		this.html.loadText.style['font-size']='60px';

		this.html.loadText.style.left='110px';
		

		
		



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




		
		// document.getElementById('content').style.height = window.innerHeight + "px";
		// document.getElementById('content').style.width = window.innerWidth + "px";

		this.html.loadDisplay.style.height="100%";
		this.html.loadDisplay.style.width="100%";

		this.html.loadBar.style.height="100%";
		this.html.loadDisplay.style['background-color']="#292929";
		this.html.loadBar.style['background-color']="#333";



	}

	show(){
		document.getElementById('content').appendChild(this.html.loadDisplay);
	}
	hide(){
		clearInterval(this.updateInterval);
		console.log(currentStory.windowManager.html.content)
		console.log(this.html.loadDisplay)
		console.log(this.html.loadDisplay.parentNode)

		//this.html.loadDisplay.parentNode.removeChild(this.html.loadDisplay);

		//document.getElementById('content').removeChild(this.html.loadDisplay)
		currentStory.windowManager.html.content.removeChild(this.html.loadDisplay);
		updateContentSize();
		// currentStory.windowManager.addFullScreen();
		// currentStory.windowManager.addPlayPauseButton();
	}

	update(){
		if(this.numAudioFiles > 0){
			this.loaded = (this.loadedAudioFiles/this.numAudioFiles*100) 




			if(this.loaded == 100){
				//console.log("Start the Story !!!")
				document.title = 'Story Time';
				this.favicon.href = "img/favicon/moon_y_favicon-100.gif";

				

				

				dataLayer.push({
					'loadTime': Date.now()-this.loadStartTime,
					'event':'pageLoaded'
				});

				// currentStory.start();
			}
			//console.log((this.loadedAudioFiles/this.numAudioFiles*100));
		}
	}

	
	draw(){
		
		let speed = (this.loaded-this.easedLoaded)*this.easing
		this.easedLoaded = speed + this.easedLoaded;
		this.html.loadBar.style.width=this.easedLoaded+"%";


		this.html.rocketContainer.style.top= ((window.innerHeight-191)*(1-this.easedLoaded/100)) +'px';
		this.html.loadText.innerHTML=Math.round(this.easedLoaded) + " %"
		document.title = 'Story Time ' + this.html.loadText.innerHTML;
		let roundedLoad = Math.floor(this.easedLoaded/10)*10;
		// console.log(Math.round(this.easedLoaded) + " %");
		// console.log("img/favicon/moon_y_favicon-"+ roundedLoad + ".gif")
		let faviconLoadedAddress= "img/favicon/moon_y_favicon-"+ roundedLoad + ".gif";
		if(this.favicon.href != faviconLoadedAddress){
			//document.getElementById('favicon').href = "img/favicon/moon_y_favicon-"+ roundedLoad + ".gif";
			console.log(faviconLoadedAddress)
			this.favicon.href = faviconLoadedAddress;
		}
		




		this.fireHeight+=(speed*600-this.fireHeight)*.01
		//console.log(this.fireHeight)
		this.html.rocketFire.style.height= this.fireHeight + 'px';


		
	}


}