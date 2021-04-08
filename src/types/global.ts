import { IApp } from "base/interfaces";
import { RootState } from "store";

export {};

declare global {
  type Noop = () => void;

  /**
   * ReactHTMLElement<T,S>
   * T can be any key from JSX.IntrinsicElements and S will be interface to merge
   * Before merging every keys in S will be removed from JSX.IntrinsicElements
   */
  type ReactHTMLElement<T extends keyof JSX.IntrinsicElements, S> = Omit<
    JSX.IntrinsicElements[T],
    keyof S
  > &
    S;

  interface Window {
    os: {
      openApp: (param: IApp) => void;
    };
  }
}

declare module "react-redux" {
  export interface DefaultRootState extends RootState {}
}

window.os = window.os || {};
