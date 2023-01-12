import axios from "axios";

const HOSTED_PORT = `https://credlock-heroku-22.herokuapp.com/`;
const LOCAL_PORT = `http://localhost:3002/`;

const updateData = async (route, data) => {
  const res = await axios.post(`${HOSTED_PORT}${route}`, data).catch((err) => {
    console.log(err);
    return false;
  });
  return res;
};

export default updateData;
