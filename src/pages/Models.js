import React, { useRef, useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Sheltr, { SharedElement } from "@taito/react-sheltr";
import { useSpring, useTransition, animated } from "react-spring";
import Measure from "react-measure";

const images = [
  "./gallery/modals.jpg",
  "./gallery/travel.jpg",
  "./gallery/cuisine.jpg",
  "./gallery/about.jpg",
  "./gallery/contact.jpg",
  "./gallery/modals-copy.jpg",
  "./gallery/travel-copy.jpg",
  "./gallery/cuisine-copy.jpg",
  "./gallery/about-copy.jpg",
  "./gallery/contact-copy.jpg",
];

function Models({ isModalOpened, setIsModalOpen, windowHeight }) {
  //   const [isModalOpened, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imagesPosition, setImagesPosition] = useState([]);
  const [clonePosition, setClonePosition] = useState(null);
  const [endPosition, setEndPosition] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(1);

  const showActiveImage = (currentImage) => {
    setIsModalOpen(true);
    setCurrentImage(currentImage);
  };
  const hideActiveImage = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  // console.log(clonePosition);
  // console.log(endPosition);
  // console.log(scrollY);

  const pageEl = useRef(null);

  const handleScroll = () => {
    setScrollY(pageEl.current.scrollTop);
  };

  useEffect(() => {
    setOpacity(1);

    // setTimeout(() => {
    //   setScale(0.7);
    //   setTimeout(() => {
    //     setOpacity(1);
    //     setScale(1);
    //   }, 100);
    // }, 100);
  }, []);

  return (
    <div
      ref={pageEl}
      onScroll={handleScroll}
      style={{
        overflowY: "scroll",
        width: "100%",
        padding: "3em",
        paddingTop: "100px",
        zIndex: 100,
        opacity: opacity,
        // transform: `scale(${scale})`,
        transition: opacity
          ? "opacity 0.8s ease-in-out 0.6s, transform 0.8s ease-in-out"
          : "none",
        // height: `${window.innerHeight}px`,
      }}
    >
      {/* <Sheltr> */}
      {/* <Grid> */}
      <ResponsiveMasonry columnsCountBreakPoints={{ 500: 2, 800: 3, 1100: 4 }}>
        <Masonry gutter="15px">
          {images.map((image, i) => {
            return (
              <Image
                image={image}
                showActiveImage={showActiveImage}
                imagesPosition={imagesPosition}
                setImagesPosition={setImagesPosition}
                clonePosition={clonePosition}
                setClonePosition={setClonePosition}
                currentImage={currentImage}
                i={i}
              />
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
      {/* {isModalOpened && ( */}
      {clonePosition && (
        <CloneImage
          currentImage={currentImage}
          clonePosition={clonePosition}
          setClonePosition={setClonePosition}
          endPosition={endPosition}
          isModalOpened={isModalOpened}
          scrollY={scrollY}
        />
      )}

      <LightBox
        currentImage={currentImage}
        hideActiveImage={hideActiveImage}
        isModalOpened={isModalOpened}
        clonePosition={clonePosition}
        setIsModalOpen={setIsModalOpen}
        setEndPosition={setEndPosition}
        windowHeight={windowHeight}
      />
      {/* )} */}
      {/* </Grid> */}
      {/* </Sheltr> */}
    </div>
  );
}

const Image = ({
  image,
  showActiveImage,
  imagesPosition,
  setImagesPosition,
  clonePosition,
  setClonePosition,
  currentImage,
  i,
}) => {
  const [imagePosition, setImagePosition] = useState(null);

  //   console.log(imagePosition);

  return (
    <div
      onClick={() => showActiveImage(image)}
      // style={{ width: "100%", height: "100%" }}
    >
      <Measure
        bounds
        onResize={(contentRect) => {
          setImagePosition(contentRect.bounds);
        }}
        //   onClick={(contentRect) => {
        //     setClonePosition(contentRect.bounds);
        //   }}
      >
        {({ measureRef }) => {
          // console.log(measureRef);

          return (
            <Img
              ref={measureRef}
              onClick={() => setClonePosition(imagePosition)}
              clonePosition={clonePosition}
              isCurrentImage={image === currentImage}
            >
              <img
                key={image}
                src={image}
                alt={image}

                // style={
                //   {
                // width: "100%",
                // cursor: "pointer",
                // opacity: image === currentImage && clonePosition ? 0 : 1,
                //   }
                // }
              />
            </Img>
          );
        }}
      </Measure>
    </div>
  );
};

const CloneImage = ({
  currentImage,
  clonePosition,
  setClonePosition,
  endPosition,
  isModalOpened,
  scrollY,
}) => {
  const AnimatedCloneEnter = useSpring(
    isModalOpened
      ? {
          to: {
            top: endPosition.top,
            left: endPosition.left,
            width: endPosition.width,
            //   transform: `scale(${endPosition.width / clonePosition.width}) `,
          },
          from: {
            top: clonePosition.top - scrollY,
            left: clonePosition.left,
            width: clonePosition.width,
            position: "absolute",
            zIndex: 100,
          },

          // delay: 1000,
          // config: { mass: 5, tension: 50, friction: 14 },
          //   config: { mass: 1, tension: 170, friction: 26, clamp: true },
          config: { mass: 1, tension: 120, friction: 20, clamp: true },
        }
      : {
          from: {
            top: endPosition.top,
            left: endPosition.left,
            width: endPosition.width,
            //   transform: `scale(${endPosition.width / clonePosition.width}) `,
          },
          to: {
            top: clonePosition.top - scrollY,
            left: clonePosition.left,
            width: clonePosition.width,
            position: "absolute",
            zIndex: 100,
          },
          onRest: () => setClonePosition(null),
          //   config: { mass: 1, tension: 170, friction: 26, clamp: true },

          // delay: 1000,
          // config: { mass: 5, tension: 50, friction: 14 },
          config: { mass: 1, tension: 120, friction: 20, clamp: true },
        }
  );
  return (
    <animated.img
      src={currentImage}
      alt={currentImage}
      style={AnimatedCloneEnter}
    />
  );
};

const LightBox = ({
  currentImage,
  hideActiveImage,
  setIsModalOpen,
  isModalOpened,
  setEndPosition,
  clonePosition,
  windowHeight,
}) => {
  const [opacity, setOpacity] = useState(0);
  const [imagePosition, setImagePosition] = useState(null);

  return (
    <div
      onClick={() => setIsModalOpen(false)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: `${windowHeight}px`,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.9)",
        opacity: `${isModalOpened ? 1 : 0}`,
        // opacity: opacity,
        zIndex: `${clonePosition !== null ? 10 : -10}`,
        // zIndex: -10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2em",
        transition: "opacity 0.6s ease-in-out",
      }}
    >
      <svg
        onClick={() => setIsModalOpen(false)}
        style={{
          position: "absolute",
          top: "2em",
          right: "2em",
          width: "20px",
          cursor: "pointer",
          zIndex: 10000,
        }}
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="times"
        class="svg-inline--fa fa-times fa-w-11"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 352 512"
      >
        <path
          fill="#ffffff"
          d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
        ></path>
      </svg>
      {/* <h1 onClick={() => setIsModalOpen(false)}>X</h1> */}
      {/* <SharedElement sharedId={currentImage} startOnUnmount>
        {(sheltrProps) => ( */}
      <Measure
        bounds
        onResize={(contentRect) => {
          //   setImagePosition(contentRect.bounds);
          setEndPosition(contentRect.bounds);
        }}
      >
        {({ measureRef }) => {
          // console.log(measureRef);

          return (
            <div
              ref={measureRef}
              onClick={() => setEndPosition(imagePosition)}
              //   style={{ maxWidth: "100%", maxHeight: "100%" }}
            >
              <img
                src={currentImage}
                alt={currentImage}
                style={{
                  maxWidth: "100%",
                  //   maxHeight: "90vh",
                  maxHeight: "90vh",
                  //   objectFit: "contain",
                  //   transform: `${isModalOpened ? "scale(1)" : "scale(0.4)"}`,
                  //   transition: "transform 0.6s ease-in-out",
                  opacity: 0,
                  //   display: "block",
                }}
              />
            </div>
          );
        }}
      </Measure>
      {/* )}
      </SharedElement> */}
    </div>
  );
};

export default Models;

const Grid = styled.div`
  display: grid;
  /* grid-template-columns: repeat(6, 1fr); */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  /* grid-template-rows: repeat(8, 200px); */
  /* grid-template-rows: auto; */
  /* grid-auto-rows: 40px; */
  grid-gap: 1.5em;
  /* justify-content: center;
  align-items: center; */
  div {
    /* width: 25%; */
  }
  img {
    /* width: 100%; */
    /* height: 100%; */
    /* object-fit: cover; */
  }
`;
const Img = styled.div`
  cursor: pointer;
  opacity: ${(props) =>
    props.isCurrentImage && props.clonePosition ? 1 : 0.7};
  transition: opacity 0.4s ease-in-out;

  &:hover {
    opacity: 1;
  }
  img {
    width: 100%;
    /* filter: ${(props) =>
      props.isCurrentImage && props.clonePosition
        ? "grayscale(0%)"
        : "grayscale(60%)"}; */
    opacity: ${(props) =>
      props.isCurrentImage && props.clonePosition ? 0 : 1};
    /* transition: filter 0.4s ease-in-out;
    will-change: filter; */
    &:hover {
      /* filter: grayscale(0%); */
    }
  }
`;
