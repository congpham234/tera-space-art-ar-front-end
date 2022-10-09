import './App.css'
import { Routes, Route } from "react-router-dom";
import { Account } from "./components/auth-components/Account";

import Signup from './components/auth-components/Signup';
import Login from './components/auth-components/Login';
import Confirm from './components/auth-components/Confirm';
import GallaryEdit from './components/gallery-components/GallaryEdit';
import GallaryHome from './components/gallery-components/GallaryHome';
import ArtworkEdit from './components/artwork-components/ArtworkEdit';
import ArtworkDetail from './components/artwork-components/ArtworkDetail';


function App() {
  
  return (
    <div>
      <Account>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/gallary-edit" element={<GallaryEdit />} />
          <Route path="/gallary-home" element={<GallaryHome />} />
          <Route path="/artwork-edit" element={<ArtworkEdit />} />
          <Route path="/artwork-detail" element={<ArtworkDetail />} />
        </Routes>
      </Account>
    </div>

  );
}

export default App;
