import { Directions, DirectionVectors, Actions } from "../common/enums";

export const getDirections = (direction: string) => {
  let dX: number;
  let dY: number;

  switch (direction) {
    case Directions.NORTH:
      dX = DirectionVectors.FIXED;
      dY = DirectionVectors.FORWARD;
      break;
    case Directions.EAST:
      dX = DirectionVectors.FORWARD;
      dY = DirectionVectors.FIXED;
      break;
    case Directions.SOUTH:
      dX = DirectionVectors.FIXED;
      dY = DirectionVectors.BACKWARD;
      break;
    case Directions.WEST:
      dX = DirectionVectors.BACKWARD;
      dY = DirectionVectors.FIXED;
      break;
    default:
      throw new Error("Invalid direction.");
  }

  return [dX, dY];
};

export const rotate = (currentDirection: string, rotateTo: string): string => {
  switch (currentDirection) {
    case Directions.NORTH:
      if (rotateTo === Actions.LEFT) {
        return Directions.WEST;
      } else {
        return Directions.EAST;
      }
    case Directions.EAST:
      if (rotateTo === Actions.LEFT) {
        return Directions.NORTH;
      } else {
        return Directions.SOUTH;
      }
    case Directions.SOUTH:
      if (rotateTo === Actions.LEFT) {
        return Directions.EAST;
      } else {
        return Directions.WEST;
      }
    case Directions.WEST:
      if (rotateTo === Actions.LEFT) {
        return Directions.SOUTH;
      } else {
        return Directions.NORTH;
      }
    default:
      throw new Error("Invalid direction.");
  }
};
