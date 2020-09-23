class TrackAudioEffect extends AudioEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		
		super(JSON_,parentContent_,effectCatagory_);

	}

	apply(){
		//console.log(this.vareables)
		this.parentContent.track=this.vareables.value;

		this.parentContent.updateVolume()


	}
}
