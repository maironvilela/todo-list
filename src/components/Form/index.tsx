import { FormEvent } from 'react';
import { Button } from '../Button';
import styles from './styles.module.css';
import { BiPlusCircle } from 'react-icons/bi';


type FormProps = {
    handleAddTask: (event: FormEvent<HTMLFormElement>) => void;
};

export function Form({ handleAddTask }: FormProps) {

    return (
        <form onSubmit={handleAddTask} className={styles['container']}>
            <input
                placeholder="Adicione uma nova tarefa"
                name="task"
            />
            <Button type="submit"  >
                Criar <BiPlusCircle />
            </Button>
        </form >
    );
}
