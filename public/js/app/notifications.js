var notification = document.querySelector('.mdl-js-snackbar');

function notify({ message, timeout, actionHandler, actionText }) {
    notification.MaterialSnackbar.showSnackbar({ message, timeout, actionHandler, actionText });
}

export default notify;
