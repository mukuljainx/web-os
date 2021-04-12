import * as React from "react";

const useHistory = (initialPath: string) => {
  const [history, setHistory] = React.useState([initialPath]);
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    setCurrent(history.length - 1);
  }, [history]);

  const getCurrent = () => history[current];

  const push = React.useCallback(
    (path: string) => {
      setHistory((prevHistory) => {
        return [...prevHistory.slice(0, current + 1), path];
      });
    },
    [current]
  );

  const navigate = React.useCallback(
    (step: number) => {
      setCurrent((c) => {
        let next = c + step;
        // if c was positive, forward movement
        if (step > -1) {
          next = Math.min(history.length - 1, next);
        } else {
          next = Math.max(0, next);
        }

        return next;
      });
    },
    [history]
  );

  return {
    getCurrent,
    push,
    navigate,
    __: {
      history,
      current,
    },
  };
};

export default useHistory;
