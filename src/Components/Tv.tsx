import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ITv } from "../utils/api";
import { makeImagePath } from "../utils/utils";

const Container = styled(motion.div)`
  display: block;
  width: 300px;
  height: 200px;
  font-size: 50px;
  cursor: pointer;
`;
const ImgBox = styled(motion.div)<{ bgimage: string }>`
  background-image: url(${(props) => props.bgimage});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
`;

const TvTitle = styled(motion.div)`
  font-size: 17px;
  font-weight: 600;
  opacity: 0.6;
`;
const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.black.darker};
  width: 300px;
  height: 200px;
  position: absolute;
  opacity: 0;
  top: 0;
  padding: 10px;
  border-radius: 5px;
  h4 {
    font-size: 23px;
    margin-bottom: 10px;
    font-weight: bolder;
  }
  p {
    font-size: 17px;
    height: 50%;
    color: ${(props) => props.theme.white.darker};
  }
`;
const boxVars: Variants = {
  hover: {
    y: -20,
    transition: {
      duration: 0.1,
    },
  },
};
const infoVars: Variants = {
  hover: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
};
const tvTitleVars: Variants = {
  hover: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
};
interface tvProps {
  tv: ITv;
  sectionTitle: string;
}

function Tv({ tv, sectionTitle }: tvProps) {
  const navigate = useNavigate();
  const onBoxClicked = (id: number) => {
    navigate(`/movies/${sectionTitle}/${id}`);
  };
  return tv.backdrop_path ? (
    <Container
      key={tv.id + sectionTitle}
      variants={boxVars}
      whileHover="hover"
      onClick={() => onBoxClicked(tv.id)}
      layoutId={sectionTitle ? tv.id + sectionTitle : tv.id + ""}
    >
      <ImgBox bgimage={makeImagePath(tv.backdrop_path, "w500")} />
      <Info variants={infoVars}>
        <h4>{tv.name}</h4>
        <p>
          {tv.overview.length > 100
            ? `${tv.overview.slice(0, 100)} ...`
            : tv.overview}
        </p>
      </Info>
      <TvTitle variants={tvTitleVars}>{tv.name}</TvTitle>
    </Container>
  ) : null;
}

export default Tv;
