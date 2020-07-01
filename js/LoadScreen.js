

// var loadScreen;

class LoadScreen{

	constructor(){
		// this.numAudioFiles=0;
		// this.loadedAudioFiles=0;
		this.html={};
		this.createDivs();
		this.show();

		this.total=0;
		this.loaded=0;
		this.loadedPercent=0;
		this.easedLoaded=0;
		this.easing=.05;

		this.loadStartTime=Date.now();

		this.updateInterval=setInterval(this.draw.bind(this),10);

		this.preloadFiles={};
		//this.sizeOfFiles=0;

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

	// addFileToDownload(evt_){
	// 	this.filesToDownload.push(evt_.target.responseURL);
	// 	this.sizeOfFiles+=evt_.total;
	// }

	getDownloaded(){

		let loaded=0;
		for(let taget in this.preloadFiles){
			//console.log(this.preloadFiles[taget].loaded)
			if(this.preloadFiles[taget].loaded != undefined){
				loaded += this.preloadFiles[taget].loaded
			}
		}
		return loaded;

	}
	getTotal(){
		let total=0;
		for(let taget in this.preloadFiles){
			total += this.preloadFiles[taget].fileSize
			//console.log(this.preloadFiles[taget].fileSize)
		}
		return total;
	}

	update(evt_){
		// console.log("evt_")
		// console.log(evt_)
		// console.log("evt_.target.responseURL")
		// console.log(evt_.target.responseURL)
		// console.log("evt_.target.audioContent")
		// console.log(evt_.target.audioContent)
		// console.log(evt_.target.audioContent.url)
		// if(this.preloadFiles[evt_.target.responseURL] == undefined){

		// 	this.preloadFiles[evt_.target.responseURL] = {};
		// 	this.preloadFiles[evt_.target.responseURL].total = evt_.total;
		// 	//preloadFiles[evt_.target.responseURL].loaded = evt_.loaded;

		// 	this.total += evt_.total;


		// }
		console.log(this.preloadFiles)
		console.log(evt_.target.audioContent.url)
		this.preloadFiles[evt_.target.audioContent.url].loaded = evt_.loaded;


		
		this.loaded=this.getDownloaded();
		this.total = this.getTotal()

		console.log(this.loaded + " / " + this.total)

		this.loadedPercent=this.loaded/this.total;



		
		


		// if(this.numAudioFiles > 0){
		// 	this.loaded = (this.loadedAudioFiles/this.numAudioFiles*100) 




		// 	if(this.loaded == 100){
		// 		//console.log("Start the Story !!!")
		// 		document.title = 'Story Time';
		// 		this.favicon.href = "img/favicon/moon_y_favicon-100.gif";

				

				

		// 		dataLayer.push({
		// 			'loadTime': Date.now()-this.loadStartTime,
		// 			'event':'pageLoaded'
		// 		});

		// 		// currentStory.start();
		// 	}
		// 	//console.log((this.loadedAudioFiles/this.numAudioFiles*100));
		// }
	}

	
	draw(){
		
		// let speed = (this.loaded-this.easedLoaded)*this.easing
		// this.easedLoaded = speed + this.easedLoaded;
		// this.html.loadBar.style.width=this.easedLoaded+"%";
		this.html.loadBar.style.width=this.loadedPercent*100+"%";


		this.html.rocketContainer.style.top= ((window.innerHeight-191)*(1-this.loadedPercent)) +'px';
		this.html.loadText.innerHTML=Math.round(this.loadedPercent*100) + " %"
		document.title = 'Story Time ' + this.html.loadText.innerHTML;
		let roundedLoad = Math.floor(this.easedLoaded/10)*10;
		// console.log(Math.round(this.easedLoaded) + " %");
		// console.log("img/favicon/moon_y_favicon-"+ roundedLoad + ".gif")
		let faviconLoadedAddress= "img/favicon/moon_y_favicon-"+ roundedLoad + ".gif";
		if(this.favicon.href != faviconLoadedAddress){
			//document.getElementById('favicon').href = "img/favicon/moon_y_favicon-"+ roundedLoad + ".gif";
			//console.log(faviconLoadedAddress)
			this.favicon.href = faviconLoadedAddress;
		}
		




		// this.fireHeight+=(speed*600-this.fireHeight)*.01;
		// this.html.rocketFire.style.height= this.fireHeight + 'px';


		
	}


}