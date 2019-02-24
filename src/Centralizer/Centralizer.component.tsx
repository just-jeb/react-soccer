import React, {ReactNode} from 'react';
import styles from './Centralizer.module.scss';

interface Props {
    children: ReactNode
}

export const CentralizerComponent = ({children}: Props) => (
    <div className={styles.horizontalCenter}>
        <div className={styles.verticalCenter}>
            {children}
        </div>
    </div>
);