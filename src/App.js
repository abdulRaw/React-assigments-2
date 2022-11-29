import { useEffect, useMemo, useState } from "react";
import { useAutoSuffle, useShuffle } from "./hooks";
import "./styles.css";

const colors = ["red", "blue", "black", "green", "yellow", "pink"];
const totalColors = colors.length;
const getRandonIndex = () => {
  return Math.floor(Math.random() * totalColors);
};

export const AutoShuffleShow = ({ pColors }) => {
  const { isIntervalActive, onControl, reorderedColors } = useAutoSuffle({
    pColors,
  });

  return (
    <div>
      <div>
        <h3 className="hd">State Mangement / Array Play</h3>
        <div className="shuffle-c">
          {reorderedColors.map((c, idx) => {
            return (
              <div
                className="bx"
                key={c}
                style={{
                  background: c,
                }}
              ></div>
            );
          })}

          {[
            { name: isIntervalActive ? "Pause" : "Play", onClick: onControl },
          ].map(({ name, onClick }) => (
            <button key={name} onClick={onClick}>
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export const Swap = ({ pColors = colors }) => {
  const [order, setOrder] = useState([0, 1]);
  const handleSwap = () => {
    const [a, b] = order;
    setOrder([b, a]);
  };
  return (
    <div>
      <h3 className="hd">Swap</h3>
      <div className="shuffle-c">
        <div className="bx" style={{ background: pColors[order[0]] }}></div>
        <button onClick={handleSwap}>Swap</button>
        <div className="bx" style={{ background: pColors[order[1]] }}></div>
      </div>
    </div>
  );
};

export const Shuffle = () => {
  const { reorderedColors, onShuffle } = useShuffle();
  return (
    <>
      <div>
        <h3 className="hd">State Mangement / Array Play</h3>
        <div className="shuffle-c">
          {reorderedColors.map((c, idx) => {
            return (
              <div
                className="bx"
                key={c}
                style={{
                  background: c,
                }}
              ></div>
            );
          })}

          {[{ name: "Shuffle", onClick: onShuffle }].map(
            ({ name, onClick }) => (
              <button key={name} onClick={onClick}>
                {name}
              </button>
            )
          )}
        </div>
      </div>
      <AutoShuffleShow pColors={reorderedColors} />
      <Reverse pColors={reorderedColors} />
      <Swap pColors={reorderedColors} />
    </>
  );
};

export const Reverse = ({ pColors }) => {
  const [reversableColors, setReversableColors] = useState(pColors);
  useEffect(() => {
    setReversableColors(pColors);
  }, [pColors]);
  const handleReverse = () => {
    setReversableColors((prev) => [...prev].reverse());
  };
  return (
    <div>
      <h3 className="hd">Reverse and suffle if suffle get updated...</h3>
      <div className="shuffle-c">
        {reversableColors.map((c) => (
          <div
            className="bx"
            key={c}
            style={{
              background: c,
            }}
          ></div>
        ))}
        {[{ name: "Reverse", onClick: handleReverse }].map(
          ({ name, onClick }) => (
            <button key={name} onClick={onClick}>
              {name}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="c">
      <Shuffle />
    </div>
  );
}
