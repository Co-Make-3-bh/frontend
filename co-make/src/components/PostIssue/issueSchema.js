import * as yup from "yup";

export const IssueSchema = yup.object().shape({
  title: yup.string().required(" A title is required."),
  description: yup
    .string()
    .required("A description is required.")
    .min(20, "Description must be 20 characters or more."),
  // createdBy: yup.string().required("You must enter a name."),
  zip: yup.string().required(" A zip code is required"),
});
