import React, { useState, useReducer, useEffect, useRef } from "react";
// import Alert from "@reach/alert";
// import VisuallyHidden from "@reach/visually-hidden";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import slides from "./slides";
import "./style.css";
import useProgress from "./useProgress";

let SLIDE_DURATION = 3000;

function Carousel(props) {
  return <section className="Carousel" {...props} />;
}

function Slides(props) {
  return <ul {...props} />;
}

function Slide({ isCurrent, takeFocus, image, id, title, children }) {
  let ref = useRef();

  useEffect(() => {
    if (isCurrent && takeFocus) {
      ref.current.focus();
    }
  }, [isCurrent, takeFocus]);

  return (
    <li
      ref={ref}
      aria-hidden={!isCurrent}
      tabIndex="-1"
      aria-labelledby={id}
      className="Slide"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="SlideContent">
        <h2 id={id}>{title}</h2>
        {children}
      </div>
    </li>
  );
}

function SlideNav(props) {
  return <ul className="SlideNav" {...props} />;
}

function SlideNavItem({ isCurrent, ...props }) {
  return (
    <li className="SlideNavItem">
      <button {...props} aria-current={isCurrent}>
        <span />
      </button>
    </li>
  );
}

function Controls(props) {
  return <div className="Controls" {...props} />;
}

function IconButton(props) {
  return <button {...props} className="IconButton" />;
}

function ProgressBar({ animate, time }) {
  let progress = useProgress(animate, time);

  return (
    <div className="ProgressBar">
      <div style={{ width: `${progress * 100}%` }} />
    </div>
  );
}

function SpacerGif({ width }) {
  return <div style={{ display: "inline-block", width }} />;
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      console.log("isPlaying update");
      let timeout = setTimeout(() => {
        console.log("execute at ", new Date().getTime(), currentIndex);
        setCurrentIndex((currentIndex + 1) % slides.length);
      }, SLIDE_DURATION);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isPlaying, currentIndex]);
  return (
    <Carousel>
      <Slides>
        {slides.map((image, index) => (
          <Slide
            key={index}
            image={image.img}
            title={image.title}
            id={`image-${index}`}
            isCurrent={index === currentIndex}
            takeFocus={null}
            children={image.content}
          />
        ))}
      </Slides>
      <SlideNav>
        {slides.map((image, index) => (
          <SlideNavItem
            key={index}
            isCurrent={index === currentIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => {}}
          />
        ))}
      </SlideNav>
      <Controls>
        {isPlaying ? (
          <IconButton
            aria-label="Pause"
            onClick={() => {
              setIsPlaying(false);
            }}
            children={<FaPause />}
          />
        ) : (
          <IconButton
            aria-label="Play"
            onClick={() => {
              setIsPlaying(true);
            }}
            children={<FaPlay />}
          />
        )}
        <SpacerGif width="10px"></SpacerGif>
        <IconButton
          aria-label="Previous Slide"
          onClick={() => {
            setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
            setIsPlaying(false);
          }}
          children={<FaBackward />}
        ></IconButton>
        <IconButton
          aria-label="Next Slide"
          onClick={() => {
            console.log("execute next ", currentIndex);
            setCurrentIndex((currentIndex + 1 + slides.length) % slides.length);
            setIsPlaying(false);
          }}
          children={<FaForward />}
        ></IconButton>
      </Controls>

      <ProgressBar
        key={currentIndex + isPlaying}
        time={SLIDE_DURATION}
        animate={isPlaying}
      ></ProgressBar>
    </Carousel>
  );
}
export default App;
