import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetching = (actionCreator) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionCreator());
  }, [actionCreator, dispatch]);
};