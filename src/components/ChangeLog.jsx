import { useEffect, useState } from 'react';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { app } from '../config/firebase';
import styles from './ChangeLog.module.css';

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
    <div className={styles.wrapper}>
      <h2 className={styles.header}>User Change Log</h2>
      <ul className={styles.ul}>
        {[...mods].reverse().map((mod, idx) => (
          <li className={styles.logEntry} key={idx}>
            <span className={styles.name}>user: {mod.name}</span>
            <span className={styles.timestamp}>
              Modified {new Date(mod.timestamp).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
