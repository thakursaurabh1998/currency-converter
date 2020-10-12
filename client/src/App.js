import React, { useContext } from 'react';

import AppRouter from './Router';
import { UserContext } from './store/contexts';

function App() {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <div className="App">
      <AppRouter isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default App;
