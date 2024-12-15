import styles from "./home.module.css";

const Home = () => {
    return ( 
        <div className={styles.telaHome}>
            <img
            src="./public/assets/imagemMain.svg"
            alt="Imagem Main"
            className={styles.imagemMain}
          />
        </div>
     );
}
 
export default Home;