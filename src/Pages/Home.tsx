import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getNowPlaying,
  getTopRated,
  IGetMoviesResult,
  IMovie,
} from "../utils/api";
import { makeImagePath } from "../utils/utils";
import MovieModal from "../Components/MovieModal";
import { useMatch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "../Components/Header";
import Slider from "../Components/Slider";
import Movie from "../Components/Movie";

const Wrapper = styled.div`
  height: 200vh;
`;
const Body = styled.div`
  width: 100%;
  position: relative;
  top: -200px;
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
  z-index: -1;
`;
const Overview = styled.div`
  font-size: 26px;
  width: 50%;
`;
const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 68px;
`;

function Home() {
  const { data: nowPlaying, isLoading: nowPlayingLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getNowPlaying);
  const { data: topRated, isLoading: topRadtedLoading } =
    useQuery<IGetMoviesResult>(["movies", "topRated"], getTopRated);
  const movieModalMatch = useMatch("/movies/:title/:id");

  let clickedMovie: IMovie | undefined;
  if (movieModalMatch?.params.title === "현재 상영 중인 영화!") {
    clickedMovie = nowPlaying?.results.find(
      (v) => v.id === Number(movieModalMatch?.params.id)
    );
  } else if (movieModalMatch?.params.title === "높은 평점!") {
    clickedMovie = topRated?.results.find(
      (v) => v.id === Number(movieModalMatch?.params.id)
    );
  }

  return (
    <Wrapper>
      <Header />
      {/* ============= Banner ================*/}
      {nowPlayingLoading || !nowPlaying ? (
        <Loader>"loading"</Loader>
      ) : (
        <Banner
          bgPhoto={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}
        >
          <Title>{nowPlaying?.results[0].title}</Title>
          <Overview>{nowPlaying?.results[0].overview}</Overview>
        </Banner>
      )}
      <Body>
        {/* ============= Movie Section 1 ================*/}
        {nowPlayingLoading || !nowPlaying ? (
          <Loader>"loading"</Loader>
        ) : (
          <Slider
            sectionTitle="현재 상영 중인 영화!"
            dataLength={nowPlaying.results.length}
          >
            {nowPlaying.results.map((movie) => (
              <Movie movie={movie} sectionTitle="현재 상영 중인 영화!"></Movie>
            ))}
          </Slider>
        )}

        {/* ============= Movie Section 2 ================*/}
        {topRadtedLoading || !topRated ? (
          <Loader>"loading"</Loader>
        ) : (
          <Slider
            sectionTitle="높은 평점!"
            dataLength={topRated.results.length}
          >
            {topRated.results.map((movie) => (
              <Movie movie={movie} sectionTitle="높은 평점!"></Movie>
            ))}
          </Slider>
        )}

        {/* ============= Movie Modal ================*/}
        <AnimatePresence>
          {movieModalMatch?.params.id &&
          movieModalMatch?.params.title &&
          clickedMovie ? (
            <MovieModal
              movie={clickedMovie}
              sectionTitle={movieModalMatch.params.title}
            />
          ) : null}
        </AnimatePresence>
      </Body>
    </Wrapper>
  );
}

export default Home;
