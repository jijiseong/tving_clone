import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dragState } from "../atoms";
import { IMovie } from "../utils/api";
import { makeImagePath } from "../utils/utils";

const Container = styled(motion.div)`
  padding: 0.5vw;
  width: 20vw;
  height: 13vw;
  font-size: 50px;
  cursor: pointer;
`;
const ImgBox = styled(motion.div)<{ bgimage: string }>`
  position: relative;
  background-image: url(${(props) => props.bgimage});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
`;

const MovieTitle = styled(motion.div)`
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

const movieTitleVars: Variants = {
  hover: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
};
interface movieProps {
  movie: IMovie;
  sectionTitle: string;
}

function Movie({ movie, sectionTitle }: movieProps) {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useRecoilState(dragState);
  const onBoxClicked = (id: number) => {
    if (!isDragging) {
      navigate(`/movies/${sectionTitle}/${id}`);
    }
    setIsDragging(false);
  };

  return movie.backdrop_path ? (
    <Container
      key={movie.id}
      variants={boxVars}
      whileHover="hover"
      layoutId={sectionTitle ? movie.id + sectionTitle : movie.id + ""}
      onClick={() => onBoxClicked(movie.id)}
    >
      <ImgBox bgimage={makeImagePath(movie.backdrop_path, "w500")} />
      <MovieTitle variants={movieTitleVars}>{movie.title}</MovieTitle>
    </Container>
  ) : null;
}

export default Movie;
