import * as Yup from "yup";

export const addRoomSchema = Yup.object().shape({
  name: Yup.string().required("Room name is required"),
  description: Yup.string(),
  image: Yup.mixed<File>().test(
    "fileSize",
    "The file is too large",
    (value) => {
      if (!value) return true;
      return value.size <= 3 * 1024 * 1024;
    }
  ),
});
