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
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "PROGRESS":
        case "NEXT":
          return {
            ...state,
            takeFocus: false,
            isPlaying: action.type === "PROGRESS",
            currentIndex: (state.currentIndex + 1) % slides.length,
          };
        case "GOTO":
          return {
            ...state,
            takeFocus: true,
            currentIndex: action.index,
          };
        case "PREV":
          return {
            ...state,
            takeFocus: false,
            isPlaying: false,
            currentIndex: (state.currentIndex - 1) % slides.length,
          };
        case "PLAY":
        case "PAUSE":
          return {
            ...state,
            takeFocus: false,
            isPlaying: action.type === "PLAY",
          };
        default:
          return state;
      }
    },
    {
      takeFocus: false,
      currentIndex: 0,
      isPlaying: false,
    }
  );

  useEffect(() => {
    if (state.isPlaying) {
      console.log("isPlaying update");
      let timeout = setTimeout(() => {
        console.log("execute at ", new Date().getTime(), state.currentIndex);
        dispatch({ type: "PROGRESS" });
      }, SLIDE_DURATION);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [state.isPlaying, state.currentIndex]);
  return (
    <Carousel>
      <Slides>
        {slides.map((image, index) => (
          <Slide
            key={index}
            image={image.img}
            title={image.title}
            id={`image-${index}`}
            isCurrent={index === state.currentIndex}
            takeFocus={state.takeFocus}
            children={image.content}
          />
        ))}
      </Slides>
      <SlideNav>
        {slides.map((image, index) => (
          <SlideNavItem
            key={index}
            isCurrent={index === state.currentIndex}
            onClick={() => {
              dispatch({
                type: "GOTO",
                index,
              });
            }}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </SlideNav>
      <Controls>
        {state.isPlaying ? (
          <IconButton
            aria-label="Pause"
            onClick={() => {
              dispatch({ type: "PAUSE" });
            }}
            children={<FaPause />}
          />
        ) : (
          <IconButton
            aria-label="Play"
            onClick={() => {
              // setIsPlaying(true);
              dispatch({ type: "PLAY" });
            }}
            children={<FaPlay />}
          />
        )}
        <SpacerGif width="10px"></SpacerGif>
        <IconButton
          aria-label="Previous Slide"
          onClick={() => {
            dispatch({ type: "PREV" });
          }}
          children={<FaBackward />}
        ></IconButton>
        <IconButton
          aria-label="Next Slide"
          onClick={() => {
            console.log("execute next ", state.currentIndex);
            dispatch({ type: "NEXT" });
          }}
          children={<FaForward />}
        ></IconButton>
      </Controls>

      <ProgressBar
        key={state.currentIndex + state.isPlaying}
        time={SLIDE_DURATION}
        animate={state.isPlaying}
      ></ProgressBar>
    </Carousel>
  );
}
export default App;
