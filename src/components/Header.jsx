import reactLogo from '../assets/react.svg';
import gradialLogo from '../assets/gradial_logo.svg';
import viteLogo from '/vite.svg';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles['main-header']}>
      <div>
        <a>
          <img src={viteLogo} className={styles.logo} alt='Vite logo' />
        </a>
        <a>
          <img
            src={reactLogo}
            className={`${styles.logo} ${styles.react}`}
            alt='React logo'
          />
        </a>
      </div>
      <h1 className={styles['sub-header-wrapper']}>
        <a href='https://www.gradial.ai/' target='_blank'>
          <img
            src={gradialLogo}
            className={`${styles.logo} ${styles.gradial}`}
            alt='Gradial logo'
          />
        </a>
        <span className={styles.subtitle}>- RT Proto</span>
      </h1>
    </div>
  );
}
