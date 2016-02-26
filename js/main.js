var MGApp = MGApp || {};

MGApp.dim = MGApp.getGameLandscapeDimensions(864,640);
MGApp.game = new Phaser.Game(MGApp.dim.w, MGApp.dim.h, Phaser.AUTO);


MGApp.game.state.add('Boot', MGApp.BootState); 
MGApp.game.state.add('Preload', MGApp.PreloadState); 
MGApp.game.state.add('Game', MGApp.GameState);

MGApp.game.state.start('Boot'); 
