/* eslint-disable */
// import raf from "./tempPolyfills";
import { TextEncoder } from "util";
import ResizeObserver from "resize-observer-polyfill";
import { vi } from "vitest";

global.ResizeObserver = ResizeObserver;
global.TextEncoder = TextEncoder;

vi.mock(import("@/config/importMetaWrapper"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    VITE_API_SCHEME: "https://",
    VITE_API_BASEURL: "unity-development.utrack.com",
    VITE_API_PREFIX: "/api/v1",
    VITE_API_PREFIX_V2: "/api/v2",
    VITE_BASEURL: "unity-development.utrack.com",
  };
});

// vi.mock('@/i18n', async () => {
//   const i18n = await import('@/helpers/i18nForTests');
//   return { default: i18n.default };
// });

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

// Fail tests on any warning
console.error = (message) => {
  console.log(message);
};
