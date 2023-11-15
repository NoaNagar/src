import axios from "axios";

const userProfileImage = async () => {
  let token = localStorage.getItem("token");
  let encoded_payload = token.split(".")[1];
  let decoded_payload = atob(encoded_payload);
  let jsonified_payload = JSON.parse(decoded_payload);
  let user_id = jsonified_payload._id;
  let url = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/";
  const userData = await axios.get(`${url}${user_id} `, {
    headers: {
      "x-auth-token": `${token}`,
    },
  });
  // let profileImage = userData.data.image.url;
  return userData.data.image.url;
};
let profileUrl = userProfileImage();
export default profileUrl;
