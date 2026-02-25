import './App.css';
import TeamSetup from './components/TeamSetup';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>⚽ TeamPilot</h1>
        <p>Build your perfect lineup</p>
      </header>
      <main className="App-main">
        <TeamSetup />
      </main>
    </div>
  );
}

export default App;
