import { AnimatePresence, motion, PanInfo, useAnimation } from "framer-motion";
import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { dragState } from "../atoms";
import useWindowWidth from "../utils/useWindowDimensions";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
const NEXT = -1;
const PREV = 1;
const OFFSET = 5;

const Section = styled.section`
  width: 99.3vw;
  h2 {
    font-size: 30px;
    margin-next: 30px;
    margin-bottom: 20px;
    font-weight: 900;
  }
  height: 20vw;
  margin-bottom: 2vw;
`;
const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Page = styled.div`
  margin-right: 5vw;
`;
const Body = styled(motion.div)`
  position: relative;
  height: 10vw;
`;
const Row = styled(motion.div)`
  display: flex;
  position: absolute;
  height: 100%;
  margin-bottom: 10px;
`;

const Button = styled(motion.button)<{ direction: number }>`
  position: absolute;
  right: ${(props) => (props.direction === NEXT ? null : 0)};
  height: 100%;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0)
  );
  padding: 0.5vw;
  height: 13vw;
  width: 2.5vw;
  cursor: pointer;
  border: 0;
  color: ${(props) => props.theme.white.lighter};
`;

interface sliderProps {
  dataLength: number;
  sectionTitle: string;
  children: React.ReactNode;
}
function Slider({ dataLength, sectionTitle, children }: sliderProps) {
  const slideAni = useAnimation();
  const windowWidth = useWindowWidth();
  const [page, setPage] = useState(0);
  const setIsDragging = useSetRecoilState(dragState);
  const maxPage = Math.ceil(dataLength / OFFSET) - 1;
  const dragConstRef = useRef<HTMLDivElement>(null);

  const paginate = (newDirection: number) => {
    const newPage = page + newDirection;
    if (newPage < 0 || newPage > maxPage) {
      slideAni.start({ x: -windowWidth * page });
    } else {
      setPage((cur) => cur + newDirection);
      slideAni.start({ x: -windowWidth * newPage });
    }
  };
  const onDragEnd = (info: PanInfo) => {
    let newDirection = 0;
    if (info.offset.x < -500) {
      newDirection = 1;
    } else if (info.offset.x > 500) {
      newDirection = -1;
    } else {
      newDirection = 0;
    }
    paginate(newDirection);
  };
  return (
    <Section>
      <SectionHeader>
        <h2>{sectionTitle}</h2>
        <Page>
          {page} / {maxPage}
        </Page>
      </SectionHeader>
      <Body>
        <AnimatePresence initial={false}>
          <Row
            animate={slideAni}
            transition={{ duration: 0.5, ease: "easeOut" }}
            drag="x"
            dragSnapToOrigin
            onDragEnd={(_, info) => onDragEnd(info)}
            onDragStart={() => setIsDragging(true)}
          >
            {children}
          </Row>
        </AnimatePresence>
        <Button direction={PREV} onClick={() => paginate(PREV)}>
          <MdArrowForwardIos size={40} />
        </Button>
        <Button direction={NEXT} onClick={() => paginate(NEXT)}>
          <MdArrowBackIos size={40} />
        </Button>
      </Body>
    </Section>
  );
}

export default Slider;
