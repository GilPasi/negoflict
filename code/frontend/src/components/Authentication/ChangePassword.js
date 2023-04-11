import { useState } from 'react' 
import useAlert from '../../hooks/useAlert'

const changePassword = ({current_password, access}) =>{
    const { passwordChange_pop } = useAlert()

    const [new_password,setNew_password ] = useState()
    const [reEnter, setReEnter] = useState(true)


    const passwordChange_pop =async ()=>{
      const { value: formValues } = await Swal.fire({
        title: 'Change your default password',
        html:
          '<lable for="password">Enter new password</lable>'+
          '<input id="password" class="swal2-input">' +
          '<lable for="confirm-password">confirm new password</lable>'+
          '<input id="confirm-password" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('password').value,
            document.getElementById('confirm-password').value
          ]
        }
      })
      
      if (formValues) {
        Swal.fire(JSON.stringify(formValues))
      }
    }










}

export default changePassword