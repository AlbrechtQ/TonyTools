
const primary =[[0,   2, 0.5],                        //            land      water     air
                [0.5, 0,   2],                        //  land
                [2, 0.5,   0],];                      //  water
                                                      //  air


const secondary = [[0, 2, 0.5, 2, 0.5, 0, 0],           //                  Apocalyptic     Fire     Ice     Electric   Poison   Heavy   Normal 
                   [0.5, 0, 2, 0, 0.5, 2, 0],           // Apocalyptic
                   [2, 0.5, 0, 2, 0, 0.5, 0],           // Fire           //quelli con cui è 0.5
                   [0.5, 0, 0.5, 0, 2, 2, 0],           // Ice
                   [2, 2, 0, 0.5, 0, 0.5, 0],           // Electric
                   [0, 0.5, 2, 0.5, 2, 0, 0],           // Poison
                   [0, 0,  0,  0,  0,  0, 0],];         // Heavy                
                                                        // Normal


let index = 0;
let index2 = 0;
let index_enem = 0;
let index_enem2 = 0;



//DROPDOWN MENUS


let selectElem = document.getElementById("select");      //MY_mon: primary type      

selectElem.addEventListener("change", () => {
    index = selectElem.selectedIndex;                   
});



let selectElem2 = document.getElementById("select2");    //MY_mon: secondary type      

selectElem2.addEventListener("change", () => {
    index2 = selectElem2.selectedIndex;                  
});



let selectElem_ENEMY = document.getElementById("selectEnemy");      //ENEMY_mon: primary type      

selectElem_ENEMY.addEventListener("change", () => {
    index_enem = selectElem_ENEMY.selectedIndex;                   
});



let selectElem_ENEMY2 = document.getElementById("selectEnemy2");      //ENEMY_mon: secondary type      

selectElem_ENEMY2.addEventListener("change", () => {
    index_enem2 = selectElem_ENEMY2.selectedIndex;                   
});

let type1 = ["Land", "Water", "Air"];
let type2 = ["Apocalyptic","Fire","Ice","Electric", "Poison", "Heavy", "Normal"];



//NUMERIC SCORE
function numeric_score (first, second) {
let finalnum;
switch (first){

case 2: {
  if (second == 2) {finalnum = 4;} else if (second == 0) {finalnum = 3} else if(second == 0.5) {finalnum = 1};} break;
case 0: {
  if (second == 0) {finalnum = 0;} else if (second == 2) {finalnum = 2} else if (second == 0.5) {finalnum = -2};} break;
case 0.5: {
  if (second == 0) {finalnum = -3;} else if (second == 2) {finalnum = -1} else if (second == 0.5) {finalnum = -4};} break;

}

return finalnum;
}





//VERBAL SCORE
function verbal_score (score) {
 let grade;
    switch (score) {
      case 4:
        grade = `<b>massive advantage</b>. That's because ${type1[index]} is strong against ${type1[index_enem]} and ${type2[index2]} is also strong against ${type2[index_enem2]}, so you have advantage in both primary and secondary types`; break;   //both advantage       2, 2              4                     
      case 3:
        grade = `<b>great advantage</b>. That's because you have primary type advantage with ${type1[index]} being strong against ${type1[index_enem]}, while secondary types are equal`; break;      //main type advantage, secondary equal  2 0
      case 2:
        grade = `<b>fair advantage</b>. That's because while main types are equal, you have secondary type advantage with ${type2[index2]} being strong against ${type2[index_enem2]}`; break;      // main type equal, secondary advantage  0, 2
      case 1:
        grade = `<b>tiny advantage</b>. That's because you have primary type advantage with ${type1[index]} being strong against ${type1[index_enem]}, but you also have secondary type disadvantage with ${type2[index2]} being weak against ${type2[index_enem2]}. So, because primary weights more than secondary, you still have a small edge`; break;  //main type advantage, secondary disadvantage 2, 0.5
      case 0:
        grade = `<b>equality</b>. That's because both primary and secondary types are the same/equal against each other`; break;              // equal         0, 0              
      case -1:
            grade = `<b>tiny disadvantage</b>. That's because you have primary type disadvantage with ${type1[index]} being weak against ${type1[index_enem]}, but you also have secondary type advantage with ${type2[index2]} being strong against ${type2[index_enem2]}. So, because primary weights more than secondary, the enemy still has a small edge over you`; break; //main type disadvantage, secondary advantage  0.5, 2
      case -2:
        grade = `<b>fair disadvantage</b>. That's because while main types are equal, you have secondary type disadvantage with ${type2[index2]} being weak against ${type2[index_enem2]}`; break;      //main type equal, secondary disadvantage  0 0.5
      case -3:
        grade = `<b>great disadvantage</b>. That's because you have primary type disadvantage with ${type1[index]} being weak against ${type1[index_enem]}, while secondary types are equal.`; break; //main type disadvantage, secondary equal 0.5 0
                                        
      case -4:
            grade = `<b>massive disadvantage</b>. That's because ${type1[index]} is weak against ${type1[index_enem]} and ${type2[index2]} is also weak against ${type2[index_enem2]}, so you have disadvantage in both primary and secondary types`; break; // both disadvantage   0.5, 0.5               


}

return grade;


}


function bestmatch1 (index_enem) {

//primary type bestmatch
let primbest;
if (index_enem == 0){primbest = type1[2]} else if (index_enem == 1){primbest = type1[0]} else {primbest = type1[1]}

return primbest;

 }

//secondary type bestmatch
function bestmatch2 (index_enem2) {

  let twotypes = [];
for (i=0; i<7; i+=1) {
if (secondary[index_enem2][i] == 0.5) {twotypes.push(type2[i])}

}
return twotypes;
}   




function report() {



  let arrbest2 = bestmatch2(index_enem2);
  let best1 = bestmatch1(index_enem);



  let coeff = numeric_score(primary[index][index_enem], secondary[index2][index_enem2]);
  document.getElementById("imgid").src= "/img/"+ coeff+".png";

  console.log("numero finale",coeff);
  
  let voto = verbal_score(coeff);

  let stringa = `<b>Your Mon</b> <mark>(${type1[index]}, ${type2[index2]})</mark> is fighting against the <b>enemy Mon</b> <mark>(${type1[index_enem]}, ${type2[index_enem2]})</mark>, with a coefficient of ${voto}.`;
  let besto; 
  if (arrbest2[0]===undefined) {besto = `The best match against this enemy would be a <mark>${best1}</mark> Mon, of whatever secondary type.`} else
  {besto =`The best match against this enemy would be a Mon <mark>(${best1}, ${arrbest2[0]})</mark> or a Mon <mark>(${best1}, ${arrbest2[1]})</mark>.`};

  if (coeff==4) {besto = `This is the most optimal match against this enemy.`};
  
  document.getElementById("reportbattle").innerHTML = stringa;
  document.getElementById("best").innerHTML = besto;



  
}


