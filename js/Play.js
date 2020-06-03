
var currentStory;

var timeDelays={};

//var absoluteLocation="https://eyklein.github.io/TellMeAStory/";
var absoluteLocation="";



document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            break;
        case 38:// up arrow 
            currentStory.togglePlayPause();
            break;
        case 39:
        	currentStory.skip();
            break;
        case 40:// down arrow 
            currentStory.togglePlayPause();
            break;
        case 83://'s'
            currentStory.skip();
            break;
        case 32://' ' - space bar
            currentStory.togglePlayPause();
            break;
        case 81:
        	currentStory.printActiveDelays();
        	break;
        case 66:
        	currentStory.backEnd.display();
        	break;
        default:
    		console.log(e.keyCode)
    }
};

window.AudioContext = window.AudioContext||window.webkitAudioContext;

var context = new AudioContext();

function stopAudio(){
	for(let audioID in currentStory.activeMainAudio){
		currentStory.activeMainAudio[audioID].skip();
	}
}

function clearTimeOut(){
	for(let listenerID in timeDelays){
		console.log("REMOVING");
		console.log(listenerID);
		clearTimeout(timeDelays[listenerID]);
	}
}

function playStory(){
  
  
}

class Story{

	constructor(){
		this.path="";//this will keep track of the path that has been taken
		this.playing=false;
		this.audioCount=0;


		this.volume={};
		this.volume['main']=1;
		this.volume['background']=.8;


		// this.mainVolume=1;
		// this.backgroundVolume=1;

		this.activeMainAudio={};
		this.activeBackgroundAudio={};

		//this.setLeftOffsets()
		
	}
	

	loadScenesLib(scenesData_){
		this.scenesLib={};

		//make scenes
	  	for(let i=0; i<scenesData_.length;i++){//think about the order of loading. right now to goes through scene by scene maybe load all scens first and then do content
	  		this.scenesLib[scenesData_[i].id]=new Scene(scenesData_[i], this)
	  	}

	  	//add content to each scene
	  	for(let i=0; i<scenesData_.length;i++){//think about the order of loading. right now to goes through scene by scene maybe load all scens first and then do content
	  		this.scenesLib[scenesData_[i].id].addContents(scenesData_[i]);
	  	}
	  	//add universal content to every scene
	  	if(this.scenesLib["uni"] != undefined){
	  		for(let sceneID in this.scenesLib){
	  			if(sceneID != "uni"){

	  				for(let contentID in this.scenesLib["uni"].contentsLib){
	  					
	  					this.scenesLib[sceneID].contentsLib[contentID] = this.scenesLib["uni"].contentsLib[contentID]
	  				}
	  			}
	  		}
	  	}

	  	//add actions
	  	for(let i=0; i<scenesData_.length;i++){//think about the order of loading. right now to goes through scene by scene maybe load all scens first and then do content
	  		this.scenesLib[scenesData_[i].id].addActions(scenesData_[i])
	  	}

	  	this.setLastAndNextScenes();
	  	this.setSceneIndexNumbers();

	  	this.addScenesBackEnd();
	  	this.setWidthSceneBackEnd();

	  	this.setSceneNodeParents();
	  	this.setSceneNodeChildren();
	  	// this.setSceneNodePrevSiblings();
	  	// this.setSceneNodePositions();

	  	// this.setLeftOffsets();




	}

