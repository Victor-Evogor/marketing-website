


import Home from "./pages/Home";
import {BrowserRouter as Switch, Route, Routes} from "react-router-dom";
import Layout from './components/Layout';
import Contact from './pages/Contact';
import Order from './pages/Order';

function App() {
  return (
    <Switch>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='layout' element={<Layout/>}>
          <Route path='contact' element={<Contact/>}/>
          <Route path='order' element={<Order/>}/>
        </Route>
      </Routes>
    </Switch>

  );
}

export default App;
