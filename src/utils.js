import axios from "axios";
import { history } from "./history";

export function fetchData(url) {
  return axios
    .get(url)
    .then(({ data }) => data)
    .catch(error => {
      console.log(error);
      history.push("/");
    });
}