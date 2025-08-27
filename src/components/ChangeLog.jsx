import { useEffect, useState } from 'react';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { app } from '../config/firebase';

const db = getFirestore(app);

export default function ChangeLog() {
  const [mods, setMods] = useState([]);

  useEffect(() => {
    const changelogRef = doc(db, 'gradial', 'changelog');
    const unsubscribe = onSnapshot(changelogRef, docSnap => {
      if (docSnap.exists()) {
        setMods(docSnap.data().mods || []);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Change Log</h2>
      <ul>
        {[...mods].reverse().map((mod, idx) => (
          <li key={idx}>
            {mod.name} — {new Date(mod.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
