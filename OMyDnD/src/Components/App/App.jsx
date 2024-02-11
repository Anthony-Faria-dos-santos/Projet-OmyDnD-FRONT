import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../auth/SignIn/SignIn.jsx";
import SignUp from "../auth/SignUp/SignUp.jsx";
import Header from "../Header/index.jsx";
import Sanctuary from "../Sanctuary/Sanctuary.jsx";
import CoreFeatures from "../Sanctuary/CoreFeatures/CoreFeatures.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/sanctuary" element={<Sanctuary />} />
        <Route
          path="/sanctuary/:featureType"
          element={<CoreFeatures />}
        />
      </Routes>
    </Router>
  );
}

export default App;
