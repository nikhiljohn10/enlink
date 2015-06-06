var svg2png = require("svg2png");
svg2png("logo.svg", "logo.png", function (err) {
    if(err) console.log(err);
});