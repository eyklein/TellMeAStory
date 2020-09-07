var pageLoaded=false;

var mouseDown = false;

var mouseDownTime;

//var backEnd;




var loadScreen


window.addEventListener("mousedown", function(e){
	// console.log("down")
	// console.log(e)
	mouseDownTime=e.timeStamp;
});

window.onload=function(){
	// currentStory.windowManager.addFullScreen();
	// currentStory.windowManager.addPlayPauseButton();
	//updateContentSize()


	currentStory = new Story();//start reading from first scene


		
	currentStory.windowManager=new WindowManager();
	pageLoaded=true;

	// console.log("audio loaded")
	// console.log(priorityAudioLoader.files)

	// console.log(priorityAudioLoader.files['audio/Background Noise.mp3']);
	// //LOAD AUDIO
	// for(let audioUrl in priorityAudioLoader.files){
	// 	console.log(audioUrl)
	// 	priorityAudioLoader.files[audioUrl].load();
	// }
	//priorityAudioLoader.files




	if(dataLoaded){//if the data is already loaded

		//console.log("dataLoaded first then pageLoaded")
		currentStory.startingScene = window.onload.data.startingScene;
		
		populateStory(window.onload.data.scenes)


		currentStory.loadAudio();
		
		// for(let audioUrl in priorityAudioLoader.files){
		// 	console.log(audioUrl)
		// 	priorityAudioLoader.files[audioUrl].load();
		// }
		
	}






	// testArrowContainer = document.createElement("div");

	// testArrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	// testArrow.style.overflow="visible";
	// testArrow.style["z-index"] = 200000;
	// testArrowContainer.style["z-index"] = 200000;

	// document.body.append(testArrowContainer);

	// testArrowContainer.append(testArrow)

	// testArrowContainer.style.width="100px"
	// testArrowContainer.style.height="100px"
	// testArrowContainer.style.left="200px"
	// testArrowContainer.style.top="200px"
	// testArrowContainer.style.overflow="visible"
	// testArrowContainer.style.position="absolute"
	// //testArrowContainer.style["background-color"]="red"




	// document.onmousemove = function(e){
	// 	//console.log(e)
	// 	testArrow.innerHTML = hArrowSVG(e.clientX-200,e.clientY-200,3, "dashed","blue");
	// };
};

var testArrowContainer, testArrow;

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






