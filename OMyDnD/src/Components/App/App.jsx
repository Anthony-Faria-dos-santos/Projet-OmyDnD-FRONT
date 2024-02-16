import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "../Header/index.jsx";
import CoreFeature from "../Sanctuary/CoreFeature/CoreFeature.jsx";
import CoreFeatures from "../Sanctuary/CoreFeatures/CoreFeatures.jsx";
import Sanctuary from "../Sanctuary/Sanctuary.jsx";
import CharacterCreator from "../Tool/CharacterCreator";
import CharacterSheet from "../Tool/CharacterSheet/index.jsx";
import ProtectedRoute from "../auth/ProtectedRoute/ProtectedRoute.jsx";
import SignIn from "../auth/SignIn/SignIn.jsx";
import SignUp from "../auth/SignUp/SignUp.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/sanctuary" element={<Sanctuary />} />
        <Route path="/sanctuary/:featureType" element={<CoreFeatures />} />
        <Route path="/sanctuary/:featureType/:featureId" element={<CoreFeature />} />
        <Route
          path="/tool/character-creator"
          element={
            <ProtectedRoute>
              <CharacterCreator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tool/character-creator/character-sheet"
          element={
            <ProtectedRoute>
              <CharacterSheet />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
