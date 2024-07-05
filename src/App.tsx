import styles from './app.module.css';
import { Form } from './components/Form';
import { Header } from './components/Header';

function App() {
    return (
        <div className={styles.container}>
            <Header />
            <Form />
        </div>
    );
}

export default App;
