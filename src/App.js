import React from "react";
import "./App.css";
import { State } from "./features/state/State";
import { Admin } from "./features/admin/Admin";

function App() {
  return (
    <div className="ACSWApp">
      <div className="ACSWApp-body">
      <div className="ACSWApp-admin">
          <Admin />
        </div>
        <div className="ACSWApp-stateChange">
          <State />
        </div>
      </div>
    </div>
  );
}

export default App;
