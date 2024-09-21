const player1 = { name: "Donkey Kong", vel: 2, man: 4, pow: 3, points: 0 };
const player2 = { name: "Yoshi", vel: 2, man: 2, pow: 5, points: 0 };

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    switch (block) {
      case "RETA":
        totalTestSkill1 = diceResult1 + character1.vel;
        totalTestSkill2 = diceResult2 + character2.vel;

        await logRollResult(
          character1.name,
          "vel",
          diceResult1,
          character1.vel
        );

        await logRollResult(
          character2.name,
          "vel",
          diceResult2,
          character2.vel
        );
        break;
      case "CURVA":
        totalTestSkill1 = diceResult1 + character1.man;
        totalTestSkill2 = diceResult2 + character2.man;

        await logRollResult(
          character1.name,
          "man",
          diceResult1,
          character1.man
        );

        await logRollResult(
          character2.name,
          "man",
          diceResult2,
          character2.man
        );
        break;
      case "CONFRONTO":
        let powerResult1 = diceResult1 + character1.pow;
        let powerResult2 = diceResult2 + character2.pow;

        console.log(`${character1.name} confrontou com ${character2.name}! 🥊`);

        await logRollResult(
          character1.name,
          "pow",
          diceResult1,
          character1.pow
        );

        await logRollResult(
          character2.name,
          "pow",
          diceResult2,
          character2.pow
        );

        if (powerResult1 > powerResult2 && character2.points > 0) {
          console.log(
            `${character1.name} venceu o confronto! ${character2.name} perdeu 1 ponto 🐢`
          );
          character2.points--;
        }

        if (powerResult2 > powerResult1 && character1.points > 0) {
          console.log(
            `${character2.name} venceu o confronto! ${character1.name} perdeu 1 ponto 🐢`
          );
          character1.points--;
        }

        console.log(
          powerResult2 === powerResult1
            ? "Confronto empatado! Nenhum ponto foi perdido"
            : ""
        );
        break;

      default:
        break;
    }

    // verificando o vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.name} marcou um ponto!`);
      character1.points++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.name} marcou um ponto!`);
      character2.points++;
    } else {
      console.log(`foi um empate!`);
    }

    console.log("-----------------------------");
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.name}: ${character1.points} ponto(s)`);
  console.log(`${character2.name}: ${character2.points} ponto(s)`);

  if (character1.points > character2.points)
    console.log(`\n${character1.name} venceu a corrida! Parabéns! 🏆`);
  else if (character2.points > character1.points)
    console.log(`\n${character2.name} venceu a corrida! Parabéns! 🏆`);
  else console.log("A corrida terminou em empate");
}

(async function Main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.name} e ${player2.name} começando...\n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
