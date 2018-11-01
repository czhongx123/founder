"use strict";
var Main = /** @class */ (function () {
    function Main() {
    }
    ;
    Main.prototype.show = function (text) {
        var $ele = $('h1');
        $ele.text(text);
    };
    return Main;
}());
var main = new Main();
main.name = "hello word";
main.show(main.name);
