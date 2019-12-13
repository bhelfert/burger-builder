import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Layout from './hoc/Layout/Layout';
import Orders from './containers/Orders/Orders';
import React from 'react';

function App() {
    return (
        <Router>
            <div>
                <Layout>
                    <Switch>
                        <Route exact path='/'>
                            <BurgerBuilder />
                        </Route>
                        <Route path='/checkout'>
                            <Checkout />
                        </Route>
                        <Route path='/orders'>
                            <Orders />
                        </Route>
                    </Switch>
                </Layout>
            </div>
        </Router>
    );
}

export default App;