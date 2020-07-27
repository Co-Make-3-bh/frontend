import React, { useState } from 'react'
import axios from 'axios';
import { IssueSchema } from './issueSchema';


const IssueForm = props => {

    const initialValues = {
        title: "",
        description: "",
        createdBy:"",
        zipCode:"",
    }

    const [formValues, setFormValues] = useState(initialValues);

    const [errors, setErrors] = useState([]);

    
    

    const handleChange = e => {

        console.dir(e.target);

        setFormValues({
            ...formValues, [e.target.name]: e.target.value
        });

       
    }

    const handleSubmit = e => {
        e.preventDefault();

        IssueSchema.validate(formValues, {abortEarly: false})
        .then(_=> {
            axios.post('https://comake-api.herokuapp.com/api/concerns',formValues)
            .then(res => {
                if(errors.length > 0){
                    setErrors([]);
                }

                console.log(res);

                props.setIssues([...props.issues, res.data])

                setFormValues(initialValues);

            })
            .catch(err => {

                console.dir(err);
            });
        })
        .catch(err => {
            console.dir(err);

            setErrors([...err.inner]);
        })
    };

    return(
        <div>
        <h2>Post an Issue</h2>
        <form>
           <label>Title:&nbsp;
                <input
                    name="title"
                    type="text"
                    data-cy="input-title"
                    onChange={handleChange}
                    value={formValues.title}
                    />
            </label>
            <label>Description:&nbsp;
                <input
                    name="description"
                    type="text"
                    data-cy="input-description"
                    onChange={handleChange}
                    value={formValues.description}
                    />
            </label>
            <label>Created By:&nbsp;
                <input
                    name="createdBy"
                    type="text"
                    data-cy="input-createdby"
                    onChange={handleChange}
                    value={formValues.createdBy}
                    />
            </label>
            <label>Zip Code:&nbsp;
                <input
                    name="zipCode"
                    type="text"
                    data-cy="input-zipcode"
                    onChange={handleChange}
                    value={formValues.zipCode}
                    />
            </label>
            
            
            <button data-cy="submit-button" onClick={handleSubmit}>Post New Issue</button>
            
            <div data-cy="error-output">
                {errors.map( err => (  
                    <p style={{color: "red"}}>{err.message}</p>
                ))}
            </div>
        </form>
        </div>
    )

}


export default IssueForm 