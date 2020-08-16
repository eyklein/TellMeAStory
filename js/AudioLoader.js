class AudioLoader{
	constructor(url_,contentAudio_){
		this.url=url_;
		this.status = "preload";
		this.contentAudioObjects = [];
		//console.log("create " + this.url)

		this.contentAudioObjects.push(contentAudio_);

		this.getFileSize()

		this.isPreloaded=false;
		
		//this.load()
	}

	rankPriority(){//this is the rank priority based on the audio where the scene is
		this.rank=100000;//max asumed value
		for(let contentAudio in this.contentAudioObjects){
			

			let index 

			for(let id in this.contentAudioObjects[contentAudio].parentScenes){
				if(index == undefined){
					index = this.contentAudioObjects[contentAudio].parentScenes[id].node.index;
					
				}else{
					index = Math.min(index, this.contentAudioObjects[contentAudio].parentScenes[id].node.index)
				}
			}

			if(index<this.rank){
				this.rank=index;
			}
			if(priorityAudioLoader.maxIndex<index){//add the max index
				priorityAudioLoader.maxIndex=index;
				//console.log("max index : " + priorityAudioLoader.maxIndex)
			}
		}
	}

	addContentAudio(contentAudio_){
		this.contentAudioObjects.push(contentAudio_);
	}

	getFileSize()
	{
	    var fileSize = '';
	    var http = new XMLHttpRequest();
	    http.open('HEAD', this.url, true); // true = Asynchronous
	    http.onreadystatechange = function(headReturned_) {
	    	let thisSC = headReturned_.target;
	    	//console.log(this)
	        if (thisSC.readyState == thisSC.DONE) {
	            if (thisSC.status === 200) {
	                this.fileSize = parseInt(thisSC.getResponseHeader('content-length'));
	                //console.log("************" + this.fileSize)
	                //console.log('fileSize = ' + this.fileSize);
	                //
	                // ok here is the only place in the code where we have our request result and file size ...
	                // the problem is that here we are in the middle of anonymous function nested into another function and it does not look pretty
	                // this stupid ASYNC pattern makes me hate Javascript even more than I already hate it :)
	                //
	                //
	            }
	        }
	    }.bind(this);
	    http.send(); // it will submit request and jump to the next line immediately, without even waiting for request result b/c we used ASYNC XHR call
	    return null//('At this moment, we do not even have Request Results b/c we used ASYNC call to follow with stupid JavaScript patterns');
	}

	load(){
		var request = new XMLHttpRequest();
		request.open('GET', this.url, true);
		request.responseType = 'arraybuffer';

		request.audioContent=this;

		// loadScreen.numAudioFiles++;
		// loadScreen.update();

		if(this.isPreloaded){

			request.addEventListener("progress", function (evt) {

		        if(evt.lengthComputable) {
		        	// if(this.status == "preload"){
		        	// 	this.status = "downloading"
		        	// 	loadScreen.addFileToDownload(evt)
		        	// 	//console.log(evt)
		        	// }
		        	//console.log(evt)
		            // var percentComplete = evt.loaded / evt.total;
		            // console.log(percentComplete);

		            loadScreen.update(evt)
		        }
		    }.bind(this), false);
		}

		request.onload = function() {
			//loadScreen.loadedAudioFiles++;
			//loadScreen.update();

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