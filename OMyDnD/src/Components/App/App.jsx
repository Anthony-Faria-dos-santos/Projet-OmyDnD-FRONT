import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AttributeAbility from "../Sanctuary/Attributes/AttributeAbility.jsx";
import AttributeEquipment from "../Sanctuary/Attributes/AttributeEquipment.jsx";
import AttributeCondition from "../Sanctuary/Attributes/AttributeCondition.jsx";
import AttributeSpell from "../Sanctuary/Attributes/AttributeSpell.jsx";
import AttributeSkill from "../Sanctuary/Attributes/AttributeSkill.jsx";
import CharacterCreator from "../Tool/CharacterCreator";
import ProtectedRoute from "../auth/ProtectedRoute/ProtectedRoute.jsx";
import HomePage from "../Home/index.jsx";
import Characters from "../UserPanel/Characters";
import ContainerCharacterSheet from "../Tool/CharacterSheet/ContainerCharacterSheet.jsx";
import SignIn from "../auth/SignIn/SignIn.jsx";
import SignUp from "../auth/SignUp/SignUp.jsx";
import Header from "../Header/index.jsx";
import Sanctuary from "../Sanctuary/Sanctuary.jsx";
import CoreFeatures from "../Sanctuary/CoreFeatures/CoreFeatures.jsx";
import CoreFeature from "../Sanctuary/CoreFeature/CoreFeature.jsx";
import Search from "../Search/index.jsx";
import Profile from "../UserPanel/Profil"
import NotFound from "../NotFound/NotFound.jsx";
import Footer from "../Footer/index.jsx";
import Contact from "../Contact/index.jsx";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth } from '../../store/slices/authSlice.js';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
}, [dispatch]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/sanctuary" element={<Sanctuary />} />
            <Route path="/sanctuary/:featureType" element={<CoreFeatures />} />
            <Route path="/sanctuary/abilities" element={<AttributeAbility />} />
            <Route path="/sanctuary/equipments" element={<AttributeEquipment />} />
            <Route path="/sanctuary/conditions" element={<AttributeCondition />} />
            <Route path="/sanctuary/spells" element={<AttributeSpell />} />
            <Route path="/sanctuary/skills" element={<AttributeSkill />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/sanctuary/:featureType/:featureId"
              element={<CoreFeature />}
            />
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
                  <ContainerCharacterSheet />
                </ProtectedRoute>
              }
            />
            <Route
              path="/characters"
              element={
                <ProtectedRoute>
                  <Characters />
                </ProtectedRoute>
              }
            />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
