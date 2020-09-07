class EditorWindow{
	constructor(){
		//this.div=document.createElement("div");

		this.pos={};
		this.pos.x=0;
		this.pos.y=0;

		this.width=800;
		this.height=1000;

		this.createHTML();

	}

	createHTML(){
		this.html = document.createElement("div");
		this.html.style.position = "absolute";
		this.html.style.left = this.pos.x;
		this.html.style.top = this.pos.y;
		this.html.style.width = "70%"//this.width + "px";
		this.html.style.height = "80%"//this.height + "px";

		this.html.style.overflow = "scroll";

		this.html.style['z-index']=100;

		this.html.style["background-color"] = "#fff";

		this.html.addEventListener("click", function(e){
			// console.log(e.target)
			if(e.target==this.html && !shiftPressed){
				clearSelectedNodes();
			}
		}.bind(this));




	}

	display(){
		//document.getElementById('content').appendChild(this.html)
		document.body.appendChild(this.html)
	}
	

}