var MGApp = MGApp || {};
MGApp.dim = MGApp.getGameDimensions(840,700);
MGApp.game = new Phaser.Game(MGApp.dim.width, MGApp.dim.height, Phaser.AUTO);

MGApp.game.state.add('Boot', MGApp.BootState); 
MGApp.game.state.add('Preload', MGApp.PreloadState); 
MGApp.game.state.add('GameTitle', MGApp.GameTitleState);
MGApp.game.state.add('Game', MGApp.GameState);


MGApp.game.state.start('Boot'); 
