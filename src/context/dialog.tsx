import React, { createContext, useState } from 'react';
import styles from './styles.module.css';
import { Button } from '../components/Button';


type Handletypes = {
    execute: () => void
}

type DialogContextProps = {
    isOpen?: boolean;
    toggleDialog(): void;
    setMessage(message: string): void;
    setHandle(handle: Handletypes): void;
};

const DialogContext = createContext<DialogContextProps>(
    {} as DialogContextProps
);

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [handle, setHandle] = useState<Handletypes>();



    const toggleDialog = () => {
        setIsOpen(isOpen => !isOpen);
    };

    const handleConfirm = () => {
        handle?.execute();
        toggleDialog()
    };

    const cancelDialog = () => {
        toggleDialog()
    };
    /*
        const resetDialog = () => {
            toggleDialog();
            setMessage('');
        };
    */
    return (
        <DialogContext.Provider
            value={{
                isOpen,
                toggleDialog,
                setMessage,
                setHandle,


            }}
        >
            <>
                {children}
                {isOpen && (
                    <div className={styles.container}>
                        <main className={styles.content}>
                            <p>{message}</p>

                            <section className={styles.action}>
                                <Button
                                    className={styles['btn-confirm']}
                                    onClick={() => handleConfirm()}
                                >
                                    Confirmar
                                </Button>
                                <Button
                                    className={styles['btn-cancel']}
                                    onClick={() => cancelDialog()}
                                >
                                    Cancelar
                                </Button>
                            </section>
                        </main>
                    </div>
                )}
            </>
        </DialogContext.Provider>
    );
};

export { DialogProvider, DialogContext };
