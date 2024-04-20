import React from "react";
import Lottie from "react-lottie";
import animationData from "../Animation/Animation - 1713610084353.json";

const CompletedAnimation = ({ isCompleted, style }) => {
  const defaultOptions = {
    loop: false,
    autoplay: isCompleted,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {isCompleted && (
        <div style={style}>
          <Lottie options={defaultOptions} height={120} width={120} />
        </div>
      )}
    </>
  );
};

export default CompletedAnimation;
