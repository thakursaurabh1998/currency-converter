import React from 'react';

import InternalRouter from './components/InternalRouter';

function App() {
  return (
    <div className="App">
      <InternalRouter isAuthenticated={false} />
    </div>
  );
}

export default App;
