import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LevelContext } from "../../Context/LevelContext";
import Buttons from "../../components/Buttons/Buttons";
import PlaceholderSlides from "../../data/PlaceHolderSlide";
import Menu from "../../assets/bars-solid.svg";
import Modal from "../../components/Modal/Modal";
import "./SlidePage.css";

const SlidePage = () => {
  const {
    currentLevel,
    slideIndex,
    activeLevel,
    setSlideIndex,
    setCurrentLevel,
    handlePreviousSlide,
    handleNextSlide,
    handleFinish,
  } = useContext(LevelContext);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isNextActive, setIsNextActive] = useState(true);
  const timer = 50; // 50msec timer for const update of progressbar
  const increment = 1; // no of increment

  var { levelNumber, slideNumber } = useParams();
  levelNumber = parseInt(levelNumber.slice(-1));
  slideNumber = parseInt(slideNumber);

  useEffect(() => {
    if (levelNumber < activeLevel) {
      setSlideIndex(slideNumber);
      setCurrentLevel(levelNumber);
    }
  }, []);

  const totalSlidesInLevel = Object.keys(
    PlaceholderSlides[currentLevel - 1].slides
  ).length;

  const imgSrc = PlaceholderSlides[currentLevel - 1].slides[slideIndex];
  const isPrevDisabled = slideIndex === 1;

  const handleMenuClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleHome = () => {
    navigate("/");
  };

  useEffect(() => {
    if (progress < 100) {
      setTimeout(() => {
        setProgress((prev) => prev + increment); // 10 in increment
      }, timer / increment);
    } else {
      setIsNextActive(true);
    }
  }, [progress, slideIndex]);

  useEffect(() => {
    setProgress(0);
  }, [slideIndex]);

  useEffect(() => {
    if (progress >= 100) {
      setIsNextActive(false);
    }
  }, [progress]);

  return (
    <div className="container">
      {levelNumber > activeLevel ? null : (
        <div onClick={handleMenuClick}>
          <img className="menu" src={Menu} alt="menu" />
        </div>
      )}
      {levelNumber <= activeLevel ? (
        <div>
          <div className="canvas-container">
            <img className="canvas" src={imgSrc} alt={imgSrc} />
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Buttons
              className={"previous-btn"}
              text="Previous"
              isPrevDisabled={isPrevDisabled}
              onClick={handlePreviousSlide}
            />
            {slideIndex === totalSlidesInLevel ? (
              <Buttons
                className={"finish-btn"}
                text="Finish"
                disabled={isNextActive}
                onClick={handleFinish}
              />
            ) : (
              <Buttons
                className={"next-btn"}
                text="Next"
                disabled={isNextActive}
                onClick={handleNextSlide}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="not-cleared-level">
          <p>
            Nice Try !!! I'm guessing changing URL didn't work???
            <br />
            <br />
            So Finish Previous levels to advance!! !!!!
          </p>
          <Buttons
            className={"not-cleared-level-btn"}
            text="home"
            onClick={handleHome}
          />
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default SlidePage;
