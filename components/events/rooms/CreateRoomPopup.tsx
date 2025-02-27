import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus } from "lucide-react";
import Image from "next/image";

interface CreateRoomPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RoomFormValues {
  name: string;
  description: string;
  image: File | null;
}

const validationSchema = Yup.object().shape({
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

export function CreateRoomPopup({ isOpen, onClose }: CreateRoomPopupProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const initialValues: RoomFormValues = {
    name: "",
    description: "",
    image: null,
  };

  const handleSubmit = (
    values: RoomFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log(values);
    setSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Room</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Label htmlFor="name">Room Name</Label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  placeholder="Enter room name"
                  className={
                    errors.name && touched.name ? "border-red-500" : ""
                  }
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Field
                  as={Textarea}
                  id="description"
                  name="description"
                  placeholder="Enter room description"
                  className={
                    errors.description && touched.description
                      ? "border-red-500"
                      : ""
                  }
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="image">Room Image</Label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      setFieldValue("image", file);
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setPreviewImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <label
                    htmlFor="image"
                    className="cursor-pointer bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 px-3 py-2 flex items-center"
                  >
                    <ImagePlus className="w-5 h-5 mr-2" />
                    Upload Image
                  </label>
                  {previewImage && (
                    <Image
                      src={previewImage || "/placeholder.svg"}
                      alt="Preview"
                      className="ml-3 h-16 w-16 object-cover rounded-md"
                      width={64}
                    />
                  )}
                </div>
                {errors.image && touched.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  Create Room
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
