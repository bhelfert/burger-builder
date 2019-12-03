import BurgerBuilder from './containers/BurgerBuilder/BurgerBuild';
import Layout from './components/Layout/Layout';
import React from 'react';

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;