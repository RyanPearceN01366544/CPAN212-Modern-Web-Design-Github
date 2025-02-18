/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

const App = () => {
  // what do we need to track
  const [singleFile, setSingleFile] = useState(null); // Files Stuff
  const [multipleFiles, setMultipleFiles] = useState(null);

  const [displayImage, setDisplayImage] = useState(null); // Display Images
  const [displayImages, setDisplayImages] = useState([]);
  const [displayDogImage, setDisplayDogImage] = useState(null);

  const [message, setMessage] = useState(""); // Message

  useEffect(() => {
    if (multipleFiles !== null){
      for (let x_ = 0; x_ < multipleFiles.length; x_ = x_ + 1){
        console.log(`Multiple File #${x_}: ${multipleFiles[x_]}`);
      }
    }
  }, [multipleFiles])

  // Handlers
  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
    }
  };
  const handleMultipleFilesChange = (e) => {
    if (e.target.files.length > 0) {
      setMultipleFiles([...e.target.files]);
    }
  };

  // fetch functions -> fetch a random single image
  const fetchSingleFile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/single`);

      const blob = await response.blob(); // we made a blob - Binary Large Object
      // but thats not an image, so we need to make an image element

      // using createObjectURL
      const imageUrl = URL.createObjectURL(blob);
      setDisplayImage(imageUrl);
      console.log(blob);
      console.log(imageUrl);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };
  // fetch functions -> save single
  const handleSubmitSingleFile = async (e) => {
    e.preventDefault();
    if (!singleFile) {
      setMessage("Please select a file before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", singleFile);
      
      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // fetch functions -> save multiple
  const handleSubmitMultipleFile = async (e) => {
    e.preventDefault();
    if (!multipleFiles) {
      setMessage("Please select a file before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      multipleFiles.forEach((file) => {
        formData.append(`files`, file);
      });
      
      const response = await fetch(`http://localhost:8000/save/multiple`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(`Test: ${JSON.stringify(data)}`);

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  // fetch functions -> fetch multiple
  const fetchMultipleFiles = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/fetch/multiple"); // Getting the multiple images.
      const data = await response.json(); // Getting the images locations in a json.

      const filePromises = data.map(async(filename) => { // Map (basically a for loop) each filename.
        const fetchFileNameData = await fetch(`http://localhost:8000/fetch/file/${filename}`); // Get the file.
        const fileBlob = await fetchFileNameData.blob(); // Download via blob.
        const imgUrl = URL.createObjectURL(fileBlob);
        console.log(fileBlob);
        console.log(imgUrl);
        return imgUrl;
      });
      const imageUrls = await Promise.all(filePromises);
      setDisplayImages(imageUrls);
    }
    catch (err_){
      console.log(err_);
    }
  };
  // fetch functions -> save dog image [TODO]
  const handleDogImage = async(e) => {
    
  };
  // fetch functions -> fetch dog image [TODO]
  const fetchDogImage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/fetch/multiple"); // Getting the multiple images.
      const data = await response.json(); // Getting the images locations in a json.

      const filePromises = data.map(async(filename) => { // Map (basically a for loop) each filename.
        const fetchFileNameData = await fetch(`http://localhost:8000/fetch/file/${filename}`); // Get the file.
        const fileBlob = await fetchFileNameData.blob(); // Download via blob.
        const imgUrl = URL.createObjectURL(fileBlob);
        console.log(fileBlob);
        console.log(imgUrl);
        return imgUrl;
      });
      const imageUrls = await Promise.all(filePromises);
      setDisplayImages(imageUrls);
    }
    catch (err_){
      console.log(err_);
    }
  };

  return (
    <div>
      <p>{message}</p>
      <h2>Fetch Single Random Image</h2>
      <button onClick={fetchSingleFile}>Fetch Single File</button>
      {displayImage && (
        <div>
          <h3>Single File</h3>
          <img
            src={displayImage}
            alt="Display Image"
            style={{ width: "200px", marginTop: "10px" }}
          />
        </div>
      )}
      <button onClick={fetchMultipleFiles}>Fetch Multiple File</button>
      { displayImages.length > 0 ? (
        <div>
          <h3>Multiple Files</h3>
          {
            displayImages.map((image, index) => (
            <div key={index}>
              <img
                src={displayImages[index]}
                alt="Display Image"
                style={{ width: "200px", marginTop: "10px" }}
              />
            </div>
            ))
          }
        </div>
      ) : 
      (
        <p>No Image to display.</p>
      )
      }
      <form onSubmit={handleSubmitSingleFile}>
        <h2>Upload Single File</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button type="submit">Upload Single File</button>
      </form>
      <form onSubmit={handleSubmitMultipleFile}>
        <h2>Upload Multiple Files</h2>
        <input type="file" onChange={handleMultipleFilesChange} multiple/>
        <button type="submit">Upload Multiple Files</button>
      </form>
    </div>
  );
};

export default App;