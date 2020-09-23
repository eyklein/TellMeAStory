class TranslateImageEffect extends ImageEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);
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
}