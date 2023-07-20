import { Route, Switch } from 'react-router-dom';


import Home from './views/home/home';
import Detail from './views/detail/detail';
import Form from './views/form/form';
import Landing from './views/landing/landing';
import ErrorPage from './views/errorPage/errorPage';
import About from './views/about/about';

import './App.css';

function App() {

  return (
    <div className="App">
      <Switch>
          <Route path='/home' component= {Home}/>
          <Route path='/about' component= {About}/>
          <Route path='/detail/:id' component= {Detail}/>
          <Route path="/form" component= {Form} />
          <Route path='/' component={Landing}/>
          <Route path='*' component={ErrorPage}/>
      </Switch>
    </div>
  );
}

export default App;
