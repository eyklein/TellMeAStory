var pageLoaded=false;

var mouseDown = false;

//var backEnd;




var loadScreen

window.onload=function(){
	// currentStory.windowManager.addFullScreen();
	// currentStory.windowManager.addPlayPauseButton();
	//updateContentSize()


	currentStory = new Story();//start reading from first scene


		
	currentStory.windowManager=new WindowManager();
	pageLoaded=true;
	if(dataLoaded){//if the data is already loaded

		
		currentStory.startingScene = window.onload.data.startingScene;
		
		populateStory(window.onload.data.scenes)
		
	}
};

var backEnd;

function populateStory(sceneData_){

	currentStory.loadScenesLib(sceneData_);//one or the other
		
	currentStory.createScenesFrontEndHTMLs();


	currentStory.backEnd = new BackEnd(currentStory);

}




function handler(e){
	    //e.stopPropagation();
	   e.preventDefault();
	}

window.addEventListener('resize', updateContentSize);





