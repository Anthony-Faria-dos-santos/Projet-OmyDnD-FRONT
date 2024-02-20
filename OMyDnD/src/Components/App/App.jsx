import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../Home/index.jsx";
import SignIn from "../auth/SignIn/SignIn.jsx";
import SignUp from "../auth/SignUp/SignUp.jsx";
import Header from "../Header/index.jsx";
import Footer from "../Footer/index.jsx";
import Sanctuary from "../Sanctuary/Sanctuary.jsx";
import CoreFeatures from "../Sanctuary/CoreFeatures/CoreFeatures.jsx";
import CoreFeature from "../Sanctuary/CoreFeature/CoreFeature.jsx";
import AttributeAbility from "../Sanctuary/Attributes/AttributeAbility.jsx";
import AttributeEquipment from "../Sanctuary/Attributes/AttributeEquipment.jsx";
import AttributeCondition from "../Sanctuary/Attributes/AttributeCondition.jsx";
import AttributeSpell from "../Sanctuary/Attributes/AttributeSpell.jsx";
import AttributeSkill from "../Sanctuary/Attributes/AttributeSkill.jsx";
import Search from "../Search/index.jsx";

function App() {
  return (
    <Router>
      <Header />
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
        <Route path="/sanctuary/skills" element={<AttributeSkill/>} />
        <Route path="/sanctuary/:featureType/:featureId" element={<CoreFeature />} />
        <Route path="/search" element={<Search />} />        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
