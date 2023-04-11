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

    const password_pop =async ()=>{
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


    return{
        trigerNotification,
        bigSuccessAlert,
        password_pop,
    }


}

export default useAlert