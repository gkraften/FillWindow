FillWindow
==========

FillWindow är ett jQuery plugin som får ett element att fylla webbläsarfönstret. Välj ett förhållande som elementet ska behålla. Optimerat för HTML5 Canvas.

###Exempel
HTML:
```html
<!DOCTYPE html>

<html>
<head>
	<meta charset="UTF-8">
	<title>FillWindow Exempel</title>
	<script src="jquery.min.js"></script>
	<script src="fillWindow.min.js"></script>
</head>

<body>
	<canvas id="canv" width="800" height="400">Din webbläsare stödjer inte Canvas</canvas>
</body>
</html>
```

JavaScript:
```javascript
//Starta fullskärmsläge och behåll förhållandet 2:1
$("#canv").fullscreen(2/1);

//Starta fullskärmsläge och fyll hela fönstret
$("#canv").fullscreen(-1);

//Avsluta fullskärmsläge
$("#canv").exitFullscreen();

//Växla fullskärmsläge och behåll förhållandet 2:1
$("#canv").toggleFullscreen(2/1);

//Växla fullskärmsläge och fyll hela fönstret
$("#canv").toggleFullscreen(-1);
```

För att ta reda på elementets storlek bör du använda ```$("#canv").attr("width")``` och ```$("#canv").attr("height")```
