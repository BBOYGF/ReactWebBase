import Swal from 'sweetalert2'

export default  class  AlertUtil {

   static show(title, content) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            icon: 'success',
            title: title,
            text: content
        })
    }

   static error(title, content) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            icon: 'warning',
            title: title,
            text: content
        })
    }
}