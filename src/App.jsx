import TreeWrapper from './components/TreeWrapper';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import useWebSocket from './config/useWebSocket';
import favicon from './assets/favicon.ico';
import styles from './App.module.css';

function App() {
  const [name, setName] = useState('guest');
  const { cursors, send } = useWebSocket('wss://gradial-rt-ws.onrender.com');

  useEffect(() => {
    const handleMouseMove = e => {
      send({ x: e.clientX, y: e.clientY, name });
    };
    const handleUnload = () => {
      send({ x: null, y: null, name, left: true });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleUnload();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('beforeunload', handleUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('beforeunload', handleUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [send, name]);

  return (
    <div className={styles.wrapper}>
      {Object.entries(cursors).map(([id, cursor]) =>
        cursor.left ? null : (
          <div
            key={id}
            className='remote-cursor'
            style={{ left: cursor.x, top: cursor.y, position: 'absolute' }}
          >
            <div className={styles.cursorInner}>
              <img src={favicon} alt='cursor' className={styles.cursorImg} />
              <span className={styles.cursorName}>
                {cursor.name || 'guest'}
              </span>
            </div>
          </div>
        )
      )}
      <Header />
      <TreeWrapper name={name} setName={setName} />
    </div>
  );
}

export default App;
