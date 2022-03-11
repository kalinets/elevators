import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getElevatorStateIcon } from "../../utils";
import styles from "./ElevatorsTable.module.css";

export const ElevatorsTable = memo(() => {
  const elevatorsData = useSelector((state: RootState) => state.elevators);
  return (
    <>
      {elevatorsData.loading && !elevatorsData.data && (
        <p>Elevators data is loading...</p>
      )}
      {elevatorsData.error && (
        <p>Something went wrong, please try to reload the page</p>
      )}
      {elevatorsData.data && (
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>Elevator id</th>
              <th>Floor #</th>
              <th>State</th>
              <th>Target Floor</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {elevatorsData.data.map((elevator) => (
              <tr key={elevator.id}>
                <td>{elevator.id}</td>
                <td>{elevator.floor}</td>
                <td>{getElevatorStateIcon(elevator.state)}</td>
                <td>{elevator.targetFloor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
});
