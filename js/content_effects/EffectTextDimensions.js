class DimensionsTextEffect extends TextEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);
	}
	apply(){
		
		for(let vareable in this.vareables){
			this.parentContent.html.fe.style[vareable]=this.vareables[vareable];
		}
	}
}