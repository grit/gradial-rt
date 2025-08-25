import styles from './TreeWrapper.module.css';
import Tree from './Tree';

export default function TreeWrapper() {
  return (
    <div className={styles['tree-wrapper']}>
      <Tree />
    </div>
  );
}
