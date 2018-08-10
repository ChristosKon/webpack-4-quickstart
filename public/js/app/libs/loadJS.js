export default function loadJS(src, callback) {
    let ref = window.document.getElementsByTagName("script")[0];
    let script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = callback;
    ref.parentNode.insertBefore(script, ref);
}
