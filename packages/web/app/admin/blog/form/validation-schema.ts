import { object, string } from "yup";

export const validationSchema = object({
  title: string().required("Title is required"),
  summary: string().required("Summary is required"),
  content: string().required("Content is required"),
  publishedAt: string().required("Published date is required"),
});
