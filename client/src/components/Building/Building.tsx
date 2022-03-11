import { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  fetchBuilding,
  fetchBuildingFailed,
  fetchBuildingSucceeded,
} from "../../store/buildingSlice";
import styles from "./Building.module.css";

interface Props {
  callElevator: (index: number) => void;
}

export const Building = memo(({ callElevator }: Props) => {
  const buildingData = useSelector((state: RootState) => state.building);
  const dispatch = useDispatch();

  const getBuildingInfo = useCallback(async () => {
    dispatch(fetchBuilding());
    const response = await fetch("http://localhost:8080/building");
    if (response.status !== 200) {
      dispatch(fetchBuildingFailed());
    }
    const data: API.Building = await response.json();
    if (data) {
      dispatch(fetchBuildingSucceeded(data));
    }
  }, [dispatch]);

  useEffect(() => {
    getBuildingInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {buildingData.loading && <p>Building info is loading...</p>}
      {buildingData.error && (
        <p>Something went wrong, please try to reload the page</p>
      )}
      {Boolean(buildingData.floors) && (
        <>
          <p>The building has {buildingData.floors} floors</p>
          {Array.from(Array(buildingData.floors), (_, index) => (
            <div key={index}>
              <button
                className={styles.button}
                onClick={() => callElevator(index)}
              >
                Call elevator on {index} floor
              </button>
            </div>
          ))}
        </>
      )}
    </>
  );
});
