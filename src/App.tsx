import { BrowserRouter, Route, Switch } from "react-router-dom";

import { JoinRoom } from "./pages/JoinRoom";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";
import { Unauthorized } from "./pages/Unauthorized";
import { Login } from "./pages/Login";

import { AuthContextProvider } from "./contexts/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/global";
import { PrivateRoute } from "./components/PrivateRoute";
import { Rooms } from "./pages/Rooms";
import { SignUp } from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>
          <Switch>
            <PrivateRoute path="/" exact component={Rooms} />
            <Route path="/unauthorized" component={Unauthorized} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute path="/rooms/join" exact component={JoinRoom} />
            <PrivateRoute path="/rooms/new" exact component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
            <PrivateRoute path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </AuthContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
