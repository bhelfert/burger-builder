import Auth from './containers/Auth/Auth';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Layout from './hoc/Layout/Layout';
import Orders from './containers/Orders/Orders';
import React, { useState } from 'react';

const App = () => {
    const [authToken, setAuthToken] = useState('');

    return (
        <Router>
            <div>
                <Layout>
                    <Switch>
                        <Route exact path='/'>
                            <BurgerBuilder />
                        </Route>
                        <Route path='/auth'>
                            <Auth onTokenChange={setAuthToken} />
                        </Route>
                        <Route path='/checkout'>
                            <Checkout authToken={authToken} />
                        </Route>
                        <Route path='/orders'>
                            <Orders authToken={authToken} />
                        </Route>
                    </Switch>
                </Layout>
            </div>
        </Router>
    );
};

export default App;