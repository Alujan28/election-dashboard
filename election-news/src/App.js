import logo from './img/logo.jpg';
import './App.css';
import gifFile from './img/animation.gif';

function App() {
  return (
    <div className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <h1 className="title"><strong>Presidential Election Results 2024</strong></h1>
      <img src={gifFile} alt="Animated GIF" className="gif" />
    </div>
  );
}

export default App;
