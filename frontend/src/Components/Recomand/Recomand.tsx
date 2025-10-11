import './Recomand.css'
import { useState } from 'react';
import { Waste3R } from '../../utility/WastageData';

type RecomandSystemProps = {
  wasteType: string;
};

export function RecomandSystem({ wasteType }: RecomandSystemProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const actions = Waste3R[wasteType.toLowerCase() as keyof typeof Waste3R] || [];

  // FAQs for each action
  const actionDescriptions: Record<string, string> = {
    Reduce: `To reduce ${wasteType} waste, try minimizing usage and opting for longer-lasting or energy-efficient alternatives.`,
    Reuse: `Find creative ways to reuse ${wasteType} materials before discarding. Repair or repurpose whenever possible.`,
    Recycle: `Ensure ${wasteType} items are properly disposed of at recycling facilities. Follow your local recycling guidelines.`,
  };

  const handleToggle = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="recomand-container">
      <h2>Recommended Actions for {wasteType}</h2>
      {actions.length === 0 ? (
        <p>No specific 3R recommendations available for this waste type.</p>
      ) : (
        actions.map((action, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${activeIndex === index ? 'active' : ''}`}
              onClick={() => handleToggle(index)}
            >
              How can I {action.toLowerCase()} {wasteType}?
            </button>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{actionDescriptions[action]}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}