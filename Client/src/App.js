import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './routes/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
      </Routes>
    </Router>

  );
}

export default App;
