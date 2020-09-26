class TrackAudioEffect extends AudioEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		
		super(JSON_,parentContent_,effectCatagory_);
		this.type="track";
	}

	apply(){
		//console.log(this.vareables)
		this.parentContent.track=this.vareables.value;

		this.parentContent.updateVolume()


	}
}
