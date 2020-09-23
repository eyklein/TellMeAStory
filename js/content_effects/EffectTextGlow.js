				//"pulse-durations":2,
                // "from":{
                //   "color":"#0000ff",
                //   "size":"30px"
                // },
                // "to":{
                //   "color":"#00ff00",
                //   "size":"10px"
                // }

class GlowTextEffect extends TextEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);
	}

	apply(){

		this.parentContent.html.fe.classList.add(this.vareables.className)

		

		//if I want more controle of pulses
		// this.parentContent.html.fe.style["-webkit-animation"] = "glow " + this.vareables.pulseDuration + "s ease-in-out infinite alternate";
		// this.parentContent.html.fe.style["-moz-animation"] = "glow " + this.vareables.pulseDuration + "s ease-in-out infinite alternate";
		// this.parentContent.html.fe.style["animation"] = "glow " + this.vareables.pulseDuration + "s ease-in-out infinite alternate";
	}
	remove(){

		// this.parentContent.html.fe.style["-webkit-animation"] = null
		// this.parentContent.html.fe.style["-moz-animation"] = null
		// this.parentContent.html.fe.style["animation"] = null

		this.parentContent.html.fe.classList.remove(this.vareables.className)

	}
}