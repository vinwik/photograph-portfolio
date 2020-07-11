import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import { ReactComponent as Logo } from "./assets/jfr-logo.svg";
import { ReactComponent as LogoIntro } from "./assets/jfr-logo-intro.svg";
import { useSpring, animated } from "react-spring";
import { polyfill } from "smoothscroll-polyfill";
import AboutBg from "./assets/about.jpg";
import ContactBg from "./assets/contact.jpg";

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

const supportsNativeSmoothScroll =
  "scrollBehavior" in document.documentElement.style;

function App() {
  const [index, setIndex] = useState(null);
  const [introEnded, setIntroEnded] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [scrollBehaviorSupport] = useState(supportsNativeSmoothScroll);
  const [isMobile, setIsMobile] = useState(false);
  const totalImages = useRef(0);

  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleLoaded = () => {
    totalImages.current++;
    if (totalImages.current === 6) {
      setOpacity(1);
    }
  };

  var isScrollingg;

  function scrollEnd(position) {
    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrollingg);
    setIsScrolling(true);

    // Set a timeout to run after scrolling ends
    isScrollingg = setTimeout(() => {
      // Run the callback
      setIsScrolling(false);
      window.scrollTo({
        behavior: "smooth",
        top: window.innerHeight * position,
      });
      // setTimeout(() => {
      // setWindowHeight(window.innerHeight);
      // }, 0);
    }, 66);
  }

  const handleScroll = () => {
    const position = window.pageYOffset;
    const height = window.innerHeight;

    if (position < height * 0.5) {
      setScrollPosition(0);
      sessionStorage.setItem("scrollPosition", "0");
      scrollEnd(0);
    } else if (position < height * 1.5) {
      setScrollPosition(1);
      sessionStorage.setItem("scrollPosition", "1");
      scrollEnd(1);
    } else {
      setScrollPosition(2);
      sessionStorage.setItem("scrollPosition", "2");
      scrollEnd(2);
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

  const checkIsMobile = () => {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone|iPod|iPad/i)
    ) {
      setIsMobile(true);
    }
  };

  window.addEventListener("resize", () => {
    window.scrollTo({
      // behavior: "smooth",
      top: window.innerHeight * scrollPosition,
    });
  });

  // window.addEventListener("scroll", handleScroll, { passive: true });

  useEffect(() => {
    checkIsMobile();
    // setTimeout(() => {
    setIntroEnded(true);
    setIndex(0);
    // }, 3000);
    // window.scrollTo({
    //   behavior: "smooth",
    //   top: `${
    //     Number(sessionStorage.getItem("scrollPosition")) * window.innerHeight ||
    //     0
    //   }`,
    // });

    // window.scrollTo(0, Number(sessionStorage.getItem("scrollPosition")) || 0);

    // window.addEventListener("wheel", preventDefault, {
    //   passive: false,
    // });
    // window.addEventListener("DOMMouseScroll", preventDefault, false);

    window.addEventListener("keydown", preventDefaultKeys, false);
    // window.addEventListener("resize", () => {
    //   window.scrollTo({
    //     behavior: "smooth",
    //     top: window.innerHeight * scrollPosition,
    //   });
    // setWindowHeight(window.innerHeight);
    // if (
    //   window.innerWidth !== windowWidth &&
    //   window.innerHeight !== windowHeight
    // ) {
    //   window.scrollTo(0, window.innerWidth * scrollPosition);
    //   setWindowWidth(window.innerWidth);
    //   setWindowHeight(window.innerHeight);
    // }
    // });

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
    // // Setup isScrolling variable
    // var isScrollingg;

    // // Listen for scroll events
    // window.addEventListener(
    //   "scroll",
    //   function (event) {
    //     // Clear our timeout throughout the scroll
    //     window.clearTimeout(isScrollingg);
    //     setIsScrolling(true);

    //     // Set a timeout to run after scrolling ends
    //     isScrollingg = setTimeout(() => {
    //       // Run the callback
    //       setIsScrolling(false);
    //       setWindowHeight(window.innerHeight);
    //       window.scrollTo({
    //         behavior: "smooth",
    //         top: window.innerHeight * scrollPosition,
    //       });
    //     }, 66);
    //   },
    //   false
    // );
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <GlobalStyle index={index} isExpanded={isExpanded} isMobile={isMobile} />
      {/* <Intro introEnded={introEnded} opacity={opacity}>
        <LogoIntro />
      </Intro> */}
      <NavBar opacity={opacity} introEnded={introEnded}>
        <LogoWrapper
          index={index}
          scrollPosition={scrollPosition}
          isExpanded={isExpanded}
        >
          <Logo />
        </LogoWrapper>
        <Menu
          index={index}
          scrollPosition={scrollPosition}
          isExpanded={isExpanded}
        >
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
                    // setScrollPosition(index);
                    // window.scrollTo({
                    //   behavior: "smooth",
                    //   // top: window.innerHeight * index,
                    //   left: window.innerWidth * index,
                    // });
                    this.scrollLeft(window.innerWidth * index);

                    scrollPosition === index
                      ? setIsExpanded(false)
                      : scrollPosition - index === 1 ||
                        scrollPosition - index === -1
                      ? setTimeout(() => {
                          setIsExpanded(false);
                        }, 600)
                      : setTimeout(() => {
                          setIsExpanded(false);
                        }, 700);
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
        <Work
          style={AnimatedBgGradient}
          opacity={opacity}
          index={index}
          isExpanded={isExpanded}
          windowHeight={windowHeight}
          scrollBehaviorSupport={scrollBehaviorSupport}
          isMobile={isMobile}
          scrollPosition={scrollPosition}
          className="container"
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
        </Work>
        <About
          style={AnimatedBgSolidDark}
          opacity={opacity}
          index={index}
          isExpanded={isExpanded}
          windowHeight={windowHeight}
          scrollBehaviorSupport={scrollBehaviorSupport}
          isScrolling={isScrolling}
          isMobile={isMobile}
          scrollPosition={scrollPosition}
          onClick={() => {
            isExpanded &&
              window.scrollTo({
                behavior: "smooth",
                top: window.innerHeight,
              });
            isExpanded && setIsExpanded(false);
          }}
        >
          <SectionHeader about index={index}>
            <h1>About</h1>
          </SectionHeader>
          <SectionContent>
            <h1>
              Creative & Versatile <br />
              Freelance Photographer
            </h1>
            <p>
              {/* <br /> */}
              <br />
              <br />
              Hi there! <br />
              I'm Jeff Richards, freelance photographer base in London.
              <br />
              <br />
              When I’m not shooting you’ll find me scouting new places where I
              can drink a stout with my Kindle and eat good food. <br />
              <br />
              I’ve been a freelance photographer for 5 years and can’t imagine
              doing anything else. <br />
              <br />
              Photography is a vast and sublime world, hence my love for
              anything my lenses have in-focus.
              <br />
              <br />
              A portrait session with me is laid back and informal, just like
              hanging out with a mate.
              <br />
              <br />
              If this sounds like you, then <a href="#">get in touch</a> to book
              your photo session!
            </p>
          </SectionContent>
        </About>
        <Contact
          // style={{ background: bgSolidDark[index] }}
          style={AnimatedBgSolidDark}
          opacity={opacity}
          index={index}
          isExpanded={isExpanded}
          windowHeight={windowHeight}
          scrollBehaviorSupport={scrollBehaviorSupport}
          isMobile={isMobile}
          scrollPosition={scrollPosition}
          onClick={() => {
            isExpanded &&
              window.scrollTo({
                behavior: "smooth",
                top: window.innerHeight * 2,
              });
            isExpanded && setIsExpanded(false);
          }}
        >
          <SectionHeader contact index={index}>
            <h1>Contact</h1>
          </SectionHeader>
          <SectionContent contact>
            <h1>Hey there!</h1>
            <h2>
              Want to have a chat ? <br />
              Drop me a line here.
            </h2>
            <form>
              <div>
                <label>Full Name</label>
                <input type="text" name="name" />
              </div>
              <div>
                <label>Email</label>
                <input type="email" name="email" />
              </div>
              <div></div>
              <div>
                <label>Message</label>
                <textarea name="comment" form="usrform" rows="10">
                  Enter text here...
                </textarea>
              </div>

              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="paper-plane"
                  class="svg-inline--fa fa-paper-plane fa-w-16"
                  role="img"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="white"
                    d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
                  />
                </svg>
              </button>
            </form>
          </SectionContent>
        </Contact>
      </Body>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  *{
    /* FireFox*/
  scrollbar-width: none;
    /*IE10+*/
    -ms-overflow-style: -ms-autohiding-scrollbar;

  &::-webkit-scrollbar {
    /* Chrome, Safari, Edge */
    display: none;
    }
  }
  html {
    overflow-x: ${(props) =>
      props.isMobile || !props.isExpanded ? "hidden" : "auto"};
      
    /* scroll-snap-type: ${({ isMobile }) =>
      !isMobile ? `y mandatory` : "none"}; */
    /* overscroll-behavior: ${({ isMobile }) =>
      isMobile ? `auto` : "none"}; */
  }
  body{
    background: ${(props) =>
      props.isExpanded ? bgSolid[props.index] : bgSolidDark[props.index]};
       overflow-x: ${(props) => (!props.isExpanded ? "hidden" : "auto")};
      
      /* width: 120%; */
      /* transition: background 0.6s ease-in-out 1.2s; */
  transition: ${(props) =>
    props.isExpanded
      ? "background 0.05s ease-in-out"
      : "background 0.6s ease-in-out 1.2s"};
/* overflow: ${(props) => (props.isExpanded ? "scroll" : "hidden")}; */

  /* scroll-snap-type: y mandatory; */
  /* scroll-snap-type: ${(props) =>
    props.isScrolling ? "none" : "y mandatory"} */
  }
`;

const Body = styled(animated.div)`
  /* min-height: 300vh; */
  /* scroll-behavior: smooth; */
  opacity: ${(props) => (props.introEnded ? 1 : 0)};
  transition: opacity 1s ease-in-out 0.8s;
  display: flex;
  /* flex-wrap: nowrap; */
  width: 300vw;
  & > div {
    width: 100vw;
    /* flex: 0 0 auto; */
  }
`;
const Intro = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  /* width: 100vw; */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.introEnded ? 0 : 1)};
  transition: opacity 1s ease-in-out;

  svg {
    width: 60%;
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
  /* width: 100%; */
  width: 100%;
  /* top: 0;
  left: 0; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3em;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.6s ease-in-out 0.8s;
  z-index: 10;
  user-select: none;

  @media screen and (max-width: 600px) {
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
  pointer-events: none;
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
  pointer-events: auto;
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
  path {

  fill:${({ scrollPosition, isExpanded, index }) =>
    scrollPosition === 1 && !isExpanded ? bgSolid[index] : "#fff"};
  transition: fill 0.6s ease-in-out;
  }
     /* fill: ${bgSolid[0]}; */
  @media screen and (max-width: 600px) {
    height: 45%;
  }
`;
const Menu = styled.div`
  color: ${({ scrollPosition, isExpanded, index }) =>
    scrollPosition === 2 && !isExpanded ? bgSolid[index] : "#fff"};
  transition: color 0.6s ease-in-out;
`;

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
  @media screen and (orientation: portrait),
    (max-width: 600px) and (max-height: 700px) {
    max-height: 40vh;
  }
  @media screen and (orientation: portrait),
    (max-width: 600px) and (max-height: 600px) {
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
  @media screen and (orientation: portrait),
    (max-width: 600px) and (max-height: 700px) {
    max-height: 40vh;
  }
  @media screen and (orientation: portrait),
    (max-width: 600px) and (max-height: 600px) {
    max-height: 35vh;
  }
`;

const Container = styled(animated.div)`
  height: ${(props) => props.windowHeight + "px"};
  padding: 0 3em;
  scroll-snap-align: ${(props) =>
    props.scrollBehaviorSupport ? "center" : "none"};
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
const Work = styled(animated.div)`
  /* height: ${(props) => props.windowHeight + "px"}; */
  height: ${(props) => (props.isMobile ? props.windowHeight + "px" : "100vh")};
  /* height: 100vh; */
  /* width: 100vw; */
  /* flex-grow: 1; */
  padding: 0 3em;
  scroll-snap-align: ${(props) =>
    props.scrollBehaviorSupport ? "center" : "none"};
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
  transition: transform 0.6s ease-in-out, box-shadow 0.6s ease-in-out, opacity 0.6s ease-in-out;
  user-select: none;

  /* &>div {
      opacity: ${(props) =>
        !props.isExpanded && props.scrollPosition !== 0 ? 0 : props.opacity};
    } */

  @media screen and (orientation: portrait), (max-width: 600px) {
    grid-template-columns: 1fr 3fr 1fr;
    transform: ${(props) => (props.isExpanded ? "scale(0.7)" : "scale(1)")};
    opacity: ${(props) => (props.isExpanded ? 0.6 : props.opacity)};
    /* &>div {
      opacity: ${(props) =>
        !props.isExpanded && props.scrollPosition !== 0 ? 0 : props.opacity};
    } */
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
const About = styled(animated.div)`
  /* height: ${(props) => props.windowHeight + "px"}; */
  height: ${(props) => (props.isMobile ? props.windowHeight + "px" : "100vh")};
  /* height: 100vh; */
  /* padding: 0 3em; */
  scroll-snap-align: ${(props) =>
    props.scrollBehaviorSupport ? "center" : "none"};
  display: flex;
  /* align-items: center; */
  align-items: flex-end;
  overflow: hidden;
  opacity: ${(props) => props.opacity};
  transform: ${(props) => (props.isExpanded ? "scale(0.6)" : "scale(1)")};
  box-shadow: 10px 10px 30px #00000080;
  box-shadow: ${(props) =>
    props.isExpanded ? "10px 10px 30px #00000080" : "none"};
  transition: transform 0.6s ease-in-out, box-shadow 0.6s ease-in-out, opacity 0.6s ease-in-out;

  /* font-size: 18px; */
  background-color: #fff;
  /* overflow: scroll; */

  /* &>div {
      opacity: ${(props) =>
        !props.isExpanded && props.scrollPosition !== 1 ? 0 : props.opacity};
    } */
  

  @media screen and (orientation: portrait), (max-width: 600px) {
    grid-template-columns: 1fr 3fr 1fr;
    transform: ${(props) => (props.isExpanded ? "scale(0.7)" : "scale(1)")};
    opacity: ${(props) => (props.isExpanded ? 0.6 : props.opacity)};
    /* &>div {
      opacity: ${(props) =>
        !props.isExpanded && props.scrollPosition !== 1 ? 0 : props.opacity};
    } */
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

const SectionHeader = styled.div`
  width: 40%;
  background: url(${({ about }) => (about ? AboutBg : ContactBg)}) no-repeat
    center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  font-size: 30px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  user-select: none;

  h1 {
    color: ${(props) => bgSolid[props.index]};
    transform: translateY(-100%);
  }
  @media screen and (orientation: portrait), (max-width: 600px) {
    display: none;
  }
`;
const SectionContent = styled.div`
  width: 60%;
  padding: 0 10%;
  background-color: #ffffff0a;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  justify-content: ${({ contact }) => (contact ? "center" : "center")};
  /* padding-bottom: 60px; */
  padding-top: ${({ contact }) => (contact ? "100px" : 0)};
  /* padding-bottom: 1rem; */

  flex-grow: 1;
  height: 100%;

  h1 {
    line-height: ${({ contact }) => (contact ? 2 : 1.2)};
  }
  h2 {
    opacity: 0.5;
    line-height: 1.2;
  }
  p {
    line-height: 1.4;
    color: #d2d2d2;
  }
  a {
    color: #fff;
    font-weight: 700;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  form {
    margin-top: 2rem;
    text-align: right;
    div {
      display: flex;
      flex-direction: column;
      text-align: left;
    }
  }
  label {
    font-size: 14px;
    font-weight: 700;
  }
  input,
  textarea,
  button {
    font-size: 14px;
    padding: 5px 10px;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    resize: none;
    font-family: "Poppins";
    color: #fff;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 5px;
    border-color: transparent;
  }
  input[type="submit"],
  button {
    /* padding: 5px 15px; */
    background-color: rgba(255, 255, 255, 0.15);
    transform: translate(calc(100% + 15px), calc(-100% + -25px));
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: auto;

    &:hover {
      background-color: rgba(255, 255, 255, 0.35);
    }
  }
  svg {
    width: 20px;
    transform: translate(-1px, -2px) rotate(50deg);
    /* transform: rotate(65deg); */
  }
  path {
    width: 100%;
  }
  @media screen and (orientation: portrait), (max-width: 600px) {
    font-size: 14px;
  }
`;

const Contact = styled(animated.div)`
  height: ${(props) => (props.isMobile ? props.windowHeight + "px" : "100vh")};
  /* height: 100vh; */
  /* padding: 0 3em; */
  scroll-snap-align: ${(props) =>
    props.scrollBehaviorSupport ? "center" : "none"};
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  overflow: hidden;
  opacity: ${(props) => props.opacity};
  transform: ${(props) => (props.isExpanded ? "scale(0.6)" : "scale(1)")};
  box-shadow: 10px 10px 30px #00000080;
  box-shadow: ${(props) =>
    props.isExpanded ? "10px 10px 30px #00000080" : "none"};
  transition: transform 0.6s ease-in-out, box-shadow 0.6s ease-in-out,
    opacity 0.6s ease-in-out;

  /* font-size: 18px; */
  background-color: #fff;

  /* & > div {
    opacity: ${(props) =>
      !props.isExpanded && props.scrollPosition !== 2 ? 0 : props.opacity};
  } */

  @media screen and (orientation: portrait), (max-width: 600px) {
    grid-template-columns: 1fr 3fr 1fr;
    transform: ${(props) => (props.isExpanded ? "scale(0.7)" : "scale(1)")};
    opacity: ${(props) => (props.isExpanded ? 0.6 : props.opacity)};
    /* & > div {
      opacity: ${(props) =>
        !props.isExpanded && props.scrollPosition !== 2 ? 0 : props.opacity};
    } */
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
    props.isCurrent ? "translateY(0%)" : "translateY(-100vh)"};
  opacity: ${(props) => (props.isCurrent ? 1 : 0)};
  transition: transform 1s ease-in-out, opacity 1s ease-in-out;
  transition-delay: ${(props) => (props.isCurrent ? "0.8s" : "0s")};

  ${ImageLeft} {
    opacity: ${(props) => (props.isCurrent ? 1 : 0)};
    transition: transform 0.8s ease-in-out,
      opacity 0.6s ease-in-out ${(props) =>
        props.isCurrent ? "0.6s" : "0.4s"};
  }
  ${ImageRight} {
    /* transform: ${(props) =>
      props.isCurrent ? "translateY(10%)" : "translateY(20%)"}; */
    opacity: ${(props) => (props.isCurrent ? 1 : 0)};
    transition: transform 0.8s ease-in-out,
      opacity 0.6s ease-in-out ${(props) =>
        props.isCurrent ? "0.6s" : "0.4s"};
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
        ? "translateX(100vw)"
        : "translateX(-100vw)"};
    opacity: ${(props) => (props.isCurrent ? 1 : 0)};
    /* transition: opacity 1s ease-in-out; */
    transition-delay: ${(props) => (props.isCurrent ? "0.4s" : "0s")};
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
