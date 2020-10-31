var count = Math.ceil((Math.random()*101-1)-100);
	if (count < 30) {
		count = 30;
	}
var min_count = 4;

function generate_candles() {
	var total_count = min_count + count;
	for (var i = 1; i <= (min_count + count); i++) {
	     var random_animation = Math.ceil((Math.random()*101-1)/4+3);
	     var random_flying = Math.ceil((Math.random()*101-1)/4+10);
	       		var random_margin_horizontal = Math.ceil((Math.random()*101-1)/1-21);
	       		var random_margin_vertical = Math.ceil((Math.random()*101-1)/2-51);
	       		var candlesblock = document.getElementById("candlesblock");
	         	let candle = document.createElement('div');
		    	candle.id = "id"+i;
				candle.className = "candle";
				candlesblock.append(candle);
				document.getElementById(candle.id).style.animation="show " + random_animation + "s ease 0s 1 normal forwards running" + ", flying " + random_flying + "s infinite";
				document.getElementById(candle.id).style.margin= random_margin_vertical+"px " + random_margin_horizontal+"px";
	}
} 



function flying_animation() {
	document.getElementById(candle.id).style.border= "solid 2px #fff"
		
}

generate_candles()
