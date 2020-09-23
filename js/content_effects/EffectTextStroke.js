class StrokeTextEffect extends TextEffect{

	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);
	}

	apply(){
		if(this.vareables.thickness != null && this.vareables.color != null){
			this.parentContent.html.fe.style['-webkit-text-stroke']=this.vareables.thickness + " " + this.vareables.color;
		}
	}
}