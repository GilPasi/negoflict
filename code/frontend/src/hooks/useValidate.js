
const useValidateData = ()=>{

    const validateData = (data,where)=>{
        const keys = Object.keys(data)
        let is_valid = true
        keys.forEach(key=>{
         if(!data[key] || data[key].trim()==='' || data[key]===undefined){
            addErrorLable(key,where)
             
             is_valid = false
         }
        })
        return is_valid
     }


     const addErrorLable = (key,where, message)=>{
        let label = document.createElement('label')
       
            
             label.style.position = 'absolute'
             label.style.left = '10%'
             label.style.margin = '0'
             label.style.color = 'red'
             label.style.zIndex = '1000'
             if(where === 'createUser'){
                label.style.top = '-50%'
             }
            
        
            

             label.style.translate = 'transform(-70%, -30%)'
             
 
            
             label.innerText = message ?? `${key} is missing`
             label.id = `${key}_error`
             document.getElementById(key).appendChild(label)

     }

     const clearValidate = (name)=>{
        const child = document.getElementById(`${name}_error`);
      
    
        if(child) 
            child.parentNode.removeChild(child);
        

     }

     return{
        validateData,
        clearValidate,
        addErrorLable,
     }
}
export default useValidateData