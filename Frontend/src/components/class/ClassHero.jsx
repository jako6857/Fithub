import styles from "./ClassHero.module.scss";

export default function ClassHero({ image, name, action }) {
  return (
    <div className={styles.hero}>
      <img src={image} alt="" />
      <div className={styles.overlay}>
        <h2 className={styles.name}>{name}</h2>
        {action}
      </div>
    </div>
  );
}
