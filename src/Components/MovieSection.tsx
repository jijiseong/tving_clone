import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesResult } from "../utils/api";
import useWindowWidth from "../utils/useWindowDimensions";
import { makeImagePath } from "../utils/utils";

const LEFT = -1;
const RIGHT = 1;
const offset = 6;

interface IslideObj {
  direction: number;
  windowWidth: number;
}

const Section = styled.section`
  width: 100%;
  h2 {
    font-size: 30px;
    margin-left: 30px;
    margin-bottom: 20px;
    font-weight: 900;
  }
  height: 300px;
  margin-bottom: 80px;
`;
const Slider = styled(motion.div)`
  position: relative;
  height: 200px;
`;
const Row = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  gap: 10px;
  margin-bottom: 10px;
  grid-template-columns: repeat(6, 1fr);
`;
const Movie = styled(motion.div)`
  width: 100%;
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
  width: 100%;
  height: 100%;
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
    text-overflow: ellipsis;
    color: ${(props) => props.theme.white.darker};
  }
`;
const Button = styled(motion.button)<{ direction: number }>`
  position: absolute;
  right: ${(props) => (props.direction === LEFT ? null : 0)};
  height: 100%;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0)
  );
  cursor: pointer;
  border: 0;
  color: ${(props) => props.theme.white.lighter};
`;
const rowVars: Variants = {
  hidden: (slideObj: IslideObj) => {
    const { direction, windowWidth } = slideObj;

    return {
      x: direction === LEFT ? -windowWidth + 10 : windowWidth - 10,
    };
  },
  visible: { x: 0 },
  exit: (slideObj: IslideObj) => {
    const { direction, windowWidth } = slideObj;
    return { x: direction === LEFT ? windowWidth - 10 : -windowWidth + 10 };
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
const boxVars: Variants = {
  hover: {
    y: -20,
    transition: {
      duration: 0.1,
    },
  },
};
interface MovieSectionProps {
  movieList: IGetMoviesResult;
  title: string;
}

function MovieSection({ movieList, title }: MovieSectionProps) {
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const [[page, direction], setPage] = useState([0, 0]);
  const [leaving, setLeaving] = useState(false);
  const slideObj: IslideObj = { direction, windowWidth };

  const onBoxClicked = (id: number) => {
    navigate(`/movies/${title}/${id}`);
  };

  const paginate = (newDirection: number) => {
    if (!movieList) return;
    if (leaving) return;
    const totalMovies = movieList.results.length;
    const maxPage = Math.floor(totalMovies / offset);
    const newPage = page + newDirection;
    if (newPage < 0) {
      setPage([maxPage, newDirection]);
    } else if (newPage >= maxPage) {
      setPage([-1, newDirection]);
    }
    setPage((cur) => {
      return [cur[0] + newDirection, newDirection];
    });
    toggleLeaving();
  };
  const toggleLeaving = () => {
    setLeaving((cur) => !cur);
  };

  return (
    <Section>
      <h2>{title}</h2>
      <Slider>
        <AnimatePresence
          initial={false}
          custom={slideObj}
          onExitComplete={toggleLeaving}
        >
          <Row
            key={page}
            variants={rowVars}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={slideObj}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {movieList?.results
              .slice(page * offset, page * offset + offset)
              .map((movie) => (
                <Movie
                  key={movie.id}
                  variants={boxVars}
                  whileHover="hover"
                  onClick={() => onBoxClicked(movie.id)}
                  layoutId={movie.id + title}
                >
                  <ImgBox
                    bgimage={makeImagePath(movie.backdrop_path, "w500")}
                  />
                  <Info variants={infoVars}>
                    <h4>{movie.title}</h4>
                    <p>
                      {movie.overview.length > 100
                        ? `${movie.overview.slice(0, 100)} ...`
                        : movie.overview}
                    </p>
                  </Info>
                  <MovieTitle variants={movieTitleVars}>
                    {movie.title}
                  </MovieTitle>
                </Movie>
              ))}
          </Row>
        </AnimatePresence>
        <Button direction={RIGHT} onClick={() => paginate(RIGHT)}>
          next
        </Button>
        <Button direction={LEFT} onClick={() => paginate(LEFT)}>
          prev
        </Button>
      </Slider>
    </Section>
  );
}

export default MovieSection;
