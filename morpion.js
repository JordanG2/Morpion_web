function taille_plat(T){ //Fonction qui créer le tableau en fonction de la taille voulue
  var td = document.querySelectorAll("td");
  if(td.length = !0){//si le tableau existe déjà, on le supprime puis on en recréer un autre
    var tb = document.getElementsByTagName("table")[0];
    while (tb.hasChildNodes()) { 
      tb.removeChild(tb.firstChild);
    }
  }
   var taille = T;
   var tdid=0;
   var table = document.getElementsByTagName("table")[0];
   var tblBody = document.createElement("tbody");
    for (var i = 0; i < taille; i++) {
      var ligne = document.createElement("tr");
      for (var j = 0; j < taille; j++) {
        var cell = document.createElement("td");
       cell.id = tdid;
       tdid++;
       ligne.appendChild(cell);
     }
      tblBody.appendChild(ligne);
    }
    table.appendChild(tblBody);
    var nvtd = document.getElementsByTagName('td')//on redimensionne les cases en fonction de leur nombre
    var nvwidth = (10*3)/(Math.sqrt(nvtd.length));
    var nvheight = (10*3)/(Math.sqrt(nvtd.length));
    for (var i = 0; i < nvtd.length; i++){
          nvtd[i].style.width = nvwidth + 'em';
     }
     for (var i = 0; i < nvtd.length; i++){
      nvtd[i].style.height = nvheight+'em';
 }
}

function Tplat(taille){//on créer un tableau de 0 qui sert à reperer qui joue où et aide pour la condition de victoire
  var tplat = taille;
  var tab=[];
  for(i=0; i<tplat; i++){
    tab[i]="0"
  }
  return tab;
} 

function est_valide(td) {//on regarde à l'aide du tableau creer par Tplat() si la case est disponible 
  return td.innerHTML.length == 0;
}

  
function choix_symbole(td, symbole, plateau){//En fonction du tour, remplasse le fond de la case par l'image du joueur et rempli le tableau de victoire
          td.innerHTML = symbole;
          if (symbole == "1"){
            td.style.backgroundImage = "url('fond1.png')";
            plateau[td.id]= "1";
            }
          else{
            td.style.backgroundImage = "url('fond2.png')";
            plateau[td.id]= "2";
            } 
}

function monbot(taille,tabjeu, plateau, joueur){//fonction qui regarde la case joué par le joueur et qui si possible et avec de la chance joue autour
    var jouer=joueur.id
    var max = taille;
    var racine =Math.sqrt(max);
    var debut = jouer-racine;
    var fin = jouer + racine;
    for(var i=0; i<max-1; i=i+racine){
      if(jouer==i){
        for(var j= debut;j<=fin; j=j+racine ){
          for(var h=0; h<2; h++){
            if((j+h)>=0 && (j+h)<max && (plateau[j+h]=="0")){
              if((Math.floor(Math.random()*3)==1)){
               return tabjeu[j+h];
             }
          }
        }
      }
    }
  } 
  for(var i=racine-1; i<max; i=i+racine){
    if(jouer==i){
      for(var j= debut;j<=fin; j=j+racine ){
        for(var h=-1; h<1; h++){
          if((j+h)>=0 && (j+h)<max && (plateau[j+h]=="0")){
            if((Math.floor(Math.random()*3)==1)){
             return tabjeu[j+h];
            }
          }
        }
      }
    }
  }
  for(var i=0; i<max; i++){
    if(jouer==i){
      for(var j= debut;j<=fin; j=j+racine ){
        for(var h=-1; h<=1; h++){
          if((j+h)>=0 && (j+h)<max && (plateau[j+h]=="0")){
            if((Math.floor(Math.random()*3)==1)){
             return tabjeu[j+h];
            }
          }
        }
      }
    }
  }
  return avoirnbre(taille,tabjeu, plateau, joueur);//Si aucune case n'est disponible, ou qu il n'a juste pas eu de chance, la case est tiré aléatoirement
}

function avoirnbre(taille,tabjeu, plateau, joueur){//Donne un nombre aléatoire et vérifie si la case correspondant au nombre est disponible
  console.log("nbre");
    var max = taille;
    var nombre =  Math.floor(Math.random() * max);
    var monnbre = 0;    
    if(plateau[nombre]=="0"){
        monnbre=tabjeu[nombre];
        return monnbre;
        }
    else{
     return avoirnbre(taille, tabjeu, plateau, joueur);
  }
}



