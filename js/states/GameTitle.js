var MGApp = MGApp || {};

//setting game configuration and loading the assets for the loading screen
MGApp.GameTitleState = {
 
  preload: function() {
	this.background = this.add.tileSprite(0,0,this.game.world.width,this.game.world.height,'space');
  },
  create: function() {
	  console.log('GameTitle');
	  
	  this.background.autoScroll(20,0);
	  this.background.inputEnabled = true;
	  this.background.events.onInputDown.add(function(){
		  this.state.start('Game');
	  },this);
	  
	  this.createText();

  },
  createText: function() {
	 var style = { font: "Bold 28px Arial", fill: '#ffffff' };
	 
	 this.gameTitleText_1 = this.add.text(this.game.world.centerX,this.game.world.height * 0.2,'Thank you for droping by',style);
	 
	 this.gameTitleText_2 = this.add.text(this.game.world.centerX,this.game.world.height * 0.8,'TOUCH TO START',style);
	 
	 this.gameTitleText_1.anchor.setTo(0.5);
	 this.gameTitleText_2.anchor.setTo(0.5);
  }
};