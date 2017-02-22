(function () {
'use strict';

let counter = 0;
    function inc() {
        counter++;
    }

console.log(counter); // 0
    inc();
    console.log(counter); // 1

}());
