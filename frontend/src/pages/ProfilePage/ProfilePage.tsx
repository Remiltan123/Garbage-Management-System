import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { getUsers } from "../../utility/api";
import { FaRegEdit, FaUserAlt , FaSignOutAlt} from "react-icons/fa";

export default function ProfilePage() {

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = localStorage.getItem("user");

            if (!storedUser) {
                console.error("User not found in localStorage");
                return;
            }

            const parsedUser = JSON.parse(storedUser);
            const id = parsedUser?.id;

            if (!id) {
                console.error("User ID missing");
                return;
            }

            try {
                const response = await getUsers(id);
                setUser(response?.user);
                console.log("Fetched User:", response?.user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="profile-container">
            <div className="profile-card">

                <div className="profile-header">
                    <h2>{user?.name || "User"}</h2>
                    <div><FaUserAlt size={40} color="black"/></div>
                    <p className="role-tag">{user?.role}</p>
                </div>

                <div className="profile-details">
                    <h3>Account Information</h3>

                    {user?.role === "reporter" && (
                        <>
                            <div className="info-row">
                                <span>Name:</span>
                                <p>{user?.username}</p>
                            </div>

                            <div className="info-row">
                                <span>Email:</span>
                                <p>{user?.email}</p>
                            </div>

                            <div className="info-row">
                                <span>Phone:</span>
                                <p>{user?.contactNumber}</p>
                            </div>
                            <div className="info-row">
                                <span>ReporteGarbageCount:</span>
                                <p>{user?.reportCount || 2}</p>
                            </div>
                        </>
                    )}


                    {user?.role === "collector" && (
                        <>
                            <div className="info-row">
                                <span>Name:</span>
                                <p>{user?.name}</p>
                            </div>

                            <div className="info-row">
                                <span>Email:</span>
                                <p>{user?.email}</p>
                            </div>

                            <div className="info-row">
                                <span>Phone:</span>
                                <p>{user?.phone}</p>
                            </div>

                            <div className="info-row">
                                <span>Collected Garbage Count:</span>
                                <p>{user?.collectCount || 3}</p>
                            </div>

                            <div className="info-row">
                                <span>Assigned Area:</span>
                                <p>{user?.area || "Kottawa to Maharakama"}</p>
                            </div>
                        </>
                    )}
                </div>

                <div className="profile-actions">
                    <div style={{ marginLeft: 100 }}>
                        <button className="btn-edit"><FaRegEdit /> Edit</button>
                        <button className="btn-logout"><FaSignOutAlt /> Logout</button>
                    </div>

                </div>
            </div>
        </div>
    );
}
