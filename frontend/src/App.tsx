import './App.css';
import { Box, Grid } from '@mui/material';
import RouterSwitch from './components/navigation/routerswitch';
import Navbar from './components/navigation/navbar';
function App() {

  return (
    <div className="App">
    <header className="App-header">
    <Navbar/>
    </header>
    <RouterSwitch/> 
    </div>
  );
}

export default App;
