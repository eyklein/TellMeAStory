class ImageContent extends Content{
	constructor(contentJson_,parentScene_){ //,url_, content_, propertiesJSON_
		super(contentJson_,parentScene_)
		this.random=Math.random();

		this.name=this.content.value;
		this.createNode();

		this.type="image";

	}

	getEffect(effectName_,effectJSON_){
		if(effectName_=="position"){
			return new PositionImageEffect(effectJSON_,this)
		}else if(effectName_=="glow"){
			return new GlowImageEffect(effectJSON_,this)
		}else if(effectName_=="replace"){
			return new ReplaceImageEffect(effectJSON_,this)
		}else if(effectName_=="opacity"){
			return new OpacityImageEffect(effectJSON_,this)
		}else if(effectName_=="hide"){
			return new HideImageEffect(effectJSON_,this)
		}else if(effectName_=="translate"){
			return new TranslateImageEffect(effectJSON_,this)
		}else if(effectName_=="link"){
			return new LinkImageEffect(effectJSON_,this)
		}
		else{
			return new ImageEffect(effectJSON_,this)
		}
	}


	createEffects(){
		for(let effect in this.JSONData.effects.general){
			this.effects.general[effect] = this.getEffect(effect,this.JSONData.effects.general[effect])
		}

		this.effects.clickable.generic={}
		for(let effect in this.JSONData.effects.clickable.generic){
			this.effects.clickable.generic[effect]=this.getEffect(effect, this.JSONData.effects.clickable.generic[effect]);
		}
		this.effects.clickable.hover={}
		for(let effect in this.JSONData.effects.clickable.hover){
			this.effects.clickable.hover[effect]=this.getEffect(effect, this.JSONData.effects.clickable.hover[effect]);
		}
		this.effects.clickable.pressed={}
		for(let effect in this.JSONData.effects.clickable.pressed){
			this.effects.clickable.pressed[effect]=this.getEffect(effect, this.JSONData.effects.clickable.pressed[effect]);
		}
		this.effects.hover={}
		for(let effect in this.JSONData.effects.hover){
			this.effects.hover[effect]=this.getEffect(effect, this.JSONData.effects.hover[effect]);
		}
		this.effects.mousePressed={}
		for(let effect in this.JSONData.effects.mousePressed){
			this.effects.mousePressed[effect]=this.getEffect(effect, this.JSONData.effects.mousePressed[effect]);
		}
		this.effects.entrance={}
		for(let effect in this.JSONData.effects.entrance){
			this.effects.entrance[effect]=this.getEffect(effect, this.JSONData.effects.entrance[effect]);
		}
		this.effects.exit={}
		for(let effect in this.JSONData.effects.exit){
			this.effects.exit[effect]=this.getEffect(effect, this.JSONData.effects.exit[effect]);
		}
	
	}

	//this.frontEndLoaded=false;

	createFrontEndHTML(){


		
		this.html.fe = document.createElement("img");
		this.html.fe.setAttribute('draggable', false);
		//console.log(this.id)
		this.html.fe.id=this.id;
		//this.html.fe.onmousedown = 'return false';
		this.addEffects();
		
		this.html.fe.onload =function(){ // can only adjust the size after it is loaded and therefore knows the natural size
			
			this.adjustSize();
			this.html.fe.onload=null;
		}.bind(this)


		this.html.fe.src=absoluteLocation + this.content.value;
		//this.html.fe.classList.add('icon-img')

		// this.createEffects();
		// this.applyGeneralEffects();



		

	}
	addEffects(){
		this.createEffects();
		
		this.applyGeneralEffects();
	}

	adjustSize(){
		this.html.fe.style.width=(this.html.fe.naturalWidth / 1920)*100 + "%";
	}


	


	displayFrontEndHTML(){
		//console.log(this.html.fe)
		//document.getElementById("background_img").append(this.html.fe);


		//make sure this loads first ****
		// console.log(this.htmlParent)

		super.displayFrontEndHTML();
		
		this.htmlParent.append(this.html.fe);
		this.applyEntranceEffects();
		this.html.fe.style.display="block";
	}

}