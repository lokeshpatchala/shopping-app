
import {Fragment} from 'react';
import Header from '../header/Header';

import Home from '../Home/home';
function HomeWrapper() {
return (
   <Fragment>
     <Header>
     </Header>
     {/* <Switch>
         <Router>
             <Route path='/home/main' component={Home} exact></Route>
         </Router>
     </Switch> */}
   </Fragment>
);
}

export default HomeWrapper;