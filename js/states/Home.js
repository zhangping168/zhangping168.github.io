var MGApp = MGApp || {};

MGApp.HomeState = {

  init: function(level) {    
	 this.RUNNING_SPEED = 180;
	 this.currentLevel="home";
  },
  create: function() {
    //load current level
    this.loadLevel();
	
  },
  
 
  update: function() {    

	
  },
  
  loadLevel: function(){  

	
	this.clouds = this.add.tileSprite(0,0,this.game.world.width,this.game.world.height,'cloud');

	this.clouds.autoScroll(this.RUNNING_SPEED * 0.1,0);
	
	
	
	var style = { font: "30px Arial", fill: "#000", align: "center" };

	var text = this.add.text(this.game.width/2, this.game.height/2, "Thank you for checking my site,\n Please click or tap to start.", style);
	text.anchor.setTo(0.5);
	text.addColor('#ff0000',31);

	this.add.button(text.left+115,text.bottom+12,'ready');
	
	this.game.input.onDown.addOnce(function(){
		this.changeLevel();
	},this);
  },

  changeLevel: function(player,goal){
      this.game.state.start('Game');
      
  }
};
