import SvgIconPlus from '../assets/icon-plus';
import styles from './styles.module.css';

export function Form() {
    return (
        <form className={styles['container']}>
            <input placeholder="Adicione uma nova tarefa" />
            <button>
                Criar <SvgIconPlus />
            </button>
        </form>
    );
}
