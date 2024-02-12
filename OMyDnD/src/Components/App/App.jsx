import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../auth/SignIn/SignIn.jsx";
import SignUp from "../auth/SignUp/SignUp.jsx";
import Header from "../Header/index.jsx";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