	setLastAndNextScenes(){
		//
		
		for(let scene in this.scenesLib){
			for(let action in this.scenesLib[scene].actionsLib){
				if(this.scenesLib[scene].actionsLib[action].head instanceof Scene){
					let previousScene = this.scenesLib[scene].actionsLib[action].scene;
					let currentScene = this.scenesLib[scene].actionsLib[action].head;
					
					//set last scenes
					if(currentScene.prevScenes[previousScene.id] == undefined){
						currentScene.prevScenes[previousScene.id]={};
						currentScene.prevScenes[previousScene.id].count=1;
						currentScene.prevScenes[previousScene.id].scene = previousScene;
						currentScene.prevScenes[previousScene.id].order=size(currentScene.prevScenes)

						//currentScene.prevScenesArray.push(previousScene);
						
					}
					else{
						currentScene.prevScenes[previousScene.id].count++;
					}

					//set next scenes
					if(previousScene.nextScenes[currentScene.id] == undefined){
						previousScene.nextScenes[currentScene.id]={};
						previousScene.nextScenes[currentScene.id].count=1;
						previousScene.nextScenes[currentScene.id].scene = currentScene;
						previousScene.nextScenes[currentScene.id].order=size(previousScene.nextScenes);

						//previousScene.nextScenesArray.push(currentScene);
					}else{
						previousScene.nextScenes[currentScene.id].count++;
					}
				}
			}
		}
	}


	setSceneIndexNumbers(){
		let baseScenes=[]

		//get base scenes
		for(let scene in this.scenesLib){
			if(size(this.scenesLib[scene].prevScenes)==0){
				//this.scenesLib[scene].index=0;
				baseScenes.push(this.scenesLib[scene]);
				//baseScenes[this.scenesLib[scene].id]	
			}
		}
		for(let scene in baseScenes){
			//console.log(baseScenes[scene]);
			baseScenes[scene].setIndexNumberRecusive(0,[])
		}

	}
	addScenesBackEnd(){
		for(let scene in this.scenesLib){
			this.scenesLib[scene].addBackEnd();
		}

	}
	setWidthSceneBackEnd(){

		for(let scene in this.scenesLib){
			this.scenesLib[scene].setBESpacingWidth();
		}
		
	}
	setSceneNodeParents(){
		for(let scene in this.scenesLib){
			this.scenesLib[scene].be.node.setParents();
		}
	}
	setSceneNodeChildren(){
		for(let scene in this.scenesLib){
			this.scenesLib[scene].be.node.setChildren();
		}
	}
	// setSceneNodePrevSiblings(){
	// 	for(let scene in this.scenesLib){
	// 		this.scenesLib[scene].be.node.setPrevSiblings();
	// 	}
	// }

	// setSceneNodePositions(){
	// 	for(let scene in this.scenesLib){
	// 		this.scenesLib[scene].be.node.setPosition()
	// 	}
	// }

	

	// setLeftOffsets(){
	// 	console.log("setLeftOffsets ----1----")
	// 	for(let scene in this.scenesLib){
	// 		let offset = 0;
	// 		for(let i in this.scenesLib[scene].nextScenesArray){
				
	// 			this.scenesLib[scene].nextScenesArray[i].be.spacing.left = offset;

	// 			this.scenesLib[scene].nextScenesArray[i].be.spacing.top=this.scenesLib[scene].nextScenesArray[i].index*40;
				
	// 			this.scenesLib[scene].nextScenesArray[i].setBackEndPosition();

	// 			offset = offset+this.scenesLib[scene].nextScenesArray[i].be.spacing.unitWidths*40
	// 		}
			
	// 	}
	// }

	updatePlayPause(){
		if(this.isPlayable()){
			this.windowManager.activatePlayPause();
		}else{
			this.windowManager.deactivatePlayPause();
		}
	}
	isPlaying(){
		for(let audioContent in this.activeMainAudio){
			if(this.activeMainAudio[audioContent].isPlaying){
				return true;
			}
			//should also check if there are delays...
		}
		return false;
	}
	isPlayable(){
		for(let audioContent in this.activeMainAudio){
			//if this has any length there are active audio files
			return true;
			
			//should also check if there are delays...
		}
		return false;

	}

	togglePlayPause(){
		console.log("TOGGLE PLAY     is playing " + this.playing)
		if(this.isPlaying()){
			console.log("pause")
			this.pause();
		}else{
			this.play();
			console.log("play")
		}
		

		this.windowManager.updatePlayPauseButton()
		console.log("End TOGGLE PLAY     is playing " + this.playing)
	}


