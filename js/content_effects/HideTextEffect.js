class HideTextEffect extends TextEffect{

	constructor(JSON_,parentContent_){
		super(JSON_,parentContent_);

	}

	apply(){
		// console.log("*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&applying fill property&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
		// console.log(this)
		this.parentContent.html.fe.style.display="none";//="hidden";
	}
}