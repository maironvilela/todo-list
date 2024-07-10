import React, { createContext, useState } from 'react';
import styles from './styles.module.css';
import { Button } from '../components/Button';

type DialogContextProps = {
    isOpen?: boolean;
    toggleDialog(): void;
    toggleIsLoader(): void;
    setMessage(message: string): void;
    isLoader: boolean;
    setHandle(handle: handleProps): void;
    setHandleCancelDialog(handle: handleProps): void;
};

type CallbackComNumero = () => void;
type handleProps = {
    execute: CallbackComNumero;
};

const DialogContext = createContext<DialogContextProps>(
    {} as DialogContextProps
);

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoader, setIsLoader] = useState(false);
    const [handle, setHandle] = useState<handleProps>();
    const [handleCancelDialog, setHandleCancelDialog] = useState<handleProps>();

    const toggleDialog = () => {
        setIsOpen(!isOpen);
    };
    const toggleIsLoader = () => {
        setIsLoader(!isLoader);
    };

    const handleConfirm = () => {
        //todo: Nome da Função
        handle?.execute();
        resetDialog();
    };

    const cancelDialog = () => {
        // todo: Nome da Função
        handleCancelDialog?.execute();
        resetDialog();
    };

    const resetDialog = () => {
        toggleDialog();
        toggleIsLoader();
        setMessage('');
    };

    return (
        <DialogContext.Provider
            value={{
                isOpen,
                toggleDialog,
                setMessage,
                toggleIsLoader,
                isLoader,
                setHandle,
                setHandleCancelDialog,
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
