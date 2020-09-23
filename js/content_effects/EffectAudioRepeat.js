class RepeatAudioEffect extends AudioEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		
		super(JSON_,parentContent_,effectCatagory_);

	}

	apply(){
		this.parentContent.loop=this.vareables.repeat;


	}
}
