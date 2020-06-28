class LinkImageEffect extends ImageEffect{

	constructor(JSON_,parentContent_){
		super(JSON_,parentContent_);
		
		
	}

	apply(){
		// console.log("APPLIYING HREF #############    " + this.vareables.src)
		// let htmlLink=document.createElement("a");
		//htmlLink.href = this.vareables.src;
		this.parentContent.html.fe.addEventListener("click", function(){
			if(this.vareables.type == "tab"){
				window.open(this.vareables.src);
			}else if(this.vareables.type == "window"){
				window.open(this.vareables.src,this.vareables.name,
    "toolbar=yes,scrollbars=yes,resizable=yes, location=yes,menubar=yes");
			}else if(this.vareables.type == "redirect"){
				window.location.href = this.vareables.src;

			}
		}.bind(this))

		//htmlLink

		//this.parentContent.html.fe = htmlLink;
		//this.parentContent.html.fe.href = this.vareables.src;
		//console.log(this.parentContent.html.fe)

	}
}