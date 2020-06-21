class WindowManager{
	constructor(){
		// this.sceneModual={};
		// this.activeModual;


		this.html={};
		this.html.topBar=document.getElementById('top-bar');
		this.html.content=document.getElementById('content');
		this.html.bottomBar=document.getElementById("bottom_bar");

		this.addFullScreen();
		this.addPlayPauseButton();
		

		this.displayPauseButton();
		//this.displayPlayButton();
		// currentStory.updatePlayPause();
		this.addVolumeSliders();
		//this.createSceneModual();
		this.createTopButtons();




	}
	
	createMainButtons(){
		this.createGoToBackEndButton();
		this.createBackToStoryButton();
	}
	createTopButtons(){
		//if scense modual
		// this.sceneModual.createTopButtons();
	}

	deactivatePlayPause(){
		// this.play.style.display="block";
		// this.pause.style.display="none";
		if(!this.playPause.classList.contains("deactivated")){
			this.playPause.classList.add("deactivated")
		}
	}
	activatePlayPause(){
		// this.play.style.display="none";
		// this.pause.style.display="block";
		if(this.playPause.classList.contains("deactivated")){
			this.playPause.classList.remove("deactivated")
		}
	}

	displayPlayButton(){
		this.explandPlayPause()
		this.play.style.display="block";
		this.pause.style.display="none";
	}
	displayPauseButton(){
		this.contractPlayPause();
		this.play.style.display="none";
		this.pause.style.display="block";
	}
	explandPlayPause(){
		if(!this.playPause.classList.contains("explaned")){
			this.playPause.classList.add("explaned");
		}
		if(!this.html.bottomBar.classList.contains("explaned")){
			this.html.bottomBar.classList.add("explaned");
		}
	}
	contractPlayPause(){
		
		this.playPause.classList.remove("explaned");
		this.html.bottomBar.classList.remove("explaned");
	
	}

	addPlayPauseButton(){
		// this.playPauseExplander= document.createElement("div");
		// this.playPause.id="play-pause-explander";

		this.playPause= document.createElement("div");
		this.playPause.id="play-pause";
		this.playPause.classList.add("deactivated");

		

		this.play= document.createElement("img");
		this.play.src="img/special/play-w.png";
		this.play.id="play";
		this.play.classList.add("play-pause");
		this.playPause.appendChild(this.play);

		this.pause= document.createElement("img");
		this.pause.src="img/special/pause-w.png";
		this.pause.id="pause";
		this.pause.classList.add("play-pause");
		this.playPause.appendChild(this.pause);
		this.pause.style.display="none";

		document.getElementById("bottom_bar").appendChild(this.playPause);
		

		this.playPause.addEventListener('click',function(){
			this.togglePlayPause();
		}.bind(this))

		//this.playPause.style.height='50px'

	}

	addVolumeSliders(){
		this.volumes= document.createElement("div");
		this.volumes.style.position="absolute";
		this.volumes.style.top="0px";
		this.volumes.style.left="0px";
		this.volumes.style.height="100%";
		this.volumes.style.width="25%";
	

		document.getElementById("bottom_bar").appendChild(this.volumes);




		this.mainVolumeSlider= document.createElement("input");
		this.mainVolumeSlider.type="range";
		this.mainVolumeSlider.classList.add("slider");
		// this.mainVolumeSlider.orient="vertical";
		this.mainVolumeSlider.style.position="absolute";
		this.mainVolumeSlider.style.top="0px";
		this.mainVolumeSlider.style.left="0px";
		this.mainVolumeSlider.min=0 
		this.mainVolumeSlider.max=100
		this.mainVolumeSlider.step=1
		this.mainVolumeSlider.value=currentStory.volume['main']*100;

		this.mainVolumeSlider.addEventListener("input", function(){
			currentStory.setMainVolume(this.mainVolumeSlider.value/100);
		}.bind(this));
		

		this.volumes.appendChild(this.mainVolumeSlider);


		this.mainVolumeLable= document.createElement("lable");
		this.mainVolumeLable.innerHTML="Main Volume"
		this.mainVolumeLable.classList.add("volume-lable");
		this.volumes.appendChild(this.mainVolumeLable);




		this.backgroundVolumeSlider= document.createElement("input");
		this.backgroundVolumeSlider.type="range";
		this.backgroundVolumeSlider.classList.add("slider");
		this.backgroundVolumeSlider.style.position="absolute";
		this.backgroundVolumeSlider.style.bottom="0px";
		this.backgroundVolumeSlider.style.left="0px";
		this.backgroundVolumeSlider.step=1
		this.backgroundVolumeSlider.min=0 

		this.backgroundVolumeSlider.max=100
		
		this.backgroundVolumeSlider.value=currentStory.volume['background']*100;

		this.backgroundVolumeSlider.addEventListener("input", function(){
			currentStory.setBackgroundVolume(this.backgroundVolumeSlider.value/100);
		}.bind(this));

		// this.backgroundVolumeSlider.value=0.1;
		// console.log(currentStory.volume['background'])
		



		//this.mainVolumeSlider.
		//this.mainVolumeSlider.value=75
		this.backgroundVolumeSlider.step=1

		this.volumes.appendChild(this.backgroundVolumeSlider);

		this.backgroundVolumeLable= document.createElement("lable");
		this.backgroundVolumeLable.innerHTML="Background Volume"
		this.backgroundVolumeLable.classList.add("volume-lable");
		this.backgroundVolumeLable.style.bottom="0px"
		this.volumes.appendChild(this.backgroundVolumeLable);





		// this.mainVolumeSlider.addEventListener("change", function(){
		// 	console.log(this.value)
		   
		//     //counter = parseInt(this.value);
		// });
		// this.mainVolumeSlider.addEventListener("click", function(){
		// 	console.log(this.value)
		    
		//     //counter = parseInt(this.value);
		// });
	}

	togglePlayPause(){
		currentStory.togglePlayPause();

		//console.log(currentStory.playing)
		

		// currentStory.togglePlayPause();
		// let srcTemp = currentStory.windowManager.playPause.src;
		// currentStory.windowManager.playPause.src = currentStory.windowManager.playPause.altSrc;
		// currentStory.windowManager.playPause.altSrc = srcTemp;
	}
	updatePlayPauseButton(){
		if(currentStory.playing==false){
			this.playPause.src=this.playPause.srcPlay;

			//console.log(this.playPause.src)
		}else{
			this.playPause.src=this.playPause.srcPause;
		}
	}


	addFullScreen(){
		//console.log("*************************************************************")
		
		// this.fullScreenButton= document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.fullScreenButton= document.createElement("img");

		this.fullScreenButton.id="fullScreenButton";
		// this.fullScreenButton.style.width="60px";
		// this.fullScreenButton.style.height="60";
		//console.log(fullScreenSVG(20,20,2))
		this.fullScreenButton.src="img/special/fullScreen-w.png"

		//this.fullScreenButton.id="fullScreenButton";

		document.getElementById("bottom_bar").append(this.fullScreenButton);
		
		// this.fullScreenButton.innerHTML=fullScreenSVG(25,22,6);
		// this.html.bottomBar.append(this.fullScreenButton)
		// this.fullScreenButton.id="svgFullScreen"
		// this.fullScreenButton.style.top=5;
		// this.fullScreenButton.style.right=5;
		// this.fullScreenButton.style.position="absolute";

		this.fullScreenButton.addEventListener('click',function(){
			toggleFullscreen();
		}.bind(this))
	}

	toggleStoryBackEndButtons(button_){
		if(button_=="backEnd"){
			this.showBackEndButton()
			this.showStoryButton(false)
		}else if(button_=="story"){
			this.showBackEndButton(false)
			this.showStoryButton()
		}
	}

	//this.activeModual
	
	

	

	clearContent(){
		this.html.content.innerHTML = "";
	}
	clearTopBar(){
		this.html.topBar.innerHTML="";
	}


	showBackEndButton(conditional_){
		this.showButton(this.html.goToBackEndButton,conditional_);
	}
	showStoryButton(conditional_){
		this.showButton(this.html.backToStoryButton,conditional_);
	}
	showButton(button_,conditional_){
		if(conditional_==false){
			button_.style.display="none";

		}else{
			button_.style.display='block';
			
		}
	}

	createGoToBackEndButton(){
		this.html.goToBackEndButton = document.createElement("BUTTON");
		
		
		this.html.goToBackEndButton.innerHTML = "BACK END >";


		this.html.goToBackEndButton.style.display="none";
		this.html.topBar.append(this.html.goToBackEndButton);

		this.html.goToBackEndButton.backEndObject=this;
		this.html.goToBackEndButton.addEventListener ("click", function(event_) {
			console.log(event_.target.backEndObject)

			event_.target.backEndObject.display();

		});
	}

	createBackToStoryButton(){
		this.html.backToStoryButton = document.createElement("BUTTON");
		
		
		this.html.backToStoryButton.innerHTML = "< BACK TO STORY";
		this.html.backToStoryButton.style.display="none";
		this.html.topBar.append(this.html.backToStoryButton);
		this.html.backToStoryButton.backEndObject=this;
		this.html.backToStoryButton.addEventListener ("click", function(event_) {
		   //remove back end display then
		   event.target.backEndObject.toggleStoryBackEndButtons("backEnd")
			//alert("go back to story");
		   	//might need to be revised if path is imprtant
		   
		   resetContentDiv();
		   currentStory.newScene('aa')
		   //displayScene(currentStory.scenes[id])
		});

	}


}

WindowManager.prototype.display=function(){
	this.html.topBar.append(this.sceneModual.getTopButtons())
	this.toggleStoryBackEndButtons("story")
}
function resetContentDiv(){
	document.getElementById('content').innerHTML = "<div id='background_img' style='position:absolute; z-index:-10;' alt='background image'></div>	  	<div id='main_text' style='position:absolute; z-index:0;' alt='text'> </div>";

}



function pauseEvent(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}


var mouseIsPressed=false;
document.onmousedown=function(){
	mouseIsPressed=true;
}
document.onmouseup=function(){
	mouseIsPressed=false;
}


function isFullscreen(){ return 1 >= outerHeight - innerHeight };


function toggleFullscreen() {
  let elem = document.documentElement

  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(err => {
      alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
}






