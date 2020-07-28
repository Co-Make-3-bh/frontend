
import React, { useState } from "react";
import axios from "axios";
import { IssueSchema } from "./issueSchema";
import styled from 'styled-components'


const FormContainer = styled.div`
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
width:100%;
text-decoration:none;
margin-bottom:5%;

p{
    color: #C6D7DD;
    margin-top:2%;
    font-size:1.5rem;
    font-family: 'Quicksand', sans-serif;
    
}

.link{
    text-decoration:none;
    color: white;
}

.errors{
  font-size:1.5rem;
  font-family: 'Quicksand', sans-serif;
  
    
}

    


`
const StyledForm = styled.div`

    background-color: #E5EBED;
    width: 50%;
    height:1400px;
    padding:2%;
    margin-top:5%;
    
    border-radius:20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    display:flex;
    flex-direction: column;
    
    align-items:center;
 
    
    
    form{
        width:95%;
    }

`



const StyledFormInput = styled.div`
    display:flex;
    flex-direction: column;
   
    width:100%;
   
    h2{
        text-align:left;
        font-size:2.5rem;
        margin-bottom:8%;
        margin-top:10%;
        font-family: 'Quicksand', sans-serif;
    }

    label{
        width:95%;
        text-align:left;
        margin:2%;
        font-size:1.2rem;
        font-family: 'Quicksand', sans-serif;
    }


    input{
        width: 95%;
        padding: 20px 20px;
        margin: 2%; 
        margin-bottom:8%;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        
        
    }

   

    #description {
        height:200px;
        width:95%;
        margin: 2%; 
        padding: 20px 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      
    }

    button{
        width: 95%;
        background-color: #2B85A2;
        color: white;
        padding: 20px 20px;
        margin: 2%;
        margin-top:10%;
        margin-bottom:10%;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size:1.2rem;
        font-family: 'Quicksand', sans-serif;
    }
    

`


const IssueForm = (props) => {
  const initialValues = {
    title: "",
    description: "",
    createdBy: "",
    zipCode: "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    console.dir(e.target);

    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    IssueSchema.validate(formValues, { abortEarly: false })
      .then((_) => {
        axios
          .post("https://comake-api.herokuapp.com/api/concerns", formValues)
          .then((res) => {
            if (errors.length > 0) {
              setErrors([]);
            }

            console.log(res);

            props.setIssues([...props.issues, res.data]);

            setFormValues(initialValues);
          })
          .catch((err) => {
            console.dir(err);
          });
      })
      .catch((err) => {
        console.dir(err);

        setErrors([...err.inner]);
      });
  };

  return (
    <FormContainer>
   
   <div className="error-output">
      
      {errors.map((err) => (
        <p style={{ color: "red" }}>{err.message}</p>
      ))}



    </div>
      <StyledForm>
      <form>
      <StyledFormInput>
      <h2>Post an Issue</h2>
      
        <label>
          Title:&nbsp;
          <input
            name="title"
            type="text"
            data-cy="input-title"
            onChange={handleChange}
            value={formValues.title}
          />
        </label>
        
        <label>
          Created By:&nbsp;
          <input
            name="createdBy"
            type="text"
            data-cy="input-createdby"
            onChange={handleChange}
            value={formValues.createdBy}
          />
        </label>
       
        <label>
          Zip Code:&nbsp;
          <input
            name="zipCode"
            type="text"
            data-cy="input-zipcode"
            onChange={handleChange}
            value={formValues.zipCode}
          />
        </label>

        <label  for ="description"> 
          Description:&nbsp;
          </label>
          <textarea id = 'description'
            name="description"
            type="text"
            data-cy="input-description"
            onChange={handleChange}
            value={formValues.description}
            
          />
         
       

       
        <button data-cy="submit-button" onClick={handleSubmit}>
          Post New Issue
        </button>

       
        </StyledFormInput>
      </form>
      </StyledForm>
      
    </FormContainer>
  );
};

export default IssueForm;