function victoire(plateau){//Fonction qui parcours le tableau à la recherche d'une condition de victoire validée
    var taille = document.querySelectorAll("td");
    var max = taille.length;
    var racine = Math.sqrt(max);
    var long = racine - 3;
    var haut = max-racine+1;
    var longueur = max-2*(racine);

    if(max<25){
    for(var j=0; j<haut; j=j+racine){
      for(var i = 0; i <= long; i++){
        if (plateau[i+j]==plateau[i+j+1] && plateau[i+j]==plateau[i+j+2] && plateau[i+j]!="0"){
          return true;
        }
     } 
    }  
    for(var i = 0; i < longueur; i++){
        if (plateau[i]==plateau[i+racine] && plateau[i]==plateau[i+2*racine] && plateau[i]!="0"){
          return true;
        }
     } 
     for(var j=0; j<longueur; j=j+racine){
      for(var i=0; i<= long; i++){
        if (plateau[i+j]==plateau[i+j+racine+1] && plateau[i+j]==plateau[i+j+2*(racine)+2] && plateau[i+j]!="0"){
          return true;
      }

      }
    }
    for(var j=0; j<longueur; j=j+racine){
      for(var i=2; i< racine; i++){
        if (plateau[i+j]==plateau[i+j+racine-1] && plateau[i+j]==plateau[i+j+2*(racine)-2] && plateau[i+j]!="0"){
          return true;
      }
      }
    }
  }
  //condition de victoire pour un tableau de 25 cases ou plus
  else{
    for(var j=0; j<haut; j=j+racine){
      for(var i = 0; i <= long-1; i++){
        if (plateau[i+j]==plateau[i+j+1] && plateau[i+j]==plateau[i+j+2] && plateau[i+j]==plateau[i+j+3] && plateau[i+j]!="0"){
          return true;
          
        }
     } 
    }  
    for(var i = 0; i < longueur-racine; i++){
        if (plateau[i]==plateau[i+racine] && plateau[i]==plateau[i+2*racine] && plateau[i]==plateau[i+3*racine] &&  plateau[i]!="0"){
          return true;
        }
     } 
     for(var j=0; j<longueur-racine; j=j+racine){
      for(var i=0; i<= long-1; i++){
        if (plateau[i+j]==plateau[i+j+racine+1] && plateau[i+j]==plateau[i+j+2*(racine)+2] && plateau[i+j]==plateau[i+j+3*(racine)+3] && plateau[i+j]!="0"){
          return true;
      }

      }
    }
    for(var j=0; j<longueur-racine; j=j+racine){
      for(var i=3; i< racine; i++){
        if (plateau[i+j]==plateau[i+j+racine-1] && plateau[i+j]==plateau[i+j+2*(racine)-2] && plateau[i+j]==plateau[i+j+3*(racine)-3] && plateau[i+j]!="0"){
          return true;
      }
      }
    }
  }
}    
  
  
function match_nul(tabjeu) {//Fonction qui arrête la partie s'il n'y a plus de case disponible
    for (var i = 0; i < tabjeu.length; i++) {
      if (tabjeu[i].innerHTML.length == 0){
                      return false;
              }
        } 
          return true;
}
  
function morpion(nbre) {//Fonction principale qui permet de jouer
  var nombre= nbre;
  var tabjeu = document.querySelectorAll("td");
  var taille = tabjeu.length;
  var jeu_fini= false;
  var joueurs= ["1","2"];
  var plateau= Tplat(taille);
  var tour = 0;
  if(taille==0){
    return 0;
  }
    document.getElementById("règles").innerHTML="";
    document.getElementById("bouton").innerHTML="";
    document.getElementById("message").innerHTML="Le jeu peut commencer ! <br /> Joueur 1 c'est votre tour.";
    if(nombre ==2 ){
      for(var i = 0; i < tabjeu.length; i++){
      tabjeu[i].addEventListener("click", function (){
              if (jeu_fini) {
                return 0;
              }
              if (!est_valide(this)) {
                  document.getElementById("message").innerHTML ="Case occupée ! <br />Joueur " + joueurs[tour] + " c'est toujours à vous !";
              }
               else {
                choix_symbole(this, joueurs[tour], plateau);
                
                jeu_fini = victoire(plateau);
        
                if (jeu_fini) {
                  document.getElementById("message").innerHTML =  "Le joueur " + joueurs[tour] +' a gagné ! <br /> <a href="index.html">Recommencer</a>';
                  alert("Le joueur "+joueurs[tour]+" a gagné !");
                  return 0;
                }
        
                if (match_nul(tabjeu)) {
                      document.getElementById("message").innerHTML ='Match Nul ! <br/> <a href="index.html">Recommencer</a>';
                      jeu_fini = true;
                      return 0;
                }       
                tour++;
                tour = tour % 2;
                document.getElementById("message").innerHTML ="Joueur " + joueurs[tour] + " c'est à vous !"
              }
            });
   } 
  }
  else{
    for(var i = 0; i < tabjeu.length; i++){
        var compteur=0;
      
      
       tabjeu[i].addEventListener("click", function (){ 
        if (jeu_fini) {
          return 0;
        }     
        if (tour == 1){
          var bot = monbot(taille,tabjeu, plateau,compteur);
          choix_symbole(bot, joueurs[tour], plateau);
          jeu_fini = victoire(plateau);
          if (jeu_fini) {
            document.getElementById("message").innerHTML =  "Le joueur " + joueurs[tour] +' a gagné ! <br /> <a href="index.html">Recommencer</a>';
            alert("Le joueur "+joueurs[tour]+" a gagné !");
            return 0;
          }
  
          if (match_nul(tabjeu)) {
                document.getElementById("message").innerHTML ='Match Nul ! <br/> <a href="index.html">Recommencer</a>';
                jeu_fini = true;
                return 0;
          }
                tour++;
                tour = tour % 2;
                document.getElementById("message").innerHTML ="Joueur " + joueurs[tour] + " c'est à vous !"
        }  
          else{      
              if (!est_valide(this)) {
                  document.getElementById("message").innerHTML ="Case occupée ! <br />Joueur " + joueurs[tour] + " c'est toujours à vous !";
              }
               else {
                choix_symbole(this, joueurs[tour], plateau);
                compteur=this;
                
                jeu_fini = victoire(plateau);
        
                if (jeu_fini) {
                  document.getElementById("message").innerHTML =  "Le joueur " + joueurs[tour] +' a gagné ! <br /> <a href="index.html">Recommencer</a>';
                  alert("Le joueur "+joueurs[tour]+" a gagné !");
                  return 0;
                }
        
                if (match_nul(tabjeu)) {
                      document.getElementById("message").innerHTML ='Match Nul ! <br/> <a href="index.html">Recommencer</a>';
                      jeu_fini = true;
                      return 0;
                }
        
                tour++;
                tour = tour % 2;
                document.getElementById("message").innerHTML ="Cliquez pour que l'ordinateur joue."
              } 
              return 0;
            }
          }  );  
   } 
  }
}