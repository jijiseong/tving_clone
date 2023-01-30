import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dragState } from "../atoms";
import { ITv } from "../utils/api";
import { makeImagePath } from "../utils/utils";

const Container = styled(motion.div)`
  display: block;
  padding-right: 0.5vw;
  width: 20vw;
  height: 13vw;
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
const boxVars: Variants = {
  hover: {
    y: -20,
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
  const [isDragging, setIsDragging] = useRecoilState(dragState);
  const onBoxClicked = (id: number) => {
    if (!isDragging) {
      navigate(`/tvs/${sectionTitle}/${id}`);
    }
    setIsDragging(false);
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

      <TvTitle variants={tvTitleVars}>{tv.name}</TvTitle>
    </Container>
  ) : null;
}

export default Tv;
