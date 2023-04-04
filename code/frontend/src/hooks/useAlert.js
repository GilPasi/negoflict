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
    const bigSuccessAlert = (message)=>[
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500
      })
    ]


    return{
        trigerNotification,
        bigSuccessAlert
    }


}

export default useAlert