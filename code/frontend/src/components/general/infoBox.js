import '../../styles/components/info_box.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const InfoBox = ({obj,size})=>{
    const {role} = useSelector(state=>state.user)
    const gotRole = role<=2?'mediator':'user'; 

    const objKeys = Object.keys(obj)
    const path = obj.id.replaceAll('-','')
    const {groups} = useSelector(state=>state.groups)
    
    const chatPath = `/${gotRole}/chat/${path}`

   
    

    const handleClick = ()=>{
  
      const groups_title = obj.title
      const filterGroups = groups.filter(group => group.groupname.startsWith(`${groups_title}_`))
      return filterGroups

    }


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
            <Link to={chatPath} state={{ groups: handleClick() ,caseId:obj.id}}>
                <button className='ib--start'>start chat</button>
            </Link>

          </div>
          
        </div>
      );
    };
export default InfoBox