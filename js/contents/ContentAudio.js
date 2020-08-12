let priorityAudioLoader=new PriorityLoader();




class AudioContent extends Content{


	constructor(contentJson_,parentScene_){ //,url_, content_, propertiesJSON_

		

		super(contentJson_,parentScene_)

		//console.log("new audioContent " + this.content.value)
		//this.name=this.content.value;

		this.loadAudio(absoluteLocation + this.content.value); //creates and loads the audioBuffer object

		this.loop=false;
		this.track="main";//default track

		this.gainNode = context.createGain();
		this.gainNode.gain.value=currentStory.volume[this.track]; //default


		this.name=this.content.value;
		this.createNode();

		this.type="audio";
		//this._audioContext = audioContext;
	    //this._buffer = buffer; // AudioBuffer
	    //this._source; // AudioBufferSourceNode

	    
	
	}

	displayFrontEndHTML(){
		//this.applyProperties();
		super.displayFrontEndHTML();
		this.play();
		//this.playing=false;
		
	}

	// setVolume(volume_){
	// 	//this.volume=volume_;
	// 	this.gainNode.gain.value=volume_;
	// }

	updateVolume(){

		this.gainNode.gain.value=currentStory.volume[this.track];
	}


	getCurrentPlayTime(){
		let playTime=context.currentTime-this.source.startingContextTime + this.source.startingPosition; //also needs an offset
		return playTime;
	}

	loadAudio(url_){


		if(priorityAudioLoader.files[url_]==undefined){
			priorityAudioLoader.files[url_]=new AudioLoader(url_,this);
		}else{
			priorityAudioLoader.files[url_].addContentAudio(this)
		}
	}

			





		// 	priorityAudioLoader.files[url_]['status'] = "preload";
		// 	priorityAudioLoader.files[url_]['contentObjects'] = [];
		// 	priorityAudioLoader.files[url_]['contentObjects'].push(this);
		// 	priorityAudioLoader.files[url_]['audioBuffer'] = null;


		// 	var request = new XMLHttpRequest();
		// 	request.open('GET', url_, true);
		// 	request.responseType = 'arraybuffer';

		// 	request.audioContent=this;

		// 	// Decode asynchronously

		// 	//console.log(loadScreen)
		// 	loadScreen.numAudioFiles++;
		// 	loadScreen.update();
		// 	request.onload = function() {
		// 		loadScreen.loadedAudioFiles++;
		// 		loadScreen.update();

		// 	   	context.decodeAudioData(request.response, function(buffer_) {
		// 	    	buffer_.url=url_;
		// 	    	// console.log(url_)
		// 	    	this.audioContent.audioBuffer=buffer_;

		// 	    	priorityAudioLoader.files[url_]['audioBuffer']=buffer_;

		// 	    	priorityAudioLoader.files[url_]['status'] = "loaded";
		// 	    	for(let i in priorityAudioLoader.files[url_]['contentObjects']){
		// 	    		priorityAudioLoader.files[url_]['contentObjects'][i].audioBuffer=priorityAudioLoader.files[url_]['audioBuffer'];
		// 	    		priorityAudioLoader.files[url_]['contentObjects'][i].createEffects();
		// 	    		priorityAudioLoader.files[url_]['contentObjects'][i].applyGeneralEffects();
		// 	    	}

		// 	    }.bind(this), onLoadError);
		// 	}
		// 	request.send();

		// }
		// else if(priorityAudioLoader.files[url_]['status'] == "loading"){
		// 	priorityAudioLoader.files[url_]['contentObjects'].push(this);
		// }else if(priorityAudioLoader.files[url_]['status'] == "loaded"){

		// 	this.audioBuffer=priorityAudioLoader.files[url_]['audioBuffer'];
		// 	this.createEffects();
		// 	this.applyGeneralEffects();
		// }
			



		// if(priorityAudioLoader.files[url_]==undefined){
		// 	priorityAudioLoader.files[url_]={};
		// 	priorityAudioLoader.files[url_]['status'] = "preload";
		// 	priorityAudioLoader.files[url_]['contentObjects'] = [];
		// 	priorityAudioLoader.files[url_]['contentObjects'].push(this);
		// 	priorityAudioLoader.files[url_]['audioBuffer'] = null;


		// 	var request = new XMLHttpRequest();
		// 	request.open('GET', url_, true);
		// 	request.responseType = 'arraybuffer';

		// 	request.audioContent=this;

		// 	// Decode asynchronously

		// 	//console.log(loadScreen)
		// 	loadScreen.numAudioFiles++;
		// 	loadScreen.update();
		// 	request.onload = function() {
		// 		loadScreen.loadedAudioFiles++;
		// 		loadScreen.update();

