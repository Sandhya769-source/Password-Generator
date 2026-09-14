import PasswordGenerator from "./PasswordGenerator";
import "./App.css";

function App() {
  return (
    <div className="app">

      <div className="background-shape shape-one"></div>
      <div className="background-shape shape-two"></div>

      <PasswordGenerator />

      <footer>
        Built with <span>⚛ React</span>
      </footer>

    </div>
  );
}

export default App;