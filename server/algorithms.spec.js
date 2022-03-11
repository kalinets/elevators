const expect = require("chai").expect;
const { findClosestFreeElevator } = require("./algorithms");

describe("Elevator controller", () => {
  const initialElevators = [
    { id: "elv0", floor: 0, state: "stopped" },
    { id: "elv1", floor: 0, state: "stopped" },
  ];

  describe("Find closest non-busy elevator", () => {
    it("should return first elevator for initial state", () => {
      expect(findClosestFreeElevator(initialElevators, 4).id).to.equal("elv0");
    });

    it("should return closest elevator when no is moving", async () => {
      const elevators = [
        { id: "elv0", floor: 1, state: "stopped" },
        { id: "elv1", floor: 4, state: "stopped" },
      ];
      expect(findClosestFreeElevator(elevators, 3).id).to.equal("elv1");
    });

    it("should return non moving elevator", async () => {
      const elevators = [
        { id: "elv0", floor: 1, state: "stopped" },
        { id: "elv1", floor: 4, state: "up", targetFloor: 6 },
      ];
      expect(findClosestFreeElevator(elevators, 3).id).to.equal("elv0");
    });
  });
});
