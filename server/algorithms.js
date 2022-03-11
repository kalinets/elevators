const findClosestFreeElevator = (elevators, targetFloor) => {
  const distance = (elev) => Math.abs(targetFloor - elev.floor);
  const moving = (elev) => typeof elev.targetFloor === "number";
  return elevators.reduce((closestElevator, elev) => {
    if (moving(elev)) {
      // It's already moving so let's skip this one
      return closestElevator;
    } else if (closestElevator === null) {
      // It's not moving and we didn't find any elevator yet so it's our best choice for now
      return elev;
    } else {
      // Both elevators are not moving - choose one closer to the target floor
      return distance(elev) < distance(closestElevator)
        ? elev
        : closestElevator;
    }
  }, null);
};

module.exports = { findClosestFreeElevator };
