import FolderTree from 'react-folder-tree';
import { getFirestore, setDoc, doc, onSnapshot } from 'firebase/firestore';
import { app } from '../config/firebase';
import { useState, useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import styles from './Tree.module.css';
import { FaRegFolderOpen } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const db = getFirestore(app);

export default function Tree({ name, setName }) {
  const [treeState, setTreeState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputActive, setInputActive] = useState(false);

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

  const DeleteIcon = ({ onClick: defaultOnClick, nodeData }) => {
    if (nodeData.isOpen) return;
    const handleClick = () => {
      defaultOnClick();
    };

    return <MdDelete onClick={handleClick} />;
  };
  const FolderOpenIcon = ({ onClick: defaultOnClick, nodeData }) => {
    const handleClick = () => {
      if (nodeData.name === 'Gradial (Main)') return;
      defaultOnClick();
    };

    return <FaRegFolderOpen onClick={handleClick} />;
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.heading}>
          <span>Directory</span>
          <input
            type='text'
            value={name}
            className={styles.nameInput}
            onChange={e => setName(e.target.value)}
            placeholder='Pick a name'
            autoFocus={inputActive}
            onBlur={() => setInputActive(false)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                setInputActive(false);
                e.target.blur();
              }
            }}
          />
        </div>
        <FolderTree
          data={treeState}
          onChange={newTree => {
            if (!isEqual(newTree, treeState)) {
              setTreeState(newTree);
            }
          }}
          showCheckbox={false}
          indentPixels={50}
          onNameClick={onNameClick}
          iconComponents={{ DeleteIcon, FolderOpenIcon }}
        />
        <button className={styles.saveButton} onClick={saveToFirestore}>
          Save Modifications
        </button>
      </div>
    </div>
  );
}
