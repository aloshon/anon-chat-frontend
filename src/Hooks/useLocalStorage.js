import {useState, useEffect} from "react";

const useLocalStorage = (key, defaultValue) => {
    const stored = localStorage.getItem(key);
    const initial = stored ? JSON.parse(stored) : defaultValue;
    const [state, setState] = useState(initial);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}

export default useLocalStorage;