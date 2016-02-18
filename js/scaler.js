var MGApp = MGApp || {};
MGApp.getGameLandscapeDimensions = function(max_width, max_height){
  //get width and height of the screen, the result could be varies depends on device
    var w = window.innerWidth * window.devicePixelRatio;
    var h = window.innerHeight * window.devicePixelRatio;
    
    //get the actual width and height depends on the screen orientation
    
    var landW = Math.max(w,h);
    var landH = Math.min(w,h);
    
    //check if it needs to scale to fit in width
    if(landW > max_width){
      //scale down the width
        var ratioW = max_width / landW;
        landW *= ratioW;
        landH *= ratioW;
    };
    
    //check if it needs to scale to fit in height
    if(landH > max_height){
      //scale down the width
        var ratioH = max_height / landH;
        landW *= ratioH;
        landH *= ratioH;
    };
    
    return {
        w: landW,
        h: landH
    };
    
};