import FolderTree from 'react-folder-tree';
import { getFirestore, setDoc, getDoc, doc } from 'firebase/firestore';
import { app } from '../config/firebase';
import { useState, useEffect } from 'react';
import isEqual from 'lodash/isEqual';

const db = getFirestore(app);

export default function Tree() {
  // Use treeState as the source of truth for FolderTree
  const [treeState, setTreeState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'gradial', 'rt');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTreeState(docSnap.data());
        } else {
          setTreeState({
            name: 'root',
            checked: 0,
            isOpen: true,
            children: [],
          });
        }
      } catch (error) {
        alert('Error loading: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Save treeState to Firestore
  const saveToFirestore = async () => {
    try {
      await setDoc(doc(db, 'gradial', 'rt'), treeState);
      alert('Saved to Firestore!');
    } catch (error) {
      alert('Error saving: ' + error.message);
    }
  };

  if (loading || !treeState) {
    return <div>Loading...</div>;
  }

  return (
    <div id='demo-sandbox'>
      <div>
        <span>Directory</span>
        <FolderTree
          data={treeState}
          onChange={newTree => {
            if (!isEqual(newTree, treeState)) {
              setTreeState(newTree);
            }
          }}
        />
        <button onClick={saveToFirestore}>Save to Firestore</button>
      </div>
      <div>
        <span>Directory JSON Structure</span>
        <pre>{JSON.stringify(treeState, null, 2)}</pre>
      </div>
    </div>
  );
}
