declare namespace API {
  export interface Building {
    floors: number;
    elevators: number;
  }

  export interface Elevator {
    id: string;
    floor: number;
    state: "stopped" | "up" | "down";
    targetFloor?: number;
  }

  export interface CalledElevator extends Elevator {
    targetFloor: number;
    error?: string;
  }
}
