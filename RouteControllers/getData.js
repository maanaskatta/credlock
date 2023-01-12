import axios from "axios";

const HOSTED_PORT = `https://credlock-heroku-22.herokuapp.com/`;
const LOCAL_PORT = `http://localhost:3002/`;

const getData = async (route) => {
  const res = await axios.get(`${HOSTED_PORT}${route}`).catch((err) => {
    console.log(err);
    return false;
  });
  return res.data;
};

export default getData;
