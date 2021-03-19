import { render, screen, act } from "@testing-library/react";

import MockDate from "mockdate";

import Time from "./index";

describe("Time", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    MockDate.set(new Date(2020, 0, 1, 10, 47, 55, 0));
  });

  afterEach(() => {
    jest.clearAllTimers();

    MockDate.reset();
  });

  it("should render current time", () => {
    render(<Time />);

    expect(screen.getByText("10:47")).toBeInTheDocument();
  });

  it("should render minute change", () => {
    render(<Time />);

    expect(screen.getByText("10:47")).toBeInTheDocument();

    MockDate.set(new Date(2020, 0, 1, 10, 48, 1, 0));
    act(() => {
      jest.advanceTimersByTime(6_000);
    });
    expect(screen.getByText("10:48")).toBeInTheDocument();
  });

  it("should render multiple minute changes", () => {
    render(<Time />);

    expect(screen.getByText("10:47")).toBeInTheDocument();

    MockDate.set(new Date(2020, 0, 1, 10, 49, 0, 0));
    act(() => {
      jest.advanceTimersByTime(65_000);
    });
    expect(screen.getByText("10:49")).toBeInTheDocument();
  });
});
