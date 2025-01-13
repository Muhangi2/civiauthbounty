
import "./App.css";
import { CivicAuthProvider } from "@civic/auth/react";
import { TitleBar } from "./page/landing";
import { GatewayProvider } from "@civic/ethereum-gateway-react";


function App() {

  return (
    <>

      <CivicAuthProvider clientId="4ceb8ea1-7b12-4a14-8fd9-c340ae067e02">
        <TitleBar />
      </CivicAuthProvider>
    </>
  );
}

export default App;
