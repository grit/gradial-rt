import { useEffect, useRef, useState } from 'react';

const useWebSocket = url => {
  const [cursors, setCursors] = useState({});
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onmessage = event => {
      const { id, x, y } = JSON.parse(event.data);
      setCursors(prevCursors => ({
        ...prevCursors,
        [id]: { x, y },
      }));
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
