import "../../index.css";
import { jsx as n } from "react/jsx-runtime";
function a({ text: t, ...o }) {
  const { className: r, ...e } = o;
  return /* @__PURE__ */ n("button", { className: `${r} my-button`, ...e, children: t });
}
export {
  a as JaydeepButton
};
