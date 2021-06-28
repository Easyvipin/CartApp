import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Style/main.scss";
import CartContextProvider from "./context/CartContextProvider";

import Nav from "./Components/Nav";
import Products from "./Components/Products";
import Cart from "./Components/Cart";

function App() {
  return (
    <div className="App">
      <Router>
        <CartContextProvider>
          <Nav />
          <Switch>
            <Route path="/cart" component={Cart}></Route>
            <Route path="/save" component={Cart}></Route>
            <Route path="/" component={Products}></Route>
          </Switch>
        </CartContextProvider>
      </Router>
    </div>
  );
}

export default App;
