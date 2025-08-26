import TreeWrapper from './components/TreeWrapper';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import useWebSocket from './config/useWebsocket';
// import { HiCursorArrowRipple } from 'react-icons/hi2';
import favicon from './assets/favicon.ico';

function App() {
  const [name, setName] = useState('guest');
  const { cursors, send } = useWebSocket('ws://localhost:8080');

  useEffect(() => {
    const handleMouseMove = e => {
      send({ x: e.clientX, y: e.clientY, name });
    };
    const handleUnload = () => {
      send({ x: null, y: null, name, left: true });
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [send, name]);

  return (
    <div style={{ height: '100vh', maxHeight: '100vh', overflow: 'hidden' }}>
      <input
        type='text'
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder='Enter your name'
        style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }}
      />
      {Object.entries(cursors).map(([id, cursor]) =>
        cursor.left ? null : (
          <div
            key={id}
            className='remote-cursor'
            style={{ left: cursor.x, top: cursor.y, position: 'absolute' }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={favicon}
                alt='cursor'
                style={{ width: 15, height: 15 }}
              />
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 14,
                  color: '#fff',
                  background: 'rgba(0,0,0,0.5)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
              >
                {cursor.name || 'guest'}
              </span>
            </div>
          </div>
        )
      )}
      <Header />
      <TreeWrapper />
    </div>
  );
}

export default App;
