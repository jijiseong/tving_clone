import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getNowPlaying, IGetMoviesResult } from "../api";
import useWindowWidth from "../utils/useWindowDimensions";
import { makeImagePath } from "../utils/utils";

const LEFT = -1;
const RIGHT = 1;
const offset = 6;

const Wrapper = styled.div`
  background-color: black;
  height: 200vh;
`;

const Loader = styled.div`
  height: 20vh;
`;
const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  padding: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
`;
const Overview = styled.div`
  font-size: 26px;
  width: 50%;
`;
const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 68px;
`;
const Slider = styled(motion.div)`
  position: relative;
  top: -100px;
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
const Box = styled(motion.div)`
  width: 100%;
  height: 100%;
  font-size: 50px;
  cursor: pointer;
`;
const MovieTitle = styled.div`
  font-size: 20px;
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

interface IslideObj {
  direction: number;
  windowWidth: number;
}

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

function Home() {
  const windowWidth = useWindowWidth();
  const { data: nowPlaying, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getNowPlaying
  );
  const [[page, direction], setPage] = useState([0, 0]);
  const [leaving, setLeaving] = useState(false);
  const slideObj: IslideObj = { direction, windowWidth };

  const paginate = (newDirection: number) => {
    if (!nowPlaying) return;
    if (leaving) return;
    console.log(page, newDirection);
    const totalMovies = nowPlaying.results.length;
    const maxPage = Math.ceil(totalMovies / offset);

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
    console.log("toggle Leaving");
    setLeaving((cur) => !cur);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>"loading"</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}
          >
            <Title>{nowPlaying?.results[0].title}</Title>
            <Overview>{nowPlaying?.results[0].overview}</Overview>
          </Banner>
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
                {nowPlaying?.results
                  .slice(page * offset, page * offset + offset)
                  .map((movie) => (
                    <Box key={movie.id} whileHover={{ y: -20 }}>
                      <img
                        src={makeImagePath(movie.backdrop_path, "w500")}
                        width="100%"
                      />
                      <MovieTitle>{movie.title}</MovieTitle>
                    </Box>
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
        </>
      )}
    </Wrapper>
  );
}

export default Home;
