import '../../styles/info_box.css'
import { Link } from 'react-router-dom';
const InfoBox = ({obj,size})=>{
    const objKeys = Object.keys(obj)
    const path = obj.id.replaceAll('-','')


    return (
        <div className="ib" style={size}>
          <ul>
            {objKeys.map((key, index) => (
              <li key={index}>
                <strong>{key}:</strong> {obj[key]}
              </li>
            ))}
          </ul>
          <div >
            <Link to={`${path}`}>
                <button className='ib--start'>start chat</button>
            </Link>

          </div>
          
        </div>
      );
    };
export default InfoBox