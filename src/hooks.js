import { useEffect, useMemo, useRef, useState } from "react";

const colors = ["red", "blue", "black", "green", "yellow", "pink"];
const totalColors = colors.length;
const getRandonIndex = (totalColors) => {
  return Math.floor(Math.random() * totalColors);
};

export const useShuffle = (props = { pColors: colors }) => {
  const { pColors } = props;

  const [randomIndex, setRandomIndex] = useState(pColors?.length - 1 ?? 0);

  useEffect(() => {
    setRandomIndex(getRandonIndex(pColors.length));
  }, []);

  const handleShuffle = () => {
    const n = getRandonIndex(pColors.length);
    setRandomIndex(n);
  };
  const getReorderedColor = (idx) => {
    const index = (randomIndex + idx) % pColors.length;
    return pColors[index];
  };

  const reorderedColors = useMemo(() => {
    return pColors.map((c, i) => getReorderedColor(i));
  }, [randomIndex, pColors]);

  return {
    reorderedColors,
    onShuffle: handleShuffle,
  };
};

export const useAutoSuffle = ({ pColors = colors, intervlTime = 1000 }) => {
  const [isSlodeShow, setIsSlideShow] = useState(null);
  const interValRef = useRef(null);

  const { reorderedColors, onShuffle } = useShuffle({ pColors });

  const onControl = () => {
    if (!!isSlodeShow) {
      clearInterval(interValRef.current);
      interValRef.current = null;
      setIsSlideShow(false);
      return;
    }
    setIsSlideShow(true);
    onShuffle();
    interValRef.current = setInterval(onShuffle, intervlTime);
    return;
  };

  useEffect(() => {
    if (!!isSlodeShow) {
      onControl();
    }
  }, [pColors]);

  const isIntervalActive = !!isSlodeShow;

  return {
    isIntervalActive,
    onControl,
    reorderedColors,
  };
};
