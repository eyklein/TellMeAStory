class ContentEditorElement{
	constructor(contentNode_){
		
		this.contentNode=contentNode_;
		

		this.html={};
		this.html.container=document.createElement("div");
		this.html.container.id="content_editor_" + this.contentNode.content.id;

		this.html.container.classList.add("content-editor");
		this.html.container.style.position='absolute';
		this.html.container.style.top='0px';
		this.html.container.style.left='0px';



		this.html.title=this.getTitle()
		this.html.container.append(this.html.title);

		this.html.inputContent=document.createElement("div");
		this.html.inputContent.classList.add("input-content");
		this.html.container.append(this.html.inputContent);


		this.html.effectEditors={}
		this.html.effectEditors.container=document.createElement("div");
		this.html.effectEditors.container.classList.add("effect-editors");
		this.html.container.append(this.html.effectEditors.container);



		this.html.effectEditors.catagoties={};
		this.html.effectEditors.catagoties["general"]={}
		this.html.effectEditors.catagoties["general"].container=document.createElement("div");
		this.html.effectEditors.catagoties["general"].container.classList.add("general");
		this.html.effectEditors.container.append(this.html.effectEditors.catagoties["general"].container);
		this.html.effectEditors.catagoties["general"].title=document.createElement("div");
		this.html.effectEditors.catagoties["general"].title.innerHTML="General Effects";
		this.html.effectEditors.catagoties["general"].title.classList.add("effect-catagory-title")
		this.html.effectEditors.catagoties["general"].container.append(this.html.effectEditors.catagoties["general"].title);
		this.html.effectEditors.catagoties["general"].content=document.createElement("div");
		this.html.effectEditors.catagoties["general"].content.style.display="none";
		this.html.effectEditors.catagoties["general"].container.append(this.html.effectEditors.catagoties["general"].content);
		this.makeCollapsible(this.html.effectEditors.catagoties["general"].title, this.html.effectEditors.catagoties["general"].content)
		this.html.effectEditors.catagoties["general"].numberEffects=document.createElement("div");
		this.html.effectEditors.catagoties["general"].numberEffects.innerHTML=0;
		this.html.effectEditors.catagoties["general"].numberEffects.classList.add("number-of-effects")
		this.html.effectEditors.catagoties["general"].title.append(this.html.effectEditors.catagoties["general"].numberEffects)

		this.html.effectEditors.catagoties["entrance"]={}
		this.html.effectEditors.catagoties["entrance"].container=document.createElement("div");
		this.html.effectEditors.catagoties["entrance"].container.classList.add("entrance");
		this.html.effectEditors.container.append(this.html.effectEditors.catagoties["entrance"].container);
		this.html.effectEditors.catagoties["entrance"].title=document.createElement("div");
		this.html.effectEditors.catagoties["entrance"].title.innerHTML="Entrance Effects"; // &#9654 arrow
		this.html.effectEditors.catagoties["entrance"].title.classList.add("effect-catagory-title")
		this.html.effectEditors.catagoties["entrance"].container.append(this.html.effectEditors.catagoties["entrance"].title);
		this.html.effectEditors.catagoties["entrance"].content=document.createElement("div");
		this.html.effectEditors.catagoties["entrance"].content.style.display="none";
		this.html.effectEditors.catagoties["entrance"].container.append(this.html.effectEditors.catagoties["entrance"].content);
		this.makeCollapsible(this.html.effectEditors.catagoties["entrance"].title, this.html.effectEditors.catagoties["entrance"].content)
		this.html.effectEditors.catagoties["entrance"].numberEffects=document.createElement("div");
		this.html.effectEditors.catagoties["entrance"].numberEffects.innerHTML=0;
		this.html.effectEditors.catagoties["entrance"].numberEffects.classList.add("number-of-effects")
		this.html.effectEditors.catagoties["entrance"].title.append(this.html.effectEditors.catagoties["entrance"].numberEffects)

		this.html.effectEditors.catagoties["exit"]={};
		this.html.effectEditors.catagoties["exit"].container=document.createElement("div");
		this.html.effectEditors.catagoties["exit"].container.classList.add("exit");
		this.html.effectEditors.container.append(this.html.effectEditors.catagoties["exit"].container);
		this.html.effectEditors.catagoties["exit"].title=document.createElement("div");
		this.html.effectEditors.catagoties["exit"].title.innerHTML="Exit Effects";
		this.html.effectEditors.catagoties["exit"].title.classList.add("effect-catagory-title")
		this.html.effectEditors.catagoties["exit"].container.append(this.html.effectEditors.catagoties["exit"].title);
		this.html.effectEditors.catagoties["exit"].content=document.createElement("div");
		this.html.effectEditors.catagoties["exit"].content.style.display="none";
		this.html.effectEditors.catagoties["exit"].container.append(this.html.effectEditors.catagoties["exit"].content);
		this.makeCollapsible(this.html.effectEditors.catagoties["exit"].title, this.html.effectEditors.catagoties["exit"].content)
		this.html.effectEditors.catagoties["exit"].numberEffects=document.createElement("div");
		this.html.effectEditors.catagoties["exit"].numberEffects.innerHTML=0;
		this.html.effectEditors.catagoties["exit"].numberEffects.classList.add("number-of-effects")
		this.html.effectEditors.catagoties["exit"].title.append(this.html.effectEditors.catagoties["exit"].numberEffects)

		this.html.effectEditors.catagoties["hover"]={};
		this.html.effectEditors.catagoties["hover"].container=document.createElement("div");
		this.html.effectEditors.catagoties["hover"].container.classList.add("hover");
		this.html.effectEditors.container.append(this.html.effectEditors.catagoties["hover"].container);
		this.html.effectEditors.catagoties["hover"].title=document.createElement("div");
		this.html.effectEditors.catagoties["hover"].title.innerHTML="Hover Effects";
		this.html.effectEditors.catagoties["hover"].title.classList.add("effect-catagory-title")
		this.html.effectEditors.catagoties["hover"].container.append(this.html.effectEditors.catagoties["hover"].title);
		this.html.effectEditors.catagoties["hover"].content=document.createElement("div");
		this.html.effectEditors.catagoties["hover"].content.style.display="none";
		this.html.effectEditors.catagoties["hover"].container.append(this.html.effectEditors.catagoties["hover"].content);
		this.makeCollapsible(this.html.effectEditors.catagoties["hover"].title, this.html.effectEditors.catagoties["hover"].content)
		this.html.effectEditors.catagoties["hover"].numberEffects=document.createElement("div");
		this.html.effectEditors.catagoties["hover"].numberEffects.innerHTML=0;
		this.html.effectEditors.catagoties["hover"].numberEffects.classList.add("number-of-effects")
		this.html.effectEditors.catagoties["hover"].title.append(this.html.effectEditors.catagoties["hover"].numberEffects)

		this.html.effectEditors.catagoties["pressed"]={};
		this.html.effectEditors.catagoties["pressed"].container=document.createElement("div");
		this.html.effectEditors.catagoties["pressed"].container.classList.add("pressed");
		this.html.effectEditors.container.append(this.html.effectEditors.catagoties["pressed"].container);
		this.html.effectEditors.catagoties["pressed"].title=document.createElement("div");
		this.html.effectEditors.catagoties["pressed"].title.innerHTML="Mouse Pressed Effects";
		this.html.effectEditors.catagoties["pressed"].title.classList.add("effect-catagory-title")
		this.html.effectEditors.catagoties["pressed"].container.append(this.html.effectEditors.catagoties["pressed"].title);
		this.html.effectEditors.catagoties["pressed"].content=document.createElement("div");
		this.html.effectEditors.catagoties["pressed"].content.style.display="none";
		this.html.effectEditors.catagoties["pressed"].container.append(this.html.effectEditors.catagoties["pressed"].content);
		this.makeCollapsible(this.html.effectEditors.catagoties["pressed"].title, this.html.effectEditors.catagoties["pressed"].content)
		this.html.effectEditors.catagoties["pressed"].numberEffects=document.createElement("div");
		this.html.effectEditors.catagoties["pressed"].numberEffects.innerHTML=0;
		this.html.effectEditors.catagoties["pressed"].numberEffects.classList.add("number-of-effects")
		this.html.effectEditors.catagoties["pressed"].title.append(this.html.effectEditors.catagoties["pressed"].numberEffects)

		this.html.effectEditors.catagoties["clickable"]={};
		this.html.effectEditors.catagoties["clickable"]["groupContainer"]={}
		this.html.effectEditors.catagoties["clickable"]["groupContainer"]["title"]=document.createElement("div");
		this.html.effectEditors.catagoties["clickable"]["groupContainer"]["title"].innerHTML="Clickable Effects";
		this.html.effectEditors.catagoties["clickable"]["groupContainer"]["title"].classList.add("effect-catagory-title")
		this.html.effectEditors.container.append(this.html.effectEditors.catagoties["clickable"]["groupContainer"]["title"]);
		this.html.effectEditors.catagoties["clickable"]["groupContainer"].numberEffects=document.createElement("div");
		this.html.effectEditors.catagoties["clickable"]["groupContainer"].numberEffects.innerHTML=0;
		this.html.effectEditors.catagoties["clickable"]["groupContainer"].numberEffects.classList.add("number-of-effects")
		this.html.effectEditors.catagoties["clickable"]["groupContainer"].title.append(this.html.effectEditors.catagoties["clickable"]["groupContainer"].numberEffects)

		this.html.effectEditors.catagoties["clickable"]["groupContainer"].content=document.createElement("div");
		this.html.effectEditors.catagoties["clickable"]["groupContainer"].content.classList.add("clickable-content");
		this.html.effectEditors.catagoties["clickable"]["groupContainer"].content.style["padding-left"] = "2vw";
		this.html.effectEditors.catagoties["clickable"]["groupContainer"].content.style.display = "none";
		this.html.effectEditors.container.append(this.html.effectEditors.catagoties["clickable"]["groupContainer"].content);
		this.makeCollapsible(this.html.effectEditors.catagoties["clickable"]["groupContainer"].title, this.html.effectEditors.catagoties["clickable"]["groupContainer"].content)
		



		this.html.effectEditors.catagoties["clickable"]["generic"]={};
		this.html.effectEditors.catagoties["clickable"]["generic"].container=document.createElement("div");
		this.html.effectEditors.catagoties["clickable"]["generic"].container.classList.add("clickable-generic");
		this.html.effectEditors.catagoties["clickable"]["groupContainer"].content.append(this.html.effectEditors.catagoties["clickable"]["generic"].container);
		this.html.effectEditors.catagoties["clickable"]["generic"].title=document.createElement("div");
		this.html.effectEditors.catagoties["clickable"]["generic"].title.innerHTML="Generic Clickable Effects";
		this.html.effectEditors.catagoties["clickable"]["generic"].title.classList.add("effect-catagory-title")
		this.html.effectEditors.catagoties["clickable"]["generic"].container.append(this.html.effectEditors.catagoties["clickable"]["generic"].title);
		this.html.effectEditors.catagoties["clickable"]["generic"].content=document.createElement("div");
		this.html.effectEditors.catagoties["clickable"]["generic"].content.style.display="none";
		this.html.effectEditors.catagoties["clickable"]["generic"].container.append(this.html.effectEditors.catagoties["clickable"]["generic"].content);
		this.makeCollapsible(this.html.effectEditors.catagoties["clickable"]["generic"].title, this.html.effectEditors.catagoties["clickable"]["generic"].content)
		this.html.effectEditors.catagoties["clickable"]["generic"].numberEffects=document.createElement("div");
		this.html.effectEditors.catagoties["clickable"]["generic"].numberEffects.innerHTML=0;
		this.html.effectEditors.catagoties["clickable"]["generic"].numberEffects.classList.add("number-of-effects")
		this.html.effectEditors.catagoties["clickable"]["generic"].title.append(this.html.effectEditors.catagoties["clickable"]["generic"].numberEffects)


		// this.html.effectEditors.catagoties["clickable"]["hover"]={};
		// this.html.effectEditors.catagoties["clickable"]["hover"].container=document.createElement("div");
		// this.html.effectEditors.catagoties["clickable"]["hover"].container=document.createElement("div");
		// this.html.effectEditors.catagoties["clickable"]["hover"].container.classList.add("clickable-hover");
		// this.html.effectEditors.catagoties["clickable"]["groupContainer"].append(this.html.effectEditors.catagoties["clickable"]["hover"].container);

		this.html.effectEditors.catagoties["clickable"]["hover"]={};
		this.html.effectEditors.catagoties["clickable"]["hover"].container=document.createElement("div");
		this.html.effectEditors.catagoties["clickable"]["hover"].container.classList.add("clickable-hover");
		this.html.effectEditors.catagoties["clickable"]["groupContainer"].content.append(this.html.effectEditors.catagoties["clickable"]["hover"].container);
		this.html.effectEditors.catagoties["clickable"]["hover"].title=document.createElement("div");
		this.html.effectEditors.catagoties["clickable"]["hover"].title.innerHTML="Hover Clickable Effects";
		this.html.effectEditors.catagoties["clickable"]["hover"].title.classList.add("effect-catagory-title")
		this.html.effectEditors.catagoties["clickable"]["hover"].container.append(this.html.effectEditors.catagoties["clickable"]["hover"].title);
		this.html.effectEditors.catagoties["clickable"]["hover"].content=document.createElement("div");
		this.html.effectEditors.catagoties["clickable"]["hover"].content.style.display="none";
		this.html.effectEditors.catagoties["clickable"]["hover"].container.append(this.html.effectEditors.catagoties["clickable"]["hover"].content);
		this.makeCollapsible(this.html.effectEditors.catagoties["clickable"]["hover"].title, this.html.effectEditors.catagoties["clickable"]["hover"].content)
		this.html.effectEditors.catagoties["clickable"]["hover"].numberEffects=document.createElement("div");
		this.html.effectEditors.catagoties["clickable"]["hover"].numberEffects.innerHTML=0;
		this.html.effectEditors.catagoties["clickable"]["hover"].numberEffects.classList.add("number-of-effects")
		this.html.effectEditors.catagoties["clickable"]["hover"].title.append(this.html.effectEditors.catagoties["clickable"]["hover"].numberEffects)

		// this.html.effectEditors.catagoties["clickable"]["pressed"]={};
		// this.html.effectEditors.catagoties["clickable"]["pressed"].container=document.createElement("div");
		// this.html.effectEditors.catagoties["clickable"]["pressed"].container=document.createElement("div");
		// this.html.effectEditors.catagoties["clickable"]["pressed"].container.classList.add("clickable-pressed");
		// this.html.effectEditors.catagoties["clickable"]["groupContainer"].append(this.html.effectEditors.catagoties["clickable"]["pressed"].container);
		this.html.effectEditors.catagoties["clickable"]["pressed"]={};
		this.html.effectEditors.catagoties["clickable"]["pressed"].container=document.createElement("div");
		this.html.effectEditors.catagoties["clickable"]["pressed"].container.classList.add("clickable-pressed");
		this.html.effectEditors.catagoties["clickable"]["groupContainer"].content.append(this.html.effectEditors.catagoties["clickable"]["pressed"].container);
		this.html.effectEditors.catagoties["clickable"]["pressed"].title=document.createElement("div");
		this.html.effectEditors.catagoties["clickable"]["pressed"].title.innerHTML="Pressed Clickable Effects";
		this.html.effectEditors.catagoties["clickable"]["pressed"].title.classList.add("effect-catagory-title")
		this.html.effectEditors.catagoties["clickable"]["pressed"].container.append(this.html.effectEditors.catagoties["clickable"]["pressed"].title);
		this.html.effectEditors.catagoties["clickable"]["pressed"].content=document.createElement("div");     
		this.html.effectEditors.catagoties["clickable"]["pressed"].content.style.display="none";
		this.html.effectEditors.catagoties["clickable"]["pressed"].container.append(this.html.effectEditors.catagoties["clickable"]["pressed"].content);
		this.makeCollapsible(this.html.effectEditors.catagoties["clickable"]["pressed"].title, this.html.effectEditors.catagoties["clickable"]["pressed"].content)
		this.html.effectEditors.catagoties["clickable"]["pressed"].numberEffects=document.createElement("div");
		this.html.effectEditors.catagoties["clickable"]["pressed"].numberEffects.innerHTML=0;
		this.html.effectEditors.catagoties["clickable"]["pressed"].numberEffects.classList.add("number-of-effects")
		this.html.effectEditors.catagoties["clickable"]["pressed"].title.append(this.html.effectEditors.catagoties["clickable"]["pressed"].numberEffects)


		// this.html.currentContent=this.getCurrentContentEditor();
		// this.html.container.append(this.html.currentContent);





		
 
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

	addNumberOfEffects(){


	}
	makeCollapsible(button_, target_){
		
	  button_.addEventListener("click", function() {
	    this.classList.toggle("active");
	    //var content = this.nextElementSibling;
	    if (target_.style.display === "block") {
	      target_.style.display = "none";
	    } else {
	      target_.style.display = "block";
	    }
	  });
		
	}

	getTitle(){
		let title=document.createElement("input");
		title.classList.add("secondary-t1");

		title.value=this.contentNode.content.name;

		title.style["font-size"]=140/(title.value.length+40)+"vw";
		title.addEventListener('input', function(e){
			title.style["font-size"]=140/(e.target.value.length+40)+"vw";
		}.bind(this))
		title.addEventListener('change', function(e){
			if(title.value==""){
				title.value="Unnamed";
			}
		}.bind(this))

		return title;
		

	}
	// getCurrentContentEditor(){
	// 	let currentContent=document.createElement("div");
	// 	currentContent.classList.add("current-content");

	// 	for(let catigory in this.contentNode.content.effects){//"general", "entrance", "exit", "clickable", "pressed"
	// 		if(catigory==clickable){
	// 			for(let subcatigory in this.contentNode.content.effects[catigory]){//generic,hover,pressed

	// 			}
	// 		}
	// 		console.log(catigory)
	// 		console.log(this.contentNode.content.effects[catigory])
	// 	}

	// 	return currentContent;
	// }

	removeFromElicitEditorElementHTML(elicitEditorElement_){
		this.html.inputContent.removeChild(elicitEditorElement_.html.container);
	}

	addElicitEditorElementHTML(elicitEditorElement_){
		this.html.inputContent.append(elicitEditorElement_.html.container);

	}
	addEffectToEditor(effect_,catagory_,clickableSubCatagory_){
			//this.contentNode.content.
			let effectHTML = effect_.getEditorHTML()

			
			//this.setNumberEffects();

			// console.log(clickableSubCatagory_);
			// console.log(catagory_);
			if(clickableSubCatagory_ == undefined){
				// console.log(this.contentNode.content);
				// console.log(this.html.effectEditors);
				// console.log(this.html.effectEditors.catagoties[catagory_]);
				console.log(this.contentNode.content.parentScene)
				console.log(this.html.effectEditors.catagoties[catagory_].container);
				console.log(effectHTML)

				this.html.effectEditors.catagoties[catagory_].content.append(effectHTML)

				this.html.effectEditors.catagoties[catagory_].numberEffects.innerHTML = this.html.effectEditors.catagoties[catagory_].numberEffects.innerHTML*1+1
			}else{
				// console.log(this.html.effectEditors.catagoties[catagory_][clickableSubCatagory_].container)
				this.html.effectEditors.catagoties[catagory_][clickableSubCatagory_].content.append(effectHTML)

				this.html.effectEditors.catagoties[catagory_]["groupContainer"].numberEffects.innerHTML = this.html.effectEditors.catagoties[catagory_]["groupContainer"].numberEffects.innerHTML*1 +1
				this.html.effectEditors.catagoties[catagory_][clickableSubCatagory_].numberEffects.innerHTML = this.html.effectEditors.catagoties[catagory_][clickableSubCatagory_].numberEffects.innerHTML*1 +1
			}
			

		//console.log("addEffectEditor")
	}

	// addEffectEditor(effect_, catagory_,clickableSubCatagory_){

		
	// }



	// addActionDivs(){
	// 	//actionsIn=[];
	// 	for(let elicitType in this.contentNode.positions){
	// 		for(let i in this.contentNode.positions[elicitType]){
	// 			// this.contentNode.positions[elicitType][i]

	// 			// this.html.container=document.createElement("div");
	// 			// this.html.container.id="contnet_editor_" + this.contentNode.id;

	// 			// console.log(this.contentNode.positions[elicitType][i])
	// 		}
	// 	}
	// }
	hide(){
		//this.backEnd.mainEditorWindow.html.innerHTML="";
		currentStory.backEnd.secondaryEditorWindow.removeContentHTML(this);
	}
	display(){

		//console.log(currentStory.backEnd)
		currentStory.backEnd.secondaryEditorWindow.addContentHTML(this);
		//this.html
		// console.log("--------------X-----------------");

		// for(let elicitType in this.contentNode.positions){
		// 	console.log("* " + elicitType + " *");
		// 	for(let i in this.contentNode.positions[elicitType]){
		// 		console.log(this.contentNode.positions[elicitType][i])
		// 	}
		// }
	}
}