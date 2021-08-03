// LottieInteractivity.create({
//     mode: 'scroll',
//     player: '#menu-icon',
//     actions: [{
//         visibility: [0, 1],
//         type: 'seek',
//         frames: [0, 100],
//     }, ],
// });
//
//! Doesn't work for some reason,
//! tackle this again when the whole thing is refactored to be run on node

const menuIcon = document.getElementById('menu-icon');
const dropdownMenu = document.getElementById('dropdownMenu');
menuIcon.addEventListener('click', toggle);
dropdownMenu.hidden = true;

const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40px" height="40px" preserveAspectRatio="xMidYMid meet" style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px);"><defs><clipPath id="__lottie_element_315"><rect width="100" height="100" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_315)"><g transform="matrix(1,0,0,1,51,30)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(2,0,0,2,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M15.5,0 C15.5,0 15.5,0 15.5,0 C15.5,1.1038000583648682 14.603799819946289,2 13.5,2 C13.5,2 -13.5,2 -13.5,2 C-14.603799819946289,2 -15.5,1.1038000583648682 -15.5,0 C-15.5,0 -15.5,0 -15.5,0 C-15.5,-1.1038000583648682 -14.603799819946289,-2 -13.5,-2 C-13.5,-2 13.5,-2 13.5,-2 C14.603799819946289,-2 15.5,-1.1038000583648682 15.5,0z" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#e8e6e3;"></path></g></g><g transform="matrix(1,0,0,1,51,50)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(2,0,0,2,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M15.5,0 C15.5,0 15.5,0 15.5,0 C15.5,1.1038000583648682 14.603799819946289,2 13.5,2 C13.5,2 -13.5,2 -13.5,2 C-14.603799819946289,2 -15.5,1.1038000583648682 -15.5,0 C-15.5,0 -15.5,0 -15.5,0 C-15.5,-1.1038000583648682 -14.603799819946289,-2 -13.5,-2 C-13.5,-2 13.5,-2 13.5,-2 C14.603799819946289,-2 15.5,-1.1038000583648682 15.5,0z" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#e8e6e3;"></path></g></g><g transform="matrix(1,0,0,1,51,70)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(2,0,0,2,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M15.5,0 C15.5,0 15.5,0 15.5,0 C15.5,1.1038000583648682 14.603799819946289,2 13.5,2 C13.5,2 -13.5,2 -13.5,2 C-14.603799819946289,2 -15.5,1.1038000583648682 -15.5,0 C-15.5,0 -15.5,0 -15.5,0 C-15.5,-1.1038000583648682 -14.603799819946289,-2 -13.5,-2 C-13.5,-2 13.5,-2 13.5,-2 C14.603799819946289,-2 15.5,-1.1038000583648682 15.5,0z" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#e8e6e3;"></path></g></g></g></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" preserveAspectRatio="xMidYMid meet" style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px);"><defs><clipPath id="__lottie_element_92"><rect width="100" height="100" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_92)"><g transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,51,50)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(2,0,0,2,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M15.5,0 C15.5,0 15.5,0 15.5,0 C15.5,1.1038000583648682 14.603799819946289,2 13.5,2 C13.5,2 -13.5,2 -13.5,2 C-14.603799819946289,2 -15.5,1.1038000583648682 -15.5,0 C-15.5,0 -15.5,0 -15.5,0 C-15.5,-1.1038000583648682 -14.603799819946289,-2 -13.5,-2 C-13.5,-2 13.5,-2 13.5,-2 C14.603799819946289,-2 15.5,-1.1038000583648682 15.5,0z" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#e8e6e3;"></path></g></g><g transform="matrix(0.7071067690849304,0.7071067690849304,-0.7071067690849304,0.7071067690849304,51,50)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(2,0,0,2,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M15.5,0 C15.5,0 15.5,0 15.5,0 C15.5,1.1038000583648682 14.603799819946289,2 13.5,2 C13.5,2 -13.5,2 -13.5,2 C-14.603799819946289,2 -15.5,1.1038000583648682 -15.5,0 C-15.5,0 -15.5,0 -15.5,0 C-15.5,-1.1038000583648682 -14.603799819946289,-2 -13.5,-2 C-13.5,-2 13.5,-2 13.5,-2 C14.603799819946289,-2 15.5,-1.1038000583648682 15.5,0z" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#e8e6e3;"></path></g></g><g transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,51,50)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(2,0,0,2,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M15.5,0 C15.5,0 15.5,0 15.5,0 C15.5,1.1038000583648682 14.603799819946289,2 13.5,2 C13.5,2 -13.5,2 -13.5,2 C-14.603799819946289,2 -15.5,1.1038000583648682 -15.5,0 C-15.5,0 -15.5,0 -15.5,0 C-15.5,-1.1038000583648682 -14.603799819946289,-2 -13.5,-2 C-13.5,-2 13.5,-2 13.5,-2 C14.603799819946289,-2 15.5,-1.1038000583648682 15.5,0z" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#e8e6e3;"></path></g></g></g></svg>`
];
let menuDropped = false;
menuIcon.innerHTML = svg[0];

function toggle() {
    menuDropped = !menuDropped;
    menuIcon.innerHTML = svg[menuDropped + 0];
    dropdownMenu.style.opacity = 0;
    dropdownMenu.hidden = !dropdownMenu.hidden;
    dropdownMenu.style.opacity = 1;
}