
import Landing from './pages/LandingPage.';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import PrimaryNavbar from './components/PrimaryNavbar';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Landing/> */}
      <Router>
        <PrimaryNavbar/>
        <Routes>
          <Route path ="/" element={<Landing/>}/>
          {/* <Route path ="/about"/>
          <Route /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
