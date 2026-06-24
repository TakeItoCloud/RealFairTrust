// Lucide-style line icons (2px, round caps) — inline matches of the Lucide set,
// the chosen icon library for RealFairTrust. Production should use `lucide-react`.
const I = (paths, vb = "0 0 24 24") => ({ size = 18, color = "currentColor", strokeWidth = 2, style = {} }) =>
  React.createElement(
    "svg",
    { width: size, height: size, viewBox: vb, fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", style: { flex: "0 0 auto", ...style } },
    paths.map((d, i) => React.createElement("path", { key: i, d }))
  );

const IconSearch = ({ size = 18, color = "currentColor", style = {} }) =>
  React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", style: { flex: "0 0 auto", ...style } },
    React.createElement("circle", { cx: 11, cy: 11, r: 7 }),
    React.createElement("path", { d: "m20 20-3.4-3.4" }));

const IconMapPin = ({ size = 18, color = "currentColor", style = {} }) =>
  React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", style: { flex: "0 0 auto", ...style } },
    React.createElement("path", { d: "M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" }),
    React.createElement("circle", { cx: 12, cy: 9, r: 2.4 }));

const IconStar = ({ size = 18, color = "currentColor", fill = "none", style = {} }) =>
  React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill, stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", style: { flex: "0 0 auto", ...style } },
    React.createElement("path", { d: "M12 3.5l2.6 5.3 5.9.9-4.3 4.2 1 5.8L12 17.9 6.8 19.7l1-5.8L3.5 9.7l5.9-.9L12 3.5Z" }));

const IconArrowRight = I(["M5 12h14", "m13 6 6 6-6 6"]);
const IconChevronRight = I(["m9 6 6 6-6 6"]);
const IconClock = ({ size = 18, color = "currentColor", style = {} }) =>
  React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", style: { flex: "0 0 auto", ...style } },
    React.createElement("circle", { cx: 12, cy: 12, r: 9 }),
    React.createElement("path", { d: "M12 7v5l3 2" }));
const IconShieldCheck = ({ size = 18, color = "currentColor", style = {} }) =>
  React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", style: { flex: "0 0 auto", ...style } },
    React.createElement("path", { d: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" }),
    React.createElement("path", { d: "m9 12 2 2 4-4" }));
const IconTrending = I(["M3 17l6-6 4 4 7-7", "M17 8h4v4"]);
const IconScale = I(["M12 3v18", "M5 7h14", "M5 7l-2.5 6a3 3 0 0 0 5 0L5 7Z", "M19 7l-2.5 6a3 3 0 0 0 5 0L19 7Z", "M8 21h8"]);
const IconRefresh = I(["M3 12a9 9 0 0 1 15-6.7L21 8", "M21 3v5h-5", "M21 12a9 9 0 0 1-15 6.7L3 16", "M3 21v-5h5"]);
const IconBed = I(["M3 7v11", "M3 12h18v6", "M21 18v-4a3 3 0 0 0-3-3H8v1", "M3 18h18"]);
const IconBath = I(["M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z", "M6 12V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2", "M6 19l-1 2", "M19 19l1 2"]);
const IconRuler = I(["M4 16 16 4l4 4L8 20l-4-4Z", "M9 9l1.5 1.5", "M12 6l1.5 1.5", "M6 12l1.5 1.5"]);
const IconGlobe = ({ size = 18, color = "currentColor", style = {} }) =>
  React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", style: { flex: "0 0 auto", ...style } },
    React.createElement("circle", { cx: 12, cy: 12, r: 9 }),
    React.createElement("path", { d: "M3 12h18" }),
    React.createElement("path", { d: "M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" }));
const IconMenu = I(["M4 7h16", "M4 12h16", "M4 17h16"]);

Object.assign(window, {
  IconSearch, IconMapPin, IconStar, IconArrowRight, IconChevronRight, IconClock,
  IconShieldCheck, IconTrending, IconScale, IconRefresh, IconBed, IconBath, IconRuler, IconGlobe, IconMenu,
});
