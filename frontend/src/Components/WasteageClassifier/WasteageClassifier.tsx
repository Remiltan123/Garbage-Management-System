import './WasteageClassifier.css';
import { FaUpload, FaArrowUp, FaRecycle } from 'react-icons/fa';
import { GiRecycle } from 'react-icons/gi';
import { MdOutlineDelete } from 'react-icons/md';
import classifierWastage from '../../assets/images/classifierWastage.jpg';

export function WasteageClassifier() {
  const predictedWaste = 'Plastic'; // Replace with ML prediction

  const getArrowClass = (bin: string) => {
    return predictedWaste === bin ? 'arrow-visible' : 'arrow-hidden';
  };

  return (
    <div className="wasteage-classifier-container">

      {/* Left Panel */}
      <div className="classifier-left">
        <h2>Classify Your Waste Material</h2>
        <div className="image-preview">
          <img src={classifierWastage} alt="waste" />
        </div>

        <p>Click the image upload icon below to upload an image.</p>

        <div className="upload-icon">
          <FaUpload size={40} />
        </div>

        <button className="classify-btn">Classify your waste material</button>
      </div>

      {/* Right Panel */}
      <div className="classifier-right">
        <div>
          <h2>
            Waste classified as <span className="highlight">{predictedWaste}</span>
          </h2>
          <p>
            Plastic recycling is the process of recovering scrap or waste plastic
            and reprocessing the material into useful products.
            Due to misleading symbols on plastic packaging and technical hurdles,
            less than 10% of plastic has ever been recycled.
          </p>
        </div>

        <div className="bins-container">
          <div className="bin">
            <GiRecycle size={60} color="#ff9800" />
            <p>Reduce</p>
            <FaArrowUp size={30} className={getArrowClass('Reduce')} />
          </div>
          <div className="bin">
            <FaRecycle size={60} color="#4caf50" />
            <p>Reuse</p>
            <FaArrowUp size={30} className={getArrowClass('Reuse')} />
          </div>
          <div className="bin">
            <MdOutlineDelete size={60} color="#2196f3" />
            <p>Recycle</p>
            <FaArrowUp size={30} className={getArrowClass('Recycle')} />
          </div>
        </div>
      </div>
    </div>
  );
}
