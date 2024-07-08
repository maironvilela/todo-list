import ImgLogoComponent from '../../assets/logo';
import style from './styles.module.css';
export function Header() {
    return (
        <header className={style.container}>
            <ImgLogoComponent />
            <h1>
                to<span>do</span>
            </h1>
        </header>
    );
}
