import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { ReactComponent as Logo } from "./assets/jfr-logo.svg";
import { ReactComponent as LogoIntro } from "./assets/jfr-logo-intro.svg";
import { useSpring, animated } from "react-spring";
// import "scroll-behavior-polyfill";
import { polyfill } from "smoothscroll-polyfill";

// kick off the polyfill!

import ScrollableAnchor from "react-scrollable-anchor";
import { configureAnchors } from "react-scrollable-anchor";
polyfill();

configureAnchors({ offset: -window.innerHeight * 0.2 });
// configureAnchors({ offset: -100 });

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
  const [isScrolling, setIsScrolling] = useState(false);
  const totalImages = useRef(0);

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    const height = window.innerHeight;
    // console.log(position);
    // console.log(height);

    // setSrollPosition(position);
    // if (isExpanded) {
    if (position < height * 0.5) {
      setScrollPosition(0);
      // console.log("about");
    } else if (position < height * 1.5) {
      setScrollPosition(1);
    } else {
      setScrollPosition(2);
    }

    // else if (position < height * 2) {
    //   window.scrollTo({
    //     behavior: "smooth",
    //     top: height,
    //   });
    // } else {
    //   window.scrollTo({
    //     behavior: "smooth",
    //     top: height * 2,
    //   });
    // }
    // }
    // setTimeout(() => {
    //   window.scrollTo({
    //     behavior: "smooth",
    //     top: window.innerHeight * scrollPosition,
    //   })
    // }, 0);
  };

  const handleLoaded = () => {
    totalImages.current++;
    if (totalImages.current === 6) {
      setOpacity(1);
    }
  };

  // const handleWheel = (e) => {
  //   if (e.deltaY > 0) {
  //     setTimeout(() => {
  //       setIndex(index + 1);
  //     }, 0);
  //   }
  //   if (e.deltaY < 0) {
  //     setIndex(index - 1);
  //   }

  //   if (index > 2) {
  //     setIndex(0);
  //   }
  //   if (index < 0) {
  //     setIndex(2);
  //   }
  // };

  // const handleKey = (e) => {
  //   // setTimeout(() => {
  //   if (e.keyCode === 40 && index < 2) {
  //     // console.log(indexRef.current);
  //     setIndex(index + 1);
  //   }
  //   if (e.keyCode === 40 && index === 2) {
  //     setIndex(0);
  //   }
  //   // }, 1000);

  //   if (e.keyCode === 38 && index > 0) {
  //     setIndex(index - 1);
  //   } else if (e.keyCode === 38) {
  //     setIndex(2);
  //   }
  // };

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

  const preventDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
    // window.scrollTo({ top: window.innerHeight });
    // setTimeout(() => {
    // if ((window.pageYOffset = window.innerHeight - window.innerHeight * 0.2)) {
    //   window.scrollBy(0, window.innerHeight * 0.2);
    // }
    setIntroEnded(true);
    setIndex(0);
    // window.addEventListener("wheel", preventDefault, {
    //   passive: false,
    // });
    // window.addEventListener("touch", preventDefault, {
    //   passive: false,
    // });
    window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
    window.addEventListener("wheel", preventDefault, {
      passive: false,
    }); // modern desktop
    window.addEventListener("touchstart", preventDefault, {
    window.addEventListener("keydown", preventDefaultKeys, false);
    return () => {
      window.removeEvListener("DOMMouseScroll", preventDefault);
      window.removeEvListener("wheel", preventDefault);
      window.removeEvListener("touch", preventDefault);
      window.removeEvListener("keydown", preventDefaultKeys);
    };
    // }, 3000);
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
  }, [isExpanded]);

  return (
    <>
      <GlobalStyle isScrolling={isScrolling} />
      <Intro introEnded={introEnded}>
        <LogoIntro />
      </Intro>
      <NavBar opacity={opacity} introEnded={introEnded}>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Menu>
          <h2
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ lineHeight: 1, cursor: "pointer" }}
          >
            Menu
          </h2>
          <MenuList isExpanded={isExpanded}>
            {menuItems.map((item, index) => {
              return (
                <MenuItem
                  active={scrollPosition === index}
                  onClick={() => {
                    setScrollPosition(index);
                    setIsScrolling(true);
                    window.scrollTo({
                      behavior: "smooth",
                      // left: 0,
                      top: window.innerHeight * index,
                    });

                    scrollPosition === index
                      ? setIsExpanded(false)
                      : scrollPosition - index === 1 || -1
                      ? setTimeout(() => {
                          setIsExpanded(false);
                          // setIsScrolling(false);
                        }, 600)
                      : setTimeout(() => {
                          setIsExpanded(false);
                          // setIsScrolling(false);
                        }, 800);
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
          onClick={() => isExpanded && setIsExpanded(false)}
        >
          {slides.map((slide, i) => {
            return (
              <>
                <ImageWrapper opacity={opacity} isCurrent={index === i}>
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
        <ScrollableAnchor id="about">
          <Container
            style={AnimatedBgGradient}
            opacity={opacity}
            index={index}
            isExpanded={isExpanded}
            onClick={() => isExpanded && setIsExpanded(false)}
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
        </ScrollableAnchor>
        <ScrollableAnchor id="contact">
          <Container
            style={AnimatedBgGradient}
            opacity={opacity}
            index={index}
            isExpanded={isExpanded}
            onClick={() => isExpanded && setIsExpanded(false)}
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
        </ScrollableAnchor>
      </Body>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body{
  /* scroll-snap-type: y mandatory; */
  scroll-snap-type: ${(props) => (props.isScrolling ? "none" : "y mandatory")}
  }
`;

const Body = styled(animated.div)`
  /* height: ${(props) => (props.isExpanded ? "300vh" : "100vh")}; */
  height: 300vh;
  scroll-behavior: smooth;
  width: 100%;
  opacity: ${(props) => (props.introEnded ? 1 : 0)};
  /* transform: ${(props) =>
    props.isExpanded
      ? "translateY(0)"
      : `translateY(-${props.scrollPosition * 100}vh)`}; */
  /* margin-top: ${(props) =>
    props.isExpanded ? 0 : props.scrollPosition + "vh"}; */
  transition: opacity 1s ease-in-out 0.8s;
  /* transition-delay: 0.8s; */
  /* overflow: ${(props) => (props.isExpanded ? "auto" : "hidden")}; */
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
`;

const MenuList = styled.ul`
  position: absolute;
  top: 0;
  right: 0;
  padding: 3em;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  z-index: -1;
  transform: translateX(100%);
  transition: transform 0.6s ease-in-out;
  transform: ${(props) =>
    props.isExpanded ? "translateX(0)" : "translateX(100%)"};
`;

const MenuItem = styled.h1`
  opacity: ${(props) => (props.active ? 1 : 0.3)};
  transition: opacity 0.6s ease-in-out;
  cursor: pointer;

  &:hover {
    opacity: ${(props) => (props.active ? 1 : 0.7)};
  }
`;

const LogoWrapper = styled.div`
  height: 40px;
  svg {
    height: 100%;
    width: auto;
  }
`;
const Menu = styled.div`
  /* line-height: 1; */
`;

const ImageLeft = styled.img`
  max-height: 60vh;
  max-width: 49%;
  margin-right: 4px;
  transform: translateY(-10%);
  transition: transform 0.6s ease-in-out;
  box-shadow: 0 0 20px #00000070;
`;
const ImageRight = styled.img`
  max-height: 60vh;
  max-width: 49%;
  transform: translateY(10%);
  transition: transform 0.6s ease-in-out;
  box-shadow: 0 0 20px #00000070;
`;

const Container = styled(animated.div)`
  height: 100vh;
  padding: 0 3rem;
  scroll-snap-align: center;
  display: grid;
  overflow: hidden;
  /* grid-template-columns: 33% 34% 33%; */
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 25% 50% 25%;
  opacity: ${(props) => props.opacity};
  transform: ${(props) => (props.isExpanded ? "scale(0.6)" : "scale(1)")};
  background: radial-gradient(ellipse at 50%, #4a2d18 0%, #1d1810 60%);
  box-shadow: 10px 10px 30px #00000080;
  transition: transform 0.6s ease-in-out;

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
`;
const SectionIndicatorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const SectionIndicatorNumber = styled.p`
  cursor: default;
`;
const SectionIndicatorBullet = styled.div`
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
`;
const DescriptionContainer = styled.div`
  grid-column-start: 1;
  grid-row-start: 3;
  /* margin-top: calc(-1vh - 2.8em); */
  /* align-self: flex-end;
  padding-bottom: 3em; */
`;
const DescriptionTitle = styled.h1`
  font-size: 2.8em;
  line-height: 1.2;
  cursor: default;
  opacity: ${(props) => (props.isCurrent ? 1 : 0)};
  transition: opacity 0.6s ease-in-out;
  transition-delay: 1s;
`;
const DescriptionSubtitle = styled.p`
  font-size: 2em;
  line-height: 1;
  padding-left: 2em;
  cursor: default;
`;
