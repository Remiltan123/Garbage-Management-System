import './WasteageClassifier.css';
import { FaUpload, FaArrowUp, FaRecycle } from 'react-icons/fa';
import { GiRecycle } from 'react-icons/gi';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import classifierWastage from '../../assets/images/home.jpeg';
import {predictWaste} from '../../utility/api'

export function WasteageClassifier() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [predictedWaste, setPredictedWaste] = useState<string>('');
  const [confidence, setConfidence] = useState<number | null>(null);
  

  const getBinClass = (bin: string) => {
    return predictedWaste === bin ? 'bin bin-highlight' : 'bin';
  };

  const handleImageUpload = (event:any) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setSelectedFile(file)
    }
  };

  const handleClassify = async () => {
    if (!selectedFile) {
      alert("Please upload an image first!");
      return;
    }
    try {
      const result = await predictWaste(selectedFile);
      setPredictedWaste(result.class);
      setConfidence(result.confidence);
    } catch (error) {
      console.error("Prediction failed:", error);
      alert("Prediction failed. Check backend connection.");
    }
  };


  return (
    <div className="wasteage-classifier-container">

      {/* Left Panel */}
      <div className="classifier-left">
        <h2>Classify Your Waste Material</h2>
        <div className="image-preview">
          <img src={selectedImage || classifierWastage} alt="waste" />
        </div>

        <p>Click the image upload icon below to upload an image.</p>

       <div className="upload-icon">
          <label htmlFor="file-upload" className="upload-label">
            <FaUpload size={40} style={{ cursor: 'pointer' }} />
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </div>

        <button className="classify-btn" onClick={handleClassify}>Classify your waste material</button>
      </div>

      {/* Right Panel */}
      <div className="classifier-right">
        <div>
          <h2>
            Waste classified as <span className="highlight">{predictedWaste}</span>
          </h2>
          <p>
            Plastic recycling is the process of recovering scrap or waste plastic and reprocessing the material into useful products. Due to purposefully misleading symbols on plastic packaging and numerous technical hurdles, less than 10% of plastic has ever been recycled. Compared with the lucrative recycling of metal, and similar to the low value of glass recycling, plastic polymers recycling is often more challenging because of low density and low value.<br />Materials recovery facilities are responsible for sorting and processing plastics. As of 2019, due to limitations in their economic viability, these facilities have struggled to make a meaningful contribution to the plastic supply chain. The plastics industry has known since at least the 1970s that recycling of most plastics is unlikely because of these limitations. However, the industry has lobbied for the expansion of recycling while these companies have continued to increase the amount of virgin plastic being produced.
          </p>
        </div>



        <div className="bins-container">
          <div className='bin-highlight'>
            <GiRecycle size={40} color="#ff9800" />
            <p>Reduce</p>
          </div>
          <div className={getBinClass('Reuse')}>
            <FaRecycle size={40} color="#4caf50" />
            <p>Reuse</p>
          </div>
          <div className={getBinClass('Recycle')}>
            <MdOutlineDelete size={40} color="#2196f3" />
            <p>Recycle</p>
          </div>
        </div>
      </div>
    </div>
  );
}
