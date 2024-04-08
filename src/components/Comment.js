import styled from "styled-components";
import Plus from "../../images/icon-plus.svg";
import Minus from "../../images/icon-minus.svg";
import ReplyIcon from "../../images/icon-reply.svg";
// import avatar from "../images/avatars/image-amyrobson.png";
import { DATA } from "../data";

function Comment() {
  console.log(DATA[0].currentUser.image.png);
  return (
    <Wrapper>
      <Head>
        <Avatar src={require("../../images/avatars/image-amyrobson.png")} alt="" />
        <Name>amyrobson</Name>
        <Duration>1 month ago</Duration>
      </Head>
      <Content>
        Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed
        the design and the responsiveness at various breakpoints works really well.
      </Content>
      <Rating>
        <img src={Plus} alt="" />
        <p>12</p>
        <img src={Minus} alt="" />
      </Rating>
      <Reply>
        <img src={ReplyIcon} alt="" />
        <p>Reply</p>
      </Reply>
    </Wrapper>
  );
}

const Wrapper = styled.article`
  display: grid;
  grid-template: 40px 1fr 40px / auto 1fr auto;
  row-gap: 1rem;
  padding: 1rem;
  font-family: "Rubik";
`;

const Head = styled.div`
  grid-row: 1;
  grid-column: 1 / 3;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Name = styled.p`
  color: var(--grayish-blue);
  font-weight: 700;
`;
const Duration = styled.p`
  color: var(--grayish-blue);
  min-width: fit-content;
`;

const Content = styled.p`
  grid-row: 2 / 3;
  grid-column: 1 / -1;
  color: var(--grayish-blue);
`;

const Rating = styled.div`
  grid-row: 3;
  grid-column: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 0.75rem;
  border-radius: 8px;
  color: var(--light-grayish-blue);
  background-color: var(--very-light-gray);
  font-weight: 600;

  & p {
    color: var(--moderate-blue);
  }
`;

const Reply = styled.span`
  grid-row: 3;
  grid-column: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  /* padding: 1rem 0; */
  color: var(--moderate-blue);
  font-weight: 600;
`;

export function Avatar({ src, alt }) {
  return <AvatarImg src={src} alt={alt} />;
}

const AvatarImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export default Comment;
