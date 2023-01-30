import { useQuery } from "react-query";
import styled from "styled-components";
import Header from "../Components/Header";
import Slider from "../Components/Slider";
import Tv from "../Components/Tv";
import { getOnTheAir, IGetTvResult } from "../utils/api";

const Wrapper = styled.div`
  height: 200vh;
`;
const Body = styled.div`
  width: 100%;
  position: relative;
  top: 130px;
`;
function TvPage() {
  const { data: onTheAir, isLoading } = useQuery<IGetTvResult>(
    ["tv", "onTheAir"],
    getOnTheAir
  );
  console.log(onTheAir);

  return (
    <Wrapper>
      <Header />
      <Body>
        {isLoading || !onTheAir ? (
          "Loading..."
        ) : (
          <Slider
            dataLength={onTheAir.results.length}
            sectionTitle="On The Air"
          >
            {onTheAir?.results.map((tv) => (
              <Tv tv={tv} sectionTitle="On The Air" />
            ))}
          </Slider>
        )}
      </Body>
    </Wrapper>
  );
}

export default TvPage;
