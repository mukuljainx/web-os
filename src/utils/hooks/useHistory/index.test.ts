import { renderHook, act } from "@testing-library/react-hooks";
import useHistory from "./index";

const getHook = () => {
  const { result } = renderHook(() => useHistory("/"));

  act(() => {
    result.current.push("/a");
  });
  act(() => {
    result.current.push("/b");
  });
  act(() => {
    result.current.push("/c");
  });

  return result;
};

describe("useHistory", () => {
  test("histroy should work properly on pushing routes", () => {
    const hook = getHook();
    expect(hook.current.getCurrent()).toBe("/c");
  });

  test("should go back on -1", () => {
    const hook = getHook();
    act(() => {
      hook.current.navigate(-1);
    });
    expect(hook.current.getCurrent()).toBe("/b");
  });

  test("should go to first route on navigating with larger -ve value then history length", () => {
    const hook = getHook();

    act(() => {
      hook.current.navigate(-10);
    });
    expect(hook.current.getCurrent()).toBe("/");

    act(() => {
      hook.current.navigate(0);
    });
    expect(hook.current.getCurrent()).toBe("/");

    act(() => {
      hook.current.navigate(1);
    });
    expect(hook.current.getCurrent()).toBe("/a");
  });

  test("should not navigate on '0' params", () => {
    const hook = getHook();

    act(() => {
      hook.current.navigate(0);
    });
    expect(hook.current.getCurrent()).toBe("/c");
  });

  test("should go to next route for '1' param", () => {
    const hook = getHook();

    act(() => {
      hook.current.navigate(-1);
    });
    expect(hook.current.getCurrent()).toBe("/b");

    act(() => {
      hook.current.navigate(1);
    });
    expect(hook.current.getCurrent()).toBe("/c");
  });

  test("should overrite history if pushed from intermediate state", () => {
    const hook = getHook();

    act(() => {
      hook.current.navigate(-2);
    });
    expect(hook.current.getCurrent()).toBe("/a");

    act(() => {
      hook.current.push("/e");
    });

    expect(hook.current.getCurrent()).toBe("/e");

    act(() => {
      hook.current.navigate(1);
    });

    expect(hook.current.getCurrent()).toBe("/e");
  });
});
