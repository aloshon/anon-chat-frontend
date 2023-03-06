import {useState, useEffect} from "react";

/**
 * useLocalStorage is a hook that lets you
 * easily store and get data from local storage
 */
const useLocalStorage = (key, defaultValue) => {
    const stored = localStorage.getItem(key);
    const initial = stored ? stored : defaultValue;
    const [state, setState] = useState(initial);

    useEffect(() => {
        localStorage.setItem(key, state);
    }, [key, state]);

    return [state, setState];
}

export default useLocalStorage;