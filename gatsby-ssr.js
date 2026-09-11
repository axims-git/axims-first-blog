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
    <link key="favicon-ico" rel="icon" href="/favicon.ico" sizes="48x48" />,
    <link
      key="favicon-16"
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon-16.png"
    />,
    <link
      key="favicon-32"
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon-32.png"
    />,
    <link
      key="favicon-192"
      rel="icon"
      type="image/png"
      sizes="192x192"
      href="/favicon-192.png"
    />,
    <link
      key="apple-touch-icon"
      rel="apple-touch-icon"
      sizes="180x180"
      href="/apple-touch-icon.png"
    />,
  ])
}