import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IssueSchema } from "./issueSchema";
import styled from "styled-components";
import { addConcern } from "../../store/actions";
import { CloudinaryContext, Image } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "./utils/CloudinaryService";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-decoration: none;
  margin-bottom: 5%;

  p {
    color: #c6d7dd;
    margin-top: 2%;
    font-size: 1.5rem;
    font-family: "Quicksand", sans-serif;
  }

  .link {
    text-decoration: none;
    color: white;
  }

  .errors {
    font-size: 1.5rem;
    font-family: "Quicksand", sans-serif;
  }
`;
const StyledForm = styled.div`
  background-color: #e5ebed;
  width: 45%;
  height: auto;
  padding: 2%;
  margin-top: 5%;

  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  display: flex;
  flex-direction: column;

  align-items: center;

  form {
    width: 95%;
    margin-bottom: 5%;
  }

  button {
    width: 95%;
    background-color: #2b85a2;
    color: white;
    padding: 20px 20px;
    margin: 2%;
    margin-top: 8%;
    margin-bottom: 2%;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.2rem;
    font-family: "Quicksand", sans-serif;
  }
`;

const StyledFormInput = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  h2 {
    text-align: left;
    font-size: 2.2rem;
    margin-bottom: 8%;
    margin-top: 10%;
    font-family: "Quicksand", sans-serif;
  }

  label {
    width: 95%;
    text-align: left;
    margin: 2%;
    font-size: 1.2rem;
    font-family: "Quicksand", sans-serif;
  }

  input {
    width: 95%;
    padding: 10px 10px;
    margin: 2%;
    margin-bottom: 8%;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  #description {
    height: 200px;
    width: 95%;
    margin: 2%;
    padding: 20px 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

const IssueForm = (props) => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  const initialValues = {
    title: "",
    description: "",
    createdBy: user.id,
    zip: "",
    imageURL: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  const uploadImage = (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("upload_preset", "upload");
    formData.append("file", files);
    setLoading(true);

    axios
      .post(
        "https://api.cloudinary.com/v1_1/co-make-test/image/upload",
        formData
      )
      .then((res) => {
        setImage(res.data.url);
        setFormValues({ ...formValues, imageURL: res.data.url });
      })
      .then(setLoading(false))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    IssueSchema.validate(formValues, { abortEarly: false })
      .then((_) => {
        console.log(formValues);
        dispatch(addConcern(formValues));
        push("/profile");
      })
      .catch((err) => {
        console.dir(err);
        setErrors([...err.inner]);
      });
    setFormValues(initialValues);
  };

  // const beginUpload = (tag) => {
  //   const uploadOptions = {
  //    cloudName: "co-make-test",
  //     tags: [tag],
  //     uploadPreset: "upload",
  //   };

  //   openUploadWidget(uploadOptions, (error, photos) => {
  //     if (!error) {
  //         console.log(photos);
  //         if (photos.event === "success") {
  //           setImages([...images, photos.info.public_id]);
  //         }
  //       } else {
  //         console.log(error);
  //       }
  //     });
  // };
  // useEffect(() => {
  //   fetchPhotos("image", setImages);
  // }, []);

  return (
    <CloudinaryContext cloudName="co-make-test">
      <FormContainer>
       
        <StyledForm>
          <form>
            <StyledFormInput>
              <h2>Post an Issue</h2>

              <label htmlFor="title">Title:&nbsp;</label>
              <input
                name="title"
                type="text"
                data-cy="input-title"
                onChange={handleChange}
                value={formValues.title}
              />

              {/* <label htmlFor="createdBy">Created By:&nbsp;</label>
            <input
              name="createdBy"
              type="text"
              data-cy="input-createdby"
              onChange={handleChange}
              value={formValues.createdBy}
            /> */}

              <label htmlFor="zipCode">Zip Code:&nbsp;</label>
              <input
                name="zip"
                type="text"
                data-cy="input-zipcode"
                onChange={handleChange}
                value={formValues.zip}
              />

              <label htmlFor="description">Description:&nbsp;</label>
              <textarea
                id="description"
                name="description"
                type="text"
                data-cy="input-description"
                onChange={handleChange}
                value={formValues.description}
              />

              <label htmlFor="file">Upload Photo:&nbsp;</label>
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={uploadImage}
                style={{ border: "none" }}
                value={formValues.photo}
              />

              <label htmlFor="file">Image Url:&nbsp;</label>
              <input
                type="text"
                name="imageURL"
                onChange={handleChange}
                style={{ border: "none" }}
                value={formValues.imageURL}
              />
            </StyledFormInput>
          </form>

          {loading ? <p>loading...</p> : <img src={image} />}
          {/* <section>
            {images.map((i) => (
              <Image key={i} publicId={i} fetch-format="auto" quality="auto" />
            ))}
          </section>

          <button onClick={() => beginUpload()}>Upload Image</button> */}

<div className="error-output">
          {errors.map((err) => (
            <p style={{ color: "red" }}>{err.message}</p>
          ))}
        </div>
          <button data-cy="submit-button" onClick={handleSubmit}>
            Post New Issue
          </button>
        </StyledForm>
      </FormContainer>
    </CloudinaryContext>
  );
};

export default IssueForm;
