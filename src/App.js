import React from 'react';
import { Route, Switch } from 'react-router-dom'

import SignUp from './Register'

function App() {
  return (
      <main>
        <Switch>
            <Route exact path='/'
                render={(props) => {
                    return<SignUp/>
                }}/>
        </Switch>
      </main>
  );
}

export default App;
