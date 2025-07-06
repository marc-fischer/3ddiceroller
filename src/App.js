import "./styles.css";
import DisplayResults from "@3d-dice/dice-ui/src/displayResults"; // fui index exports are messed up -> going to src
import DiceParser from "@3d-dice/dice-parser-interface";
import { Dice } from "./components/diceBox";
import AdvRollBtn from "./components/AdvRollBtn";

// create Dice Roll Parser to handle complex notations
//const DRP = new DiceParser();

// create display overlay for final results
const DiceResults = new DisplayResults("#dice-box");

// initialize the Dice Box outside of the component
Dice.init().then(() => {
  // clear dice on click anywhere on the screen
  document.addEventListener("mousedown", () => {
    const diceBoxCanvas = document.getElementById("dice-canvas");
    if (window.getComputedStyle(diceBoxCanvas).display !== "none") {
      Dice.hide().clear();
      DiceResults.clear();
    }
  });
});

export default function App() {
  // This method is triggered whenever dice are finished rolling
  Dice.onRollComplete = (results) => {
    console.log(results);

    // handle any rerolls
    //const rerolls = Dice.handleRerolls(results);
    //if (rerolls.length) {
    //  rerolls.forEach((roll) => Dice.add(roll, roll.groupId));
    //  return rerolls;
    //}
    // if no rerolls needed then parse the final results
    //const finalResults = Dice.parseFinalResults(results);

    // show the results
    DiceResults.showResults(results);
  };

  // trigger dice roll
  const rollDice = (notation, group) => {
    // trigger the dice roll using the parser
    //DRP.rollNotation(notation);
    if (notation == "hope&fear") {
      notation = [{qty: 1, sides: 12, themeColor: '#FFD700'}, {qty: 1, sides: 12, themeColor: '#372C6E'}]
    }
    Dice.roll(notation);
    Dice.show();
  };

  return (
    <div className="App">
      <div className="buttonList">
        <AdvRollBtn
          label="Roll Hope & Fear"
          notation="hope&fear"
          onRoll={rollDice}
        />
        <AdvRollBtn
          label="Roll d6"
          notation="1d6"
          onRoll={rollDice}
        />
        <AdvRollBtn
          label="Roll d8"
          notation="1d8"
          onRoll={rollDice}
        />
        <AdvRollBtn
          label="Roll d10"
          notation="1d10"
          onRoll={rollDice}
        />
        <AdvRollBtn
          label="Roll d12"
          notation="1d12"
          onRoll={rollDice}
        />
        <AdvRollBtn
          label="Roll d20"
          notation="1d20"
          onRoll={rollDice}
        />
        <AdvRollBtn
          label="Roll d100"
          notation="1d100"
          onRoll={rollDice}
        />
      </div>
    </div>
  );
}
