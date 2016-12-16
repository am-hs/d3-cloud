var Canvas = require("canvas");

var cloud = require("../");

var words = ["Hello", "world", "normally", "you", "want", "more", "words", "than", "this"]
    .map(function(d) {
      return {text: d, size: 10 + Math.random() * 90};
    });

var shapeImage = document.createElement('img');
shapeImage.src = "./shape.png";

cloud().size([960, 500])
    .canvas(function() { return new Canvas(1, 1); })
    .words(words)
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .shapeImage(shapeImage)
    .on("end", end)
    .start();

function end(words) { console.log(JSON.stringify(words)); } 
