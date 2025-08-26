import styles from './TreeWrapper.module.css';
import Tree from './Tree';

export default function TreeWrapper() {
  return (
    <div className={styles['tree-wrapper']}>
      <div className={styles['tree-left']}>
        <Tree />
      </div>
    </div>
  );
}
