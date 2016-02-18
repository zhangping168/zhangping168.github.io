var MGApp = MGApp || {};

MGApp.GameState = {

  init: function(level) {    
    this.currentLevel = level || 'level_home';  
    //constants
    this.RUNNING_SPEED = 180;
    this.JUMPING_SPEED = 500;

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
	
	//overlap between player and goals object
	 if(this.currentLevel == 'level_home'){
		this.game.physics.arcade.overlap(this.player, this.goal_01,this.changeLevel,null,this); 
		this.game.physics.arcade.overlap(this.player, this.goal_02,this.changeLevel,null,this);       
		this.game.physics.arcade.overlap(this.player, this.goal_03,this.changeLevel,null,this); 
		this.game.physics.arcade.overlap(this.player, this.goal_04,this.changeLevel,null,this);       
	 };
	 
	 if(this.currentLevel == 'level_01_about' || this.currentLevel == 'level_02_skills' || this.currentLevel == 'level_03_works' || this.currentLevel == 'level_04_contact' ){
		 this.game.physics.arcade.overlap(this.player, this.goal_01,this.changeLevel,null,this); 
	 };
	 
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
	
	//if player falls off the cliff, restar the game
	if(this.player.bottom == this.game.world.height){
		this.gameOver();
	};
	
  },
  
  loadLevel: function(){  
	//Load tile map
	this.map = this.add.tilemap(this.currentLevel);
	
	//join the tile sprite sheet with map data
	this.map.addTilesetImage('platform_tiles01','gameTiles');
	
	//create tile map layers
	this.backgroundLayer = this.map.createLayer('backgroundLayer');
	this.collisionLayer = this.map.createLayer('collisionLayer');
	this.waterLayer = this.map.createLayer('waterLayer');
	this.decorationLayer = this.map.createLayer('decorationLayer');
	
	
	//set backgroundLayer to the back
	this.game.world.sendToBack(this.backgroundLayer);
	
	//set collision layer
	this.map.setCollisionBetween(1,160,true,this.collisionLayer);
	
	//resize the world to fit the layer
	this.backgroundLayer.resizeWorld();
	
      
    //create goal objects
      
      var goalsArray = this.findObjectsByType('goal',this.map,'objectsLayer');
     
	 if(this.currentLevel == 'level_home'){
		this.goal_01=this.createObjectGoal(goalsArray[0]);
		this.goal_02=this.createObjectGoal(goalsArray[1]);
		this.goal_03=this.createObjectGoal(goalsArray[2]);
		this.goal_04=this.createObjectGoal(goalsArray[3]); 
	 }
	 
	 if(this.currentLevel == 'level_01_about' || this.currentLevel == 'level_02_skills' || this.currentLevel == 'level_03_works' || this.currentLevel == 'level_04_contact' ){
		this.goal_01=this.createObjectGoal(goalsArray[0]);
		
	 }
      
      /*this.goal = this.add.sprite(goalsArray[0].x,goalsArray[0].y,'goal');
      this.game.physics.arcade.enable(this.goal);
      this.goal.body.allowGravity = false;
      this.goal.nextLevel = goalsArray[0].properties.nextLevel;*/
      
    //create player
    var playerArray = this.findObjectsByType('player',this.map,'objectsLayer');
      
    this.player = this.add.sprite(playerArray[0].x, playerArray[0].y, 'player', 3);
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walking', [0, 1, 2, 1], 6, true);
    this.game.physics.arcade.enable(this.player);
    this.player.customParams = {};
    this.player.body.collideWorldBounds = true;
    
    
    //follow player with the camera
    this.game.camera.follow(this.player);
  },
  createObjectGoal: function(goal){
      var goalName = goal.properties.key;
      this[goalName] = this.add.sprite(goal.x,goal.y,'goal');
      this.game.physics.arcade.enable(this[goalName]);
      this[goalName].body.allowGravity = false;
      this[goalName].nextLevel = goal.properties.nextLevel;
      return this[goalName];
  },    
  changeLevel: function(player,goal){
      this.game.state.start('Game',true,false,goal.nextLevel);
      
  },
  gameOver: function(){
	this.game.state.start('Game',true,false,this.currentLevel);  
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
  },
    
  findObjectsByType: function(targetType,tilemap,layer){
      var results = [];
      
      tilemap.objects[layer].forEach(function(element){
          if(element.properties.type == targetType){
              //in phaser Y position starts from top left, in tilemap Y position starts from bottom left
              element.y -= tilemap.tileHeight;
              results.push(element);
          }
      });
      
      return results;
  }
};
