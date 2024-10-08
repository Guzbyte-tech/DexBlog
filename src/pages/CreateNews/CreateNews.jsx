import { useState } from "react";
import { toast } from "react-toastify";
import useCreateNews from "../../hooks/useCreateNews";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateNews = () => {
  const handleFormSubmision = useCreateNews();
  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState();
  const [errors, setErrors] = useState({
    title: "",
    body: "",
    upload: "",
  });

  const [state, setState] = useState({
    title: "",
    body: "",
    upload: "",
  });

  const { title, body } = state;

  // Quill Editor modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  // Handle input change for title
  const handleInputChange = (name, e) => {
    setState((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  // Handle Quill editor change for body
  const handleEditorChange = (value) => {
    setState((prevState) => ({ ...prevState, body: value }));
  };

  // Handle file upload change
  const handleFileChange = (event) => {
    setUpload(event.target.files[0]); // Get the selected image file
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let formIsValid = true;
    const newErrors = { title: "", body: "", upload: "" };

    if (title.trim() === "") {
      newErrors.title = "Title is required.";
      formIsValid = false;
    }

    if (body.trim() === "") {
      newErrors.body = "News body is required.";
      formIsValid = false;
    }

    if (!upload) {
      newErrors.upload = "Select a blog image.";
      formIsValid = false;
    }

    setErrors(newErrors);
    if (!formIsValid) {
      setLoading(false)
      toast.error("Error submitting form.");
      return;
    }

    // If form is valid, submit the form
    try {
      handleFormSubmision(title, body, upload);
    } catch (error) {
      console.log("Error publishing news to the blochain. ", error);
      toast.error("Error uploading file or sending to blockchain");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full sm:full md:w-7/12 lg:w-7/12 mx-auto my-4 p-3 border">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="space-y-6 text-left">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Create News
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Title Input */}
                <div className="col-span-full">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <input
                      id="title"
                      name="title"
                      value={title}
                      onChange={(e) => handleInputChange("title", e)}
                      className={`block w-full rounded-md border px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                        errors.title
                          ? "border-red-500 ring-red-500"
                          : "focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      }`}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title}
                      </p>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Title of post
                  </p>
                </div>

                {/* Blog Body */}
                <div className="col-span-full">
                  <label
                    htmlFor="body"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Blog Body
                  </label>
                  <div className="mt-2">
                    <ReactQuill
                      className={`block w-full rounded-md border px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                        errors.body
                          ? "border-red-500 ring-red-500"
                          : "focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      }`}
                      value={body}
                      onChange={handleEditorChange}
                      // style={{ height: "300px" }}
                      modules={modules}
                      placeholder="Write something..."
                    />
                    {errors.body && (
                      <p className="text-red-500 text-sm mt-1">{errors.body}</p>
                    )}
                  </div>
                </div>

                {/* Cover Photo */}
                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 "
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="upload"
                            type="file"
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      {errors.upload && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.upload}
                        </p>
                      )}
                      {upload && (
                        <p className="text-green-500 text-sm mt-1">
                          File selected: {upload.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? "Submitting..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateNews;