		// 	   	context.decodeAudioData(request.response, function(buffer_) {
		// 	    	buffer_.url=url_;
		// 	    	// console.log(url_)
		// 	    	this.audioContent.audioBuffer=buffer_;

		// 	    	priorityAudioLoader.files[url_]['audioBuffer']=buffer_;

		// 	    	priorityAudioLoader.files[url_]['status'] = "loaded";
		// 	    	for(let i in priorityAudioLoader.files[url_]['contentObjects']){
		// 	    		priorityAudioLoader.files[url_]['contentObjects'][i].audioBuffer=priorityAudioLoader.files[url_]['audioBuffer'];
		// 	    		priorityAudioLoader.files[url_]['contentObjects'][i].createEffects();
		// 	    		priorityAudioLoader.files[url_]['contentObjects'][i].applyGeneralEffects();
		// 	    	}

		// 	    }.bind(this), onLoadError);
		// 	}
		// 	request.send();

		// }
		// else if(priorityAudioLoader.files[url_]['status'] == "loading"){
		// 	priorityAudioLoader.files[url_]['contentObjects'].push(this);
		// }else if(priorityAudioLoader.files[url_]['status'] == "loaded"){

		// 	this.audioBuffer=priorityAudioLoader.files[url_]['audioBuffer'];
		// 	this.createEffects();
		// 	this.applyGeneralEffects();
		// }
			

		

	



	createBackEndHTML(){
		super.createBackEndHTML();
	}
	getAmplitudes(samples_){ //,startPosition_,duration_) {
		const rawData = this.audioBuffer.getChannelData(0); // We only need to work with one channel of data
		const samples = samples_; // Number of samples we want to have in our final data set
		const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
		const filteredData = [];
		for (let i = 0; i < samples; i++) {
			let blockStart = blockSize * i; // the location of the first sample in the block
			let sum = 0;
			for (let j = 0; j < blockSize; j++) {
			  sum = sum + Math.abs(rawData[blockStart + j]) // find the sum of all the samples in the block
			}
			filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
		}
		return filteredData;
	}

	updateIconContent(){
		// let iconWidth=100;
		// let iconHeight=75;

	
		this.html.be.divIcon.innerHTML=this.content.value;
		

		// if(this.properties["clipping"]!=undefined){
			this.html.be.divIcon.style.height=this.duration * 100 + "px";
		// }else{
		// 	this.html.be.divIcon.style.height=this.duration * 100 + "px";
		// }
		
		this.html.be.divIcon.style.width=30 + "px";

		this.updateAudioDisplay();

		this.html.be.divIcon.appendChild(this.audioDisplay.getCanvaseWrap());
					
		
	}


	// playSound(){
	// 	if (context.state === 'suspended') {
	//         context.resume();
	//     }
	//     this.play(this.start,this.duration)			
	// }

	setInitalTimeVars(){
		this.currentPlayTime = this.start; // time of the audio playback, seconds
	    this.startTimestamp = this.start; // timestamp of last playback start, milliseconds
	    this.durationLeft=this.duration;
	    this.isPlaying = false;
	    this.isActive = false;//false when audio is done
	    
	    //this.bufferDuration = 0; // seconds
	}
	skip(skipTime_){//seconds
		if(skipTime_==null){
			this.source.stop(); // should tringer onened event
		}else{
			this.pause()
			console.log(this.currentPlayTime);
			this.currentPlayTime += skipTime_;
			this.durationLeft -= skipTime_;
			console.log(this.currentPlayTime);
			this.play();
		}
	}

	pause(){//this pauses just this audio clip
		if(this.isPlaying){
			//console.log("pause")
			//currentStory.audioCount--;
			this.isPlaying=false;


			this.source.stop();
			//console.log(this.currentPlayTime)
			let timeElapsed=context.currentTime-this.startTimestamp
			this.currentPlayTime = this.currentPlayTime + timeElapsed;
			this.durationLeft=this.durationLeft-timeElapsed;
			//this._playbackTime = pause ? (Date.now() - this._startTimestamp)/1000 + this._playbackTime : 0;
			//console.log(this.currentPlayTime)
		}else{
			console.log("already paused");
		}
	}

