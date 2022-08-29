
import './App.css';

import Home from "./pages/Home";
import {BrowserRouter as Switch, Route, Routes} from "react-router-dom";

function App() {
  return (
    <Switch>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sign-up' element={<Home/>}/>
      </Routes>
    </Switch>

  );
}

export default App;
