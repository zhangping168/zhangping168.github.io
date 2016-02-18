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
    
    this.load.image('goal', 'assets/images/goal.png');
    
    this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1); 
    
    this.load.image('arrowButton', 'assets/images/arrowButton.png');    
    this.load.image('actionButton', 'assets/images/actionButton.png');    
	
	//load tile map sprite sheet
	this.load.image('gameTiles','assets/images/platform_tiles01.png');
	this.load.tilemap('level_home','assets/levels/level_home.json',null,Phaser.Tilemap.TILED_JSON);
	this.load.tilemap('level_01_about','assets/levels/level_01_about.json',null,Phaser.Tilemap.TILED_JSON);
	this.load.tilemap('level_02_skills','assets/levels/level_02_skills.json',null,Phaser.Tilemap.TILED_JSON);
	this.load.tilemap('level_03_works','assets/levels/level_03_works.json',null,Phaser.Tilemap.TILED_JSON);
	this.load.tilemap('level_04_contact','assets/levels/level_04_contact.json',null,Phaser.Tilemap.TILED_JSON);

  },
  create: function() {
    this.state.start('Game');
  }
};