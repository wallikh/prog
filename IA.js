var IA = {
    choixColonne(){
        var tabColonne = this.getTableauCellulePossibles();
        var meilleurColonne = 0;
        var tabMeilleurColonne = [0];
        for(var i=1;i<tabColonne.length;i++){
            if(tabColonne[i]>tabColonne[meilleurColonne]){
                meilleurColonne = i;
                tabMeilleurColonne = new Array();
                tabMeilleurColonne.push(i);
            }else if(tabColonne[i]===tabColonne[meilleurColonne]){
                tabMeilleurColonne.push(i);
            }
        }
        console.log(tabColonne);
        console.log(tabMeilleurColonne);
        return tabMeilleurColonne[Math.floor(Math.random() * tabMeilleurColonne.length)];
    },
    getTableauCellulePossibles: function(){
        var tabColonne = [];
        for(var i=0;i<jeux.nbCollone;i++){
            tabColonne.push(this.getPoidsCellunes(jeux.retournerLigneCaseVideColonne(i),i));
        }
        return tabColonne;
    },
    getPoidsCellunes: function(ligne, colonne){
    
        // la colonne est pleine ==> le poids à renvoyer sera de 0
        if (ligne=== -1) return 0;
        // verifier si on peut gagner (IA) ==> renvoyer un poids de 100
        if(this.verifGagner(ligne, colonne, 2)) return 100;
        if(this.verifGagner(ligne, colonne, 1)) return 99;

        if(this.coupPerdant(ligne, colonne, 2)) return 0;

        var poids = 0;
        if(this.positionDefensive(ligne, colonne, 1)) poids += 20; // Defence
        if(this.positionDefensive(ligne, colonne, 1)) poids += 20; // Attaque
        poids += this.getPoidsBase(ligne, colonne);
        // verifier si pon peut perdre (le j1 peut gagner) ==> on renvoie un poids de 99
        // Autres cas :
        // 1 eviter de faire un coup perdant 
        // 2 defendre (2 jetons adverses à coter ==> le bloquer)
        // 3 attaquer (2 jetons de l'IA à côté)
        // 4 additionner les poids
        return poids;
    },
    getPoidsBase: function(ligne, colonne){
        var poidsLigne = 0;
        var poidsColonne = 0;
        switch (ligne){
            case 0 :poidsLigne = 1;
            break;
            case 1 :poidsLigne = 2;
            break;
            case 2 :poidsLigne = 3;
            break;
            case 3 :poidsLigne = 4;
            break;
            case 4 :poidsLigne = 3;
            break;
            case 5 :poidsLigne = 2;
            break;
        }
        switch (colonne){
            case 0 :poidsColonne = 1;
            break;
            case 1 :poidsColonne = 2;
            break;
            case 2 :poidsColonne = 3;
            break;
            case 3 :poidsColonne = 3;
            break;
            case 4 :poidsColonne = 3;
            break;
            case 5 :poidsColonne = 2;
            break;
            case 6 :poidsColonne = 1;
            break;
        }
        return poidsColonne*poidsLigne;

    },
    positionDefensive: function(ligne, colonne, joueur){
        var cpt = 1;
        if(jeux.puissance4[ligne][colonne+1]===joueur) {
            cpt++;
            if(jeux.puissance4[ligne][colonne+2]===joueur && jeux.puissance4[ligne][colonne+3]===0) cpt++;
        }
        
        if(jeux.puissance4[ligne][colonne-1]===joueur) {
            cpt++
            if(jeux.puissance4[ligne][colonne-2]===joueur && jeux.puissance4[ligne][colonne-3]===0) cpt++;
        };
        
        // if(jeux.puissance4[ligne][colonne+1]===joueur){
        //     cpt++;
        //     if(jeux.puissance4[ligne][colonne+2]===joueur){
        //         cpt++;
        //         if(jeux.puissance4[ligne][colonne+3]===0){
        //             cpt++;
        //     }
            
        //     }
        // }
        // if(jeux.puissance4[ligne][colonne-1]===joueur){
        //     cpt++;
        //     if(jeux.puissance4[ligne][colonne-2]===joueur){
        //         cpt++;
        //         if(jeux.puissance4[ligne][colonne-3]===0){
        //             cpt++;
        //         }
        //     }
        // }
        if (cpt > 2) return true;
    },
    verifGagner: function(ligne, colonne, joueur){
        if(this.verifGagnerEnLigne(ligne, colonne, joueur)) return true;
        if(this.verifGagnerEnColonne(ligne, colonne, joueur)) return true;
        if(this.verifGagnerEnDiagonale(ligne, colonne, joueur)) return true;

    },
    verifGagnerEnLigne: function(ligne, colonne, joueur){
        var cpt = 1;
        if(jeux.puissance4[ligne][colonne+1]===joueur){
            cpt++;
            if(jeux.puissance4[ligne][colonne+2]===joueur){
                cpt++;
                if(jeux.puissance4[ligne][colonne+3]===joueur){
                    cpt++;
                }
            }
        }
        if(jeux.puissance4[ligne][colonne-1]===joueur){
            cpt++;
            if(jeux.puissance4[ligne][colonne-2]===joueur){
                cpt++;
                if(jeux.puissance4[ligne][colonne-3]===joueur){
                    cpt++;
                }
            }
        }
        if (cpt > 3) return true;   
    },
    verifGagnerEnColonne: function(ligne, colonne, joueur){
        var cpt = 1;
        if(ligne<3){
            if(jeux.puissance4[ligne+1][colonne]===joueur){
                cpt++;
                if(jeux.puissance4[ligne+2][colonne]===joueur){
                    cpt++;
                    if(jeux.puissance4[ligne+3][colonne]===joueur){
                        cpt++;
                    }
                }
            }

        }
        if (cpt > 3) return true;  
 
    },
    verifGagnerEnDiagonale: function(ligne, colonne, joueur){
        var cpt = 1;
        if((ligne -1 >0 )&&(colonne+1<= jeux.nbCollone) &&(jeux.puissance4[ligne-1][colonne+1]===joueur)){
            cpt++;
            if((ligne -2 >0 )&&(colonne+2<= jeux.nbCollone) &&jeux.puissance4[ligne-2][colonne+2]===joueur){
                cpt++;
                if((ligne -3>0 )&&(colonne+3<= jeux.nbCollone) &&jeux.puissance4[ligne-3][colonne+3]===joueur){
                    cpt++;
                }
            }
        }
        if((ligne +1 <jeux.nbLigne )&&(colonne-1>= 0) && jeux.puissance4[ligne+1][colonne-1]===joueur){
            cpt++;
            if((ligne +2 <jeux.nbLigne )&&(colonne-2>= 0) && jeux.puissance4[ligne+2][colonne-2]===joueur){
                cpt++;
                if((ligne +3 <jeux.nbLigne )&&(colonne-3>= 0) && jeux.puissance4[ligne+3][colonne-3]===joueur){
                    cpt++;
                }
            }
        }
        if (cpt > 3) return true; 
        cpt = 1;
        if((ligne -1 >0 )&&(colonne-1>=0) &&(jeux.puissance4[ligne-1][colonne-1]===joueur)){
            cpt++;
            if((ligne -2 >0 )&&(colonne-2>=0) &&jeux.puissance4[ligne-2][colonne-2]===joueur){
                cpt++;
                if((ligne -3>0 )&&(colonne-3>=0) &&jeux.puissance4[ligne-3][colonne-3]===joueur){
                    cpt++;
                }
            }
        }
        if((ligne +1 <jeux.nbLigne )&&(colonne+1<= jeux.nbCollone) && jeux.puissance4[ligne+1][colonne+1]===joueur){
            cpt++;
            if((ligne +2 <jeux.nbLigne )&&(colonne+2<= jeux.nbCollone) && jeux.puissance4[ligne+2][colonne+2]===joueur){
                cpt++;
                if((ligne +3 <jeux.nbLigne )&&(colonne+3<= jeux.nbCollone) && jeux.puissance4[ligne+3][colonne+3]===joueur){
                    cpt++;
                }
            }
        }
        if (cpt > 3) return true; 
    },
    coupPerdant: function(ligne, colonne){

    }
}