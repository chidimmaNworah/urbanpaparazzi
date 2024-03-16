import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import ImageResize from "quill-image-resize-module-react";
import ReactQuill from "@/components/ReactQuill";
import { ImageResize } from "quill-image-resize-module-react";

export default function ReactQuill({ handleChange }) {
  Quill.register("modules/imageResize", ImageResize);

  const insertImageFromURL = (quill, imageURL) => {
    const range = quill.getSelection();
    const delta = {
      ops: [
        {
          insert: {
            image: imageURL,
          },
        },
      ],
    };
    quill.updateContents(delta);
    quill.setSelection(range.index + 1, range.length);
  };

  Quill.register("modules/imageUpload", function (quill, options) {
    const toolbar = quill.getModule("toolbar");
    toolbar.addHandler("image", () => {
      const imageURL = prompt("Enter the URL of the image:");
      if (imageURL) {
        insertImageFromURL(quill, imageURL);
      }
    });
  });

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    // handlers: {
    //   image: () => {},
    // },

    imageUpload: true,
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        name="description"
        value={product.description}
        onChange={(value) => handleChange("description", value)}
        // onChange={handleChange}
        // onChange={(newValue) => setDescription(newValue)}
        required
      />
    </div>
  );
}
