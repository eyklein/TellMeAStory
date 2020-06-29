class PriorityLoader{
	constructor(){
		this.indexHistogram=[]
		this.maxIndex=0; //INDEX OR RANK IS THE LEVEL THE OF THE SCENE
		this.files={}

		this.threshhold=5; //threshhold for when to start story and continue loading in the background

		this.currentLoadbucket=0


	}

	rankPriority(){//based on index of scene

		for(let audioUrl in this.files){
			
			this.files[audioUrl].rankPriority();
		}
		
	}
	populateHistogram(){
		for(let i=0; i<=this.maxIndex;i++){
			this.indexHistogram[i]=[]
			for(let url in this.files){
				if(this.files[url].rank == i){
					this.indexHistogram[i].push(this.files[url]);
				}
			}
		}
	}

	loadAudioBucket(bucketIndex_){
		if(bucketIndex_>=this.threshhold && currentStory.currentScene== null){

			currentStory.start();
		}
		console.log("LOADING BUCKET :   - " + bucketIndex_)
		this.currentLoadbucket=bucketIndex_;

		if(this.indexHistogram.length>bucketIndex_){
			let bucket = this.indexHistogram[bucketIndex_]

			if(bucket.length>0){
				for(let i=0;i<bucket.length;i++){
					bucket[i].load();//each audio loader
				}
			}else{
				this.loadAudioBucket(bucketIndex_+1);
			}
		}
	}

	loadNextBucket(){
		this.loadAudioBucket(this.currentLoadbucket+1);
	}

	// for(let audioUrl in priorityAudioLoader.files){
		// 	console.log(audioUrl)
		// 	priorityAudioLoader.files[audioUrl].load();
		// }
}