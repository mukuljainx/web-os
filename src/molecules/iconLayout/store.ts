import React from "react";

type Coordinates = { x: number; y: number };

interface IState {
  translate: Coordinates;
  initial: Coordinates;
  last: Coordinates;
  isDragging: boolean;
}

type Action =
  | { type: "start"; payload: Coordinates }
  | { type: "move"; payload: Coordinates }
  | { type: "end" };

export const initialState: IState = {
  translate: { x: 0, y: 0 },
  initial: { x: 0, y: 0 },
  last: { x: 0, y: 0 },
  isDragging: false,
};

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case "start": {
      return { ...state, initial: action.payload };
    }
    case "move": {
      const { last, initial } = state;
      return {
        ...state,
        translate: {
          x: action.payload.x - initial.x + last.x,
          y: action.payload.y - initial.y + last.y,
        },
      };
    }
    case "end":
      return { ...state, initial: { x: 0, y: 0 }, last: state.translate };

    default:
      return state;
  }
};

const useStore = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const start = React.useCallback((payload: Coordinates) => {
    dispatch({ type: "start", payload });
  }, []);

  const move = React.useCallback((payload: Coordinates) => {
    dispatch({ type: "move", payload });
  }, []);

  const stop = React.useCallback(() => {
    dispatch({ type: "end" });
  }, []);

  return { state: state as IState, start, move, stop };
};

export default useStore;
