import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGoogle,
  faTwitter,
  faApple,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  position: relative;
  width: 35%;
  height: 80px;
  margin: 10px;
  border: 1px ${(props) => props.theme.white.darker} solid;
  border-radius: 5px;
  background-color: inherit;
  color: ${(props) => props.theme.white.darker};
  font-size: 30px;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.white.lighter};
    border: 1px ${(props) => props.theme.white.lighter} solid;
  }
`;
const Logo = styled.div`
  position: absolute;
  left: 30px;
  display: flex;
  justify-content: center;
  margin: auto;
`;

function Login() {
  return (
    <Wrapper>
      <Button>
        <Logo style={{ color: "white" }}>
          <FontAwesomeIcon icon={faGithub} />
        </Logo>
        GitHub 로그인
      </Button>

      <Button>
        <Logo style={{ color: " white" }}>
          <FontAwesomeIcon icon={faGoogle} />
        </Logo>
        Google 로그인
      </Button>

      <Button>
        <Logo style={{ color: "#3b5998" }}>
          <FontAwesomeIcon icon={faFacebookF} />
        </Logo>
        Facebook 로그인
      </Button>

      <Button>
        <Logo style={{ color: " #00acee" }}>
          <FontAwesomeIcon icon={faTwitter} />
        </Logo>
        Twiter 로그인
      </Button>
      <Button>
        <Logo>
          <FontAwesomeIcon style={{ color: "white" }} icon={faApple} />
        </Logo>
        Apple 로그인
      </Button>
    </Wrapper>
  );
}

export default Login;
