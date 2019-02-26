export const APP_ID = 'react-soccer';

export enum ELocalStorageKeys {
    SAVES = 'saves',
    LAST_GAME = 'last-game',
    LAST_GAME_ID = 'last-game-id'
}

const getKey = (prefix: string, key: string) => `${prefix}.${key}`;

export function saveToLocalStorage<T>(item: T, key: ELocalStorageKeys) {
    //Have to use try due to the privacy settings (might not succeed)
    try {
        localStorage.setItem(getKey(APP_ID, key), JSON.stringify(item));
    } catch (e) {
        console.error('Failed saving to local storage:', e);
    }
}

export function loadFromLocalStorage<T>(key: string): T | undefined {
    //Have to use try due to the privacy settings (might not succeed)
    try {
        const item = localStorage.getItem(getKey(APP_ID, key));
        if (item) {
            return JSON.parse(item);
        }
        return undefined;
    } catch (e) {
        console.error('Failed loading from local storage:', e);
        return undefined;
    }
}