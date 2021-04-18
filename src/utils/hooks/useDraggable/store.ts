import useTypedReducer from "utils/hooks/useTypedReducer";
import { Coordinates } from "./interfaces";

useTypedReducer;

interface IState {
  elements: Record<
    string,
    {
      translate: Coordinates;
      initial: Coordinates;
      last: Coordinates;
      selected: boolean;
      id: string;
    }
  >;
  // defined in case of single mode onl
  id?: string;
}

const getInitialElementState = () => ({
  translate: { x: 0, y: 0 },
  initial: { x: 0, y: 0 },
  last: { x: 0, y: 0 },
  selected: true,
});

export const initialState: Omit<IState, "id"> = { elements: {} };

const reducer = {
  start: (id: string, coordinate: Coordinates, single?: boolean) => (
    state: IState
  ): IState => {
    const element = state.elements[id];
    if (!element) {
      return {
        elements: {
          ...state.elements,
          [id]: {
            ...getInitialElementState(),
            id,
            initial: coordinate,
            selected: true,
          },
        },
        ...(single ? { id } : {}),
      };
    } else {
      return {
        elements: {
          ...state.elements,
          [id]: {
            ...element,
            initial: coordinate,
            selected: true,
          },
        },
      };
    }
  },
  move: (id: string | string[], coordinate: Coordinates) => (
    state: IState
  ): IState => {
    const ids = typeof id === "string" ? [id] : id;
    const elements = state.elements;

    ids.forEach((itemId) => {
      elements[itemId] = {
        ...elements[itemId],
        translate: {
          x:
            elements[itemId].last.x + coordinate.x - elements[itemId].initial.x,
          y:
            elements[itemId].last.y + coordinate.y - elements[itemId].initial.y,
        },
      };
    });

    return { elements };
  },
  stop: (id: string | string[]) => (state: IState): IState => {
    console.log(id, state);
    const ids = typeof id === "string" ? [id] : id;

    const elements = { ...state.elements };
    if (!elements[id[0]]) {
      debugger;
    }
    ids.forEach((itemId) => {
      elements[itemId] = {
        ...elements[itemId],
        last: elements[itemId].translate,
      };
    });

    return { elements };
  },

  unselect: (id: string | string[]) => (state: IState): IState => {
    const ids = typeof id === "string" ? [id] : id;
    const elements = { ...state.elements };
    ids.forEach((itemId) => {
      elements[itemId] = {
        ...elements[itemId],
        selected: false,
      };
    });

    return { elements };
  },
  clear: () => (): IState => ({ elements: {} }),

  // clear: () => (state: IState): IState => {
  //   const elements = { ...state.elements };
  //   const ids = Object.keys(elements);
  //   ids.forEach((itemId) => {
  //     elements[itemId] = {
  //       ...elements[itemId],
  //       selected: false,
  //     };
  //   });

  //   return { elements };
  // },
};

const useStore = () => {
  return useTypedReducer(reducer, { ...initialState });
};

export default useStore;
