// var toolbox = require("./toolbox.js");
var jeux = {
    puissance4 : [],
    nbCollone : 7,
    nbLigne : 6,
    joueur1car : "x",
    joueur2car : "o",
    initialisation: function(){
        this.puissance4 = toolbox.initialiserTableaVide(this.nbLigne, this.nbCollone, 0);
    },

    /**
     * 
     * @param {*} tab array<String> 
     */
    afficherPuissance4: function(){
        const jeu = document.querySelector("#jeu");
        jeu.innerHTML = "";

        var content ="<table>";
            for(var i=0;i<this.nbLigne;i++){
                content += "<tr>";
                for(var j=0;j<this.nbCollone;j++){
                    content +="<td class='border text-center' style='width:100px;height:100px'>";
                    if(this.puissance4[i][j]===0){
                        content += "";
                    }if(this.puissance4[i][j]===1){
                        content += "<img src='./images/child.png' class='bg-danger rounded-circle' style='width:90px;height:90px'></img>";
                    }if(this.puissance4[i][j]===2){
                        content += "<img src='./images/childesse.png' class='bg-info rounded-circle' style='width:90px;height:90px'></img>";
                    }
                    content +="</td>";
                
                }
                content += "</tr>";
            }
        content += "<tr>";
            content += '<td><button type="button" class="btn btn-secondary" onClick="jouer(0)">Colonne 1</button></td>';
            content += '<td><button type="button" class="btn btn-secondary" onClick="jouer(1)">Colonne 2</button></td>';
            content += '<td><button type="button" class="btn btn-secondary" onClick="jouer(2)">Colonne 3</button></td>';
            content += '<td><button type="button" class="btn btn-secondary" onClick="jouer(3)">Colonne 4</button></td>';
            content += '<td><button type="button" class="btn btn-secondary" onClick="jouer(4)">Colonne 5</button></td>';
            content += '<td><button type="button" class="btn btn-secondary" onClick="jouer(5)">Colonne 6</button></td>';
            content += '<td><button type="button" class="btn btn-secondary" onClick="jouer(6)">Colonne 7</button></td>';
        content += "</tr>";    
        content += "</table>";  
        jeu.innerHTML = content;    
  
    },
    jeuxCase: function(joueur, ligne, colonne){
        this.puissance4[ligne][colonne] = joueur
    },
    retournerLigneCaseVideColonne: function(colonne){
        for(var i=this.nbLigne-1;i>=0;i--){
            if(this.verifCcaseVide(i,colonne)){
                return i;
            }
        }
        return -1;
    },
    verifCcaseVide: function(ligne, colonne){
        return this.puissance4[ligne][colonne] === 0;
    },
    verificationFinJeu: function(joueur){
        if(this.verificationFinJeuationFinLigneJeu(joueur) || this.verificationFinJeuationFinColonneJeu(joueur) || this.verificationFinJeuationFinDiagonaleJeu(joueur)){
            return true;
        }
        return false;
    },
    
    verificationFinJeuationFinLigneJeu: function(joueur){
        for(var i=this.nbLigne-1;i>=0;i--){
            for(var j=0;j<this.nbCollone-3;j++){
                if( this.puissance4[i][j]===joueur &&
                    this.puissance4[i][j+1]===joueur &&
                    this.puissance4[i][j+2]===joueur &&
                    this.puissance4[i][j+3]===joueur){
                    return true;
                }
            }
        }
        return false;
    },
    verificationFinJeuationFinColonneJeu: function(joueur){
        for(var i=0;i<this.nbCollone;i++){
            for(var j=this.nbLigne-4;j>=0;j--){
                if( this.puissance4[j][i]===joueur &&
                    this.puissance4[j+1][i]===joueur &&
                    this.puissance4[j+2][i]===joueur &&
                    this.puissance4[j+3][i]===joueur){
                    return true;
                }
            }
        }    
        return false;
    },
    
    verificationFinJeuationFinDiagonaleJeu: function(joueur){
        for(var i=this.nbLigne-1;i>=3;i--){
            for(var j=0;j<this.nbCollone;j++){
                if( this.puissance4[i][j]===joueur &&
                    this.puissance4[i-1][j+1]===joueur &&
                    this.puissance4[i-2][j+2]===joueur &&
                   this.puissance4[i-3][j+3]===joueur){
                    return true;
                }
                if( this.puissance4[i][j]===joueur &&
                    this.puissance4[i-1][j-1]===joueur &&
                    this.puissance4[i-2][j-2]===joueur &&
                    this.puissance4[i-3][j-3]===joueur){
                    return true;
                }
            }
        }
        return false;
    },
    saisircolone: function(){
        return parseInt(toolbox.saisieSring("Quelle colonne ? : "));
    },
    
}
// module.exports = jeux;