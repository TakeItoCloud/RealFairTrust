// Router + shell for the RealFairTrust marketing kit.
function App() {
  const [route, setRoute] = React.useState("home");
  const [agent, setAgent] = React.useState(null);
  const [lang, setLang] = React.useState("PT");

  const navigate = (id, data) => {
    if (id === "profile" && data) setAgent(data);
    setRoute(id);
    window.scrollTo({ top: 0, behavior: "instant" in document.documentElement.style ? "instant" : "auto" });
  };

  let screen;
  if (route === "discover") screen = <window.Discover onNavigate={navigate} />;
  else if (route === "properties") screen = <window.Properties onNavigate={navigate} />;
  else if (route === "profile") screen = <window.Profile agent={agent} onNavigate={navigate} />;
  else screen = <window.Home onNavigate={navigate} />;

  return (
    <div>
      <window.Nav current={route} onNavigate={navigate} lang={lang} onLang={setLang} />
      {screen}
      <window.Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
