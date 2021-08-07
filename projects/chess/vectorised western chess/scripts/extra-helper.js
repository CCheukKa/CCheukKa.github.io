function killByClassName(className) {
    document.querySelectorAll(`.${className}`).forEach(e => e.remove());
}