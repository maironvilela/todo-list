import { MouseEvent } from 'react';
import { Button } from '../Button';
import styles from './styles.module.css';
import { BiPlusCircle } from 'react-icons/bi';

type FormProps = {
    inputValue: string;

    handleAddTask: (event: MouseEvent<HTMLButtonElement>) => void;
    setInputValue: (value: string) => void;
};

export function Form({ handleAddTask, inputValue, setInputValue }: FormProps) {
    return (
        <form className={styles['container']}>
            <input
                placeholder="Adicione uma nova tarefa"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
            />
            <Button type="submit" onClick={handleAddTask}>
                Criar <BiPlusCircle />
            </Button>
        </form>
    );
}
