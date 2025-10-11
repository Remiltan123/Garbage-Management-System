
export const predictWaste = async (file: File) => {
    const formdata = new FormData();
    formdata.append("file", file)

    const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formdata
    })
    if (!response.ok) {
        throw new Error("Failed to get prediction");
    }
    const data = await response.json();
    console.log(".....>", data)
    return data;
}
