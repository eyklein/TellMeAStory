class DimensionsTextEffect extends TextEffect{
	constructor(JSON_,parentContent_){
		super(JSON_,parentContent_);
	}
	apply(){
		
		for(let vareable in this.vareables){
			this.parentContent.html.fe.style[vareable]=this.vareables[vareable];
		}
	}
}