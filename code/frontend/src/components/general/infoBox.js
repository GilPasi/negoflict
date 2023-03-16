import '../../styles/detail_box.css'
import { Link } from 'react-router-dom';
const InfoBox = ({obj})=>{
    const objKeys = Object.keys(obj)
    const path = obj.id.replaceAll('-','')


    return (
        <div className="box">
          <ul>
            {objKeys.map((key, index) => (
              <li key={index}>
                <strong>{key}:</strong> {obj[key]}
              </li>
            ))}
          </ul>
          <div >
            <Link to={`${path}`}>
                <button className='start-chat'>start chat</button>
            </Link>

          </div>
          
        </div>
      );
    };
export default InfoBox