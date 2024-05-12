import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
// import { fetchStatusActions } from "../store/fetchStatusSlice";
import { campsActions } from "../store/campsSlice";

const FetchCamps = () => {
  // const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  const fetchCamps = async () => {
    await Axios.get("http://localhost:5000/api/v1/public/blood-camps")
      .then(({ data }) => {
        console.log(data);
        // dispatch(fetchStatusActions.markFetchDone());
        // dispatch(fetchStatusActions.markFetchingFinished());
        dispatch(campsActions.addInitialItems(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // if (fetchStatus.fetchDone) return;
    // dispatch(fetchStatusActions.markFetchingStarted());
    fetchCamps();
  }, []);
  return <></>;
};

export default FetchCamps;
