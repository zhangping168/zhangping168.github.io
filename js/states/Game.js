var MGApp = MGApp || {};

MGApp.GameState = {

  init: function(level) {    
	//var level = 'level_01_about'; //temp level,remove it later
	//var level = 'level_02_skills';
	//var level = 'level_03_works';
    this.currentLevel = level || 'level_home';  
    //constants
    this.RUNNING_SPEED = 180;
    this.JUMPING_SPEED = 500;
	
	this.SKillSBOX_FREQ = 2.5;
	this.SKillSBOX_SPEED = -80;

    //gravity
    this.game.physics.arcade.gravity.y = 1000;    
    
    //cursor keys to move the player
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },
  create: function() {
    //load current level
    this.loadLevel();
	
	//create npc text
    
    //show on-screen touch controls
    this.createOnscreenControls();    
  },
  
  createNpcText: function(levelData){
    var  content = levelData.content;
	var style = { font: "1.2em Arial", fill: "#f00", wordWrap: false,align: "left"};
	
   	 content.forEach(function(element){
	 
	 var npcText = this.add.text(0,0,element.text,style,this.skillsBoxes);
	 npcText.resolution = 1;
	 },this);
	 
	 
	 
	
  },  
  update: function() {    
    this.game.physics.arcade.collide(this.player, this.collisionLayer); 
	this.game.physics.arcade.collide(this.skillsBoxes, this.collisionLayer); 
	
	//overlap between player and goals object
	 if(this.currentLevel == 'level_home'){
		this.game.physics.arcade.overlap(this.player, this.goal_01,this.changeLevel,null,this); 
		this.game.physics.arcade.overlap(this.player, this.goal_02,this.changeLevel,null,this);       
		this.game.physics.arcade.overlap(this.player, this.goal_03,this.changeLevel,null,this); 
		this.game.physics.arcade.overlap(this.player, this.goal_04,this.changeLevel,null,this);       
	 };
	 
	 //if(this.currentLevel == 'level_01_about' || this.currentLevel == 'level_02_skills' || this.currentLevel == 'level_03_works' || this.currentLevel == 'level_04_contact' ){
		if(this.currentLevel == 'level_01_about'){	 
		 this.game.physics.arcade.overlap(this.player, this.goal_01,this.changeLevel,null,this); 
		 this.goal_02.animations.play('greeting');
		};
		//end level_01_about
		
		if(this.currentLevel == 'level_02_skills'){	 
			 this.game.physics.arcade.overlap(this.player, this.goal_01,this.changeLevel,null,this); 
			 this.game.physics.arcade.overlap(this.player, this.skillsBoxes,this.getSkills,null,this); 
			 
			 this.goal_02.animations.play('greeting');	
			 
			 this.skillsBoxes.forEach(function(element){
			 
				if(element.x < 10){
				
					element.kill();
				}
			},this);
			
		 };
		 //end level_02_skills
		 
	if(this.currentLevel == 'level_03_works'){
		this.game.physics.arcade.overlap(this.player, this.goal_01,this.changeLevel,null,this); 
		this.game.physics.arcade.overlap(this.player, this.goal_02,this.showWorks,null,this);       
		this.game.physics.arcade.overlap(this.player, this.goal_03,this.showWorks,null,this); 
		this.game.physics.arcade.overlap(this.player, this.goal_04,this.showWorks,null,this);   
		this.game.physics.arcade.overlap(this.player, this.goal_05,this.showWorks,null,this);  
		this.game.physics.arcade.overlap(this.player, this.goal_06,this.showWorks,null,this);  		
		
	 };
	 //end level_03_works
	 
		 
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
  
  showWorks: function(player, works){
	var box = works.key;
	if(box =='box01'){
		this.dialogText.text = this.level_03_content.content[0].text;
	}else if(box =='box02'){
		this.dialogText.text = this.level_03_content.content[1].text;
	}
	else if(box =='box03'){
		this.dialogText.text = this.level_03_content.content[2].text;
	}
	else if(box =='box04'){
		this.dialogText.text = this.level_03_content.content[3].text;
	}
	else if(box =='box05'){
		this.dialogText.text = this.level_03_content.content[4].text;
	}
	else{}
	this.dialogText.addColor('#000000',0);	 
  },
  
  getSkills: function(player,skills){
	player.position.x -= 10;
	
  },
  loadLevel: function(){  
	
	
	//parse json data for each level
	
	this.clouds = this.add.tileSprite(0,0,this.game.world.width,this.game.world.height,'cloud');
	//this.clouds.tileScale;
	this.clouds.autoScroll(this.RUNNING_SPEED * 0.1,0);
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
	  
      var npcsArray = this.findObjectsByType('npc',this.map,'objectsLayer');
	 if(this.currentLevel == 'level_home'){
		this.goal_01=this.createObjectGoal(goalsArray[0]);
		this.goal_02=this.createObjectGoal(goalsArray[1]);
		this.goal_03=this.createObjectGoal(goalsArray[2]);
		this.goal_04=this.createObjectGoal(goalsArray[3]); 
		this.goal_01.scale.setTo(0.5);
		this.goal_02.scale.setTo(0.5);
		this.goal_03.scale.setTo(0.5);
		this.goal_04.scale.setTo(0.5);
	 }
	 
	 /*if(this.currentLevel == 'level_01_about' || this.currentLevel == 'level_02_skills' || this.currentLevel == 'level_03_works' || this.currentLevel == 'level_04_contact' ){*/
	if(this.currentLevel == 'level_01_about' ){	 
		this.goal_01=this.createObjectGoal(goalsArray[0]);
		this.goal_02=this.createObjectGoal(npcsArray[0]); //player_02.png character
		this.goal_02.animations.add('greeting',[0,1,2,2,1,0],6,true);
		this.level_01_content = JSON.parse(this.game.cache.getText('level_01_content'));
	 }
	 
	 if(this.currentLevel == 'level_02_skills' ){	 
		this.goal_01=this.createObjectGoal(goalsArray[0]);
		this.goal_02=this.createObjectGoal(npcsArray[0]); //player_02.png character
		this.goal_02.scale.setTo(1,1);
		this.goal_02.animations.add('greeting',[3,4,5,4],6,true);
		this.npc = this.goal_02;
		
		
		 var style = { font: "65px Arial", fill: "#000", align: "center" };

		 var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "- Skillset-\n And \nWorking Knowledge", style);

         text.anchor.set(0.5);
		 text.alpha=0.4;
		 text.resolution = 1;
		//create skills popup 
		this.skillsBoxes = this.add.group();
		this.skillsBoxes.enableBody = true;
		
		this.createSkillsBox();
		
		this.skillsBoxCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.SKillSBOX_FREQ,this.createSkillsBox,this);

		this.level_02_content = JSON.parse(this.game.cache.getText('level_02_content'));
		this.createNpcText(this.level_02_content);	
		
	 }
	 
	 if(this.currentLevel == 'level_03_works' ){

		this.goal_01=this.createObjectGoal(goalsArray[0]);
		this.goal_02=this.createObjectGoal(goalsArray[1]);
		this.goal_03=this.createObjectGoal(goalsArray[2]);
		this.goal_04=this.createObjectGoal(goalsArray[3]); 
		this.goal_05=this.createObjectGoal(goalsArray[4]);
		this.goal_06=this.createObjectGoal(goalsArray[5]);
		this.level_03_content = JSON.parse(this.game.cache.getText('level_03_content'));
		this.loadDialog(this.currentLevel);
		
	 }
	 
     if(this.currentLevel == 'level_01_about'){this.loadDialog(this.currentLevel);}
      /*this.goal = this.add.sprite(goalsArray[0].x,goalsArray[0].y,'goal');
      this.game.physics.arcade.enable(this.goal);
      this.goal.body.allowGravity = false;
      this.goal.nextLevel = goalsArray[0].properties.nextLevel;*/
      
    //create player
    var playerArray = this.findObjectsByType('player',this.map,'objectsLayer');
      
    this.player = this.add.sprite(playerArray[0].x, playerArray[0].y, 'player', 3);
    this.player.anchor.setTo(0.5);
    if(this.currentLevel == 'level_01_about'){this.loadDialog(this.currentLevel);}
	
	this.player.animations.add('walking', [0, 1, 2, 1], 6, true);
    this.game.physics.arcade.enable(this.player);
    this.player.customParams = {};
    this.player.body.collideWorldBounds = true;
    
    
    //follow player with the camera
    this.game.camera.follow(this.player);
	
	//load popup text panel
	
	
	
  },
  
  createSkillsBox: function(){
	  //get the first dead sprite of the group
	  var skillsBox = this.skillsBoxes.getFirstExists(false);
	  if(!skillsBox){ //if not exist/game just start, then create one
		  skillsBox = this.skillsBoxes.create(this.npc.position.x,this.npc.position.y,'skillsBox');
	  }
	  
	  skillsBox.body.collideWorldBounds = true;
	  skillsBox.body.bounce.set(1,0);
	  //if exist, reset the position of the sprite
	  skillsBox.reset(this.npc.position.x,this.npc.position.y);
	  skillsBox.body.velocity.x = this.SKillSBOX_SPEED;
  },
  
  loadDialog: function(level){
	  var level_content;
	  
	 this.panel01 = this.add.sprite(this.game.world.centerX,this.game.world.centerY-40,'panel01');
	 this.panel01.anchor.setTo(0.5);
	 
	  if(level =='level_01_about'){
		level_content = this.level_01_content;
		this.cursorHandNext = this.add.button(this.panel01.right-50,this.panel01.bottom-30,'cursorHandNext');
		 this.cursorHandNext.anchor.setTo(0.5);
		 
		 this.cursorHandPrev = this.add.button(this.panel01.left+50,this.panel01.bottom-30,'cursorHandPrev');
		 this.cursorHandPrev.anchor.setTo(0.5);
		 
		 var count = 0;
	 var len = level_content.content.length;
	  
	 this.cursorHandNext.events.onInputDown.add(function(){
	  
	  count++;
	  
	  if(count < len){
		  
		  this.dialogText.text = level_content.content[count].text;
	  }else{
		count = 2;  
		this.cursorHandNext.visible = false;
		this.cursorHandPrev.visible = true;
	  }
	  
    }, this);
	
	
	
	this.cursorHandPrev.events.onInputDown.add(function(){
	 
	  count--;
	  
	  if(count >= 0){
		 
		  this.dialogText.text = this.level_01_content.content[count].text;
	  }else{
		count = 0;  
		this.cursorHandPrev.visible = false;
		this.cursorHandNext.visible = true;
	  }
	  
    }, this);
	
	
		 
	  }else if(level =='level_03_works'){
		level_content = this.level_03_content;
	  }else{
	  };
  
	if(level =='level_03_works')
	{
		var style = { font: "2em Arial", fill: "#000", wordWrap: true, wordWrapWidth: 340, align: "center"};
	}else{
	 var style = { font: "1.5em Arial", fill: "#000", wordWrap: true, wordWrapWidth: 340, align: "center"};
};
   	 var x = Math.round(this.panel01.left + 40);
	 var y = Math.round(this.panel01.top + 40);
	 this.dialogText = this.add.text(x,y,level_content.content[0].text,style);
	 
	 if(level =='level_03_works'){
		this.dialogText.text=level_content.intro;
		
		this.dialogText.addColor('#ff0000',0);
	 }
    

  },
  createObjectGoal: function(goal){
      var goalName = goal.properties.key;
	  var goalType = goal.properties.type;
	  var goalSrc = goal.properties.src;
	  if(goalName == 'goal_home'){
		  this[goalName] = this.add.sprite(goal.x,goal.y,'exit');
		  this[goalName].anchor.setTo(0.5);
	  }else if (goalName == 'npc_01_about' && goalType == 'npc'){
		   //01_about state
		  this[goalName] = this.add.sprite(goal.x,goal.y,'npc_01_about');
		  this[goalName].scale.setTo(1);
	  }else if (goalName == 'npc_02_skills' && goalType == 'npc'){
		   //01_about state
		  this[goalName] = this.add.sprite(goal.x,goal.y,'npc_01_about');
		  this[goalName].anchor.setTo(0.5);

	  }else if (goalSrc){
		   //01_about state
		  this[goalName] = this.add.sprite(goal.x,goal.y,goalSrc);
		  this[goalName].anchor.setTo(0.5);
		  this[goalName].scale.setTo(0.5);

	  }else{
		  this[goalName] = this.add.sprite(goal.x,goal.y,src);
		  this[goalName].anchor.setTo(0.5);
		  
	  };
	  
      this.game.physics.arcade.enable(this[goalName]);
      this[goalName].body.allowGravity = false;
      this[goalName].nextLevel = goal.properties.nextLevel;
      return this[goalName];
  },    
  changeLevel: function(player,goal){
      this.game.state.start('Game',true,false,goal.nextLevel);
      
  },
  talkToNpc: function(){
	
  },
  gameOver: function(){
	this.game.state.start('Game',true,false,this.currentLevel);  
  },
  createOnscreenControls: function(){
    this.leftArrow = this.add.button(20, this.game.height - 100, 'arrowLeftButton');
    this.rightArrow = this.add.button(150, this.game.height - 100, 'arrowRightButton');
    this.actionButton = this.add.button(this.game.width - 100, this.game.height - 100, 'actionButton');
	
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
