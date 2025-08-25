import TreeWrapper from './components/TreeWrapper';
import Header from './components/Header';

function App() {
  return (
    <div style={{ height: '100vh', maxHeight: '100vh', overflow: 'hidden' }}>
      <Header />
      <TreeWrapper />
    </div>
  );
}

export default App;
