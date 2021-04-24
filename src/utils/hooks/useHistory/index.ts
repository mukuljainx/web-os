import * as React from "react";

export interface IHistoryStatus {
  position: number;
  side: "START" | "MID" | "END";
  history: string[];
}

const useHistory = (initialPath: string) => {
  const [state, setState] = React.useState<IHistoryStatus>({
    position: 0,
    side: "START",
    history: [initialPath],
  });

  // React.useEffect(() => {
  //   setState({ position: history.length - 1, side: "END" });
  // }, [history]);

  const getCurrent = () => state.history[state.position];

  const push = React.useCallback(
    (path: string) => {
      setState((prevState) => {
        const history = [
          ...prevState.history.slice(0, prevState.position + 1),
          path,
        ];
        return { history, side: "END", position: history.length - 1 };
      });
    },
    [state]
  );

  const navigate = React.useCallback(
    (step: number) => {
      setState((prevState) => {
        let position = prevState.position + step;
        // if prevState was positive, forward movement
        if (step > -1) {
          position = Math.min(prevState.history.length - 1, position);
        } else {
          position = Math.max(0, position);
        }
        let side: IHistoryStatus["side"] = "MID";
        if (position === prevState.history.length - 1) {
          side = "END";
        } else if (position === 0) {
          side = "START";
        }

        return { ...prevState, position, side };
      });
    },
    [history]
  );

  return {
    getCurrent,
    push,
    navigate,
    side: state.side,
    __: {
      history: state.history,
      current: state.position,
    },
  };
};

export default useHistory;
