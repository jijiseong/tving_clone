import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { dragState } from "../atoms";
import { IMovie } from "../utils/api";
import { makeImagePath } from "../utils/utils";

const Container = styled(motion.div)`
  display: block;
  width: 300px;
  height: 200px;
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
  const isDragging = useRecoilValue(dragState);
  const onBoxClicked = (id: number) => {
    if (isDragging) {
      return;
    }
    console.log("clicked");

    navigate(`/movies/${sectionTitle}/${id}`);
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

      <Info variants={infoVars}>
        <h4>{movie.title}</h4>
        <p>
          {movie.overview.length > 100
            ? `${movie.overview.slice(0, 100)} ...`
            : movie.overview}
        </p>
      </Info>
      <MovieTitle variants={movieTitleVars}>{movie.title}</MovieTitle>
    </Container>
  ) : null;
}

export default Movie;
