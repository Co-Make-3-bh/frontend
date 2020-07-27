import React, { useState } from 'react'
import signUpSchema from './signUpSchema'
import * as yup from 'yup'

function SignUp() {
    
    const initialFormValues = {
        username: '',
        email: '',
        password: '',
        zip: ''
    }

    const initialErrors = {
        username: '',
        password: '',
        zip: ''
    }

    const [ userValues, setUserValues ] = useState(initialFormValues)
    const [ errors, setErrors ] = useState(initialErrors)

    const handleChange = (e) => {
        e.persist()

        setUserValues({
            ...userValues, [e.target.name]: e.target.value
        })
        yup
            .reach(signUpSchema, e.target.name)
                //we can then run validate using the value
            .validate(e.target.value)
            // if the validation is successful, we can clear the error message
            .then(valid => {
                setErrors({...errors, [e.target.name]: ""})
            })
            .catch(err => {
                setErrors({...errors, [e.target.name]: err.errors[0] })
                
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        
        setUserValues(initialFormValues)
    }
    return (
        <div>
            

            <form>
            <label>Username:&nbsp;
                <input
                type='text'
                name='username'
                onChange={handleChange}
                value={userValues.username}
                required
                />
                {errors.username && <p>{errors.username}</p>}
            </label>    
            <label>Email:&nbsp;
                <input
                type='email'
                name='email'
                onChange={handleChange}
                value={userValues.email}
                required
                />
                {errors.email && <p>{errors.email}</p>}
            </label>
            <label>Password:&nbsp;
                <input
                type='password'
                name='password'
                onChange={handleChange}
                value={userValues.password}
                />
                {errors.password && <p>{errors.password}</p>}
            </label>
            <label>Zip:&nbsp;
                <input
                type='text'
                name='zip'
                onChange={handleChange}
                value={userValues.area}
                
                />
                {errors.zip && <p>{errors.zip}</p>}
            </label>
            <button onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    )
}
export default SignUp