class RepeatAudioEffect extends AudioEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		
		super(JSON_,parentContent_,effectCatagory_);

		this.type="repeat";

	}

	apply(){
		if(this.vareables.isOn){
			this.parentContent.loop=true;
		}

	}
}
