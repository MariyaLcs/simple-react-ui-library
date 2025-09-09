import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Notification from "./Notification";
import { axe } from "vitest-axe";

// Mock the Button atom used inside Notification
vi.mock("../../atoms/Button/Button", () => ({
  Button: ({ label, onClick }: { label: string; onClick?: () => void }) => (
    <button onClick={onClick}>{label}</button>
  ),
}));

describe("Notification", () => {
  const base = { id: "1", message: "Message 1", read: false };

  it("renders the message and applies unread class", () => {
    const { container } = render(
      <Notification notification={base} onToggleRead={() => {}} />
    );
    expect(screen.getByText("Message 1")).toBeInTheDocument();
    const item = container.querySelector(".notification-item");
    expect(item).toHaveClass("unread");
  });

  it("calls onToggleRead with id when clicking Mark Read", () => {
    const onToggleRead = vi.fn();
    render(<Notification notification={base} onToggleRead={onToggleRead} />);
    fireEvent.click(screen.getByRole("button", { name: /mark read/i }));
    expect(onToggleRead).toHaveBeenCalledWith("1");
  });

  it("renders Dismiss when provided and calls onDismiss", () => {
    const onDismiss = vi.fn();
    render(
      <Notification
        notification={base}
        onToggleRead={() => {}}
        onDismiss={onDismiss}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /dismiss/i }));
    expect(onDismiss).toHaveBeenCalledWith("1");
  });

  it("shows read state and toggles button label", () => {
    const n = { ...base, read: true };
    const { container } = render(
      <Notification notification={n} onToggleRead={() => {}} />
    );
    expect(
      screen.getByRole("button", { name: /mark unread/i })
    ).toBeInTheDocument();
    const item = container.querySelector(".notification-item");
    expect(item).toHaveClass("read");
  });
  it("matches snapshot", () => {
    const { asFragment } = render(
      <Notification notification={base} onToggleRead={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <Notification notification={base} onToggleRead={() => {}} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
