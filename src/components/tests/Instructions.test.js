/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import Instructions from "../Instructions.jsx";

describe("link tests", function () {
  test("Instructions renders", () => {
    const component = render(<Instructions />);
    expect(component).toMatchSnapshot();
  });

  test("Instruction shows only one paragraph when no todo is selected", async () => {
    const component = render(<Instructions />);
    let paragraph2 = null
    try {
       paragraph2 = component.getByTestId("test-instructions-delete");
       throw new Error("Component was rendered")
    // eslint-disable-next-line no-empty
    } catch(e) {}

    expect(paragraph2).toBeFalsy();
  });

  test("Instruction shows both paragraphs when a todo is selected", async () => {
    const component = render(<Instructions todo={{}} />);

    const paragraph2 = await component.findByTestId("test-instructions-delete");

    expect(paragraph2).toBeTruthy();
  });
});
