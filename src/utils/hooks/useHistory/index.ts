import * as React from "react";

export interface IHistoryStatus {
  position: number;
  history: string[];
}

const useHistory = (initialPath: string) => {
  const [state, setState] = React.useState<IHistoryStatus>({
    position: 0,
    history: [initialPath],
  });

  // TODO: Deprecate
  const getCurrent = () => state.history[state.position];

  const push = React.useCallback((path: string) => {
    setState((prevState) => {
      const history = [
        ...prevState.history.slice(0, prevState.position + 1),
        path,
      ];
      return { history, position: history.length - 1 };
    });
  }, []);

  const navigate = React.useCallback((step: number) => {
    setState((prevState) => {
      let position = prevState.position + step;
      // if prevState was positive, forward movement
      if (step > -1) {
        position = Math.min(prevState.history.length - 1, position);
      } else {
        position = Math.max(0, position);
      }

      return { ...prevState, position };
    });
  }, []);

  return {
    getCurrent,
    push,
    navigate,
    state,
    __: {
      history: state.history,
      current: state.position,
    },
  };
};

export default useHistory;
