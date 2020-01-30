import { useState } from 'react';

export const useLocalStorage = ( key, initialValue ) => {
    const [storedValue, setStoredValue] = useState( () => {
        try{
            return JSON.parse(window.localStorage.getItem(key)) || initialValue;        
        }catch(err){
            return initialValue;
        }
    })
    const setValue = value => {
        try{
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        }catch(err){
            console.log(err);
        }
    }
    return [ storedValue, setValue];
}