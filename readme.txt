******************************************
1.game title screen,web font,style and size
2. touch to start
3.aim to mobile
4.platform style
5.retro style?
6.rpg story telling?
7.font size to read on mobile screen
8.music?
9. inline style, rewrite with SASS later

******************************************

Plan for each level,structure and major functions fist, adding decoration details at last.
Level_home
 1.intro screen before game start
 2.moving background and transparent pull down,reference to M6 tutorials
 3.custom font
level_about
 1.story telling scene
 2. background inside a brick room
 3.few light? like mario coin room?
 4.exit at bottom right corner
 exit {key: goal_home,nextLevel: level_home,type:goal}
 
level_skills
 1. treasure chests line up with label on it
 2. story telling scene when overlap each chest
 3.few light? like mario coin room?
 4.exit at bottom right corner
level_works
level_contact


assets link
opengameart.org
openclipart.org
kenney.nl

http://www.squidfingers.com/patterns/
http://www.spriters-resource.com/
http://www.textures-resource.com/
http://www.models-resource.com/
http://earthboundcentral.com/
http://www.citycreator.com/
http://www.lovepixel.idv.tw/

sample site
http://danielsternlicht.com/
http://browserquest.mozilla.org/

file structures

Root:
	index.html
/js
	phaser.js
	main.js
	/states/*.js
		TitleState.js
		BootState.js
		PreloadState.js
		GameState.js
		GameoverState.js
		
		
	/prefab/*.js
		player.js

/css
	style.css

/assets
	/images
	/level