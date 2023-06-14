import Swal from 'sweetalert2'


const useAlert = ()=>{


    const trigerNotification = (title, icon)=>{
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: icon,
            title: title,
          })
    }
    const bigSuccessAlert = (message)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1100
      })
    }
    const changePasswordPop =async ()=>{

      const  formValues  = await Swal.fire({
        title: 'Change your default password',
        html:
        // <script>console.log("hello world")</script>
        `
          <lable for="password_change">
            <h4 style="margin:0; color: #828282">Enter new password</h4>
          </lable>
          <input 
            type="password" 
            style="margin:2px; height:30px; color:black; max-width:275px;"  
            id="password_change" 
            class="swal2-input"
          >
          <lable for="confirm-password">
            <h4 style="margin:10px 0 0 0;color: #828282">confirm new password</h4>
          </lable>
          <input 
            type="password" 
            style="margin:2px; height:30px; color: black; max-width:275px;" 
            id="confirm-password" 
            class="swal2-input"
          >
           <div id="password-error" style="color: transparent;">
            Passwords do not match
           </div>
          
           <div className="">
                <label htmlFor="lp--checkbox" style="color:black">
                <input  type="checkbox" id="lp--checkbox"/>
                I agree to the  <a href="terms/" target="_blank">terms of use</a></label>
            </div>`
          ,
          
          confirmButtonColor:'#4AAC65',
          color:'#4AAC65',
          
          
        focusConfirm: false,

        
        preConfirm: () => {
          const password =  document.getElementById('password_change').value
          const confirm = document.getElementById('confirm-password').value
          const passwordError = document.getElementById('password-error');

       

          if(password !== confirm || password==='' ){
            passwordError.textContent = 'Passwords do not match'
            passwordError.style.color = 'red'
            return false
          }
          const includeChar = /[a-zA-Z]/g ;
          const includeDig = /[0-9]/g ;

          if(!includeChar.test(password) || !includeDig.test(password)){
            //Misiing either a character or a digit
            passwordError.textContent = 'The password must contain a digit and a character'
            passwordError.style.color = 'red'
            return false

          }

          if(!document.getElementById("lp--checkbox").checked){
            //Misiing either a character or a digit
            passwordError.textContent = 'Please approve the terms of use'
            passwordError.style.color = 'red'
            return false

          }

            return password
          
          
        }
      })
      return formValues ?? false
    }
    const deletAlert =async ({title, text, confirmText, background, icon})=>{

    const response =await Swal.fire({
      title: title,
      text: text ?? '',
      icon: icon || 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4AAC65',
      cancelButtonColor: 'gray',
      confirmButtonText: confirmText,
      heightAuto:true,
      background:background ?? '',
      iconColor:'#4AAC65',
    })
   
    return response.isDismissed
 
  }

  const textAlert =async ({title})=>{
    const response= await Swal.fire({
      title: title,
      input: 'textarea',
      confirmButtonColor: '#4AAC65',
      confirmButtonText:'Submit',
      allowEnterKey:true,
    })
    return response.value
  }
  const regularAlert = async ({text,title})=>{
    return Swal.fire({
      title:title,
      text:text,
      confirmButtonColor:'#4AAC65',
      confirmButtonText:'Copy Password'
    })
  }
  const justText = async ({text})=>{
    return Swal.fire({
      text:text,
      confirmButtonColor:'#4AAC65',
    })
  }
    

    

    return{
        trigerNotification,
        bigSuccessAlert,
        changePasswordPop,
        deletAlert,
        textAlert,
        regularAlert,
        justText
       

    }


}

export default useAlert