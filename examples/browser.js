window.addEventListener("load", function() {

  var nrWords = 300;
  var words = ["Hello", "world", "normally", "you", "want", "more", "words", "than", "this"];
  var allWords = [];
  var fontSize = 30;
  var i = 0;
  while (allWords.length < nrWords) {
      words.forEach(element => {
          allWords.push({ text: words[i % words.length], size: fontSize });
          i++;
          if (allWords.length == nrWords)
              return false;
      });
      fontSize = fontSize * 0.9;
  }

  var fill = d3.schemeCategory20;
  var shapeImage = document.getElementById('shapeImage');
  var canvas = function() {
    var _ = document.createElement('canvas');
    document.body.appendChild(_);
    return _;
  }

  var layout = d3.layout.cloud()
      .canvas(canvas)
      .size([500, 500])
      .words(allWords)
      .padding(1)
      .rotate(function () { return Math.random() * 180 - 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .shapeImage(shapeImage)
      .spiral('rectangular')
      .on("end", draw);

  layout.start();

  function draw(words) {
    d3.select("body").append("svg")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill[i % fill.length] })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }

})