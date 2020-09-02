import * as fs from "fs";
import { Actions } from "./common/enums";
import { getDirections, rotate } from "./util/roverUtil";

// Read Input from the input.txt
const rawInput = fs.readFileSync(__dirname + "/../input.txt", "utf8");

// Parse input with new line
const lines: string[] = rawInput.split("\n");

// Check if the file is empty
if (!lines[0]) {
  throw new Error(
    "Invalid input file. First line should be the dimensions of grid."
  );
}

const marsRover = (lines: string[]) => {
  let currentX: number;
  let currentY: number;
  let direction: string;

  const borders: string[] = lines[0].split(" ");
  const borderX: number = Number(borders[0]);
  const borderY: number = Number(borders[1]);

  const initializeState = (coordinates: string[]) => {
    currentX = Number(coordinates[0]);
    currentY = Number(coordinates[1]);
    direction = coordinates[2];
  };

  const rotateOrMove = (actions: string) => {
    for (let i = 0; i < actions.length; i++) {
      const action: string = actions[i];

      if (action === Actions.MOVE) {
        let [dX, dY] = getDirections(direction);
        let nextX = currentX + dX;
        let nextY = currentY + dY;

        // Check if it is inside of a boundry
        if (nextX < 0 || nextX > borderX || nextY < 0 || nextY > borderY) {
          return "Oops! Rover has fallen.";
        }
        currentX = nextX;
        currentY = nextY;
      } else {
        direction = rotate(direction, action);
      }
    }
    return `${currentX} ${currentY} ${direction}`;
  };

  for (let lineIndex = 1; lineIndex < lines.length; lineIndex++) {
    switch (lineIndex % 2) {
      case 1:
        const coordinates = lines[lineIndex].split(" ");
        initializeState(coordinates);
        break;
      case 0:
        const response = rotateOrMove(lines[lineIndex]);
        console.log(response);
        break;
    }
  }
};

marsRover(lines);
