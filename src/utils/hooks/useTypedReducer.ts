import * as React from "react";

type ActionCreator<S, A> = Record<keyof A, (...payload: any) => (s: S) => S>;
type ReducerState<R extends ActionCreator<any, any>> = R extends ActionCreator<
  infer S,
  any
>
  ? S
  : never;

const useTypedReducer = <R extends ActionCreator<any, any>>(
  actions: R,
  initialState: ReducerState<R>
): [ReducerState<R>, R] => {
  const reducer = (
    s: ReducerState<R>,
    action: { type: string; payload?: any }
  ) => {
    if (!actions[action.type]) {
      throw new Error();
    }

    return actions[action.type](...action.payload)(s);
  };
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const newActions: any = {};
  Object.keys(actions).forEach((actionName) => {
    newActions[actionName] = (...payload: any) =>
      dispatch({ type: actionName, payload });
  });

  return [state, newActions];
};

export default useTypedReducer;
