import { useState } from "react";
import Alert from "./Components/Alert";
import Button from "./Components/Button";

function App() {
  const [alertVisible , setAlertVisibility] = useState(false);
 return ( 
    <div>
      { alertVisible && <Alert>My alert</Alert>}
      <Button color ="primary"  onClick={() => setAlertVisibility(true)}>My Button</Button>
    </div>
  );
}

export default App;
