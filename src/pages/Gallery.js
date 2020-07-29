import React, { useRef, useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useSpring, useTransition, animated } from "react-spring";
import Measure from "react-measure";

let images = [];

function Gallery({
  isModalOpened,
  setIsModalOpen,
  windowHeight,
  pageIndex,
  setPageIndex,
  location,
  gallerySection,
}) {
  //   const [isModalOpened, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imagesPosition, setImagesPosition] = useState([]);
  const [imagePosition, setImagePosition] = useState(null);
  const [clonePosition, setClonePosition] = useState(null);
  const [endPosition, setEndPosition] = useState(null);
  const [lightBoxImageOpacity, setLightBoxImageOpacity] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(1);
  const [index, setIndex] = useState(null);

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
  // console.log(scrollY);

  const pageEl = useRef(null);

  function importAll(r) {
    return r.keys().map(r);
  }

  const handleScroll = () => {
    setScrollY(pageEl.current.scrollTop);
  };

  const dynamicImport = [
    require.context("../assets/models", true, /\.(png|jpe?g)$/),
    require.context("../assets/travel", true, /\.(png|jpe?g)$/),
    require.context("../assets/cuisine", true, /\.(png|jpe?g)$/),
  ];

  const currentPage = gallerySection.indexOf(location.pathname);

  console.log(currentPage);
  console.log(location.pathname);
  console.log(pageIndex);

  useEffect(() => {
    setOpacity(1);
    if (pageIndex !== currentPage) {
      setPageIndex(currentPage);
    }
    images = importAll(dynamicImport[currentPage]);
    // setTimeout(() => {
    //   setScale(0.7);
    //   setTimeout(() => {
    //     setOpacity(1);
    //     setScale(1);
    //   }, 100);
    // }, 100);
    return () => setIsModalOpen(false);
  }, [pageIndex]);

  return (
    <GalleryPage
      ref={pageEl}
      onScroll={handleScroll}
      opacity={opacity}
      // style={{
      //   overflowY: "scroll",
      //   width: "100%",
      //   padding: "3em",
      //   paddingTop: "100px",
      //   zIndex: 100,
      //   opacity: opacity,
      //   // transform: `scale(${scale})`,
      //   transition: opacity
      //     ? "opacity 0.8s ease-in-out 0.6s, transform 0.8s ease-in-out"
      //     : "none",
      //   // height: `${window.innerHeight}px`,
      // }}
    >
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
                index={index}
                setIndex={setIndex}
                i={i}
              />
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
      {clonePosition && (
        <CloneImage
          currentImage={currentImage}
          clonePosition={clonePosition}
          setClonePosition={setClonePosition}
          endPosition={endPosition}
          isModalOpened={isModalOpened}
          scrollY={scrollY}
          index={index}
          setIndex={setIndex}
          lightBoxImageOpacity={lightBoxImageOpacity}
          setLightBoxImageOpacity={setLightBoxImageOpacity}
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
        lightBoxImageOpacity={lightBoxImageOpacity}
      />
    </GalleryPage>
  );
}

const Image = ({
  image,
  showActiveImage,
  imagesPosition,
  setImagesPosition,
  // imagePosition,
  // setImagePosition,
  clonePosition,
  setClonePosition,
  currentImage,
  i,
  index,
  setIndex,
}) => {
  const [imagePosition, setImagePosition] = useState(null);

  //   console.log(imagePosition);
  useEffect(() => {
    if (i === index) {
      setClonePosition(imagePosition);
      showActiveImage(image);
    }
  }, [i, index, imagePosition, image]);

  return (
    <div
    // onClick={() => showActiveImage(image)}
    // style={{ width: "100%", height: "100%" }}
    >
      <Measure
        bounds
        onResize={(contentRect) => {
          setImagePosition(contentRect.bounds);
        }}
      >
        {({ measureRef }) => {
          // console.log(measureRef);

          return (
            <Img
              ref={measureRef}
              onClick={() => setIndex(i)}
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
  index,
  setIndex,
  lightBoxImageOpacity,
  setLightBoxImageOpacity,
}) => {
  const [opacity, setOpacity] = useState(1);
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
          onRest: () => {
            setLightBoxImageOpacity(1);
            setOpacity(0);
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
          onStart: () => {
            setOpacity(1);
            setLightBoxImageOpacity(0);
          },
          onRest: () => {
            setClonePosition(null);
            setIndex(null);
            // setOpacity(1);
          },
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
      style={{ ...AnimatedCloneEnter, opacity: opacity }}
      onClick={() => setIndex(index + 1)}
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
  lightBoxImageOpacity,
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
      <Measure
        bounds
        onResize={(contentRect) => {
          setEndPosition(contentRect.bounds);
        }}
      >
        {({ measureRef }) => {
          return (
            <div ref={measureRef} onClick={() => setEndPosition(imagePosition)}>
              <img
                src={currentImage}
                alt={currentImage}
                style={{
                  maxWidth: "100%",
                  maxHeight: "90vh",
                  opacity: lightBoxImageOpacity,
                }}
              />
            </div>
          );
        }}
      </Measure>
    </div>
  );
};

export default Gallery;

const GalleryPage = styled.div`
  overflow-y: scroll;
  width: 100%;
  padding: 3em;
  padding-top: 100px;
  z-index: 100;
  opacity: ${(props) => props.opacity};
  transition: ${(props) =>
    props.opacity
      ? "opacity 0.8s ease-in-out 0.6s, transform 0.8s ease-in-out"
      : "none"};
  @media screen and (max-width: 600px) {
    padding-top: 60px;
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
  @media screen and (orientation: portrait), (max-width: 600px) {
    opacity: 1;
  }
`;
