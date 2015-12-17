var gui = require('nw.gui');
var win = gui.Window.get();

win.on('minimize', function () {
    this.hide();
});

win.on('close', function () {
    this.minimize();
});

$(function () {
    var tray;
    tray = new gui.Tray({
        title: 'App title',
        tooltip: 'App title',
        icon: 'img/icon.png'
    });
    var menu = new gui.Menu();
    menu.append(new gui.MenuItem({
        label: 'Exit'
    }));
    menu.items[0].click = function () {
        win.close(true);
    };
    tray.menu = menu;
    tray.on('click', function () {
        win.show();
    });
    win.show();
});