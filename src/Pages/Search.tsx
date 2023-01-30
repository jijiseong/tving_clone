import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header";
import { getSearchMovie, IGetMoviesResult } from "../utils/api";
import { makeImagePath } from "../utils/utils";

const Grid = styled.div`
  position: relative;
  top: 200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 90vw;
  margin: 0 auto;
  row-gap: 70px;
  place-items: center;
`;
const Movie = styled.div`
  border-radius: 5px;
  overflow: hidden;
`;
const Img = styled.img`
  border-radius: 5px;
`;
const NullBox = styled.div`
  background-color: ${(props) => props.theme.black.darker};
  width: 500px;
  height: 281px;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data: serachMovies, isLoading: searchLoading } =
    useQuery<IGetMoviesResult>(["movies", "search"], () =>
      getSearchMovie(keyword ? keyword : "", "1")
    );

  if (!searchLoading) {
    console.log(serachMovies);
  }

  return (
    <>
      <Header />
      <Grid>
        {searchLoading
          ? "loading..."
          : serachMovies?.results.map((movie) =>
              movie.backdrop_path ? (
                <Movie key={movie.id}>
                  <Img src={makeImagePath(movie.backdrop_path, "w500")} />

                  <h2>{movie.title}</h2>
                </Movie>
              ) : null
            )}
      </Grid>
    </>
  );
}

export default Search;
