import styles from './styles.module.css';

type TaskListHeaderProps = {
    numberOfTasksCompleted: number;
    numberOfTasksPending: number;
};

export function TaskListHeader({
    numberOfTasksCompleted,
    numberOfTasksPending,
}: TaskListHeaderProps) {
    return (
        <header className={styles.container}>
            <div className={styles['tasks-created']}>
                <strong>Tarefas Pendentes</strong>
                <span>{numberOfTasksPending}</span>
            </div>
            <div className={styles['tasks-completed']}>
                <strong>Tarefas Concluidas</strong>
                <span>{numberOfTasksCompleted}</span>
            </div>
        </header>
    );
}
