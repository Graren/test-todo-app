/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import LoadingWrapper from "../LoadingWrapper.jsx";

describe("loading wrapper", function () {
  it("does not render if loading is undefined", async () => {
    const component = render(<LoadingWrapper />);
    let el = null;
    try {
      el = component.getByTestId("test-loading");
      throw new Error("Component was rendered");
      // eslint-disable-next-line no-empty
    } catch (e) {}

    expect(el).toBeFalsy();
  });

  test("Instruction shows both paragraphs when a todo is selected", async () => {
    const component = render(<LoadingWrapper loading={true} />);

    const el = component.getByTestId("test-loading");

    expect(el).toBeTruthy();
  });
});
