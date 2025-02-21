import * as Yup from "yup";
export const addEventSchema = Yup.object({
  name: Yup.string().required("Event name is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.date().required("Date and time are required"),
});
