import React from "react";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import NotificationScreen from "./NotificationScreen";
import { makeStore } from "../../lib/store";

const server = setupServer();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderWithRealStore(ui: React.ReactElement) {
  const store = makeStore(); // your real store (has thunk)
  return render(<Provider store={store}>{ui}</Provider>);
}

describe("NotificationScreen", () => {
  it("happy path: loads items", async () => {
    server.use(
      http.get("*/posts", () =>
        HttpResponse.json([
          { id: 1, title: "one" },
          { id: 2, title: "two" },
        ])
      )
    );
    renderWithRealStore(<NotificationScreen />);
    const buttons = await screen.findAllByRole("button", {
      name: /mark read/i,
    });
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("error path: shows alert", async () => {
    server.use(
      http.get("*/posts", () => new HttpResponse(null, { status: 403 }))
    );
    renderWithRealStore(<NotificationScreen />);
    expect(await screen.findByRole("alert")).toHaveTextContent(/error/i);
  });
});
