import React, { useEffect, useState } from "react";
import { getProfile, deleteProfile, updateProfile } from "../api";
import "../styles/Profile.css"; // Import API functions

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
    phone: "",
    youtube: "",
    instagram: "",
  });

  const fetchProfiles = async () => {
    try {
      const data = await getProfile();
      console.log("Fetched profiles:", data); // Debugging log
      if (Array.isArray(data)) {
        setProfiles(data);
      } else {
        setProfiles([]);
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setProfiles([]); // Ensure state is always an array
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (email) => {
    try {
      await deleteProfile(email);
      setProfiles(profiles.filter((profile) => profile.email !== email));
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile._id);
    console.log("Editing profile data:", profile);
    setEditedData({
      name: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      youtube: profile.youtube_link || "",
      instagram: profile.insta_link || "",
    });
  };

  const handleUpdate = async (id) => {
    try {
      const updatedEmail = editedData.email;
      const result = await updateProfile(updatedEmail, editedData);

      if (!result.error) {
        setProfiles((prevProfiles) =>
          prevProfiles.map((profile) =>
            profile._id === id ? { ...profile, ...editedData } : profile
          )
        );
        alert("Profile Updated!");
        setEditingProfile(null);
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("Update failed! Check the console for details.");
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  if (loading) return <p>Loading profiles...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Profiles</h1>
      {!Array.isArray(profiles) || profiles.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        <ul className="space-y-2">
          {profiles.map((profile) => (
            <li key={profile._id} className="p-4 bg-white shadow-md rounded-lg profiledisplay">
              {editingProfile === profile._id ? (
                <div className="space-y-2">
                  <input
                    className="w-full p-2 border rounded"
                    type="text"
                    value={editedData.name}
                    onChange={(e) =>
                      setEditedData({ ...editedData, name: e.target.value })
                    }
                    placeholder="Name"
                  />
                  <input
                    className="w-full p-2 border rounded"
                    type="email"
                    value={editedData.email}
                    disabled
                    onChange={(e) =>
                      setEditedData({ ...editedData, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                  <input
                    className="w-full p-2 border rounded"
                    type="text"
                    value={editedData.phone}
                    onChange={(e) =>
                      setEditedData({ ...editedData, phone: e.target.value })
                    }
                    placeholder="Phone Number"
                  />
                  <input
                    className="w-full p-2 border rounded"
                    type="text"
                    value={editedData.youtube}
                    onChange={(e) =>
                      setEditedData({ ...editedData, youtube: e.target.value })
                    }
                    placeholder="YouTube Link"
                  />
                  <input
                    className="w-full p-2 border rounded"
                    type="text"
                    value={editedData.instagram}
                    onChange={(e) =>
                      setEditedData({ ...editedData, instagram: e.target.value })
                    }
                    placeholder="Instagram Link"
                  />
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => handleUpdate(profile._id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                    onClick={() => setEditingProfile(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-semibold">{profile.name}</h2>
                  <p>Email: {profile.email}</p>
                  <p>Phone Number: {profile.phone}</p>
                  {profile.youtube_link && (
                    <p>
                      YouTube:{" "}
                      <a
                        href={profile.youtube_link}
                        className="text-blue-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {profile.youtube_link}
                      </a>
                    </p>
                  )}
                  {profile.insta_link && (
                    <p>
                      Instagram:{" "}
                      <a
                        href={profile.insta_link}
                        className="text-pink-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {profile.insta_link}
                      </a>
                    </p>
                  )}
                  <div className="flex space-x-2 mt-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() => handleEdit(profile)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(profile.email)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;