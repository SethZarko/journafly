
import styles from './Footer.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <small style={{ fontSize: '18px' }}>JournaFly {new Date().getFullYear()} &copy;</small>
        <code><small>Powered By React</small></code>
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Icon Logo" style={{  width: '40px', height: '40px', objectFit: 'contain' }} />
        <code><small>Built by Seth Zarkovich</small></code>
      </div>
    </footer>
  );
};
