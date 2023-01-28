import styled from "styled-components";
import Logo from "./Svg/Logo";
import { Link, useMatch } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const Nav = styled(motion.nav)`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  color: white;
  font-size: 17px;
  z-index: 99;
`;
const Col = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Items = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
`;
const Item = styled.li`
  margin-left: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 24px;
`;
const Circle = styled(motion.span)`
  position: absolute;
  bottom: -7px;
  right: 0;
  left: 0;
  margin: 0 auto;
  width: 5px;
  height: 5px;
  background-color: ${(props) => props.theme.red};
  border-radius: 50%;
`;
const SearchButton = styled(motion.span)`
  margin-right: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
`;
const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  background-color: inherit;
  border: 1px solid white;
  height: 55px;
  width: 300px;
  padding-left: 50px;
  padding-right: 30px;
  z-index: -1;
  text-align: right;
  color: ${(props) => props.theme.white.lighter};
  border-radius: 3px;
  font-size: 18px;
`;
const Svg = styled(motion.svg)`
  width: 40px;
  height: 40px;
`;

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useMatch("/");
  const modalMatch = useMatch("/movies/:title/:id");
  const tvMatch = useMatch("/tv");
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 400],
    [
      "linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0))",
      "linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1))",
    ]
  );

  useEffect(() => {}, [searchOpen]);

  const toggleSearch = () => {
    setSearchOpen((cur) => !cur);
  };

  return (
    <Nav style={{ background }}>
      <Col>
        <Logo />
        <Items>
          <Item>
            <Link to="/">
              Home
              {homeMatch || modalMatch ? <Circle layoutId="circle" /> : null}
            </Link>
          </Item>
          <Item>
            <Link to="/tv">
              Tv Shows{tvMatch ? <Circle layoutId="circle" /> : null}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <SearchButton>
          <Svg
            initial={{ x: 0 }}
            animate={{ x: searchOpen ? -250 : 0 }}
            transition={{ ease: "easeOut" }}
            onClick={toggleSearch}
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            viewBox="0 0 1244.000000 1280.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <metadata>
              Created by potrace 1.15, written by Peter Selinger 2001-2017
            </metadata>
            <g
              transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
              fill="white"
              stroke="none"
            >
              <path d="M4025 12789 c-1029 -79 -1969 -501 -2704 -1214 -985 -955 -1456 -2292 -1285 -3650 156 -1244 849 -2360 1899 -3059 193 -129 272 -175 470 -274 452 -227 906 -362 1445 -429 207 -25 763 -25 970 0 404 50 752 138 1115 281 251 98 600 283 819 433 l80 54 1075 -1073 c3835 -3827 3770 -3762 3828 -3795 189 -105 411 -75 563 77 148 148 180 359 84 553 -21 43 -462 488 -2432 2459 -2212 2213 -2404 2408 -2392 2425 8 10 40 47 70 83 714 836 1088 1927 1031 3011 -32 610 -165 1136 -420 1664 -169 349 -340 615 -592 920 -106 128 -395 417 -524 524 -687 569 -1463 900 -2336 996 -174 19 -598 27 -764 14z m780 -949 c777 -118 1453 -463 1982 -1014 516 -536 829 -1194 930 -1951 24 -186 24 -618 0 -810 -54 -416 -158 -758 -342 -1125 -297 -593 -779 -1101 -1360 -1432 -964 -549 -2153 -590 -3152 -108 -975 470 -1667 1364 -1873 2420 -37 192 -51 323 -57 555 -6 258 4 423 42 651 161 971 742 1831 1588 2348 453 278 935 434 1512 490 22 2 164 3 315 1 217 -3 304 -8 415 -25z" />
            </g>
          </Svg>
          <Input
            initial={{ scaleX: 0 }}
            animate={{ scaleX: searchOpen ? 1 : 0 }}
            transition={{ ease: "easeOut" }}
            placeholder="Search for movie or tv show"
          />
        </SearchButton>
      </Col>
    </Nav>
  );
}

export default Header;
