import styles from './styles.module.css';

type TasksListEmptyListProps = {
    isRender: boolean;
};

export function TasksListEmptyList({ isRender }: TasksListEmptyListProps) {
    return (
        <div className={styles.container}>
            {isRender && (
                <>
                    <img src="./empty-list.png" />
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <span>Crie tarefas e organize seus itens a fazer</span>
                </>
            )}
        </div>
    );
}
