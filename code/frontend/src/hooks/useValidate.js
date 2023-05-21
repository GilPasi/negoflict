


const useValidateData = ()=>{

    const validateData = (data)=>{
        const keys = Object.keys(data)
        let is_valid = true
        keys.forEach(key=>{
         if(!data[key] || data[key].trim()==='' || data[key]===undefined){
             let label = document.createElement('label')
             label.style.position = 'absolute'
             label.style.left = '35%'
             label.style.margin = '0'
             label.style.color = 'red'
             label.style.marginTop = '-15px'
             label.style.translate = 'transform(-30%)'
 
            
             label.innerText = `${key} is missing`
             label.id = `${key}_error`
             document.getElementById(key).appendChild(label)
             is_valid = false
         }
        })
        return is_valid
 
     }

     const clearValidate = (name)=>{
        const child = document.getElementById(`${name}_error`);
      
    
        if(child) 
            child.parentNode.removeChild(child);
        

     }

     return{
        validateData,
        clearValidate,
     }
}
export default useValidateData