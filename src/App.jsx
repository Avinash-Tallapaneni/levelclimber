import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LevelProvider } from "./Context/LevelProvider";
import HomePage from "./Pages/HomePage/HomePage";
import SlidePage from "./Pages/SlidePage/SlidePage";

const App = () => {
  return (
    <Router>
      <LevelProvider>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route
            path="/:levelNumber/:slideNumber"
            exact
            element={<SlidePage />}
          />
        </Routes>
      </LevelProvider>
    </Router>
  );
};

export default App;
