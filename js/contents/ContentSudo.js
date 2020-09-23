class SudoContent extends Content{
	constructor(null_,parentScene_, inOut_, xPos_){ //,url_, content_, propertiesJSON_


		let contentJson_ = {
          "id": "000",
          "content": {
            "type": "sudo",
            "value": "sudo"
          },
          "effects": {
            "general": {},
            "entrance": {},
            "exit": {},
            "clickable": {
              "generic": {},
              "hover": {},
              "pressed": {}
            }
          }
        }
		super(contentJson_,parentScene_)
		this.inOut=inOut_;
		this.type="sudo";
		this.htmlParent={};

		this.name=this.parentScene.id;

		
		this.cNode=new ContentNode(this);
		this.cNode.xPos = xPos_;
		//this.createNode();
	}

	createFrontEndHTML(){
		
	}


	createEffects(){

		this.cNode.update();
		
	
	}


	applyEffects(){
		
	}
	
	

	displayFrontEndHTML(){

	
		
	}

}