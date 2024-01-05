import { useState } from 'react';

const useForm = (initialState = {}, onSubmit) => {
    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (e, moreData = {}) => {
        console.log(e.target, moreData)
        const { name, value } = e.target;
        setFormData({ ...formData, ...moreData, [name]: value})
        console.log(formData)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(formData);
    }

    return { formData, handleInputChange, handleSubmit, setFormData };
}

export default useForm;

