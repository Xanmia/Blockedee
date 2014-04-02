var helpScreens = [
{
	name:"Rotating Forward",
	details:"Your box is currently rotating Forward.  You want to counter by rotating backward.  Tap the down arrow or 's' key on your keyboard until the rotation slows down.",
	image:"",
	level:0,
	refreshtime:7
},
{
	name:"Landing It",
	details:"Hopefully your box is now settled and has very little rotation.  Make sure your box is level so you can land it perfectly!",
	image:"",
	level:0,
	refreshtime:5
},
{
	name:"Rotating Backward",
	details:"Your box is currently rotating Backward.   You want to counter by rotating forward.  Tap the up arrow or 'w' key on your keyboard until the rotation slows down.",
	image:"",
	level:1,
	refreshtime:7
},
{
	name:"Rotating to the Right",
	details:"Your box is currently rotating to the Right.  Again, you want to counter that rotation.  Tap the left arrow or 'a' key on your keyboard until the rotation slows down.",
	image:"",
	level:2,
	refreshtime:7
},
{
	name:"Rotating to the Left",
	details:"Your box is currently rotating to the Left.  You want to counter that by rotating to the Right.  Tap the right arrow or 'd' key on your keyboard until the rotation slows down.",
	image:"",
	level:3,
	refreshtime:7
},

{
	name:"Helpful Tip",
	details:"Even after your box has landed, you can continue you tap the directional arrows to keep your box on it's target.",
	image:"",
	level:3,
	refreshtime:10
}
];

function help(){
	var currentslide;
	var helpDetails = [];
	var currentDetails = [];
	var lastupdate = 0;
	var container = document.createElement('div');
	container.setAttribute('class', 'bottomLeft help help-text');
	container.style.display = "none";
	document.body.appendChild( container );
	
	this.skip = false;
	this.show = function(lvl,time){
		currentslide = 0;
	    lastupdate = time;
	    helpDetails = helpScreens.filter(function(value){ return value.level == lvl ;});//helpScreens[lvl];
		container.style.display = "none";
		container.innerHTML = "";//helpDetails.name + "<br/>" + helpDetails.details;
	};
	
	this.hide = function(){
		container.style.display = "none";
	}
	
	this.update = function(gameTime){
		if (helpDetails.length > currentslide){
		    currentDetails = helpDetails[currentslide];
	    	if((gameTime-lastupdate) > currentDetails.refreshtime)
	    	{	
				container.style.display = "block";
				lastupdate = gameTime;
				container.innerHTML = currentDetails.name + "<br/><div class='helpFont'>" + currentDetails.details + "</div>";
				currentslide +=1;
				PauseGame(true, true);
			}
		}

	};
	
};