	// enablePlayPause(){
	// 	//this.play()//so that pause is shown
	// 	//console.log("enable play pause");
	// 	this.windowManager.play.style.display="none";
	// 	this.windowManager.pause.style.display="block";
	// }

	// disablePlayPause(){
	// 	// this.pause()//so that pause is shown
	// 	// console.log("disable play pause");
	// 	this.windowManager.play.style.display="block";
	// 	this.windowManager.pause.style.display="none";

	// }

	play(){
		// console.log("PLAYING *********************")
		// this.updateVolume();
		this.playing=true;

		//restart all the action timers
		this.windowManager.displayPauseButton();

		for(let action in currentStory.currentScene.actionsLib){
			
			if(currentStory.currentScene.actionsLib[action].timer!=undefined){
				currentStory.currentScene.actionsLib[action].timer.resume();
			}
		}

		//play all the main audio
		//console.log("PLAY???")
		for(let audioContent in this.activeMainAudio){
			this.activeMainAudio[audioContent].play();
		}

		//play the background audio
		// for(let audioContent in this.activeBackgroundAudio){
		// 	this.activeBackgroundAudio[audioContent].play();
		// }


		// context.resume().then(function() {
		// 	for(let action in currentStory.currentScene.actionsLib){
		// 		this.windowManager.play.style.display="none";
		// 		this.windowManager.pause.style.display="block";
		// 		if(currentStory.currentScene.actionsLib[action].timer!=undefined){
		// 			currentStory.currentScene.actionsLib[action].timer.resume();
		// 		}
		// 	}
	 //       console.log('Resume context');
	 //    }.bind(this))
	}

	pause(){
		// console.log("PAUSING *********************")
		this.playing=false;

		// console.log("this.playing " + this.playing);

	 	this.windowManager.displayPlayButton();
		
	 	//pause all the action timers
	 	for(let action in currentStory.currentScene.actionsLib){

			if(currentStory.currentScene.actionsLib[action].timer!=undefined){
				currentStory.currentScene.actionsLib[action].timer.pause();
			}
		}

		//pause all the main audio
		for(let audioContent in this.activeMainAudio){
			this.activeMainAudio[audioContent].pause();
		}

		console.log("this.playing " + this.playing);

		//pause the background audio
		// for(let audioContent in this.activeBackgroundAudio){
		// 	this.activeBackgroundAudio[audioContent].pause();
		// }
	}
	setMainVolume(volume_){
		
		//set volume for all the main audio
		this.volume['main']=volume_;
		for(let audioContent in this.activeMainAudio){
			//this.activeMainAudio[audioContent].setVolume(volume_);
			this.activeMainAudio[audioContent].updateVolume();
		}
	}
	setBackgroundVolume(volume_){
		
		//set volume for all the main audio
		this.volume['background']=volume_;
		for(let audioContent in this.activeBackgroundAudio){
			this.activeBackgroundAudio[audioContent].updateVolume();
		}
	}

	skip(){
		this.playing=false;
		for(let action in currentStory.currentScene.actionsLib){
			currentStory.currentScene.actionsLib[action].skip();
		}
		stopAudio()
	}

	createScenesFrontEndHTMLs(){
		for(let sceneKey in this.scenesLib){//this will create the divs for all the scenes. they could be created on each scene load
			this.scenesLib[sceneKey].createFrontEndHTML();//scene will cycle through each content (and action?) and create a div/span for each
		}
		console.log("finsihed creating the front end")
	}
	createScenesBackEndHTMLs(){
		for(let sceneKey in this.scenesLib){//this will create the divs for all the scenes. they could be created on each scene load
			this.scenesLib[sceneKey].createBackEndHTML();//scene will cycle through each content (and action?) and create a div/span for each
		}
	}
	createProperties(){
		for(let sceneKey in this.scenesLib){//this will create the divs for all the scenes. they could be created on each scene load
			this.scenesLib[sceneKey].createProperties();//scene will cycle through each content (and action?) and create a div/span for each
		}
	}
	applyProperties(){
		for(let sceneKey in this.scenesLib){//this will create the divs for all the scenes. they could be created on each scene load
			this.scenesLib[sceneKey].applyProperties();//scene will cycle through each content (and action?) and create a div/span for each
		}
	}


