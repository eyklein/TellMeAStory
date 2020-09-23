// let svgEditorArrow=document.createElementNS("http://www.w3.org/2000/svg", "svg");
// svgEditorArrow.innerHTML = hArrowSVG(80,0,2,this.elicitNode.actionIn.elicit+"_arrow")
// svgEditorArrow.classList.add("action-line-editor");
// //this.html.container.append(this.html.svgArrow);
// svgEditorArrow.id("the-arrow");

class ElicitEditorElement{
	constructor(elicitNode_, contentNode_){
		
		this.elicitNode=elicitNode_;
		this.contentNode=contentNode_
		this.contentEditor = this.contentNode.editor
		

		this.html={};
		this.html.container=this.getContainerHTML();
		this.html.initiatingContent = this.getInitiatingContent();
		this.html.container.append(this.html.initiatingContent);

		




		if(this.elicitNode.actionIn != null){

			this.html.triggerTypeSelect = this.getTriggerTypeSelect()
			this.html.container.append(this.html.triggerTypeSelect);

			this.html.actionArrow=this.getActionArrow();
			this.html.container.append(this.html.actionArrow);




			


			// this.html.delay=document.createElement("input");
			// this.html.delay.type="number";
			// this.html.delay.classList.add("delay-input");
			// this.html.delay.value=this.elicitNode.actionIn.delay;
			// this.html.delay.min=0;
			// // <input type="number" id="myNumber" value="2">
			// this.html.container.append(this.html.delay);




			




			

		}


		

		//hArrowSVG(deltaX_,deltaY_,strokeThickness_,type_,color_)

		// this.html.initiatingContent.style.overflow = "scrole";
		// this.html.initiatingContent.style.height = "20px";
		// this.html.initiatingContent.style.width = "60px";
		//this.html.initiatingContent.style.background="green";


		
		

		




		this.html.select=document.createElement("select");
		this.html.select.classList.add("select-elicit-type")
		this.html.container.append(this.html.select);

		this.html.options = [];


		this.html.options[0] =document.createElement("option");
		this.html.options[0].text = "Display";
		this.html.options[1] =document.createElement("option");
		this.html.options[1].text = "Hide";
		this.html.options[2] =document.createElement("option");
		this.html.options[2].text = "Clickable";
		this.html.options[3] =document.createElement("option");
		this.html.options[3].text = "Unclickable";

		for(let i in this.html.options){
			this.html.select.add(this.html.options[i])

			if(this.elicitNode.elicitType.toLowerCase() == this.html.options[i].text.toLowerCase()){
				this.html.select.selectedIndex=i;
			}
		}

		

		


		// this.addActionDivs()
		

		// this.backToPlayButton=document.createElement("div");
		// this.backToPlayButton.innerHTML="< Play Editor";
		// this.backToPlayButton.style.position="absolute";
		// this.backToPlayButton.style.top="0px";
		// this.backToPlayButton.style.width="100px";
		// this.backToPlayButton.style.left="0px";
		// this.backToPlayButton.style.background="gray";
		// this.html.append(this.backToPlayButton);

		// this.backToPlayButton.addEventListener('dblclick', function (e){
		// 	this.hide();
		// 	this.storyEditor.display();
		// }.bind(this));


		//this.addContentDivs()


	}

	getContainerHTML(){
		let container=document.createElement("div");
		container.id="elicit_editor_" + this.contentNode.content.id + "_" + this.elicitNode.elicitType;
		container.classList.add("elicit-editor");
		// this.html.container.style.position='absolute';
		container.style.top='0px';
		container.style.left='0px';
		return container;
	}

	getInitiatingContent(){
		let initiatingContent = document.createElement("div"); //on the tail of the action
		initiatingContent.classList.add("initiating-content")
		if(this.elicitNode.actionIn == null){
			initiatingContent.innerHTML = "Scene";
			initiatingContent.classList.add("initiating-content-sudo")
		}else{
			initiatingContent.innerHTML = this.elicitNode.actionIn.tail.name//contentNode.content.name;
			initiatingContent.classList.add("initiating-content-" + this.elicitNode.actionIn.tail.type);
		}

		return initiatingContent;
	}
	getActionArrow(){
		let actionArrow =document.createElement("div");
		let svgArrow = this.getSvgArrow()
		actionArrow.append(svgArrow);

		let delayInput = this.getDelayInput();
	
		actionArrow.append(delayInput);

		return actionArrow;
	}	



	getSvgArrow(){
			let svgArrow=document.createElement("img");
			svgArrow.classList.add("elicit-editor-arrow")
			svgArrow.src="img/elicitEditorArrows/click.svg" //should return diffrent arrows for diffrent click/delay

			return svgArrow;
	}

	getTriggerTypeSelect(){
		let select=document.createElement("select");
		select.classList.add("select-trigger-type")
		

		let options = [];


		options[0] =document.createElement("option");
		options[0].text = "Click";
		options[1] =document.createElement("option");
		options[1].text = "Time";//time should re renamed to auto

		for(let i in options){
			select.add(options[i])

			// console.log(this.elicitNode)
			if(this.elicitNode.actionIn.trigger.toLowerCase() == options[i].text.toLowerCase()){
				select.selectedIndex=i;
			}
		}



		return select;
		
	}

	getDelayInput(){
		let delay=document.createElement("input");
		delay.type="number";
		delay.classList.add("delay-input");
		delay.value=this.elicitNode.actionIn.delay;
		delay.min=0;

		delay.addEventListener("change", function(e){

			if(e.target.value<0){
				e.target.value=0;
			}

			this.elicitNode.actionIn.delay=e.target.value;
			this.elicitNode.actionIn.update()
			this.elicitNode.updateYPos();//must update the action in first
			this.elicitNode.actionIn.updateYPosition(Date.now());

		}.bind(this));

		return delay;
	}

			





	// addActionDivs(){
	// 	//actionsIn=[];
	// 	for(let elicitType in this.content.positions){
	// 		for(let i in this.content.positions[elicitType]){
	// 			this.content.positions[elicitType][i]

	// 			this.html.container=document.createElement("div");
	// 			this.html.container.id="contnet_editor_" + this.content.id;

	// 			console.log(this.content.positions[elicitType][i])
	// 		}
	// 	}
	// }
	removeFromContentEditor(){
		this.contentEditor.removeFromElicitEditorElementHTML(this)
	}
	addToContentEditor(){
		this.contentEditor.addElicitEditorElementHTML(this)
		
		
	}
}