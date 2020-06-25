import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { ReactComponent as Logo } from "./assets/jfr-logo.svg";
import { ReactComponent as LogoIntro } from "./assets/jfr-logo-intro.svg";
import { useSpring, animated } from "react-spring";
import { polyfill } from "smoothscroll-polyfill";

import { configureAnchors } from "react-scrollable-anchor";
polyfill();

configureAnchors({ offset: -window.innerHeight * 0.2 });

const slides = [
  {
    id: 1,
    left: "./modals-left.jpg",
    right: "./modals-right.jpg",
    page: "MODELS",
  },
  {
    id: 2,
    left: "./travel-left.jpg",
    right: "./travel-right.jpg",
    page: "TRAVEL",
  },
  {
    id: 3,
    left: "./cuisine-left.jpg",
    right: "./cuisine-right.jpg",
    page: "CUISINE",
  },
];

const bgSolid = ["#4a2d18", "#183847", "#194617"];
const bgSolidDark = ["#1d1810", "#111A1D", "#111F11"];

const bgGradient = [
  "radial-gradient(ellipse at 50%, #4a2d18 0%, #1d1810 60%)",
  "radial-gradient(ellipse at 50%, #183847 0%, #111A1D 60%)",
  "radial-gradient(ellipse at 50%, #194617 0%, #111F11 60%)",
];

const menuItems = ["WORK", "ABOUT", "CONTACT"];

