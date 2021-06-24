import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";
import { Unauthorized } from "./pages/Unauthorized";

import { AuthContextProvider } from "./contexts/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/global";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
            <Route path="/admin/rooms/:id" component={AdminRoom} />
            <Route path="/unauthorized" component={Unauthorized} />
          </Switch>
        </AuthContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
