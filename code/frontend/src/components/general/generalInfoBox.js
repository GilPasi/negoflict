import '../../styles/components/info_box.css'



const GeneralInfoBox = ({obj, size})=>{

    const objKeys = Object.keys(obj)


    return(
        <div>
            <ul>
            {objKeys.map((key, index) => (
              <li key={index}>
                <strong>{key}:</strong> {obj[key]}
              </li>
            ))}
          </ul>
        </div>
    )

}

export default GeneralInfoBox