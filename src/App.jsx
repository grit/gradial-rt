import reactLogo from './assets/react.svg';
import gradialLogo from './assets/gradial_logo.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  return (
    <>
      <div className='main-header'>
        <div>
          <a href='https://vite.dev' target='_blank'>
            <img src={viteLogo} className='logo' alt='Vite logo' />
          </a>
          <a href='https://react.dev' target='_blank'>
            <img src={reactLogo} className='logo react' alt='React logo' />
          </a>
        </div>
        <h1 className='sub-header-wrapper'>
          <img src={gradialLogo} className='logo gradial' alt='Gradial logo' />
          <span className='subtitle'>- RT Proto</span>
        </h1>
        {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      </div>
    </>
  );
}

export default App;
