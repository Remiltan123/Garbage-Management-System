import React, { useState } from "react";
import './GetCollecterInfo.css'
import axios from "axios";

interface Props {
    startLocation: [number, number];
    endLocation: [number, number];
    
}

export const CollectorDetails: React.FC<Props> = ({ startLocation, endLocation }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        phone: "",
        email: "",
        collectionType: "single",
        wasteType: [] as string[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleWasteTypeChange = (waste: string) => {
        setFormData(prev => {
            const selected = prev.wasteType.includes(waste)
                ? prev.wasteType.filter(w => w !== waste)
                : [...prev.wasteType, waste];
            return { ...prev, wasteType: selected };
        });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   
    const collectorData = {
        name: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        start: { lat: startLocation[0], lon: startLocation[1] },
        end: { lat: endLocation[0], lon: endLocation[1] },
        assignedBins:
        formData.collectionType === "multi"
            ? "Multi Collection"
            : formData.wasteType.join(","), 
        routePolyline: "", 
        role: "collector",
    };

    console.log("collectorData", collectorData)

    try {
        
        const res = await axios.post(
            "http://localhost:3000/api/auth/collecter-register",
            collectorData,
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("Registered successfully:", res.data);
        alert(`Collector registered: ${res.data.collector.name}`);
    } catch (error: any) {
        console.error("Error registering collector:", error.response?.data || error.message);
        alert(`Error: ${error.response?.data?.error || "Server error"}`);
    }
};

    return (
        <form onSubmit={handleSubmit} className="collector-form-container">
            <h2>Collector Details</h2>

            <div className="collector-form-input">
                <label>Username</label>
                <input type="text" name="username" placeholder="Enter username" onChange={handleChange} />
            </div>

            <div className="collector-form-input">
                <label>Password</label>
                <input type="password" name="password" placeholder="Enter password" onChange={handleChange} />
            </div>

            <div className="collector-form-input">
                <label>Phone Number</label>
                <input type="text" name="phone" placeholder="Enter phone number" onChange={handleChange} />
            </div>

            <div className="collector-form-input">
                <label>Email</label>
                <input type="email" name="email" placeholder="Enter email" onChange={handleChange} />
            </div>

            <div className="collector-form-input">
                <label>Collection Type</label>
                <select name="collectionType" value={formData.collectionType} onChange={handleChange}>
                    <option value="single">Single Collection</option>
                    <option value="multi">Multi Collection</option>
                </select>
            </div>

            {formData.collectionType === "single" && (
                <div className="collector-form-input">
                    <label>Select Waste Type</label>
                    <div className="waste-type-group">
                        {["Glass", "Plastic", "Paper", "Organic"].map(w => (
                            <label key={w}>
                                <input
                                    type="checkbox"
                                    checked={formData.wasteType.includes(w)}
                                    onChange={() => handleWasteTypeChange(w)}
                                />
                                {w}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            <button type="submit" className="submit-btn">Register Collector</button>
        </form>


    );
};
