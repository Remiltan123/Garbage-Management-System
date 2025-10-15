import './WasteageClassifier.css';
import { FaUpload } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import classifierWastage from '../../assets/images/home.jpeg';
import { predictWaste } from '../../utility/api';
import { Wastagedata, Waste3R } from '../../utility/WastageData';
import { BinsContainer } from '../BinsContainer/BinsContainer';
import { SearchAI } from '../Recomand/Recomand';
import { toastWarn, toastError, toastSucces } from '../../Model/toast';

type Prediction = {
  waste: string;
  confidence: number | null;
  description: string;
};

export function WasteageClassifier() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>({
    waste: '',
    confidence: null,
    description: '',
  });

  useEffect(() => {
    const savedImage = localStorage.getItem('uploadedImage');
    const savedPrediction = localStorage.getItem('predictionData');
    if (savedImage) setSelectedImage(savedImage);
    if (savedPrediction) setPrediction(JSON.parse(savedPrediction));
  }, []);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const getBinClass = (bin: string) => {
    if (prediction?.waste) {
      let wasteType = prediction?.waste.toLowerCase().replace(/\s/g, '');
      if(wasteType === "e-waste"){ wasteType = "ewaste"}
      const waste3Rs = Waste3R[wasteType as keyof typeof Waste3R];
      return waste3Rs?.includes(bin) ? 'bin bin-highlight' : 'bin';
    }
    return 'bin';
  };


  const handleImageUpload = async (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await toBase64(file);
      setSelectedImage(base64);
      setSelectedFile(file);
      localStorage.setItem('uploadedImage', base64);
    }
  };

  const handleClassify = async () => {
    if (!selectedFile) {
      toastWarn("Please upload an image first!")
      return;
    }

    try {
      let result = await predictWaste(selectedFile);
      const newPrediction: Prediction = {
        waste: result.data.class,
        confidence: result.data.confidence,
        description: '',
      };

      const foundWastage = Wastagedata.find(
        (item) => item.type.toLowerCase() === result.data.class.toLowerCase()
      );

      const wastageDescription = foundWastage
        ? foundWastage.description
        : 'No description available for this waste type.';

      newPrediction.description = wastageDescription;
      setPrediction(newPrediction);

      localStorage.setItem('predictionData', JSON.stringify(newPrediction));
      if (selectedImage) {
        localStorage.setItem('predictionData', JSON.stringify(newPrediction));
        localStorage.setItem('uploadedImageName', selectedFile.name)
      }

      toastSucces("Prediction completed successfully!")

    } catch (error) {
      console.error('Prediction failed:', error);
      toastError("Prediction failed!")
    }
  };

  return (
    <div className="wasteage-classifier-container">
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

        <button className="classify-btn" onClick={handleClassify}>
          Classify your waste material
        </button>
      </div>

      <div className="classifier-right">
        <div>
          <h2>
            Waste classified as <span className="highlight">{prediction?.waste}</span>
            {" "}With Confidence <span className="highlight">{prediction?.confidence != null ? (
              <span className="highlight">{(prediction.confidence * 100).toFixed(2)} %</span>
            ) : (<></>)}</span>
          </h2>
          {prediction?.description.split("\n").map((line, index) => (
            <p key={index} style={{ lineHeight: 1.2 }}>{line}</p>
          ))}
        </div>

        <BinsContainer getBinClass={getBinClass} />

        <SearchAI />
      </div>
    </div>
  );
}
