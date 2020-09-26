class TranslateImageEffect extends ImageEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);

		this.type="translate";
	}
	apply(){
		
		this.parentContent.html.fe.style.position="absolute";

		let fromXPos = parseInt(this.vareables.from.xPos.replace( /(^.+)(\w\d+\w)(.+$)/i,'$2'))
		let fromYPos = parseInt(this.vareables.from.yPos.replace( /(^.+)(\w\d+\w)(.+$)/i,'$2'))

		let toXPos = parseInt(this.vareables.to.xPos.replace( /(^.+)(\w\d+\w)(.+$)/i,'$2'))
		let toYPos = parseInt(this.vareables.to.yPos.replace( /(^.+)(\w\d+\w)(.+$)/i,'$2'))
		//this.vareables.from.yPos

		let numIncrements = Math.round(this.vareables.properties.time*1000/20)+1;
		let currentIncrement=0;
		
		this.translateLoop=setInterval(function(){ 

			let xPos=fromXPos+(toXPos-fromXPos)/numIncrements*currentIncrement;

			let yPos=fromYPos+(toYPos-fromYPos)/numIncrements*currentIncrement;

				

			this.parentContent.html.fe.style.transform = "translate(" + xPos + "%," + yPos + "%)";

			currentIncrement++;
		

		}.bind(this), 20);//60 times per minute

		setTimeout(function(){
			clearInterval(this.translateLoop)
			this.parentContent.html.fe.style.transform = "translate(0%,0%)";
		}.bind(this), this.vareables.properties.time*1000)



	}



 //             "translate":{
 //                "from":{
 //                  "xPos":"0%",
 //                  "yPos":"-99%"
 //                },"to":{
 //                  "xPos":"0%",
 //                  "yPos":"0%"
 //                },"properties":{
 //                  "time":0.5,
 //                  "type":"linear"
 //                }
 //              }

	createEditorHTML(){
		this.editor={}
		this.editor.html = {}
		this.editor.html.form = document.createElement("form");
		this.editor.html.form.classList.add("effect-editor-form");
		this.editor.html.form.classList.add("image-translate");

		this.editor.html.effectTitle = document.createElement("div");
		this.editor.html.effectTitle.innerHTML="Translate Effect"
		this.editor.html.effectTitle.classList.add("effect-title")
		this.editor.html.form.append(this.editor.html.effectTitle);


		this.editor.html.labelFromX = document.createElement("label");
		this.editor.html.labelFromX.classList.add("effect-vareable")
		this.editor.html.labelFromX.innerHTML="From Left"
		this.editor.html.form.append(this.editor.html.labelFromX);
		this.editor.html.inputFromX =document.createElement("input");
		this.editor.html.form.append(this.editor.html.inputFromX);
		this.editor.html.inputFromX.classList.add("effect-input")
		this.editor.html.inputFromX.value=this.vareables.from.xPos;

		this.editor.html.form.append(document.createElement("br"));

		this.editor.html.labelFromY = document.createElement("label");
		this.editor.html.labelFromY.classList.add("effect-vareable")
		this.editor.html.labelFromY.innerHTML="From Top"
		this.editor.html.form.append(this.editor.html.labelFromY);
		this.editor.html.inputFromY =document.createElement("input");
		this.editor.html.form.append(this.editor.html.inputFromY);
		this.editor.html.inputFromY.classList.add("effect-input")
		this.editor.html.inputFromY.value=this.vareables.from.yPos;

		this.editor.html.form.append(document.createElement("br"));

		this.editor.html.labelToX = document.createElement("label");
		this.editor.html.labelToX.classList.add("effect-vareable")
		this.editor.html.labelToX.innerHTML="To Left"
		this.editor.html.form.append(this.editor.html.labelToX);
		this.editor.html.inputToX =document.createElement("input");
		this.editor.html.form.append(this.editor.html.inputToX);
		this.editor.html.inputToX.classList.add("effect-input")
		this.editor.html.inputToX.value=this.vareables.to.xPos;

		this.editor.html.form.append(document.createElement("br"));

		this.editor.html.labelToY = document.createElement("label");
		this.editor.html.labelToY.classList.add("effect-vareable")
		this.editor.html.labelToY.innerHTML="To Top"
		this.editor.html.form.append(this.editor.html.labelToY);
		this.editor.html.inputToY =document.createElement("input");
		this.editor.html.form.append(this.editor.html.inputToY);
		this.editor.html.inputToY.classList.add("effect-input")
		this.editor.html.inputToY.value=this.vareables.to.yPos;

		this.editor.html.form.append(document.createElement("br"));

		this.editor.html.labelTime = document.createElement("label");
		this.editor.html.labelTime.classList.add("effect-vareable")
		this.editor.html.labelTime.innerHTML="Time"
		this.editor.html.form.append(this.editor.html.labelTime);
		this.editor.html.inputTime =document.createElement("input");
		this.editor.html.form.append(this.editor.html.inputTime);
		this.editor.html.inputTime.classList.add("effect-input")
		this.editor.html.inputTime.value=this.vareables.properties.time;

		this.editor.html.form.append(document.createElement("br"));

		this.editor.html.labelType = document.createElement("label");
		this.editor.html.labelType.classList.add("effect-vareable")
		this.editor.html.labelType.innerHTML="Type"
		this.editor.html.form.append(this.editor.html.labelType);

		this.editor.html.transitionTypeSelect =document.createElement("select");
		this.editor.html.form.append(this.editor.html.transitionTypeSelect);
		this.editor.html.transitionTypeSelect.classList.add("effect-dropdown")

		let options = [];


		options[0] =document.createElement("option");
		options[0].text = "linear";
		

		for(let i in options){

			this.editor.html.transitionTypeSelect.add(options[i])
			if(this.vareables.properties.type == options[i].text){
				
				this.editor.html.transitionTypeSelect.selectedIndex=i;
			}
		}
		this.editor.html.form.append(document.createElement("br"));
	}
}