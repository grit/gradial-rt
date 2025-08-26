import FolderTree from 'react-folder-tree';
import { getFirestore, setDoc, doc, onSnapshot } from 'firebase/firestore';
import { app } from '../config/firebase';
import { useState, useEffect } from 'react';
import isEqual from 'lodash/isEqual';

const db = getFirestore(app);

export default function Tree() {
  const [treeState, setTreeState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, 'gradial', 'rt');
    // Listen for real-time updates
    const unsubscribe = onSnapshot(
      docRef,
      docSnap => {
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
        setLoading(false);
      },
      error => {
        alert('Error loading: ' + error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

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

  const onNameClick = ({ defaultOnClick, nodeData }) => {
    if (nodeData.name === 'Gradial (Main)') return;
    defaultOnClick();
  };

  return (
    <div className='tree-directory'>
      <div>
        <span>Directory</span>
        <FolderTree
          data={treeState}
          onChange={newTree => {
            if (!isEqual(newTree, treeState)) {
              setTreeState(newTree);
            }
          }}
          showCheckbox={false}
          indentPixels={30}
          onNameClick={onNameClick}
        />
        <button onClick={saveToFirestore}>Save Modifications</button>
      </div>
    </div>
  );
}
