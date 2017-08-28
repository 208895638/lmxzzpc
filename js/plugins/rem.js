window.onload = function(){
	!function(designWidth) {
    var designWidth = parseInt(designWidth);
    var root = document.documentElement;
    var scale = (root.clientWidth / designWidth) * 100;
    root.style.fontSize = scale + "px";
}(640);
}