import { AnimatePresence, motion, PanInfo, Variants } from "framer-motion";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dragState } from "../atoms";
import useWindowWidth from "../utils/useWindowDimensions";

const LEFT = -1;
const RIGHT = 1;
const OFFSET = 6;

interface IslideObj {
  direction: number;
  windowWidth: number;
}

const Section = styled.section`
  width: 100vw;
  h2 {
    font-size: 30px;
    margin-left: 30px;
    margin-bottom: 20px;
    font-weight: 900;
  }
  height: 300px;
  margin-bottom: 80px;
`;
const Body = styled(motion.div)`
  position: relative;
  height: 200px;
`;
const Row = styled(motion.div)`
  display: flex;
  gap: 12px;
  position: absolute;
  height: 100%;
  margin-bottom: 10px;
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

interface sliderProps {
  dataLength: number;
  sectionTitle: string;
  children: React.ReactNode;
}
function Slider({ dataLength, sectionTitle, children }: sliderProps) {
  const [isDragging, setIsDragging] = useRecoilState(dragState);
  const [dragConst, setDragConst] = useState([0, 0]);
  const windowWidth = useWindowWidth();
  const [[page, direction], setPage] = useState([0, 0]);
  const [leaving, setLeaving] = useState(false);
  const slideObj: IslideObj = { direction, windowWidth };

  const paginate = (newDirection: number) => {
    if (leaving) return;
    const maxPage = Math.ceil(dataLength / OFFSET);
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

  //   const onDragEnd = (
  //     event: MouseEvent | TouchEvent | PointerEvent,
  //     info: PanInfo
  //   ) => {
  //     setDragStart(false);
  //     console.log(info.offset.x);
  //     if (info.offset.x > 500) {
  //       console.log("prevPage");
  //       setDragConst((cur) => {
  //         return [cur[0] + 1920, cur[1] + 1920];
  //       });
  //     } else if (info.offset.x < -500) {
  //       console.log("nextPage");
  //       setDragConst((cur) => {
  //         return [cur[0] - 1920, cur[1] - 1920];
  //       });
  //     } else {
  //       console.log("curPage");
  //     }
  //   };

  return (
    <Section>
      <h2>{sectionTitle}</h2>
      <Body>
        <AnimatePresence
          initial={false}
          custom={slideObj}
          onExitComplete={toggleLeaving}
        >
          <Row
            exit="exit"
            custom={slideObj}
            transition={{ duration: 0.5, ease: "easeOut" }}
            drag="x"
            dragConstraints={{ left: -4330, right: 0 }}
            dragElastic={0.5}
          >
            {children}
          </Row>
        </AnimatePresence>
        <Button direction={RIGHT} onClick={() => paginate(RIGHT)}>
          next
        </Button>
        <Button direction={LEFT} onClick={() => paginate(LEFT)}>
          prev
        </Button>
      </Body>
    </Section>
  );
}

export default Slider;
