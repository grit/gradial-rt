import TreeWrapper from './components/TreeWrapper';
import Header from './components/Header';
import { useEffect } from 'react';
import useWebSocket from './config/useWebsocket';

function App() {
  const { cursors, send } = useWebSocket('ws://localhost:8080');

  useEffect(() => {
    const handleMouseMove = e => {
      // Throttle or debounce this event for performance on a live site
      send({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [send]);

  return (
    <div style={{ height: '100vh', maxHeight: '100vh', overflow: 'hidden' }}>
      {Object.entries(cursors).map(([id, cursor]) => (
        <div
          key={id}
          className='remote-cursor'
          style={{ left: cursor.x, top: cursor.y }}
        >
          {' '}
          <span
            style={{
              marginLeft: 24,
              fontSize: 14,
              color: '#fff',
              background: 'rgba(0,0,0,0.5)',
              padding: '2px 6px',
              borderRadius: '4px',
              position: 'absolute',
              left: 24,
              top: 0,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            guest
          </span>
        </div>
      ))}
      <Header />
      <TreeWrapper />
    </div>
  );
}

export default App;
