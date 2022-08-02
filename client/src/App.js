import './App.css';


// import {BrowserRouter, Router, Switch } from 'react-router-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import RecipeCreated from './components/RecipeCreated/RecipeCreated';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path = '/' component={LandingPage}/>
          <Route exact path = '/home' component={Home}/>
          <Route exact path= '/recipes' component={RecipeCreated}/>
          <Route exact path= '/recipes/:id' component={Detail}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
