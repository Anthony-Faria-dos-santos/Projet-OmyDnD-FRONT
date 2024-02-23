let strenghValue = 16;
let dexterityValue = 12;
let constitutionValue = 16;
let inteligenceValue = 8;
let wisdomValue = 12;
let charismaValue = 14;

let lvl = 3;


function masteryBonusCalculator (lvl) {

const masteryBonus = [0, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6];

let currentMasteryBonus = masteryBonus[lvl];

return currentMasteryBonus;

}


/* --------------------------------------------------------------------------------------- */
function caractBonusCalculator (value) {
const caractBonus = [0, -5, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

let currentCaractBonus = caractBonus[value];

return currentCaractBonus;
}


/* --------------------------------------------------------------------------------------- */
function skillBonusCalculator (check, currentCaractBonus, currentMasteryBonus) {
  
  let value;

  if (check === true) {
    value = currentCaractBonus + currentMasteryBonus;

    return value;
  }

  value = currentCaractBonus;

  return value;
  
}

/* ----------------------------------------------------------------------------------------- */

// const currentMasteryBonus = masteryBonusCalculator(lvl);

// const currentCaractBonus = caractBonusCalculator(strenghValue);

// console.log("Bonus de maîtrise:" + masteryBonusCalculator(lvl));

// console.log("Bonus de caractéristiques:" + caractBonusCalculator(strenghValue));

// console.log("Bonus de compétence si uncheck:" + skillBonusCalculator(false, currentCaractBonus, currentMasteryBonus));

// console.log("Bonus de compétence si check:" + skillBonusCalculator(true, currentCaractBonus, currentMasteryBonus));

export {masteryBonusCalculator, caractBonusCalculator, skillBonusCalculator};
export {strenghValue, dexterityValue, constitutionValue, inteligenceValue, wisdomValue, charismaValue, lvl};
