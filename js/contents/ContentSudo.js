class SudoContent extends Content{
	constructor(null_,parentScene_, inOut_){ //,url_, content_, propertiesJSON_


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
		this.type="Sudo";
		this.htmlParent={};

		this.name=this.content.value;
		//this.createNode();
		this.type="text";
	}

	createFrontEndHTML(){
		
	}


	createEffects(){
		
	
	}


	applyEffects(){
		
	}
	
	

	displayFrontEndHTML(){

	
		
	}

}