	play() { //startPosition_,duration_
		//currentStory.playing=true;

		this.updateVolume();

		currentStory.windowManager.displayPauseButton();

		//console.log("PLAY " + this.id + "   - " + this.track)

		if(this.track=="main"){
			currentStory.activeMainAudio[this.parentScene.id+this.id]=this;
		}else if(this.track=="background"){
			currentStory.activeBackgroundAudio[this.parentScene.id+this.id]=this;
		}
		
		
		//currentStory.enablePlayPause();

		currentStory.audioCount++;
		currentStory.updatePlayPause();
		if (context.state === 'suspended') {
		    context.resume();
		}


		
		if(this.isPlaying){
			console.log("already playing")
		}else{

			this.source = context.createBufferSource(); // creates a sound source
			//console.log(this.source)

			this.source.loop=this.loop;

			this.source.buffer = this.audioBuffer;                    // tell the source which sound to play
			// this.analizer=context.createAnalyser()
			//this.source.buffer = this.audioBuffer;                    // tell the source which sound to play
			this.source.startingContextTime=context.currentTime;//add a startig time for time keeping
			this.startTimestamp=context.currentTime;//dont need both this and above ???

			this.source.startingPosition=this.currentPlayTime;//add a startig time for time keeping


		 
		 	this.isPlaying=true;
		 	this.isActive=true;



		 	this.source.playbackRate.value = 1;

		 	


			this.source.connect(this.gainNode)

			//if(this.track=="main"){

			//}

			this.gainNode.connect(context.destination);       // connect the source to the context's destination (the speakers)

			// var loopingEnabled = AudioBufferSourceNode.loop;
			// AudioBufferSourceNode.loop = false;

		 	//console.log(this.currentPlayTime)
		 	this.source.start(0,this.currentPlayTime,this.durationLeft);  
		 	//this.source.start(context.currentTime,this.currentPlayTime,this.durationLeft);                            // play the source now
		                                           // note: on older systems, may have to use deprecated noteOn(time);


		    this.source.onended=function(event_){
		    	currentStory.audioCount--;
		    	currentStory.updatePlayPause();
		    	this.endOfPlayback();
		 		// this.isPlaying=false;
			}.bind(this);
		}

		currentStory.updatePlayPause()
	}

	// createSource(){
		
	// }

	// connectBuffer(){
		
	// }

	endOfPlayback(){
		if(this.isPlaying){ //if isPlaying is true then its not just paused
			delete currentStory.activeMainAudio[this.parentScene.id+this.id];

			currentStory.updatePlayPause()//if nothing is playing it will be blocked

			// if(Object.keys(currentStory.activeMainAudio).length == 0){
			// 	currentStory.disablePlayPause();
			// }

			this.isActive=false;
			this.isPlaying=false;


			//reset to begining
			this.durationLeft=this.duration;
			this.currentPlayTime=this.start;
		}else{
			//this.isActive=false;
		}
		

		//this.isPlaying=false;

		//reset to beginging
		// this.currentPlayTime = this.start;
		// this.durationLeft=this.duration;		
	}

	updateAudioDisplay(){ 
		if(this.audioDisplay==undefined){
			this.addAudioDisplay();
		}
		this.audioDisplay.draw(this.start,this.duration)
	}

	addAudioDisplay(){ 
		this.audioDisplay=new AudioDisplay(this);
	}

	applyGeneralEffects(){
		for(let effect in this.effects.general){
			this.effects.general[effect].apply();
		}
		
	}

	createEffects(){
		// console.log(this.JSONData)
		// console.log("**********************************************************************")
		// console.log(this.JSONData)
		for(let effect in this.JSONData.effects.general){
			// console.log(effect)
			if(effect=="clipping"){
				this.effects.general[effect]=new ClippingAudioEffect(this.JSONData.effects.general[effect],this)
			}else if(effect=="repeat"){
				this.effects.general[effect]=new RepeatAudioEffect(this.JSONData.effects.general[effect],this)
			}else if(effect=="track"){
				this.effects.general[effect]=new TrackAudioEffect(this.JSONData.effects.general[effect],this)
			}else{
				this.effects.general[effect]=new ContentEffect(this.JSONData.effects.general[effect],this)
			}
		}
	
		
	}

};



function onLoadError(error_){
	console.log("error loading audio " + error_)
}	

