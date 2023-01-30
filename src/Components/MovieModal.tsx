import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail, IGetMovieDetail, IMovie } from "../utils/api";
import { makeImagePath } from "../utils/utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  opacity: 0;
`;
const Modal = styled(motion.div)`
  position: fixed;
  width: 40vw;
  min-width: 500px;
  height: 40vw;
  min-height: 600px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto auto;
  background-color: ${(props) => props.theme.black.darker};
  border-radius: 20px;
  overflow: hidden;
`;
const Body = styled.div`
  padding: 20px;
  width: 100%;
  height: 50%;
`;
const Title = styled.h2`
  font-size: 35px;
  margin-bottom: 16px;
`;
const Tags = styled.div`
  span {
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.white.darker};
    color: ${(props) => props.theme.white.darker};
    padding-right: 5px;
    padding-left: 5px;
  }
  margin-bottom: 16px;
`;
const Footer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Logo = styled.img`
  background-color: inherit;
  margin-right: 10px;
  width: 100px;
`;
const ImgBox = styled(motion.div)<{ bgimage: string }>`
  position: relative;
  background-image: url(${(props) => props.bgimage});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 400px;
  overflow: hidden;
`;

interface movieModalProps {
  movie: IMovie;
  sectionTitle: string;
}

function MovieModal({ movie, sectionTitle }: movieModalProps) {
  const navigate = useNavigate();
  const onOverlayClick = () => {
    navigate("/");
  };
  const { data: movieDetail, isLoading } = useQuery<IGetMovieDetail>(
    ["movies", "detail"],
    () => getMovieDetail(movie.id + "")
  );

  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 0.7 }}
        exit={{ opacity: 0 }}
      />
      <Modal layoutId={movie.id + sectionTitle}>
        {movie ? (
          <ImgBox bgimage={makeImagePath(movie.backdrop_path, "w500")} />
        ) : null}

        <Body>
          <Title>{movie?.title}</Title>

          {isLoading ? null : (
            <Tags>
              <span>{movieDetail?.release_date.split("-")[0]}</span>
              {movieDetail?.genres.map((genre, idx) => (
                <span key={idx}>{genre.name}</span>
              ))}
            </Tags>
          )}
          <p>{movie?.overview}</p>
          {isLoading ? null : (
            <Footer>
              {movieDetail?.production_companies.map((company, idx) => {
                if (!company.logo_path) return null;
                return (
                  <Logo
                    key={idx}
                    alt=""
                    src={makeImagePath(company.logo_path, "w500")}
                  />
                );
              })}
            </Footer>
          )}
        </Body>
      </Modal>
    </>
  );
}

export default MovieModal;
