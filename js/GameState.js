
	(function () {
     GameState = function (){
		this.data = {};
   	 	this.data.EndlessInsane = 0;
   	 	this.data.EndlessControlled = 0;
   	 	this.data.puzzle = 0;
 	 	var opt = JSON.parse( localStorage.getItem( 'progress' ) );
 		if (opt == null){
 			localStorage.setItem( 'progress', JSON.stringify(this.data) );
 		}
		else
		{
			this.data.EndlessInsane = opt.EndlessInsane;
	   	 	this.data.EndlessControlled = opt.EndlessControlled;
	   	 	this.data.puzzle = opt.puzzle;
		}
		
		this.reset = function()
		{
				// localStorage.removeItem('progress');
	   	 	this.data.EndlessInsane = 0;
	   	 	this.data.EndlessControlled = 0;
	   	 	this.data.puzzle = 0;
			localStorage.setItem( 'progress', JSON.stringify(this.data) );
		}
		
	    this.save = function(gameType, data){
			if(gameType == 'madness'){
				if (data>this.data.EndlessInsane ){
					this.data.EndlessInsane = data;
				}	
			}
			else if(gameType == 'controlled'){
				if(data>this.data.EndlessControlled){
					this.data.EndlessControlled = data;
				}
			}
			else if(gameType == 'puzzle'){
				if(data>this.data.puzzle){
					this.data.puzzle = data;
				}
			}
			localStorage.setItem( 'progress', JSON.stringify(this.data) );
		};
		
	 };
	 })();
	 var progress = new GameState();