function App() {
  const [index, setIndex] = useState(null);
  const [introEnded, setIntroEnded] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const totalImages = useRef(0);

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleLoaded = () => {
    totalImages.current++;
    if (totalImages.current === 6) {
      setOpacity(1);
    }
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    const height = window.innerHeight;

    if (position < height * 0.5) {
      setScrollPosition(0);
      sessionStorage.setItem("scrollPosition", "0");
    } else if (position < height * 1.5) {
      setScrollPosition(1);
      sessionStorage.setItem("scrollPosition", "1");
    } else {
      setScrollPosition(2);
      sessionStorage.setItem("scrollPosition", "2");
    }
  };

  const AnimatedBgGradient = useSpring(
    index !== null &&
      introEnded && {
        to: { background: bgGradient[index] },
        from: { background: bgGradient[index] },
        delay: 1000,
        config: { mass: 5, tension: 50, friction: 14 },
      }
  );
  const AnimatedBgSolid = useSpring(
    index !== null && {
      to: { background: bgSolid[index] },
      from: { background: bgSolid[index] },
      delay: 1000,
      config: { mass: 5, tension: 50, friction: 14 },
    }
  );
  const AnimatedBgSolidDark = useSpring(
    index !== null && {
      to: { background: bgSolidDark[index] },
      from: { background: bgSolidDark[index] },
      delay: 1000,
      config: { mass: 5, tension: 50, friction: 14 },
    }
  );

  const preventDefault = (e) => {
    e.preventDefault();
  };
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = { 37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 33: 1, 34: 1, 35: 1, 36: 1 };

  const preventDefaultKeys = (e) => {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  };

  useEffect(() => {
    setIntroEnded(true);
    setIndex(0);
    window.scrollTo({
      behavior: "smooth",
      top: `${
        Number(sessionStorage.getItem("scrollPosition")) * window.innerHeight ||
        0
      }`,
    });

    // window.scrollTo(0, Number(sessionStorage.getItem("scrollPosition")) || 0);

    // window.addEventListener("wheel", preventDefault, {
    //   passive: false,
    // });
    // window.addEventListener("DOMMouseScroll", preventDefault, false);

    // window.addEventListener("keydown", preventDefaultKeys, false);
    window.addEventListener("resize", () => {
      setWindowHeight(window.innerHeight);
      if (
        window.innerWidth !== windowWidth &&
        window.innerHeight !== windowHeight
      ) {
        window.scrollTo(0, 0);
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      }
    });
    return () => {
      window.removeEvListener("DOMMouseScroll", preventDefault);
      window.removeEvListener("wheel", preventDefault);
      window.removeEvListener("keydown", preventDefaultKeys);
      window.addEventListener("resize");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    // if (!isExpanded) {
    // window.addEventListener("wheel", preventDefault, {
    //   passive: false,
    // });
    // }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <GlobalStyle index={index} isExpanded={isExpanded} />
      <Intro introEnded={introEnded}>
        <LogoIntro />
      </Intro>
      <NavBar opacity={opacity} introEnded={introEnded}>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Menu>
          <h2
            onClick={() => {
              window.scrollTo({
                behavior: "smooth",
                top: window.innerHeight * scrollPosition,
              });
              setIsExpanded(!isExpanded);
            }}
            style={{ lineHeight: 1, cursor: "pointer" }}
          >
            Menu
          </h2>
          <MenuList
            index={index}
            isExpanded={isExpanded}
            windowHeight={windowHeight}
          >
            {menuItems.map((item, index) => {
              return (
                <MenuItem
                  active={scrollPosition === index}
                  onClick={() => {
                    setScrollPosition(index);
                    window.scrollTo({
                      behavior: "smooth",
                      top: window.innerHeight * index,
                    });

                    scrollPosition === index
                      ? setIsExpanded(false)
                      : scrollPosition - index === 1 || -1
                      ? setTimeout(() => {
                          setIsExpanded(false);
                        }, 600)
                      : setTimeout(() => {
                          setIsExpanded(false);
                        }, 1000);
                  }}
                >
                  {item}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </NavBar>
      <Body
        opacity={opacity}
        introEnded={introEnded}
        isExpanded={isExpanded}
        scrollPosition={scrollPosition}
        index={index}
        style={AnimatedBgSolid}
      >
        <Container
          style={AnimatedBgGradient}
          opacity={opacity}
          index={index}
          isExpanded={isExpanded}
          windowHeight={windowHeight}
          onClick={() => {
            isExpanded &&
              window.scrollTo({
                behavior: "smooth",
                top: 0,
              });
            isExpanded && setIsExpanded(false);
          }}
        >
          {slides.map((slide, i) => {
            return (
              <>
                <ImageWrapper
                  opacity={opacity}
                  isCurrent={index === i}
                  isPrev={index > i}
                  isNext={index < i}
                >
                  <ImageLeft
                    onLoad={() => handleLoaded(slide.left)}
                    src={slide.left}
                    alt="modals"
                    isCurrent={index === i}
                  />
                  <ImageRight
                    onLoad={() => handleLoaded(slide.right)}
                    src={slide.right}
                    alt="modals"
                    isCurrent={index === i}
                  />
                </ImageWrapper>

                <DescriptionContainer>
                  <DescriptionTitle isCurrent={index === i}>
                    {slide.page}
                  </DescriptionTitle>
                  <DescriptionSubtitle>Photography</DescriptionSubtitle>
                </DescriptionContainer>
              </>
            );
          })}

          <SectionIndicatorContainer>
            {slides.map((slide, i) => {
              return (
                <SectionIndicatorWrapper>
                  <SectionIndicatorNumber>
                    {"0" + slide.id}
                  </SectionIndicatorNumber>
                  <SectionIndicatorBullet
                    onClick={() => setIndex(i)}
                    isCurrent={index === i}
                  />
                </SectionIndicatorWrapper>
              );
            })}
          </SectionIndicatorContainer>
        </Container>
        <Container
          // style={{ background: bgSolidDark[index] }}
          style={AnimatedBgSolidDark}
          opacity={opacity}
          index={index}
          isExpanded={isExpanded}
          windowHeight={windowHeight}
          onClick={() => {
            isExpanded &&
              window.scrollTo({
                behavior: "smooth",
                top: window.innerHeight,
              });
            isExpanded && setIsExpanded(false);
          }}
        >
          {slides.map((slide, i) => {
            return (
              <>
                <ImageWrapper
                  opacity={opacity}
                  isCurrent={index === i}
                ></ImageWrapper>

                <DescriptionContainer>
                  <DescriptionTitle isCurrent={index === i}>
                    {slide.page}
                  </DescriptionTitle>
                  <DescriptionSubtitle>Photography</DescriptionSubtitle>
                </DescriptionContainer>
              </>
            );
          })}

          <SectionIndicatorContainer>
            {slides.map((slide, i) => {
              return (
                <SectionIndicatorWrapper>
                  <SectionIndicatorNumber>
                    {"0" + slide.id}
                  </SectionIndicatorNumber>
                  <SectionIndicatorBullet
                    onClick={() => setIndex(i)}
                    isCurrent={index === i}
                  />
                </SectionIndicatorWrapper>
              );
            })}
          </SectionIndicatorContainer>
        </Container>
        <Container
          // style={{ background: bgSolidDark[index] }}
          style={AnimatedBgSolidDark}
          opacity={opacity}
          index={index}
          isExpanded={isExpanded}
          windowHeight={windowHeight}
          onClick={() => {
            isExpanded &&
              window.scrollTo({
                behavior: "smooth",
                top: window.innerHeight * 2,
              });
            isExpanded && setIsExpanded(false);
          }}
        >
          {slides.map((slide, i) => {
            return (
              <>
                <ImageWrapper
                  opacity={opacity}
                  isCurrent={index === i}
                ></ImageWrapper>

                <DescriptionContainer>
                  <DescriptionTitle isCurrent={index === i}>
                    {slide.page}
                  </DescriptionTitle>
                  <DescriptionSubtitle>Photography</DescriptionSubtitle>
                </DescriptionContainer>
              </>
            );
          })}

          <SectionIndicatorContainer>
            {slides.map((slide, i) => {
              return (
                <SectionIndicatorWrapper>
                  <SectionIndicatorNumber>
                    {"0" + slide.id}
                  </SectionIndicatorNumber>
                  <SectionIndicatorBullet
                    onClick={() => setIndex(i)}
                    isCurrent={index === i}
                  />
                </SectionIndicatorWrapper>
              );
            })}
          </SectionIndicatorContainer>
        </Container>
      </Body>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
*{
  /*FireFox*/
/* scrollbar-width: none; */
  /*IE10+*/
  /* -ms-overflow-style: -ms-autohiding-scrollbar; */

/* &::-webkit-scrollbar { */
  /*Chrome, Safari, Edge*/
  /* display: none; */
  /* } */
}
html {
/* overflow: ${(props) => (props.isExpanded ? "auto" : "hidden")}; */
overflow: hidden;
  /* width: 100vw; */
}
  body{
    background: ${(props) =>
      props.isExpanded ? bgSolid[props.index] : bgSolidDark[props.index]};
      /* width: 120%; */
      /* transition: background 0.6s ease-in-out 1.2s; */
  transition: ${(props) =>
    props.isExpanded
      ? "background 0.05s ease-in-out"
      : "background 0.6s ease-in-out 1.2s"};
  /* scroll-snap-type: y mandatory; */
  /* scroll-snap-type: ${(props) =>
    props.isScrolling ? "none" : "y mandatory"} */
  }
`;

const Body = styled(animated.div)`
  /* min-height: 300vh; */
  scroll-behavior: smooth;
  width: 100%;
  opacity: ${(props) => (props.introEnded ? 1 : 0)};
  transition: opacity 1s ease-in-out 0.8s;
`;
const Intro = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.introEnded ? 0 : 1)};
  transition: opacity 1s ease-in-out;

  svg {
    path {
      stroke-dasharray: 1800;
      animation: animate 2.5s linear, pulse 2s infinite ease-in-out 1.5s;
      @keyframes animate {
        from {
          stroke-dashoffset: 1800;
        }
        to {
          stroke-dashoffset: 1200;
        }
      }
      @keyframes pulse {
        0% {
          fill: rgba(255, 255, 255, 0);
        }
        50% {
          fill: rgba(255, 255, 255, 0.4);
        }
        100% {
          fill: rgba(255, 255, 255, 0);
        }
      }
    }
  }
`;
const NavBar = styled.div`
  position: fixed;
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3em;
  opacity: ${(props) => (props.introEnded ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  z-index: 10;

  @media screen and (orientation: portrait), (max-width: 600px) {
    height: 60px;
  }
`;

const MenuList = styled.ul`
  position: fixed;
  top: 0;
  right: 0;
  /* bottom: 0; */
  padding: 3em;
  min-height: 100vh;
  /* min-height: -webkit-fill-available; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  z-index: -10;
  transform: translateX(100%);
  transition: transform 0.6s ease-in-out, height 1s ease;
  transform: ${(props) =>
    props.isExpanded ? "translateX(0)" : "translateX(100%)"};

  @media screen and (orientation: portrait), (max-width: 600px) {
    justify-content: flex-end;
    min-height: unset;
    /* height: 90vh; */
    height: ${(props) => props.windowHeight + "px"};

    padding: 0 3em 3em 0;
    /* width: 100%; */
    /* background: ${(props) => bgSolid[props.index] + "99"}; */
    /* opacity: ${(props) => (props.isExpanded ? 1 : 0)}; */
    /* transition: ${(props) =>
      props.isExpanded
        ? "opacity 0.6s ease-in-out 0s, transform 0s ease-in-out 0s"
        : "opacity 0.6s ease-in-out 0s, transform 0s ease-in-out 0.6s"}; */
    /* transition: opacity 0.6s ease-in-out 0.6s, transform 0.6s ease-in-out 0s */
    /* filter: blur(5px); */
    /* padding: ${window.innerWidth * 0.1}; */
    /* font-size: 1.4em; */
  }
`;

const MenuItem = styled.h1`
  opacity: ${(props) => (props.active ? 1 : 0.3)};
  transition: opacity 0.6s ease-in-out;
  cursor: pointer;

  &:hover {
    opacity: ${(props) => (props.active ? 1 : 0.7)};
  }
  @media screen and (orientation: portrait), (max-width: 600px) {
    /* color: ${(props) => (props.active ? "#fff" : "#888")}; */
    /* opacity: 1; */
    opacity: ${(props) => (props.active ? 1 : 0.5)};
    /* transition: color 0.6s ease-in-out; */
    text-shadow: 2px 2px 10px #00000090;
  }
`;

const LogoWrapper = styled.div`
  height: 40%;
  svg {
    height: 100%;
    width: auto;
  }
  @media screen and (orientation: portrait), (max-width: 600px) {
    height: 45%;
  }
`;
const Menu = styled.div``;

const ImageLeft = styled.img`
  max-height: 60vh;
  max-width: calc(50% - 2px);
  margin-right: 2px;
  transform: translateY(-10%);
  transition: transform 0.6s ease-in-out;
  box-shadow: 0 0 20px #00000070;
  @media screen and (orientation: portrait), (max-width: 600px) {
    max-height: 50vh;
  }
  @media screen and (max-height: 700px) {
    max-height: 40vh;
  }
  @media screen and (max-height: 600px) {
    max-height: 35vh;
  }
`;
const ImageRight = styled.img`
  max-height: 60vh;
  max-width: calc(50% - 2px);
  margin-left: 2px;
  transform: translateY(10%);
  transition: transform 0.6s ease-in-out;
  box-shadow: 0 0 20px #00000070;
  @media screen and (orientation: portrait), (max-width: 600px) {
    max-height: 50vh;
  }
  @media screen and (max-height: 700px) {
    max-height: 40vh;
  }
  @media screen and (max-height: 600px) {
    max-height: 35vh;
  }
`;

const Container = styled(animated.div)`
  height: ${(props) => props.windowHeight + "px"};
  /* min-height: 100vh; */
  /* min-height: -webkit-fill-available; */
  padding: 0 3em;
  scroll-snap-align: center;
  display: grid;
  overflow: hidden;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 25% 50% 25%;
  opacity: ${(props) => props.opacity};
  transform: ${(props) => (props.isExpanded ? "scale(0.6)" : "scale(1)")};
  background: radial-gradient(ellipse at 50%, #4a2d18 0%, #1d1810 60%);
  box-shadow: 10px 10px 30px #00000080;
  box-shadow: ${(props) =>
    props.isExpanded ? "10px 10px 30px #00000080" : "none"};
  transition: transform 0.6s ease-in-out, box-shadow 0.6s ease-in-out,
    height 1s ease, opacity 0.6s ease-in-out;
  z-index: 100;

  @media screen and (orientation: portrait), (max-width: 600px) {
    grid-template-columns: 1fr 3fr 1fr;
    transform: ${(props) => (props.isExpanded ? "scale(0.7)" : "scale(1)")};
    opacity: ${(props) => (props.isExpanded ? 0.6 : props.opacity)};
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: pointer;
    display: ${(props) => (props.isExpanded ? "block" : "none")};
    z-index: 5;
  }
`;
const ImageWrapper = styled.div`
  grid-column-start: 2;
  grid-row-start: 2;
  align-self: center;
  justify-self: center;
  transform: ${(props) =>
    props.isCurrent ? "translateY(0%)" : "translateY(-170%)"};
  opacity: ${(props) => (props.isCurrent ? 1 : 0)};
  transition: transform 1s ease-in-out, opacity 1s ease-in-out;
  transition-delay: ${(props) => (props.isCurrent ? "0.6s" : "0s")};

  ${ImageRight} {
    transform: ${(props) =>
      props.isCurrent ? "translateY(10%)" : "translateY(20%)"};
  }
  &:hover {
    ${ImageLeft} {
      transform: translateY(0);
      transition-delay: 0s;
    }
    ${ImageRight} {
      transform: translateY(0);
      transition-delay: 0s;
    }
  }

  @media screen and (orientation: portrait), (max-width: 600px) {
    /* overflow: hidden; */
    transform: initial;
    transform: ${(props) =>
      props.isCurrent
        ? "translateX(0%)"
        : props.isNext
        ? "translateX(170%)"
        : "translateX(-170%)"};
    opacity: ${(props) => (props.isCurrent ? 1 : 0)};
    /* transition: opacity 1s ease-in-out; */
    transition-delay: ${(props) => (props.isCurrent ? "0.6s" : "0s")};
    ${ImageRight} {
      transform: translateY(10%);
    }
  }
`;
const SectionIndicatorContainer = styled.div`
  grid-column-start: 3;
  grid-row-start: 2;
  align-self: center;
  & > div {
    margin-bottom: 2em;
    &:last-child {
      margin-bottom: 0;
    }
  }
  @media screen and (orientation: portrait), (max-width: 600px) {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    padding: 1em;
    & > div {
      margin-bottom: 0;
      margin-right: 2em;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;
const SectionIndicatorWrapper = styled.div`
  display: flex;
  /* align-items: flex-start; */
  align-items: center;
  justify-content: flex-end;
  @media screen and (orientation: portrait), (max-width: 600px) {
    /* flex-direction: row-reverse; */
    /* display: none; */
    /* margin-right: 1.5em; */
    align-items: flex-start;
  }
`;
const SectionIndicatorNumber = styled.p`
  cursor: default;
  @media screen and (orientation: portrait), (max-width: 600px) {
    /* justify-self: flex-end; */
    /* margin-left: 0; */
    display: none;
  }
`;
const SectionIndicatorBullet = styled.div`
  font-size: 14px;
  height: 1em;
  width: 1em;
  background-color: #fff;
  border-radius: 2em;
  margin-left: 2em;
  cursor: pointer;
  opacity: ${(props) => (props.isCurrent ? 1 : 0.5)};
  transition: transform 0.6s ease-in-out, opacity 1.6s ease-in-out;
  &:hover {
    transform: scale(1.5);
  }
  @media screen and (orientation: portrait), (max-width: 600px) {
    margin-left: 0;
  }
`;
const DescriptionContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 3;

  @media screen and (orientation: portrait), (max-width: 600px) {
    grid-column-start: 2;
    /* grid-column-end: 3; */
    grid-row-start: 1;
    /* align-self: flex-end; */
    /* justify-self: center; */
    margin-top: 30px;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 5;
  }
`;
const DescriptionTitle = styled.h1`
  font-size: 2.8em;
  line-height: 1.2;
  cursor: default;
  opacity: ${(props) => (props.isCurrent ? 1 : 0)};
  transition: opacity 0.6s ease-in-out;
  transition-delay: 1s;
  @media screen and (orientation: portrait), (max-width: 600px) {
    font-size: 2em;
  }
`;
const DescriptionSubtitle = styled.p`
  font-size: 2em;
  line-height: 1;
  padding-left: 2em;
  cursor: default;
  @media screen and (orientation: portrait), (max-width: 600px) {
    padding-left: 0;
    font-size: 1.8em;
  }
`;
