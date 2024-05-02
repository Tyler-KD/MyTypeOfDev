import { useEffect, useState } from "react";
import { useQuery, useApolloClient, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { UPDATE_PROFILE } from "../utils/mutations";
import { NavLink } from "react-router-dom";

const CreateProfile = () => {
    const [about, setAbout] = useState('');
    const [image, setImage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { loading, error, data } = useQuery(GET_ME);
    const client = useApolloClient();

    const [isSubmitted, setisSubmitted] = useState(false);

    useEffect(() => {
        if (!loading && !error && data) {
            setAbout(data.me.username || '');
            setFirstName(data.me.firstName || '');
            setLastName(data.me.lastName || '');
            if (!image) {
                setImage(data.me.image || '');
            }
        }
    }, [loading, error, data]);

    const handleAboutChange = (e) => {
        setAbout(e.target.value);
        console.log(e.target.value)
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        console.log(e.target.value)
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
        console.log(e.target.value)
    };

    const handleImageUpload = (e) => {
        setImage(e.target.value);
    };

    const [updateProfile] = useMutation(UPDATE_PROFILE, {
        refetchQueries: [{ query: GET_ME }],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateProfile({ variables: { about, image, firstName, lastName } });
            console.log({ about, image, firstName, lastName })
            setisSubmitted(true);
        } catch (err) {
            console.error(err);
            setisSubmitted(false);
        }
    };

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :</p>;

    return (

        <div className="flex flex-col items-center  ">

            {firstName && lastName && about && image ? (
                <h1 className="text-7xl bg-orange-500 bg-opacity-80 w-1/3 text-center font-serif rounded-t-xl mt-10 animate-dropin1">Bio</h1>
            ) : (
                <h1 className="text-7xl bg-orange-500 bg-opacity-80 w-1/3 text-center font-serif rounded-t-xl mt-10 animate-dropin1">Bio</h1>
            )}
            {isSubmitted ? (
                <div className="bg-green-800 bg-opacity-95 w-1/3 text-center text-4xl text-black font-serif mt-10 rounded-xl border-4 border-green-950 mb-40 hover:scale-125">Success! {' '}
                    
                    <div className="animate-pulse text-6xl font-bold text-green-400">
                        <NavLink to="/profile">Go to Profile</NavLink>
                    </div>
                </div>

            ) : (
                <form className="w-1/3 bg-orange-500 bg-opacity-90 text-center items-center pb-4 font-serif rounded-b-xl" onSubmit={handleSubmit}>

                    <label className="flex flex-col items-center">
                        <span className="text-black text-xl">First Name:</span>
                        <input className="mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm "
                            value={firstName}
                            onChange={handleFirstNameChange} />
                    </label>
                    <label className="flex flex-col items-center">
                        <span className="text-black text-xl">Last Name:</span>
                        <input className="mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm "
                            value={lastName}
                            onChange={handleLastNameChange} />
                    </label>
                    <label className="flex flex-col items-center">
                        <span className="text-black text-xl">About Me:</span>
                        <textarea className="mt-1 block w-2/3 rounded-md border-gray-300 shadow-sm "
                            rows="3"
                            value={about}
                            onChange={handleAboutChange} />
                    </label>
                    <label className="flex flex-col items-center mx-2">
                        <span className="text-black text-xl mt-12">Image URL:</span>
                        <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                            type="text"
                            value={image}
                            onChange={handleImageUpload}
                            placeholder="Enter image URL"
                        />
                    </label>

                    {image && <img className="mt-4 rounded" src={image} alt="Profile Preview" />}
                    <button type="submit" className="mt-4 px-4 py-2 rounded text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none hover:scale-125 duration-300">
                        Submit</button>

                </form>

            )}

        </div>



    );
};

export default CreateProfile;
