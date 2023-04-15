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
          '<lable for="password"><h4 style="margin:0; color: #828282">Enter new password</h4></lable>'+
          '<input style="margin:2px; height:30px; color:black"  id="password" class="swal2-input">' +
          '<lable for="confirm-password"><h4 style="margin:10px 0 0 0;color: #828282">confirm new password</h4></lable>'+
          '<input style="margin:2px; height:30px; color: black;" id="confirm-password" class="swal2-input">'+
          ' <span id="password-error" style="color: red; display: none;">Passwords do not match</span>'
          ,
          confirmButtonColor:'#4AAC65',
          color:'#4AAC65',
          
          
        focusConfirm: false,

        
        preConfirm: () => {
          const password =  document.getElementById('password').value
          const confirm = document.getElementById('confirm-password').value
          const passwordError = document.getElementById('password-error');

          if(password !== confirm || password==='' ){
            passwordError.style.display = 'block'
            return false
          }
          else
            return password
        }
        
      })
      return formValues ?? false
    }
    const deletAlert =async ({title, text, confirmText, background})=>{

    const response =await Swal.fire({
      title: title,
      text: text ?? '',
      icon: 'warning',
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
    

    

    return{
        trigerNotification,
        bigSuccessAlert,
        changePasswordPop,
        deletAlert,
       

    }


}

export default useAlert