	displayCurrentScene(){
		this.currentScene.displayFrontEnd();
	}



	//loads the new scene and tracks path (maybe just use this to start and track elseware?)
	newScene(newScene_, inheritedContent_){
		// console.log(newScene_)
		if(newScene_ instanceof Scene){

			console.log("new scene " + newScene_.id + " @ " + Date.now())
			// console.log(inheritedContent_)
			newScene_.addInheritance(inheritedContent_)
			this.currentScene=newScene_;
			this.path=this.path+"."+newScene_.id;

			this.displayCurrentScene();
		}else if(typeof(newScene_) == "string"){
			this.newScene(this.scenesLib[newScene_])
		}
	}

	start(){
		currentStory.newScene('aa');
		//currentStory.windowManager=new WindowManager();
		loadScreen.hide();
		currentStory.windowManager.createMainButtons();
		//updateContentSize();
	}



	getJSON(){
		let jsonPlay={}
		
		jsonPlay.scenes=[];
		let index=0;
		for(let id in this.scenesLib){
		 	jsonPlay.scenes[index]=this.scenesLib[id].getJSON()
		 	index++;
		}

		return jsonPlay;

	}
	saveJSON(){
		//(content, fileName, contentType) {
	    download( JSON.stringify(this.getJSON()),"scenes_" + Date.now() + ".json"); 
	}
};










function changeMainTextLocationLeft(left_){
	document.getElementById("main_text").style.left = left_+"px";
}
function changeMainTextLocationTop(top_){
	document.getElementById("main_text").style.top = top_+"px";
}
function changeMainTextLocation(left_,top_){
	
	document.getElementById("main_text").style.left = left_+"px";
	document.getElementById("main_text").style.top = top_+"px";
}

function clearMainText(){
	document.getElementById("main_text").innerHTML = "";
}



// let d = new Date();
// document.body.innerHTML = "<h1>Today's date is " + d + "</h1>";



var dataLoaded=false;
fetch(absoluteLocation + "json/scenes.json")
	.then(function(resp){
		return resp.json();
	}).catch(function(resp){
		console.log("error while loading json ")
		console.log(resp)
	}).then(function(data){
		//console.log(data.scenes)
		
		
		
		window.onload.data=data;
		dataLoaded=true;
		

		//console.log("loading scen data");

	
		if(pageLoaded){//if the page is already loaded otherwise do this on page load

			populateStory(data.scenes)

			// currentStory.loadScenesLib(data.scenes);//one or the other
			
			// currentStory.createScenesFrontEndHTMLs();
		}

		

		
		

		

	}).catch(function(resp){
		console.log("error while loading scene")
		console.log(resp)
	}).then(function(data){
		
		// console.log(currentStory)
		//currentStory.start();
		// reading.start();
	}).catch(function(resp){
		console.log("error while starting play")
		console.log(resp)
	})


// function draw (filteredData_){
//   // Set up the canvas
//   const canvas = document.createElement("CANVAS");
//   const dpr = window.devicePixelRatio || 1;
//   const padding = 20;
//   canvas.width = canvas.offsetWidth * dpr;
//   canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
//   const ctx = canvas.getContext("2d");
//   ctx.scale(dpr, dpr);
//   //ctx.translate(0, canvas.offsetHeight / 2 + padding); // Set Y = 0 to be in the middle of the canvas

// };

const drawLineSegment = (ctx, x, y, width, isEven) => {
  ctx.lineWidth = 1; // how thick the line is
  ctx.strokeStyle = "#fff"; // what color our line is
  ctx.beginPath();
  y = isEven ? y : -y;
  ctx.moveTo(x, 0);
  ctx.lineTo(x, y);
  ctx.arc(x + width / 2, y, width / 2, Math.PI, 0, isEven);
  ctx.lineTo(x + width, 0);
  ctx.stroke();
};

