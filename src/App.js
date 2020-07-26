import React, { useRef, useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "./assets/jfr-logo.svg";
import { ReactComponent as LogoIntro } from "./assets/jfr-logo-intro.svg";
import { useSpring, useTransition, animated } from "react-spring";
import { polyfill } from "smoothscroll-polyfill";
import Work from "./pages/Work";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Models from "./pages/Models";

export function debounce(func, wait = 5, immediate = true) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const images = [
  "./modals-left.jpg",
  "./modals-right.jpg",
  "./travel-left.jpg",
  "./travel-right.jpg",
  "./cuisine-left.jpg",
  "./cuisine-right.jpg",
  "./about.jpg",
  "./contact.jpg",
];

polyfill();

const bgSolid = ["#4a2d18", "#183847", "#194617"];
const bgSolidDark = ["#1d1810", "#111A1D", "#111F11"];

const menuItems = ["WORK", "ABOUT", "CONTACT"];
const menuLinks = ["/", "/about", "/contact"];

// const supportsNativeSmoothScroll =
//   "scrollBehavior" in document.documentElement.style;

const keys = [];
let previousKey;

function App() {
  const [index, setIndex] = useState(null);
  const [locationIndex, setLocationIndex] = useState(null);
  const [introEnded, setIntroEnded] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [navBg, setNavBg] = useState(0);
  const [isModalOpened, setIsModalOpen] = useState(false);

  const totalImages = useRef(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  let location = useLocation();
  let history = useHistory();

  history.listen((location, action) => {
    const { key } = location;
    // console.log(keys.indexOf(key) < keys.indexOf(previousKey));

    // If there is no key, it was a goBack.
    if (key === undefined) {
      // console.log("goBack");
      return;
    }

    // If it's an entirely new key, it was a goForward.
    // If it was neither of the above, you can compare the index
    // of `key` to the previous key in your keys array.
    if (!keys.includes(key)) {
      keys.push(key);
      // console.log("goForward");
    } else if (keys.indexOf(key) < keys.indexOf(previousKey)) {
      // console.log("goBack");
    } else {
      // console.log("goForward");
    }

    previousKey = key;
  });
    from: {
      transform:
        !isExpanded && location.pathname === "/"
          ? "translate(-100%,0%)"
          : !isExpanded
          ? "translate(0%,0%)"
          : locationIndex
          ? "translate(0,-100%)"
          : "translate(0,100%)",
      position: "absolute",
      overflow: "hidden",
      // width: "100%",
    },
    enter: { transform: "translate(0%,0%)" },
    leave: {
      transform:
        !isExpanded && location.pathname === "/models"
          ? "translate(-100%,0%)"
              ? "translate(0%,-100%)"
              : "translate(0%,100%)",
              ? "translate(0%,100%)"
              : "translate(0%,-100%)",
    },
  });

  const handleLoaded = () => {
    totalImages.current++;
    if (totalImages.current === 8) {
      setOpacity(1);
    }
  };

  const AnimatedBgSolid = useSpring({
    to: { background: bgSolid[index !== null ? index : 0] },
    from: { background: bgSolid[index !== null ? index : 0] },
    delay: 1000,
    config: { mass: 5, tension: 50, friction: 14 },
  });

  const checkIsMobile = () => {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone|iPod|iPad/i)
    ) {
      setIsMobile(true);
    }
  };

  const isPortrait = windowHeight > windowWidth;

  window.addEventListener("resize", () => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  });

  const handleScroll = () => {
    if (scrollY < 200) {
      setScrollY(window.scrollY);
    }
  };

  const navigateToContact = () => {
    setLocationIndex(false);
    setIsExpanded(true);
    setTimeout(() => {
      history.push(menuLinks[2]);
      setTimeout(() => {
        setIsExpanded(false);
      }, 700);
    }, 700);
  };

  useEffect(() => {
    checkIsMobile();
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
      img.onload = handleLoaded;
    });
    // setTimeout(() => {
    setIntroEnded(true);
    // }, 2500);
    if (opacity && introEnded) {
      setIndex(0);
    }
    if (scrollY > windowHeight * 0.3 - 60) {
      setNavBg(1);
    } else {
      setNavBg(0);
    }

    window.addEventListener("scroll", debounce(handleScroll));
    return () => window.removeEventListener("scroll", debounce(handleScroll));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opacity, introEnded, scrollY, windowHeight]);

  return (
    <>
      <GlobalStyle
        index={index}
        isExpanded={isExpanded}
        isMobile={isMobile}
        location={location}
      />
      <Intro
        introEnded={introEnded}
        opacity={opacity}
        windowHeight={windowHeight}
      >
        <LogoIntro />
      </Intro>
      <NavBar
        opacity={opacity}
        introEnded={introEnded}
        navBg={navBg}
        isExpanded={isExpanded}
        location={location}
        isModalOpened={isModalOpened}
        isGallery={location.pathname === "/models"}
      >
        <LogoWrapper
          index={index}
          scrollPosition={scrollPosition}
          isExpanded={isExpanded}
          className="nav__logo-wrapper"
          onClick={() => {
            location.pathname === "/models" && history.push(menuLinks[0]);
          }}
        >
          <Logo />
        </LogoWrapper>
        <Menu
          index={index}
          scrollPosition={scrollPosition}
          isExpanded={isExpanded}
          className="nav__menu"
        >
          <h2
            onClick={() => {
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
                  key={item}
                  active={scrollPosition === index}
                  onClick={() => {
                    setScrollPosition(index);
                    setLocationIndex(scrollPosition > index);
                    location.pathname !== menuLinks[index] &&
                      index === 2 &&
                      history.push(menuLinks[index - 1]);
                    location.pathname !== menuLinks[index] &&
                      index === 0 &&
                      history.push(menuLinks[index + 1]);
                    setTimeout(() => {
                      history.push(menuLinks[index]);
                    }, 100);
                    scrollPosition !== index && setNavBg(0);
                    scrollPosition === index
                      ? setIsExpanded(false)
                      : scrollPosition - index === 1 ||
                        scrollPosition - index === -1
                      ? setTimeout(() => {
                          setIsExpanded(false);
                        }, 700)
                      : setTimeout(() => {
                          setIsExpanded(false);
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
        windowHeight={windowHeight}
        style={AnimatedBgSolid}
      >
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            <Switch location={item}>
              <Route
                exact
                path="/"
                render={() => (
                  <Work
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                    index={index}
                    setIndex={setIndex}
                    scrollPosition={scrollPosition}
                    setScrollPosition={setScrollPosition}
                    introEnded={introEnded}
                    setIntroEnded={setIntroEnded}
                    opacity={opacity}
                    windowHeight={windowHeight}
                    history={history}
                  />
                )}
              />
              <Route
                exact
                path="/models"
                render={() => (
                  <Models
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                    index={index}
                    setIndex={setIndex}
                    scrollPosition={scrollPosition}
                    setScrollPosition={setScrollPosition}
                    introEnded={introEnded}
                    setIntroEnded={setIntroEnded}
                    opacity={opacity}
                    windowHeight={windowHeight}
                    isModalOpened={isModalOpened}
                    setIsModalOpen={setIsModalOpen}
                  />
                )}
              ></Route>
              <Route
                path="/about"
                render={() => (
                  <About
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                    index={index}
                    setIndex={setIndex}
                    scrollPosition={scrollPosition}
                    setScrollPosition={setScrollPosition}
                    opacity={opacity}
                    windowHeight={windowHeight}
                    windowWidth={windowWidth}
                    setNavBg={setNavBg}
                    isPortrait={isPortrait}
                    navigateToContact={navigateToContact}
                  />
                )}
              />
              <Route
                path="/contact"
                render={() => (
                  <Contact
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                    index={index}
                    setIndex={setIndex}
                    scrollPosition={scrollPosition}
                    setScrollPosition={setScrollPosition}
                    opacity={opacity}
                    windowHeight={windowHeight}
                    windowWidth={windowWidth}
                    setNavBg={setNavBg}
                    isPortrait={isPortrait}
                  />
                )}
              />
            </Switch>
          </animated.div>
        ))}
      </Body>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`

html {
  scrollbar-width: none;
  -ms-overflow-style: none; 
}

html::-webkit-scrollbar {
    display: none;
}
  
  body {
    background: ${(props) =>
      props.isExpanded ? bgSolid[props.index] : bgSolidDark[props.index]};
    transition: ${(props) =>
      props.isExpanded
        ? "background 0.05s ease-in-out"
        : "background 0.6s ease-in-out 1.2s"};

    @supports (-webkit-touch-callout: none) {
      overflow: ${({ location, isExpanded }) =>
        location.pathname !== "/" && !isExpanded ? "hidden" : "auto"};

}
  }

  a {
    text-decoration: none;
    color: #fff;
  }
`;

const Body = styled(animated.div)`
  & > div {
    width: 100%;
    opacity: ${(props) => (props.introEnded && props.opacity ? 1 : 0)};
    transition: opacity 1s ease-in-out 0.8s;
    & > div {
      height: ${(props) => props.windowHeight + "px"};
      user-select: ${(props) => (props.isExpanded ? "none" : "auto")};
      cursor: ${(props) => (props.isExpanded ? "pointer" : "auto")};
      @media screen and (orientation: portrait), (max-width: 600px) {
        overflow-y: ${(props) => (props.isExpanded ? "hidden" : "scroll")};
      }
    }
  }
`;
const Intro = styled.div`
  position: fixed;
  height: 100%;
  height: 100vh;
  height: ${(props) => props.windowHeight + "px"};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.introEnded && props.opacity ? 0 : 1)};
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
const NavBar = styled(animated.div)`
  position: fixed;
  height: 100px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3em;
  opacity: ${(props) => (props.introEnded && props.opacity ? 1 : 0)};
  transition: opacity 0.6s ease-in-out 0.8s;
  z-index: ${(props) => (props.isModalOpened ? 0 : 10)};
  user-select: none;

  & > div {
    /* pointer-events: ${(props) => (props.isModalOpened ? "none" : "auto")}; */
  }

  .nav__logo-wrapper {
    position: relative;
    opacity: ${(props) => (props.isModalOpened ? 0.1 : 1)};
    transform: ${(props) => `translateX(${props.isGallery ? "20px" : "0px"})`};
    transition: transform 0.6s ease-in-out, opacity 0.6s ease-in-out;
    cursor: ${(props) => (props.isGallery ? "pointer" : "auto")};
    &::before {
      content: "<";
      position: absolute;
      left: -50%;
      top: 50%;
      line-height: 1;
      font-family: "Poppins";
      font-size: 2em;
      transform: translateY(-50%);
      opacity: ${(props) => (props.isGallery ? 1 : 0)};
      transition: opacity 0.6s ease-in-out;
    }
  }

  .nav__menu {
    opacity: ${(props) => (props.isGallery ? 0 : 1)};
    pointer-events: ${(props) => (props.isGallery ? "none" : "auto")};
    transition: opacity 0.6s ease-in-out, color 0.6s ease-in-out;
  }

  @media screen and (max-width: 600px) {
    height: 60px;
    padding: 0 2em;
    background-color: ${(props) =>
      props.navBg && !props.isExpanded && props.location.pathname !== "/"
        ? "#EFF3F3"
        : "transparent"};
  }
`;

const MenuList = styled.ul`
  position: fixed;
  top: 0;
  right: 0;
  padding: 3em;
  min-height: 100vh;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  z-index: -10;
  transform: translateX(100%);
  opacity: ${(props) => (props.isExpanded ? 1 : 0)};
  transition: transform 0.6s ease-in-out, height 1s ease,
    opacity 0.6s ease-in-out;
  transform: ${(props) =>
    props.isExpanded ? "translateX(0)" : "translateX(100%)"};

  @media screen and (orientation: portrait), (max-width: 600px) {
    justify-content: flex-end;
    min-height: unset;
    height: ${(props) => props.windowHeight + "px"};
    padding: 0 3em 3em 0;
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
    opacity: ${(props) => (props.active ? 1 : 0.5)};
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
    fill: ${({ scrollPosition, isExpanded, index }) =>
      scrollPosition === 1 && !isExpanded ? bgSolid[index] : "#fff"};
    transition: fill 0.6s ease-in-out;
  }
  @media screen and (orientation: portrait), (max-width: 600px) {
    height: 45%;
    path {
      fill: ${({ scrollPosition, isExpanded, index }) =>
        scrollPosition !== 0 && !isExpanded ? bgSolid[index] : "#fff"};
      transition: fill 0.6s ease-in-out;
    }
  }
`;
const Menu = styled.div`
  color: ${({ scrollPosition, isExpanded, index }) =>
    scrollPosition === 2 && !isExpanded ? bgSolid[index] : "#fff"};
  transition: color 0.6s ease-in-out;
  @media screen and (max-width: 600px) {
    color: ${({ scrollPosition, isExpanded, index }) =>
      scrollPosition !== 0 && !isExpanded ? bgSolid[index] : "#fff"};
    transition: color 0.6s ease-in-out;
  }
`;
