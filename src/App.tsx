import styles from './app.module.css';
import { Form } from './components/Form';
import { Header } from './components/Header';
import { TasksList } from './components/TasksList';

function App() {
    return (
        <div className={styles.container}>
            <Header />
            <Form />
            <TasksList />
        </div>
    );
}

export default App;
