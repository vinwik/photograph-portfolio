import React, { useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

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

const bgGradient = [
  "radial-gradient(ellipse at 50%, #4a2d18 0%, #1d1810 60%)",
  "radial-gradient(ellipse at 50%, #183847 0%, #111A1D 60%)",
  "radial-gradient(ellipse at 50%, #194617 0%, #111F11 60%)",
];

const menuLinks = ["/models", "/about", "/contact"];

function Work({
  isExpanded,
  setIsExpanded,
  index,
  setIndex,
  scrollPosition,
  setScrollPosition,
  introEnded,
  opacity,
  history,
}) {
  const AnimatedBgGradient = useSpring({
    to: { background: bgGradient[index !== null && introEnded ? index : 0] },
    from: {
      background: bgGradient[index !== null && introEnded ? index : 0],
    },
    delay: 1000,
    config: { mass: 5, tension: 50, friction: 14 },
  });

  useEffect(() => {
    setScrollPosition(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WorkPage
      style={AnimatedBgGradient}
      opacity={opacity}
      index={index}
      isExpanded={isExpanded}
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
          <ImageWrapper
            key={slide.id}
            opacity={opacity}
            isCurrent={index === i}
            isPrev={index > i}
            isNext={index < i}
            onClick={() => history.push("/models")}
          >
            <ImageLeft src={slide.left} alt="modals" isCurrent={index === i} />
            <ImageRight
              src={slide.right}
              alt="modals"
              isCurrent={index === i}
            />
          </ImageWrapper>
        );
      })}
      {slides.map((slide, i) => {
        return (
          <DescriptionContainer key={slide.page}>
            <DescriptionTitle isCurrent={index === i}>
              {slide.page}
            </DescriptionTitle>
            <DescriptionSubtitle>Photography</DescriptionSubtitle>
          </DescriptionContainer>
        );
      })}

      <SectionIndicatorContainer>
        {slides.map((slide, i) => {
          return (
            <SectionIndicatorWrapper key={i}>
              <SectionIndicatorNumber>{"0" + slide.id}</SectionIndicatorNumber>
              <SectionIndicatorBullet
                onClick={() => setIndex(i)}
                isCurrent={index === i}
              />
            </SectionIndicatorWrapper>
          );
        })}
      </SectionIndicatorContainer>
    </WorkPage>
  );
}

export default Work;

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
const WorkPage = styled(animated.div)`
  padding: 0 3em;
  display: grid;
  overflow: hidden;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 2fr 1fr;
  opacity: ${(props) => props.opacity};
  transform: ${(props) => (props.isExpanded ? "scale(0.6)" : "scale(1)")};
  background: bgGradient[ ${(props) => props.index}];
  box-shadow: 10px 10px 30px #00000080;
  box-shadow: ${(props) =>
    props.isExpanded ? "10px 10px 30px #00000080" : "none"};
  transition: transform 0.6s ease-in-out, box-shadow 0.6s ease-in-out,
    opacity 0.6s ease-in-out;
  /* user-select: none; */

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
    props.isCurrent ? "translateY(0%)" : "translateY(-100vh)"};
  opacity: ${(props) => (props.isCurrent ? 1 : 0)};
  transition: transform 1s ease-in-out, opacity 1s ease-in-out;
  transition-delay: ${(props) => (props.isCurrent ? "0.8s" : "0s")};
  cursor: pointer;

  ${ImageLeft} {
    opacity: ${(props) => (props.isCurrent ? 1 : 0)};
    transition: transform 0.8s ease-in-out,
      opacity 0.6s ease-in-out ${(props) => (props.isCurrent ? "0.6s" : "0.4s")};
  }
  ${ImageRight} {
    opacity: ${(props) => (props.isCurrent ? 1 : 0)};
    transition: transform 0.8s ease-in-out,
      opacity 0.6s ease-in-out ${(props) => (props.isCurrent ? "0.6s" : "0.4s")};
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
    transform: initial;
    transform: ${(props) =>
      props.isCurrent
        ? "translateX(0%)"
        : props.isNext
        ? "translateX(100vw)"
        : "translateX(-100vw)"};
    opacity: ${(props) => (props.isCurrent ? 1 : 0)};
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
  align-items: center;
  justify-content: flex-end;
  @media screen and (orientation: portrait), (max-width: 600px) {
    align-items: flex-start;
  }
`;
const SectionIndicatorNumber = styled.p`
  cursor: default;
  @media screen and (orientation: portrait), (max-width: 600px) {
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
    grid-row-start: 1;
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
