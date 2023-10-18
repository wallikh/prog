const tour = document.querySelector("#tour");
const alert = document.querySelector(".alert");
const messageJ1 = document.querySelector("#j1");
const messageJ2 = document.querySelector("#j2");
var joueurEnCours = 1;
var finJeu = false;
var pointJ1 = 0;
var pointJ2 = 0;

var isIAOn = false;

initialisationTableau();
// placeForTest(0);
// placeForTest(1);
// placeForTest(2);
// placeForTest(2);
// placeForTest(3);
// placeForTest(3);
// placeForTest(4);
// placeForTest(3);
// placeForTest(4);
// placeForTest(4);

function startIA(){
    console.log("l'IA est lancée !!!!");
    isIAOn = !isIAOn;

}

function jouer(colonne){
    jouerCase(colonne);
    if (isIAOn){
        colonneIA = IA.choixColonne();
        jouerCase(colonneIA);
    }
}
function placeForTest(colonne){
    jouer(colonne);
}


function jouerCase(colonne){
    if(!finJeu){
        var ligneVide = jeux.retournerLigneCaseVideColonne(colonne);
        if(ligneVide !== -1){
            jeux.jeuxCase(joueurEnCours, ligneVide, colonne);
            jeux.afficherPuissance4();
            if(jeux.verificationFinJeu(joueurEnCours)){
                gererFInJeu();
            }
            if(joueurEnCours===1){
                joueurEnCours = 2;
                tour.innerHTML = "Tour du joueur "+joueurEnCours+"";
            }else{
                joueurEnCours = 1;
                tour.innerHTML = "Tour du joueur "+joueurEnCours+"";
            }
        }

    }
    
    

}
function initialisationTableau(){
    finJeu = false;
    joueurEnCours = 1;
    alert.classList.add("d-none");
    var contentJ1 = "<img src='./images/child.png' class='bg-danger rounded-circle' style='width:90px;height:90px'></img> <br />";
    contentJ1 += pointJ1;
    messageJ1.innerHTML = contentJ1;

    var contentJ2 = "<img src='./images/childesse.png' class='bg-info rounded-circle' style='width:90px;height:90px'></img><br />";
    contentJ2 += pointJ2;
    messageJ2.innerHTML = contentJ2;

    jeux.initialisation();
    jeux.afficherPuissance4();
}

function gererFInJeu(){
    finJeu = true;
    var contentAlert = "Partie terminée, le gagnant est : "+ joueurEnCours+"<br/>";
    contentAlert += '<button type="button" class="btn btn-secondary" onClick=initialisationTableau()>Recommancer !</button>';
    alert.innerHTML = contentAlert;
    alert.classList.remove("d-none");
    if(joueurEnCours===1){
        pointJ1++;
    }else{
        pointJ2++;
    }
}


