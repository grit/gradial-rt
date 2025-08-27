import { useEffect, useRef, useState } from 'react';

const useWebSocket = url => {
  const [cursors, setCursors] = useState({});
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onmessage = event => {
      const { id, x, y, name, left } = JSON.parse(event.data);
      setCursors(prevCursors => {
        if (left) {
          // Remove cursor if left is true
          const updated = { ...prevCursors };
          delete updated[id];
          return updated;
        }
        return {
          ...prevCursors,
          [id]: { x, y, name: name || 'guest', left: !!left },
        };
      });
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [url]);

  const send = data => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  };

  return { cursors, send };
};

export default useWebSocket;
