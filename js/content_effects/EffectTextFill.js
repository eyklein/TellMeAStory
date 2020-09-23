class FillTextEffect extends TextEffect{

	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);

	}

	apply(){
		this.parentContent.html.fe.style.color=this.vareables.color;
	}
}