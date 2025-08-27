import styles from './TreeWrapper.module.css';
import Tree from './Tree';
import ChangeLog from './ChangeLog';

export default function TreeWrapper({ name, setName }) {
  return (
    <div className={styles['tree-wrapper']}>
      <div className={styles['tree-left']}>
        <Tree name={name} setName={setName} />
      </div>
      <div className={styles['tree-right']}>
        <ChangeLog />
      </div>
    </div>
  );
}
