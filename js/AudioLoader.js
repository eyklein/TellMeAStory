class AudioLoader{
	constructor(url_,contentAudio_){
		this.url=url_;
		this.status = "preload";
		this.contentAudioObjects = [];
		//console.log("create " + this.url)

		this.contentAudioObjects.push(contentAudio_);
		
		//this.load()
	}

	rankPriority(){//this is the rank priority based on the audio where the scene is
		this.rank=100000;//max asumed value
		for(let contentAudio in this.contentAudioObjects){
			let index = this.contentAudioObjects[contentAudio].parentScene.node.index

			if(index<this.rank){
				this.rank=index;
			}
			if(priorityAudioLoader.maxIndex<index){//add the max index
				priorityAudioLoader.maxIndex=index;
				console.log("max index : " + priorityAudioLoader.maxIndex)
			}
		}
	}

	addContentAudio(contentAudio_){
		this.contentAudioObjects.push(contentAudio_);
	}

	load(){
		var request = new XMLHttpRequest();
		request.open('GET', this.url, true);
		request.responseType = 'arraybuffer';

		request.audioContent=this;

		loadScreen.numAudioFiles++;
		loadScreen.update();

		request.addEventListener("progress", function (evt) {
	        if(evt.lengthComputable) {
	            var percentComplete = evt.loaded / evt.total;
	            console.log(percentComplete);
	        }
	    }, false);
		
		request.onload = function() {
			loadScreen.loadedAudioFiles++;
			loadScreen.update();

			let currentBucketIndex=priorityAudioLoader.currentLoadbucket
			// console.log(currentBucketIndex)
			// console.log(priorityAudioLoader)
			// let index=priorityAudioLoader.indexHistogram[currentBucketIndex].indexOf(this);
			priorityAudioLoader.files[this.url]['status'] = "downloaded";

			let bucketDone=true;
			for(let i in priorityAudioLoader[currentBucketIndex]){//check is bucket is done
				let audioLoader = priorityAudioLoader[currentBucketIndex][i]
				if(!(audioLoader['status']=="ready" || audioLoader['status']=="downloaded")){
					bucketDone=false;
				}
			}
			if(bucketDone){
				priorityAudioLoader.loadNextBucket();
			}




			//console.log(request.response)
		   	context.decodeAudioData(request.response, function(buffer_) {
		   		//console.log(buffer_)
		    	buffer_.url=this.url;
		    	// console.log(url_)
		    	//console.log(request)
		    	request.audioContent.audioBuffer=buffer_;

		    	// console.log(priorityAudioLoader.files);
		    	// console.log(this.url);
		    	// console.log(priorityAudioLoader.files[this.url]);
		    	priorityAudioLoader.files[this.url]['audioBuffer']=buffer_;

		    	priorityAudioLoader.files[this.url]['status'] = "ready";
		    	for(let i in priorityAudioLoader.files[this.url]['contentAudioObjects']){
		    		priorityAudioLoader.files[this.url]['contentAudioObjects'][i].audioBuffer=priorityAudioLoader.files[this.url]['audioBuffer'];
		    		priorityAudioLoader.files[this.url]['contentAudioObjects'][i].createEffects();
		    		priorityAudioLoader.files[this.url]['contentAudioObjects'][i].applyGeneralEffects();
		    	}

		    }.bind(this), onLoadError);
		}.bind(this)
		request.send();

	}


	

}