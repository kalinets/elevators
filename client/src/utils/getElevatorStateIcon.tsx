export function getElevatorStateIcon(state: API.Elevator["state"]) {
  if (state === "up") return "⬆️";
  if (state === "down") return "⬇️";
  return "🛑";
}
