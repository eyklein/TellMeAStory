class PositionImageEffect extends ImageEffect{
	constructor(JSON_,parentContent_){
		super(JSON_,parentContent_);
		//console.log("create PositionImageEffect")
	}
	apply(){

		//console.log("apply PositionImageEffect")

		//console.log("POSITIONING!!!!!!!!! " + this.parentContent.id + " in scene "+ this.parentContent.parentScene.id)
		if(this.vareables.type == "background"){

			this.parentContent.htmlParent=document.getElementById("background_img");
			//console.log(this.parentContent.htmlParent)
			this.parentContent.html.fe.classList.add('background-img')
			//this.parentContent.htmlParent.append(this.parentContent.html.fe);

		}else if(this.vareables.type == "absolute"){
			this.parentContent.html.fe.style.position="absolute";
			

			// this.parentContent.html.fe.style.top=this.vareables.top;
			// this.parentContent.html.fe.style.left=this.vareables.left;
			// this.parentContent.html.fe.style.right=this.vareables.right;
			// this.parentContent.html.fe.style.bottom=this.vareables.bottom;
			for(let vareable in this.vareables){
				this.parentContent.html.fe.style[vareable]=this.vareables[vareable];
			}
			


			// console.log(this.parentContent.html.fe)
			// console.log(this.parentContent.html.fe.naturalWidth)
			this.parentContent.html.fe.style.width=(this.parentContent.html.fe.naturalWidth / 1920)*100 + "%";


			this.parentContent.htmlParent=document.getElementById("content")
			this.parentContent.html.fe.classList.add('icon-img')
			//this.parentContent.htmlParent.append(this.parentContent.html.fe);

		}
	}
}