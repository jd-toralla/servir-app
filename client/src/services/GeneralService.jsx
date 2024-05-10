import Swal from 'sweetalert2';

export const messageAlert = (title, text, timer, icon) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        showConfirmButton: false,
        timer: timer
    })
}
