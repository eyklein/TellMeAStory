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
		this.html.style.width = this.width + "px";
		this.html.style.height = this.height + "px";

		this.html.style['z-index']=100;

		this.html.style["background-color"] = "#fff";




	}

	display(){
		document.getElementById('content').appendChild(this.html)
	}
	

}