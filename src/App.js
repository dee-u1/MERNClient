// import logo from './logo.svg';
//import Dashboard from './components/Dashboard';
import ResponsiveDrawer from './Components/ResponsiveDrawer';
import AppBar  from './Components/AppBar';
import './App.css';
import { Route, Switch } from 'react-router';

function App() {
  return (    
    <Switch>
        <Route path="/" >
          <AppBar />
        </Route>
    </Switch>
  );
}

export default App;
