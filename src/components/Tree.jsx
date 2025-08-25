import FolderTree from 'react-folder-tree';
import { useState } from 'react';

const testData = {
  name: 'root [half checked and opened]',
  checked: 0.5, // half check: some children are checked
  isOpen: true, // this folder is opened, we can see it's children
  children: [
    { name: 'children 1 [not checked]', checked: 0 },
    {
      name: 'children 2 [half checked and not opened]',
      checked: 0.5,
      isOpen: false,
      children: [
        { name: 'children 2-1 [not checked]', checked: 0 },
        { name: 'children 2-2 [checked]', checked: 1 },
      ],
    },
  ],
};

export default function Tree() {
  // 'treeState' will be in sync with the internal tree state
  // don't pass this back to FolderTree, since FolderTree manages state internally
  // this is only for external usage, but please don't alter it since it is a shallow copy

  const [treeState, setTreeState] = useState(testData);

  const onTreeStateChange = newState => {
    // probably do something else here
    setTreeState(newState);
  };

  return (
    <div id='demo-sandbox'>
      <div>
        <span>Directory</span>

        <FolderTree data={testData} onChange={onTreeStateChange} />
      </div>

      <div>
        <span>Directory JSON Structure</span>

        <pre>{JSON.stringify(treeState, null, 2)}</pre>
      </div>
    </div>
  );
}
