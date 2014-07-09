var toggle = document.querySelector(".toggle-sidebar");
var target = document.querySelector(".sidebar");
if(toggle && target) {
    toggle.addEventListener("click", function(ev) {
        if(target.className.indexOf('show') === -1) {
            target.className += ' show';
        } else {
            target.className = target.className.replace('show', '');
        }
        ev.preventDefault();
    });
}


if(document.querySelector("#hitarea")) {
    require('./demo.js');
}

require('./externals.js');
