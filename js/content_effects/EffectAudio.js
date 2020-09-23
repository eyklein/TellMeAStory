class AudioEffect extends ContentEffect{

	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);
	}

	getEditorHTML(){
		let fillerDiv=document.createElement("div")
		fillerDiv.innerHTML="No Editor for Audio Created"
		return fillerDiv;
	}


}