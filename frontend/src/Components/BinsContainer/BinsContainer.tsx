import { FaRecycle } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
import { GiRecycle } from 'react-icons/gi';
import './BinsContainer.css'

type BinsContainerProps = {
    getBinClass: (bins:string) => string
}


export function BinsContainer({getBinClass}: BinsContainerProps) {
    return(
        <div className="bins-container">
          <div className={getBinClass('Reduce')}>
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
    )
}
