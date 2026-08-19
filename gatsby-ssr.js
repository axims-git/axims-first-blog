import * as React from "react"

// Runs before the page paints, so there's no flash of the wrong theme.
// Reads a saved preference from localStorage; if there isn't one yet,
// falls back to the visitor's OS-level dark mode setting.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored
      ? stored
      : (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="theme-init"
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
    />,
  ])
}