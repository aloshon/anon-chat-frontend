import {useState} from "react";

/**
 * useFields is a hook, react form helper
 * Pass in the initial state of the form data
 *  i.e. {username: '', ...}
 * and then it will update the fields as the user types
 */
const useFields = (initialState) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = event => {
        // Get user input values from the certain form input
        const {value, name} = event.target;
        // set value as it changes
        setFormData(formData => ({
            ...formData,
            [name]: value,
        }))
    }

    const resetFormData = () => {
        setFormData(initialState)
    }

    return [formData, handleChange, resetFormData];
}

export default useFields;