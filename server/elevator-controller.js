const EventEmitter = require("events");
const { findClosestFreeElevator } = require("./algorithms");

const TICK_MS = 1000;

class ElevatorController extends EventEmitter {
  constructor(numElevators, numFloors) {
    super();
    this.numElevators = numElevators;
    this.numFloors = numFloors;
    this.elevators = [];
    for (let i = 0; i < numElevators; i++) {
      this.elevators.push({
        id: "elv" + i,
        floor: 0,
        state: "stopped",
      });
    }
    console.debug("Initial state", this.elevators);
  }

  start(tickMillis = TICK_MS) {
    if (this.intervalId) throw new Error("Already started");
    this.intervalId = setInterval(() => {
      this.elevators = this.elevators.map(this._proceed.bind(this));
    }, tickMillis);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      delete this.intervalId;
    }
  }

  get building() {
    return {
      floors: this.numFloors,
      elevators: this.numElevators,
    };
  }

  callElevator(targetFloor) {
    if (
      !Number.isInteger(targetFloor) ||
      targetFloor < 0 ||
      targetFloor >= this.numFloors
    )
      return { error: "Invalid floor" };

    const closestElevator = findClosestFreeElevator(
      this.elevators,
      targetFloor
    );
    if (closestElevator) {
      closestElevator.targetFloor = targetFloor;
      return { elevator: closestElevator };
    } else {
      return { error: "No free elevator" };
    }
  }

  _proceed(elevator) {
    if (typeof elevator.targetFloor === "undefined") {
      return elevator;
    } else {
      let newState;
      if (elevator.floor < elevator.targetFloor) {
        newState = {
          ...elevator,
          floor: elevator.floor + 1,
          state: "up",
        };
      } else if (elevator.floor > elevator.targetFloor) {
        newState = {
          ...elevator,
          floor: elevator.floor - 1,
          state: "down",
        };
      } else {
        newState = {
          ...elevator,
          floor: elevator.targetFloor,
          targetFloor: undefined,
          state: "stopped",
        };
      }
      console.log(`Moved elevator ${newState.id} to floor ${newState.floor}`);
      this.emit("move", newState);
      return newState;
    }
  }
}

module.exports = ElevatorController;
