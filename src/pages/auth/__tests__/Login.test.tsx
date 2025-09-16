import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Login from "../Login";

vi.mock("@/components/login/hooks/useLoginForm", () => {
  return {
    __esModule: true,
    default: () => ({
      handleLoginClick: vi.fn(),
    }),
  };
});

vi.mock("@/components/common/CustomTextInput", () => ({
  default: () => {
    return <div>Input</div>;
  },
}));

describe("Login", () => {
  it("render snapshot", () => {
    const { asFragment } = render(<Login />);
    expect(asFragment()).toMatchSnapshot();
  });
});
