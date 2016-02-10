var MGApp = MGApp || {};

MGApp.GameState = {

  init: function(level) {    
	this.currentLevel = level || 'mainLevel';
    //constants
    this.RUNNING_SPEED = 180;
    this.JUMPING_SPEED = 800;

    //gravity
    this.game.physics.arcade.gravity.y = 1000;    
    
    //cursor keys to move the player
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },
  create: function() {
    //load current level
    this.loadLevel();
    
    //show on-screen touch controls
    this.createOnscreenControls();    
  },   
  update: function() {    
    this.game.physics.arcade.collide(this.player, this.collisionLayer); 
	
	this.game.physics.arcade.overlap(this.player, this.goal_1,this.changeLevel,null,this); 	

	

    this.player.body.velocity.x = 0;

    if(this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
      this.player.scale.setTo(1, 1);
      this.player.play('walking');
    }
    else if(this.cursors.right.isDown || this.player.customParams.isMovingRight) {
      this.player.body.velocity.x = this.RUNNING_SPEED;
      this.player.scale.setTo(-1, 1);
      this.player.play('walking');
    }
    else {
      this.player.animations.stop();
      this.player.frame = 3;
    }

    if((this.cursors.up.isDown || this.player.customParams.mustJump) && (this.player.body.blocked.down || this.player.body.touching.down)) {
      this.player.body.velocity.y = -this.JUMPING_SPEED;
      this.player.customParams.mustJump = false;
    }
  },
  
  changeLevel:function(player,goal){
	  this.currentLevel = goal.nextLevel;
	  console.log(this.currentLevel);
	  this.game.state.start('Game',true,false,this.currentLevel);
  },
  loadLevel: function(){  
	//create the tiledmap
	this.map = this.add.tilemap(this.currentLevel);
	//join the tileimageset with json data
	this.map.addTilesetImage('tiles_spritesheet','gameTiles');
	
	//load data from tilemap
	var playerArr = this.findObjectsByType('player',this.map,'objectsLayer');
	var goalArr = this.findObjectsByType('goal',this.map,'objectsLayer');
	
    //create player
    this.player = this.add.sprite(playerArr[0].x, playerArr[0].y , 'player', 3);
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walking', [0, 1, 2, 1], 6, true);
    this.game.physics.arcade.enable(this.player);
    this.player.customParams = {};
    this.player.body.collideWorldBounds = true;
    
	
	
	
	//create layers
	this.backgroundLayer = this.map.createLayer('backgroundLayer');
	this.collisionLayer = this.map.createLayer('collisionLayer');
	//resize the world to fit the player
	this.collisionLayer.resizeWorld();
	
	//send backgroundLayer to the back
	this.game.world.sendToBack(this.backgroundLayer);

	
	//set the collision layer
	this.map.setCollisionBetween(1,160,true,'collisionLayer');
	
	//create goals
	this.goal_1 = this.add.sprite(goalArr[0].x,goalArr[0].y,'goal');
	this.game.physics.arcade.enable(this.goal_1);
	this.goal_1.body.allowGravity = false;
	this.goal_1.nextLevel = goalArr[0].properties.nextLevel;
    
    //follow player with the camera
    this.game.camera.follow(this.player);
  },
  
  findObjectsByType: function(targetType,tilemap,layer){
	  var results = [];
	  tilemap.objects[layer].forEach(function(element){
		  if(element.type == targetType){
			  //tilemap y position from top left, in phaser from bottom left
			  element.y -= tilemap.tileHeight;
			  results.push(element);
		  }
	  },this);
	  
	  return results;
  },
  
  createOnscreenControls: function(){
    this.leftArrow = this.add.button(20, this.game.height - 60, 'arrowButton');
    this.rightArrow = this.add.button(110, this.game.height - 60, 'arrowButton');
    this.actionButton = this.add.button(this.game.width - 100, this.game.height - 60, 'actionButton');

    this.leftArrow.alpha = 0.5;
    this.rightArrow.alpha = 0.5;
    this.actionButton.alpha = 0.5;

    this.leftArrow.fixedToCamera = true;
    this.rightArrow.fixedToCamera = true;
    this.actionButton.fixedToCamera = true;

    this.actionButton.events.onInputDown.add(function(){
      this.player.customParams.mustJump = true;
    }, this);

    this.actionButton.events.onInputUp.add(function(){
      this.player.customParams.mustJump = false;
    }, this);

    //left
    this.leftArrow.events.onInputDown.add(function(){
      this.player.customParams.isMovingLeft = true;
    }, this);

    this.leftArrow.events.onInputUp.add(function(){
      this.player.customParams.isMovingLeft = false;
    }, this);

    this.leftArrow.events.onInputOver.add(function(){
      this.player.customParams.isMovingLeft = true;
    }, this);

    this.leftArrow.events.onInputOut.add(function(){
      this.player.customParams.isMovingLeft = false;
    }, this);

    //right
    this.rightArrow.events.onInputDown.add(function(){
      this.player.customParams.isMovingRight = true;
    }, this);

    this.rightArrow.events.onInputUp.add(function(){
      this.player.customParams.isMovingRight = false;
    }, this);

    this.rightArrow.events.onInputOver.add(function(){
      this.player.customParams.isMovingRight = true;
    }, this);

    this.rightArrow.events.onInputOut.add(function(){
      this.player.customParams.isMovingRight = false;
    }, this);
  }  
};