function AudioDisplay(audioContent_){
	//AudioObjectHandler.prototype.audioDisplay=function(startPosition_,duration_) {
	this.audioContent=audioContent_;
	this.scale=100;		// pixels/second
	//this.currentPlayTime=30;
	console.log(this.audioContent)
	this.duration=this.audioContent.audioBuffer.duration;
	this.numSamples=this.duration*this.scale;
	this.amplitudes=this.audioContent.getAmplitudes(this.numSamples);
	
	this.html={};

	this.html.canvasWrap = document.createElement("div");
	this.html.canvasWrap.classList.add("canvas-wrap")
	this.html.canvas = document.createElement("CANVAS");

	const dpr = window.devicePixelRatio || 1;
	//const padding = 20;
	this.html.canvas.width = 320;
	this.html.canvas.height = this.duration * this.scale;
	this.html.ctx = this.html.canvas.getContext("2d");
	//this.html.ctx.scale(dpr, dpr);

	this.html.ctx.lineWidth = 1; // how thick the line is
	
	

	//this.draw(5,6)

	
	
	

	// this.html.ctx.moveTo(0, 10);
	// this.html.ctx.lineTo(10,10);
	// this.html.ctx.strokeStyle = "black";
	// this.html.ctx.stroke();		

	// this.html.ctx.strokeStyle = "#0000ff";// what color our line is	
	// this.html.ctx.beginPath();
	// this.html.ctx.moveTo(10, this.currentPlayTime*100);
	// this.html.ctx.lineTo(400, this.currentPlayTime*100);
	// this.html.ctx.stroke();		



	this.html.playBar=document.createElement("div");
	this.html.playBar.style.height="5px";
	this.html.playBar.style.width="500px";
	this.html.playBar.style['background-color']="green";
	this.html.playBar.style.position = 'absolute';
	this.html.playBar.style.left="0px";
	this.html.playBar.style.top="-50px";

	this.html.canvasWrap.appendChild(this.html.canvas);

	this.html.canvasWrap.appendChild(this.html.playBar);



					
	this.getCanvaseWrap=function(){
		console.log(this.html.canvasWrap)
		return this.html.canvasWrap;

	}

}

AudioDisplay.prototype.continuousUpdatePlayBar=function(){


	//console.log(this)
	this.updatePlayPosition();

	//document.getElementById(chr).scrollIntoView(true);
	//console.log(this.audioContent)
	if(this.audioContent.isPlaying){
		setTimeout(this.continuousUpdatePlayBar.bind(this), 6);
	}
	
}


AudioDisplay.prototype.draw = function(start_,duration_){

	let indent=100;

	this.html.ctx.clearRect(0, 0, this.html.canvas.width, this.html.canvas.height);

	//axis line
	this.html.ctx.strokeStyle = "#000000";// what color our line is	
	this.html.ctx.beginPath();
	this.html.ctx.moveTo(indent, 0);
	this.html.ctx.lineTo(indent, this.html.canvas.height);
	this.html.ctx.stroke();								


	this.html.ctx.font = "20px century_gothicregular";
	this.html.ctx.textAlign = "end";
	this.html.ctx.textBaseline = "middle";
	this.html.ctx.fillStyle = "#333";// what color our line is	

	//axis numbers
	for(let i=0;i<this.amplitudes.length;i+=100){
		this.html.ctx.fillText(i/this.scale + "  -", indent, i);
	}
	
	for(let i=0;i<this.amplitudes.length;i++){
		

		if( i/100<start_ || i/100>start_+duration_){
			this.html.ctx.strokeStyle = "#0000ff";// what color our line is	
		}else{
			this.html.ctx.strokeStyle = "#000000";// what color our line is	
		}																			
https://css-tricks.com/making-an-audio-waveform-visualizer-with-vanilla-javascript/
		this.html.ctx.beginPath();
		this.html.ctx.moveTo(indent, i);
		this.html.ctx.lineTo(indent + this.amplitudes[i]*800, i);
		this.html.ctx.stroke();
	}

	this.html.ctx.beginPath();
	this.html.ctx.moveTo(0, 2578);
	this.html.ctx.lineTo(600, 2578);
	this.html.ctx.stroke();
}

AudioDisplay.prototype.updatePlayPosition = function(){
	//console.log(this.audio)
	//console.log(mouseDown)
	let scrollToEasing
	if(mouseDown==false){
		this.html.playBar.style.top=this.audioContent.getCurrentPlayTime()*100 + "px";
		//this.html.playBar.scrollIntoView(false);
		//console.log(this.audioContent.content.contentEditorModual.html.viewport.style)


		//this.audioContent.content.contentEditorModual.html.viewport.scrollTo(0,this.html.playBar.offsetTop - 50)
		//console.log(this.audioContent.content.contentEditorModual.html.viewport.scrollTop)
		let easing=.1;

		//console.log(this)

		scrollToEasing = this.audioContent.contentEditorModual.html.viewport.scrollTop + ((this.html.playBar.offsetTop-400) - this.audioContent.contentEditorModual.html.viewport.scrollTop)*easing;
		//let scrollToEasing = this.audioContent.content.contentEditorModual.html.viewport.scrollTop + ((this.html.playBar.offsetTop - 400) - this.audioObjectHandler.content.contentEditorModual.html.viewport.scrollTop)*easing;
		
		//console.log(scrollToEasing)
	}

	this.audioContent.contentEditorModual.html.viewport.scrollTo(0, scrollToEasing);


}

















