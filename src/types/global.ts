export {};

/**
 * ReactHTMLElement<T,S>
 * T can be any key from JSX.IntrinsicElements and S will be interface to merge
 * Before merging every keys in S will be removed from JSX.IntrinsicElements
 */
declare global {
  type ReactHTMLElement<T extends keyof JSX.IntrinsicElements, S> = Omit<
    JSX.IntrinsicElements[T],
    keyof S
  > &
    S;
}
