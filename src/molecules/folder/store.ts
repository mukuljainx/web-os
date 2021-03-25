import React from "react";
import { Coordinates } from "./interfaces";

interface IState {
  translate: Coordinates;
  initial: Coordinates;
  last: Coordinates;
  selected: boolean;
  id: string;
}

type Action =
  | { type: "start"; payload: Coordinates }
  | { type: "move"; payload: Coordinates }
  | { type: "stop" }
  | { type: "unselect" };

export const initialState: Omit<IState, "id"> = {
  translate: { x: 0, y: 0 },
  initial: { x: 0, y: 0 },
  last: { x: 0, y: 0 },
  selected: false,
};

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case "start": {
      return { ...state, initial: action.payload, selected: true };
    }
    case "move": {
      const { last, initial } = state;

      return {
        ...state,
        translate: {
          x: last.x + action.payload.x - initial.x,
          y: last.y + action.payload.y - initial.y,
        },
      };
    }
    case "stop": {
      return {
        ...state,
        last: state.translate,
      };
    }

    case "unselect": {
      return { ...state, selected: false };
    }

    default:
      return state;
  }
};

const useStore = (id: string) => {
  const [state, dispatch] = React.useReducer(reducer, { ...initialState, id });

  const start = React.useCallback((payload: Coordinates) => {
    dispatch({ type: "start", payload });
  }, []);

  const move = React.useCallback((payload: Coordinates) => {
    dispatch({ type: "move", payload });
  }, []);

  const stop = React.useCallback(() => {
    dispatch({ type: "stop" });
  }, []);

  const unselect = React.useCallback(() => {
    dispatch({ type: "unselect" });
  }, []);

  return { state: state as IState, start, move, stop, unselect };
};

export default useStore;
