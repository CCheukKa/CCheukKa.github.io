const headerElement = document.getElementById('header');
const titleElement = document.getElementById('title');
const dropdownElement = document.getElementById('dropdown');

window.addEventListener('load', resizeHandler);
window.addEventListener('resize', resizeHandler);


function resizeHandler() {
    //! Header
    catalogueElement.hidden = false;
    dropdownElement.hidden = true;
    let useDropdownMenu = (titleElement.getBoundingClientRect().right + 40 >= catalogueElement.getBoundingClientRect().left);
    console.log(titleElement.getBoundingClientRect().right, catalogueElement.getBoundingClientRect().left);
    catalogueElement.hidden = useDropdownMenu;
    dropdownElement.hidden = !useDropdownMenu;
}