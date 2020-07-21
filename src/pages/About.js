import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const bgSolid = ["#4a2d18", "#183847", "#194617"];
const bgSolidDark = ["#1d1810", "#111A1D", "#111F11"];

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

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function About({
  isExpanded,
  setIsExpanded,
  index,
  scrollPosition,
  setScrollPosition,
  opacity,
  windowHeight,
  windowWidth,
  isPortrait,
  setNavBg,
  navigateToContact,
}) {
  const [scrollY, setScrollY] = useState(0);
  //   const [scrollHeight, setScrollHeight] = useState(0);
  const pageEl = useRef(null);

  const AnimatedBgSolidDark = useSpring(
    index !== null && {
      to: { background: bgSolidDark[index] },
      from: { background: bgSolidDark[index] },
      delay: 1000,
      config: { mass: 5, tension: 50, friction: 14 },
    }
  );

  const handleScroll = () => {
    setScrollY(pageEl.current.scrollTop);
  };

  useEffect(() => {
    setScrollPosition(1);

    if (scrollY > windowHeight * 0.3 - 60) {
      setNavBg(1);
    } else {
      setNavBg(0);
    }

    // setScrollHeight(pageEl.current.scrollHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY, windowHeight]);

  return (
    <AboutPage
      style={AnimatedBgSolidDark}
      opacity={opacity}
      index={index}
      isExpanded={isExpanded}
      windowHeight={windowHeight}
      scrollPosition={scrollPosition}
      onScroll={debounce(handleScroll)}
      ref={pageEl}
      onClick={() => {
        isExpanded && setIsExpanded(false);
      }}
    >
      <SectionHeader about index={index}>
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "30vh",
            backgroundColor: "#EFF3F3",
            opacity: `${(scrollY / (windowHeight * 0.3)) * 2}`,
            zIndex: 5,
          }}
        ></div>
        <h1
          style={{
            transform:
              isPortrait || windowWidth <= 600
                ? `translateY(${clamp(
                    scrollY / 2,
                    0,
                    windowHeight * 0.3 - 60
                  )}px)`
                : `translateY(-100%)`,
            opacity: 4 - (scrollY / (windowHeight * 0.3)) * 6,
          }}
        >
          About
        </h1>
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
          When I’m not shooting you’ll find me scouting new places where I can
          drink a stout with my Kindle and eat good food. <br />
          <br />
          I’ve been a freelance photographer for 5 years and can’t imagine doing
          anything else. <br />
          <br />
          Photography is a vast and sublime world, hence my love for anything my
          lenses have in-focus.
          <br />
          <br />
          A portrait session with me is laid back and informal, just like
          hanging out with a mate.
          <br />
          <br />
          If this sounds like you, then{" "}
          <span onClick={() => navigateToContact()}>get in touch</span> to book
          your photo session!
        </p>
      </SectionContent>
    </AboutPage>
  );
}

export default About;

const AboutPage = styled(animated.div)`
  display: flex;
  overflow: hidden;
  opacity: ${(props) => props.opacity};
  transform: ${(props) => (props.isExpanded ? "scale(0.6)" : "scale(1)")};
  box-shadow: 10px 10px 30px #00000080;
  box-shadow: ${(props) =>
    props.isExpanded ? "10px 10px 30px #00000080" : "none"};
  transition: transform 0.6s ease-in-out, box-shadow 0.6s ease-in-out,
    opacity 0.6s ease-in-out;

  @media screen and (orientation: portrait), (max-width: 600px) {
    display: block;
    transform: ${(props) => (props.isExpanded ? "scale(0.7)" : "scale(1)")};
    opacity: ${(props) => (props.isExpanded ? 0.6 : props.opacity)};
    flex-direction: column;
    height: ${(props) => props.windowHeight + "px"};
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
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
  background: url("/about.jpg") no-repeat center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  /* user-select: none; */
  transition: background 0.6s ease-in-out;
  h1 {
    color: ${(props) => bgSolid[props.index]};
  }
  @media screen and (orientation: portrait), (max-width: 600px) {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 30vh;
    box-shadow: 0 0 10px black;
    overflow: hidden;
    h1 {
      font-size: calc(24px + 2.5vh);
      z-index: 6;
    }
  }
`;
const SectionContent = styled.div`
  width: 60%;
  padding: 0 10%;
  background-color: #ffffff0a;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: ${({ contact }) => (contact ? "center" : "center")};
  padding-top: ${({ contact }) => (contact ? "100px" : 0)};

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
  span {
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  @media screen and (orientation: portrait), (max-width: 600px) {
    font-size: 1.6vh;
    font-size: calc(8px + 0.8vh);
    min-height: 70vh;
    width: 100%;
    padding: 8vw;
    /* padding: 8vw;
    padding-top: 3vw;
    padding-bottom: 3vw; */

    h1,
    p {
      max-width: 600px;
      margin: 0 auto;
    }
    h1 {
      text-align: center;
      font-size: 1.6em;
    }
  }
`;
