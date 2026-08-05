"use client";

import { useState } from "react";

export default function PhotoUploader() {

  const [files, setFiles] = useState([]);

  function handleUpload(e) {
    setFiles(Array.from(e.target.files));
  }


  return (
    <div>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        className="w-full rounded-lg border p-3"
      />


      <div className="mt-4 grid grid-cols-3 gap-3">

        {files.map((file, index) => (

          <img
            key={index}
            src={URL.createObjectURL(file)}
            alt="vehicle preview"
            className="h-24 w-full rounded-lg object-cover"
          />

        ))}

      </div>

    </div>
  );
}