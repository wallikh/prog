// var readline = require("readline-sync");
var toolbox={
//      saisieSring: function(txt){
//         return readline.question(txt);
//     },

    /**
 * generer......
 * @param {*} nbLigne number
 * @param {*} nbCollone number 
 * @param {*} car any 
 * @returns 
 */
    initialiserTableaVide: function(nbLigne, nbCollone, car = ''){
    var tab = [];
    for(var i=0; i<nbLigne;i++){
        var ligne = [];
        for(var j=0; j<nbCollone;j++){
            ligne.push(car);
        }
        tab.push(ligne);
    }
    return tab;
}
}
// module.exports = toolbox;