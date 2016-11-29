'use strict'

var IJS=require('image-js');
var SYMBOLS=require('./symbolClasses').MRZ;


function generateSymbolImage(options = {}) {
    let {
        size=24,
        numberPerLine=20,
        rotation=2,
        font='Helvetica',
        backgroundColor=255,
        symbols=SYMBOLS.symbols
    } = options;

    

    var grid=Math.floor(size*1.2);
    font=size+'px '+font;

    // default RGBA 8bits
    var image = new IJS(((numberPerLine+2)*(grid)),(symbols.length+2)*(grid));

    // the image is now white
    var data=image.data;
    for (var i=0; i<data.length; i++) {
        if (i%4===3) continue;
        data[i]=backgroundColor;
    }

    var rotate=[];
    var options={
        font,
        color: 'black',
        rotate: rotate
    }

    var labels=[];
    var positions=[];


    for (var y=0; y<symbols.length; y++) {
        var text=String.fromCharCode(symbols[y]);
        for (var x=0; x<numberPerLine; x++) {
            var position=[x*grid+grid, y*grid+grid];
            positions.push(position);
            labels.push(text);
            rotate.push(
                2*rotation*x/(numberPerLine-1)-rotation
            )
        }
    }
    image.paintLabels(labels, positions, options);
    return image;
}



module.exports=generateSymbolImage;