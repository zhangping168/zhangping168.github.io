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
	this.load.image('exit', 'assets/images/signExit.png');
    this.load.image('popupPanel', 'assets/images/popup_panel.png');
	this.load.image('panel01', 'assets/images/panel01.png');
	this.load.image('cursorHandPrev', 'assets/images/arrowBrown_left.png');
	this.load.image('cursorHandNext', 'assets/images/arrowBrown_right.png');
	
	this.load.image('skillsBox', 'assets/images/skills_box.png');
	
	//load box images
	this.load.image('box01', 'assets/images/box/box01.png');
	this.load.image('box02', 'assets/images/box/box02.png');
	this.load.image('box03', 'assets/images/box/box03.png');
	this.load.image('box04', 'assets/images/box/box04.png');
	//load npc image
	//this.load.image('npc_01_about', 'assets/images/npc_01_about.png');
	this.load.spritesheet('npc_01_about', 'assets/images/player_02.png', 30, 45, 6, 1, 1); 
	
    this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1); 
    
    this.load.image('arrowLeftButton', 'assets/images/controls/arrowLeftButton.png');    
	this.load.image('arrowRightButton', 'assets/images/controls/arrowRightButton.png');    
    this.load.image('actionButton', 'assets/images/controls/actionButton.png');    
	
	//load dialog json file
	this.load.text('level_01_content','assets/data/level_01_content.json');
	this.load.text('level_02_content','assets/data/level_02_content.json');
	this.load.text('level_03_content','assets/data/level_03_content.json');
	
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