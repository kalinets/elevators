import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchElevators,
  fetchElevatorsFailed,
  fetchElevatorsSucceeded,
} from "../store/elevatorsSlice";
import { RootState } from "../store";
import { useInterval } from "../hooks";
import { Building } from "./Building";
import { ElevatorsTable } from "./ElevatorsTable";

export function Main() {
  const elevatorsData = useSelector((state: RootState) => state.elevators);
  const [isElevatorMoving, setIsElevatorMoving] = useState(false);
  const dispatch = useDispatch();

  const getElevatorsData = useCallback(async () => {
    dispatch(fetchElevators());
    const response = await fetch("http://localhost:8080/elevators");
    if (response.status !== 200) {
      dispatch(fetchElevatorsFailed());
    }
    const data: API.Elevator[] = await response.json();
    if (data) {
      dispatch(fetchElevatorsSucceeded(data));
    }
  }, [dispatch]);

  const callElevator = useCallback(async (floor: number) => {
    const response = await fetch(`http://localhost:8080/floor/${floor}`, {
      method: "PUT",
    });
    if (response.status !== 200) {
      console.error("error");
    }
    const data: API.CalledElevator = await response.json();
    if (data.error) {
      alert(data.error);
    }
    if (data) {
      setIsElevatorMoving(true);
    }
  }, []);

  useEffect(() => {
    getElevatorsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { data } = elevatorsData;
    if (data?.every((el) => el.state === "stopped")) {
      setIsElevatorMoving(false);
    } else {
      setIsElevatorMoving(true);
    }
  }, [elevatorsData]);
  useInterval(getElevatorsData, isElevatorMoving ? 1000 : null);

  return (
    <main>
      <ElevatorsTable />
      <Building callElevator={callElevator} />
    </main>
  );
}
