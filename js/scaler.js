var MGApp = MGApp || {};

MGApp.getGameDimensions = function(max_w, max_h){
	//get both width and height of the screen,they might exchange depends on screen oriention
	
	var w = window.innerWidth * window.devicePixelRatio;
	var h = window.innerHeight * window.devicePixelRatio;

	//get the actuall width and height
	var landscapeW = Math.max(w,h);
	var landscapeH = Math.min(w,h);
	
	//do we need to scale to fit in width
	
	if(landscapeW > max_w){
		//if the actual screen is larger than the game screen, scale it down
		var ratioW = max_w / landscapeW;
		landscapeW *= ratioW;
		landscapeH *= ratioW;
	}
	
	//do we need to scale to fit in height
	
	if(landscapeH > max_h){
		//if the actual screen is larger than the game screen, scale it down
		var ratioH = max_h / landscapeH;
		landscapeW *= ratioH;
		landscapeH *= ratioH;
	}
	
	return {
		width:landscapeW,
		height:landscapeH
	};
	
	
}