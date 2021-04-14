import {useState} from "react";

const useFields = (initialState) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = event => {
        const {value, name} = event.target;
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