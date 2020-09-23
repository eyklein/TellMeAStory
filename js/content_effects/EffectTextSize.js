class SizeTextEffect extends TextEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);

	}
	apply(){
		if(this.vareables.type == "scalable"){

			scalableTextEffects.push(this)
		}
		
	}
	updateSize(width_){
		this.parentContent.html.fe.style['font-size'] = width_*this.vareables.value+'px';
	}
}