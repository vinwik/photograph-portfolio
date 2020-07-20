import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import AboutBg from "../assets/about.jpg";
import ContactBg from "../assets/contact.jpg";

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

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function ContactPage({
  isExpanded,
  setIsExpanded,
  index,
  scrollPosition,
  setScrollPosition,
  opacity,
  windowHeight,
  windowWidth,
  isPortrait,
  //   setNavBg,
}) {
  const [introEnded, setIntroEnded] = useState(false);
  const [scrollBehaviorSupport] = useState(supportsNativeSmoothScroll);
  const [isMobile, setIsMobile] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const totalImages = useRef(0);

  const [scrollY, setScrollY] = useState(0);
  const pageEl = useRef(null);

  //   const handleLoaded = () => {
  //     totalImages.current++;
  //     if (totalImages.current === 6) {
  //       setOpacity(1);
  //     }
  //   };

  //   console.log(scrollY);

  const AnimatedHeight = useSpring({
    to: { height: windowHeight * 0.3 - scrollY + "px" },
    from: { height: windowHeight * 0.3 - scrollY + "px" },
    //   delay: 1000,
    // config: { mass: 5, tension: 50, friction: 14 },
  });
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
  const handleScroll = () => {
    // console.log(pageEl.current.scrollTop);

    setScrollY(pageEl.current.scrollTop);
  };

  useEffect(() => {
    setIntroEnded(true);
    setScrollPosition(2);
    if (scrollY > windowHeight * 0.3 - 60) {
      setNavBg(1);
    } else {
      setNavBg(0);
    }
    // const handleScroll = () => setScrollY(window.scrollY);
    // window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY, windowHeight]);

  return (
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
      onScroll={debounce(handleScroll)}
      ref={pageEl}
      onClick={() => {
        isExpanded && setIsExpanded(false);
      }}
    >
      {/* <div
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "30vh",
          backgroundColor: "#EFF3F3",
          opacity: `${(scrollY / (windowHeight * 0.3)) * 2}`,
          zIndex: 5,
        }}
      ></div> */}
      {/* <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "60px",
          backgroundColor: "#EFF3F3",
          opacity: navBg ? 1 : 0,
          zIndex: 8,
          transform: `translateY(${scrollY}px)`,
        }}
      ></div> */}
      <SectionHeader
        contact
        index={index}
        // style={{ transform: `scaleY(${1 - scrollY / 100})` }}
        // scrollY={scrollY}
      >
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
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "60px",
            backgroundColor: "#EFF3F3",
            opacity: navBg ? 1 : 0,
            zIndex: 8,
            transform: `translateY(${clamp(scrollY, 0, windowHeight)}px)`,
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
          Contact
        </h1>
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
            <textarea
              name="comment"
              value=" Enter text here..."
              form="usrform"
              rows="10"
            />
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
  );
}

export default ContactPage;

const SectionHeader = styled.div`
  width: 40%;
  background: url("/contact.jpg") no-repeat center/cover;
  /* background-color: #fff; */
  /* background-attachment: fixed; */
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex-grow: 1; */
  /* height: 100%; */
  /* font-size: 30px; */
  font-size: 2em;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  user-select: none;
  transition: background 0.6s ease-in-out;

  h1 {
    color: ${(props) => bgSolid[props.index]};
    /* transform: translateY(-100%); */
  }
  @media screen and (orientation: portrait), (max-width: 600px) {
    /* display: none; */
    /* position: absolute; */
    position: relative;
    /* background: initial; */
    z-index: 2;
    width: 100%;
    /* height: ${(props) => `calc(30vh - ${props.scrollY}px)`}; */
    /* transform: ${(props) => `translateY(-${props.scrollY}px)`}; */
    min-height: 60px;
    max-height: 30vh;
    height: 30vh;
    box-shadow: 0 0 10px black;
    overflow: hidden;
    h1 {
      /* transform: translateY(0%); */
      font-size: calc(24px + 2.5vh);
      /* font-size: 6vh; */
      /* font-size: 14px; */
      z-index: 6;
    /* transform: ${(props) => `translateY(${props.scrollY / 2}px)`}; */

    }
    /* &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: url("/contact.jpg") no-repeat center/cover;
    } */
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
    /* font-size: 14px; */
    font-size: 1.6vh;
    font-size: calc(8px + 0.8vh);
    min-height: 70vh;
    /* justify-content: flex-start; */
    /* justify-content: space-around; */
    /* position: absolute; */
    width: 100%;
    padding: 8vw;
    padding-top: 3vw;
    /* padding-top: calc(30vh + 3vw); */
    /* padding-top: ${(props) => `calc(30vh + 3vw - ${props.scrollY}px)`}; */
    padding-bottom: 3vw;
    /* padding-top: 30vh; */
    /* overflow-y: scroll; */
    button {
      transform: unset;
    }
  }
`;

const Contact = styled(animated.div)`
  /* height: ${(props) =>
    props.isMobile ? props.windowHeight + "px" : "100vh"}; */
  display: flex;
  flex-direction: row-reverse;
  /* align-items: center; */
  /* overflow: hidden; */
  /* background-color: #ffffff0a; */
  opacity: ${(props) => props.opacity};
  transform: ${(props) => (props.isExpanded ? "scale(0.6)" : "scale(1)")};
  box-shadow: 10px 10px 30px #00000080;
  box-shadow: ${(props) =>
    props.isExpanded ? "10px 10px 30px #00000080" : "none"};
  transition: transform 0.6s ease-in-out, box-shadow 0.6s ease-in-out,
    opacity 0.6s ease-in-out;

  /* & > div {
    opacity: ${(props) =>
      !props.isExpanded && props.scrollPosition !== 2 ? 0 : props.opacity};
  } */

  @media screen and (orientation: portrait), (max-width: 600px) {
    display: block;
    transform: ${(props) => (props.isExpanded ? "scale(0.7)" : "scale(1)")};
    opacity: ${(props) => (props.isExpanded ? 0.6 : props.opacity)};
    flex-direction: column;
    
    height: ${(props) => props.windowHeight + "px"};
    /* white-space:nowrap; */
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
