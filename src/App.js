import './App.css';
import Weather from './component/weather';
import ThemeSelecter from './component/themeSelect';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Weather} />
        <Route exact path="/theme" component={ThemeSelecter} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
