class LinkTextEffect extends TextEffect{

	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);		
	}

	apply(){
		
		this.parentContent.html.fe.innerHTML = this.parentContent.html.fe.innerText.link(this.vareables.src);

	}
}