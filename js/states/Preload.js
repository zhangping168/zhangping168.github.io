var MGApp = MGApp || {};


//loading the game assets
MGApp.PreloadState = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(3);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets    
	this.load.image('space', 'assets/images/space.png');
	this.load.image('goal', 'assets/images/door.png');
    /*
	this.load.image('platform', 'assets/images/platform.png');
    
    this.load.image('slime', 'assets/images/slime.png');
    this.load.spritesheet('fly', 'assets/images/fly_spritesheet.png', 35, 18, 2, 1, 2);    
	
	*/
	
	
	this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1); 
	
    this.load.image('arrowButton', 'assets/images/arrowButton.png');    
    this.load.image('actionButton', 'assets/images/actionButton.png');    
	
	//load titlemap assets
	this.load.image('gameTiles','assets/images/tiles_spritesheet.png');
	this.load.tilemap('mainLevel','assets/levels/level.json',null,Phaser.Tilemap.TILED_JSON);
	
	this.load.tilemap('level4','assets/levels/level4.json',null,Phaser.Tilemap.TILED_JSON);

  },
  create: function() {
    this.state.start('GameTitle');
  }
};