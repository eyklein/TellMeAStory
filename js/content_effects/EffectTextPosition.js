class PositionTextEffect extends TextEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);
	}
	apply(){
		if(this.vareables.type == "appendIn"){
			
			// console.log(this.parentContent.id)
			this.parentContent.htmlParent=document.getElementById(this.vareables.parentClass)
			// console.log(typeof(this.parentContent.htmlParent.append))

		}
		else if(this.vareables.type == "absolute"){
			this.parentContent.html.fe.style.position="absolute";

			for(let vareable in this.vareables){
				this.parentContent.html.fe.style[vareable]=this.vareables[vareable];
			}
			
			this.parentContent.htmlParent=document.getElementById("content")


		}
	}
}