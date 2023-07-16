import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LevelContext } from "./LevelContext";
import PlaceholderSlides from "../data/PlaceHolderSlide";

const LevelProvider = ({ children }) => {
  /*---- Number of level------*/
  const numberOfLevels = 6;

  /*----Navigation variable------*/
  const navigate = useNavigate();

  /*---- Function to retrive the last seen slide/levels from browser storage------*/

  const [activeLevel, setActiveLevel] = useState(() => {
    const lastSeenSlide = localStorage.getItem("lastSeenSlide");
    if (lastSeenSlide) {
      return JSON.parse(lastSeenSlide).activeLevel;
    }
    return 1;
  });
  const [currentLevel, setCurrentLevel] = useState(() => {
    const lastSeenSlide = localStorage.getItem("lastSeenSlide");
    if (lastSeenSlide) {
      return JSON.parse(lastSeenSlide).currentLevel;
    }
    return 1;
  });

  const [slideIndex, setSlideIndex] = useState(() => {
    const lastSeenSlide = localStorage.getItem("lastSeenSlide");
    if (lastSeenSlide) {
      return JSON.parse(lastSeenSlide).slideIndex;
    }
    return 1;
  });

  const [levels, setLevels] = useState([]);

  const storeLastSeenSlide = (activeLevel, currentLevel, slideIndex) => {
    // console.log("setting", activeLevel, slideIndex, currentLevel);
    localStorage.setItem(
      "lastSeenSlide",
      JSON.stringify({ activeLevel, slideIndex, currentLevel })
    );
  };

  useEffect(() => {
    storeLastSeenSlide(activeLevel, currentLevel, slideIndex);
  }, [activeLevel, currentLevel, slideIndex]);

  useEffect(() => {
    const activeLevelsTree = Array.from({ length: numberOfLevels })
      .fill(0)
      .map((_, levelIdx) => ({
        level: levelIdx + 1,
        finished: levelIdx < activeLevel,
      }));
    setLevels(activeLevelsTree);
  }, [activeLevel]);

  const handlePreviousSlide = () => {
    setSlideIndex((prev) => prev - 1);
    navigate(`/level${currentLevel}/${slideIndex - 1}`);
  };

  const handleNextSlide = () => {
    const slidesLength = Object.keys(
      PlaceholderSlides[currentLevel - 1].slides
    ).length;

    if (slideIndex < slidesLength) {
      setSlideIndex((prev) => prev + 1);
      navigate(`/level${currentLevel}/${slideIndex + 1}`);
    }
  };
  const handleFinish = () => {
    if (activeLevel <= currentLevel) {
      setActiveLevel((prev) => prev + 1);
      navigate("/");
    } else navigate("/");

    setSlideIndex(1);
  };

  return (
    <LevelContext.Provider
      value={{
        levels,
        slideIndex,
        setSlideIndex,
        activeLevel,
        currentLevel,
        setCurrentLevel,
        handlePreviousSlide,
        handleNextSlide,
        handleFinish,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export { LevelProvider };
