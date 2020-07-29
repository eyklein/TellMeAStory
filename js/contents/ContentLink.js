class TextContent extends Content{
	constructor(contentJson_,parentScene_){ //,url_, content_, propertiesJSON_
		super(contentJson_,parentScene_)
		this.htmlParent={};

		this.name=this.content.value;
		this.createNode();
	}

	createFrontEndHTML(){
		this.html.fe = document.createElement("span");
		this.html.fe.innerHTML=this.content.value;
		this.createEffects();

		this.applyEffects();
		
	}


	createEffects(){
		// console.log(this.JSONData)
		for(let effect in this.JSONData.effects.general){
			if(effect=="fill"){
				this.effects.general[effect]=new FillTextEffect(this.JSONData.effects.general[effect],this)
			}else if(effect=="stroke"){
				this.effects.general[effect]=new StrokeTextEffect(this.JSONData.effects.general[effect],this)
			}else if(effect=="position"){
				this.effects.general[effect]=new PositionTextEffect(this.JSONData.effects.general[effect],this)
			}else if(effect=="z-index"){
				this.effects.general[effect] = new ZIndexEffect(this.JSONData.effects.general[effect],this)
			}else{
				this.effects.general[effect]=new ContentEffect(this.JSONData.effects.general[effect],this)
			}
		}
		for(let effect in this.JSONData.effects.entrance){
			this.effects.entrance[effect]=new ContentEffect(this.JSONData.effects.entrance[effect],this)
		}
		for(let effect in this.JSONData.effects.exit){
			if(effect=="hide"){
				this.effects.exit[effect]=new HideTextEffect(this.JSONData.effects.exit[effect],this)
			}else{
				this.effects.exit[effect]=new ContentEffect(this.JSONData.effects.exit[effect],this)
			}
			
		}

		//console.log(this.id + "  " + this.JSONData.effects.clickable)

		//genneral effects
		this.effects.clickable.generic={}
		for(let effect in this.JSONData.effects.clickable.generic){

			if(effect=="glow"){
				this.effects.clickable.generic[effect]=new GlowTextEffect(this.JSONData.effects.clickable.generic[effect],this)
			}else{
				this.effects.clickable.generic[effect]=new ContentEffect(this.JSONData.effects.clickable.generic[effect],this)
			}


		}
		this.effects.clickable.hover={}
		for(let effect in this.JSONData.effects.clickable.hover){

			if(effect=="glow"){
				this.effects.clickable.hover[effect]=new GlowTextEffect(this.JSONData.effects.clickable.hover[effect],this)
			}else{
				this.effects.clickable.hover[effect]=new ContentEffect(this.JSONData.effects.clickable.hover[effect],this)
			}
		}
		this.effects.clickable.pressed={}
		for(let effect in this.JSONData.effects.clickable.hover){

			if(effect=="glow"){
				this.effects.clickable.pressed[effect]=new GlowTextEffect(this.JSONData.effects.clickable.pressed[effect],this)
			}else{
				this.effects.clickable.pressed[effect]=new ContentEffect(this.JSONData.effects.clickable.pressed[effect],this)
			}
		}
	
	}


	applyEffects(){
		
		for(let effect in this.effects.general){
			this.effects.general[effect].apply();
		}
	}
	
	

	displayFrontEndHTML(){
		
			this.htmlParent.append(this.html.fe);

		
		this.html.fe.style.display="block";
		
	}

}