import React, { useState } from "react";

const CreateProfile = () => {
    const [about, setAbout] = useState('');
    const [image, setImage] = useState(null);

    const handleAboutChange = (e) => {
        setAbout(e.target.value);
    };

    const handleImageUpload = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-8">Create your Profile</h1>
            <form className="w-full max-w-sm">
                <label className="block mb-4">
                    <span className="text-gray-700">About Me:</span>                    
                    <textarea className="mt-1 block w-full roundedmd border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
                     rows="3"
                     value={about} 
                     onChange={handleAboutChange} />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Upload Picture:</span>                    
                    <input className="mt-1 block w-full roundedmd border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
                    type="file" 
                    onChange={handleImageUpload} />
                </label>
                {image && <img className="mt-4 rounded" src={image} alt="Profile Preview" />}
                <button type="submit" className="mt-4 px-4 py-2 rounded text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
                    Submit</button>
            </form>
        </div>
    );
};

export default CreateProfile;