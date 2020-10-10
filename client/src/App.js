import React, { useContext } from 'react';

import InternalRouter from './components/InternalRouter';
import { UserContext } from './store/contexts';

function App() {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <div className="App">
      <InternalRouter isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default App;
