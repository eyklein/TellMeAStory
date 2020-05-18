//let scenes={};
var currentStory;

var timeDelays={};



document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            console.log('left');
            break;
        case 38:// up arrow 
            currentStory.togglePlayPause();
            break;
        case 39:
        	currentStory.skip();
            console.log('right');
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
        default:
    		console.log(e.keyCode)
    }
};




// function beginAudio(){
//     context.trigger('pause');
//     context.prop("currentTime",context.prop("currentTime")-context.prop("currentTime"));
//     context.trigger('play');
// }





window.AudioContext = window.AudioContext||window.webkitAudioContext;



var context = new AudioContext();

function stopAudio(){
	for(let audioID in activeAudio){
		activeAudio[audioID].skip();
	}
	
	// context.close().then(function() {
	// 	context=new AudioContext();
	// });
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
		console.log("1.1@")
		//console.log(ContentEditorOverlay)
		console.log("1.2@")
		console.log( "yes");
		//this.contentEditorOverlay=new ContentEditorOverlay();
		console.log("1.3@")
		this.path="";//this will keep track of the path that has been taken
		this.playing=false;
		this.audioCount=0;
	}
	

	loadScenesLib(scenesData_){
		this.scenesLib={};
	  	for(let i=0; i<scenesData_.length;i++){//think about the order of loading. right now to goes through scene by scene maybe load all scens first and then do content
	  		this.scenesLib[scenesData_[i].id]=new Scene(scenesData_[i], this)
	  	}

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
	  				//console.log(this.scenesLib[sceneID])
	  			}
	  		}
	  		//console.log("*************************")
	  	}

	  	for(let i=0; i<scenesData_.length;i++){//think about the order of loading. right now to goes through scene by scene maybe load all scens first and then do content
	  		this.scenesLib[scenesData_[i].id].addActions(scenesData_[i])
	  	}

	}

	updatePlayPause(){
		if(this.audioCount>0){
			this.playing=true;
		}else{
			this.playing=false;
		}
	}

	togglePlayPause(){
		if(this.playing==true){
		//if(context.state=="suspended"){

			this.pause();
		}else{
			this.play();
		}

		this.windowManager.updatePlayPauseButton()
	}

	play(){
		this.playing=true;
		context.resume().then(function() {
			for(let action in currentStory.currentScene.actionsLib){
				this.windowManager.play.style.display="none";
				this.windowManager.pause.style.display="block";
				if(currentStory.currentScene.actionsLib[action].timer!=undefined){
					//console.log(currentStory.currentScene.actionsLib[action].timer);
					currentStory.currentScene.actionsLib[action].timer.resume();
				}
			}
	       console.log('Resume context');
	    }.bind(this))
	}
	printActiveDelays(){
		console.log("---------------------------------------------")
		for(let action in currentStory.currentScene.actionsLib){
			if(currentStory.currentScene.actionsLib[action].timer!=undefined){
				//console.log(currentStory.currentScene.actionsLib[action].timer);
				console.log(action);
			}
		}
		console.log("---------------------------------------------")

	}
	pause(){
		this.playing=false;
		context.suspend().then(function() {
			for(let action in currentStory.currentScene.actionsLib){

				this.windowManager.play.style.display="block";
				this.windowManager.pause.style.display="none";
				if(currentStory.currentScene.actionsLib[action].timer!=undefined){
					//console.log(currentStory.currentScene.actionsLib[action].timer);
					currentStory.currentScene.actionsLib[action].timer.pause();
				}
			}
	      console.log('Pause context');
	    }.bind(this));
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
		updateContentSize();
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



var loadScreen
window.onload=function(){
	
} ;
fetch("json/scenes.json")
	.then(function(resp){
		return resp.json();
	}).catch(function(resp){
		console.log("error while loading json ")
		console.log(resp)
	}).then(function(data){
		//console.log(data.scenes)
		
		currentStory = new Story();//start reading from first scene
		
		currentStory.windowManager=new WindowManager();
		loadScreen = new LoadScreen()
		

		console.log("loading scen data");
		currentStory.loadScenesLib(data.scenes);//one or the other
		console.log("creating front end");
		currentStory.createScenesFrontEndHTMLs();

		

		
		

		

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

