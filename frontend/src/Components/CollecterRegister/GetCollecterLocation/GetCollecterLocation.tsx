import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './GetCollecterLocation.css'

interface Props {
    setStartLocation: (pos: [number, number]) => void;
    setEndLocation: (pos: [number, number]) => void;
}

export const GetCollectorLocation: React.FC<Props> = ({
    setStartLocation,
    setEndLocation,
}) => {
    const [step, setStep] = useState<"start" | "end">("start");
    const [startMarker, setStartMarker] = useState<[number, number] | null>(null);
    const [endMarker, setEndMarker] = useState<[number, number] | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);


    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                if (step === "start") {
                    setStartMarker([lat, lng]);
                    setStartLocation([lat, lng]);
                    setStep("end");
                    setSearchQuery("");
                } else {
                    setEndMarker([lat, lng]);
                    setEndLocation([lat, lng]);
                }
            },
        });
        return null;
    };


    const RecenterMap = ({ position }: { position: [number, number] }) => {
        const map = useMap();
        map.setView(position, 14);
        return null;
    };


    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                searchQuery
            )}`
        );
        const data = await res.json();
        setSearchResults(data);
    };


    const handleSelectLocation = (lat: number, lon: number, display_name: string) => {
        const pos: [number, number] = [lat, lon];
        if (step === "start") {
            setStartMarker(pos);
            setStartLocation(pos);
            setStep("end");
        } else {
            setEndMarker(pos);
            setEndLocation(pos);
        }

        // center map and reset UI
        setSearchQuery("");
        setSearchResults([]);
    };

    return (
        <div className="colleter-regidter-loction-container">
            <h2 className="text-lg font-semibold mb-3 text-center text-gray-700">
                {step === "start" ? "Select Start Location" : "Select End Location"}
            </h2>

            <form
                onSubmit={handleSearch}
                className="flex justify-center mb-3 relative"
            >
                <input
                    type="text"
                    placeholder={
                        step === "start"
                            ? "Search start location..."
                            : "Search end location..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="colleter-regidter-loction-input-container"
                />
                <button
                    type="submit"
                    className="colleter-regidter-loction-button"
                >
                    Search
                </button>


                {searchResults.length > 0 && (
                    <div className="absolute bg-white border rounded-md shadow-md w-2/3 mt-10 z-10 max-h-48 overflow-y-auto p-2">
                        {searchResults.slice(0, 6).map((result, index) => (
                            <label
                                key={index}
                                className="block p-2 hover:bg-gray-100 cursor-pointer text-sm"
                            >
                                <input
                                    type="checkbox"
                                    className="accent-blue-500 mr-2"
                                    onChange={() =>
                                        handleSelectLocation(
                                            parseFloat(result.lat),
                                            parseFloat(result.lon),
                                            result.display_name
                                        )
                                    }
                                />
                                <span>{result.display_name}</span>
                            </label>
                        ))}
                    </div>
                )}

            </form>


            <MapContainer
                center={[6.9271, 79.8612]}
                zoom={13}
                style={{
                    height: "400px",
                    width: "100%",
                    borderRadius: "10px",
                    marginTop:"10px"
                }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler />


                {startMarker && (
                    <>
                        <Marker position={startMarker} />
                        <RecenterMap position={startMarker} />
                    </>
                )}
                {endMarker && (
                    <>
                        <Marker position={endMarker} />
                        <RecenterMap position={endMarker} />
                    </>
                )}
            </MapContainer>
        </div>
    );
};
