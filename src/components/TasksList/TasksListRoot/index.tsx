import { ReactNode } from 'react';
import styles from './styles.module.css';

type TasksListRootProps = {
    children: ReactNode;
};
export function TasksListRoot({ children }: TasksListRootProps) {
    return <div className={styles.container}>{children}</div>;
}
