import React, { useState } from "react";
import { getStorage,ref , uploadBytes,getDownloadURL} from "firebase/storage";
import app from "./firebase";


const Imageuploader = () => {
    const [uploading,setuploading]=useState(false);
    const [imageUrl,setimageUrl]=useState("");
   const handleImagechange =async (event) => {
    console.log(event.target.files[0]);
    const image=event.target.files[0];
    if(image){
        try {
            setuploading(true);
            const storage=getStorage(app);
            const storageRef=ref(storage,"images/"+image.name);
            await uploadBytes(storageRef,image);
            const url=await getDownloadURL(storageRef);
            setuploading(false);
            console.log(url);
            setimageUrl(url);
        } catch (error) {
           console.log(error) 
        } finally {
            setuploading(false);
        }
       
    }
  };
  return (
    <div>
      <h1>Image Uploader</h1>
      <input type="file" onChange={handleImagechange} />
      <button disabled={uploading}>{uploading?"Uploading":"Upload"}</button>
      {imageUrl && <img src={imageUrl} alt="uploaded" />}
    </div>
  );
};

export default Imageuploader;