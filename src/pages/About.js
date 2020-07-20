import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import AboutBg from "../assets/about.jpg";

const bgSolid = ["#4a2d18", "#183847", "#194617"];
const bgSolidDark = ["#1d1810", "#111A1D", "#111F11"];

const supportsNativeSmoothScroll =
  "scrollBehavior" in document.documentElement.style;

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

function About({
  isExpanded,
  setIsExpanded,
  index,
  scrollPosition,
  setScrollPosition,
  opacity,
  windowHeight,
}) {
  //   const [index, setIndex] = useState(null);
  const [introEnded, setIntroEnded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [scrollBehaviorSupport] = useState(supportsNativeSmoothScroll);
  const [isMobile, setIsMobile] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(0);
  const totalImages = useRef(0);

  const [isScrolling, setIsScrolling] = useState(false);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", debounce(handleScroll));
    return () => window.removeEventListener("scroll", debounce(handleScroll));
  }, [debounce]);

  const [{ springscrollY }, springsetScrollY] = useSpring(() => ({
    springscrollY: 0,
  }));

  const parallaxLevel = 20;
  springsetScrollY({ springscrollY: scrollY });
  const interpHeader = springscrollY.interpolate(
    (o) => `translateY(${o / parallaxLevel}px)`
  );

  const AnimatedBgSolidDark = useSpring(
    index !== null && {
      to: { background: bgSolidDark[index] },
      from: { background: bgSolidDark[index] },
      delay: 1000,
      config: { mass: 5, tension: 50, friction: 14 },
    }
  );

  useEffect(() => {
    setIntroEnded(true);
    setScrollPosition(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AboutPage
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
          If this sounds like you, then <a href="#">get in touch</a> to book
          your photo session!
        </p>
      </SectionContent>
    </AboutPage>
  );
}

export default About;

const AboutPage = styled(animated.div)`
  /* height: ${(props) =>
    props.isMobile ? props.windowHeight + "px" : "100vh"}; */
  display: flex;
  /* align-items: flex-end; */
  /* overflow: hidden; */
  opacity: ${(props) => props.opacity};
  transform: ${(props) => (props.isExpanded ? "scale(0.6)" : "scale(1)")};
  box-shadow: 10px 10px 30px #00000080;
  box-shadow: ${(props) =>
    props.isExpanded ? "10px 10px 30px #00000080" : "none"};
  transition: transform 0.6s ease-in-out, box-shadow 0.6s ease-in-out, opacity 0.6s ease-in-out;

  /* background-color: #fff; */
  /* &>div {
      opacity: ${(props) =>
        !props.isExpanded && props.scrollPosition !== 1 ? 0 : props.opacity};
    } */
  

  @media screen and (orientation: portrait), (max-width: 600px) {
    transform: ${(props) => (props.isExpanded ? "scale(0.7)" : "scale(1)")};
    opacity: ${(props) => (props.isExpanded ? 0.6 : props.opacity)};
    flex-direction: column;
    min-height: ${(props) => props.windowHeight + "px"};
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
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex-grow: 1; */
  font-size: 30px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  user-select: none;
  transition: background 0.6s ease-in-out;
  h1 {
    color: ${(props) => bgSolid[props.index]};
    transform: translateY(-100%);
  }
  @media screen and (orientation: portrait), (max-width: 600px) {
    /* display: none; */
    width: 100%;
    height: 30vh;
    /* flex-flow: unset; */
    h1 {
      transform: translateY(0%);
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
  /* overflow: scroll; */

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
  }
  path {
    width: 100%;
  }
  @media screen and (orientation: portrait), (max-width: 600px) {
    font-size: 14px;
    justify-content: flex-start;
    width: 100%;
    padding: 8vw;

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
