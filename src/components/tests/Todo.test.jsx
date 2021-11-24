/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import Todo from "../Todo.jsx";

const mockTodo = {
  todoId: 1,
  status: 0,
  text: "lorem",
  priority: 1,
};

describe("todo component", function () {
  it("renders", async () => {
    const component = render(<Todo todo={mockTodo} />);
    expect(component.getByTestId("test-todo-1")).toBeTruthy();
  });
});
