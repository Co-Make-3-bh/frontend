import React, { useState } from 'react'
import axios from 'axios';
import { registerSchema } from './schema';

const Form = props => {

    const initialValues = {
        email: "",
        password: "",
    }

    const [formValues, setFormValues] = useState(initialValues);

    const [errors, setErrors] = useState([]);

    const handleChange = e => {

        console.dir(e.target);

        setFormValues({
            ...formValues, [e.target.name]: e.target.value
        });

        console.log(formValues);
    }

    const handleSubmit = e => {
        e.preventDefault();

        registerSchema.validate(formValues, {abortEarly: false})
        .then(_=> {
            axios.post('https://comake-api.herokuapp.com/api/auth/login',formValues)
            .then(res => {
                if(errors.length > 0){
                    setErrors([]);
                }

                console.log(res);


            })
        })
    }

}