import { Avatar } from "./Comment";
import { DATA as userData } from "../data.js";
function Comments() {
  return (
    <>
      <Avatar src={userData[0].currentUser.image.png} alt="" />
      <textarea placeholder="Add a comment..."></textarea>
      <button>Send</button>
    </>
  );
}

export default Comments;
