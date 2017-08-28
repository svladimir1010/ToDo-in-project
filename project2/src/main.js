'use strict';
'use strict';

class Task {
    constructor(text, isDone) {
        this.text = text;
        this.isDone = isDone || false;
    }
    done() {
        this.isDone = !this.isDone
    }
    el(n) {
        var el = $('<li></li>').text(this.text).css({ 'background-color': 'rgba(0, 0, 0, 0.4)', 'border-radius': '5px', 'color': 'white', 'font-size': '22px', 'letter-spacing': '3px', 'text-align': 'center' });
        var done = $('<button></button>').text('Выбрать').addClass('button tick');
        if (this.isDone) { $(el).addClass("passed") };
        var self = this;
        $(done).click(function() {
            self.done();
            $(el).toggleClass('passed');
            $('.tick').css({ 'background-color': 'rgba(102, 205, 170,1)' })
            list.save();
        });
        var remove = $('<button></button>').text('Удалить').addClass('button cross').css({ 'background': 'red' });
        $(remove).click(function() {
            el.remove();
            delete list[n];
            list.save();
        });
        el.append(remove);
        el.append(done);
        return el;
    }
}
class List extends Array {};
List.prototype.save = function() {
    localStorage.myApp = JSON.stringify(this);
}
var list = new List();
if (localStorage.myApp) {
    var lastTasks = JSON.parse(localStorage.myApp);
    for (var i in lastTasks) {
        newTask(lastTasks[i]);
    }
}

function newTask(obj) {
    if (!obj) return;
    var task = new Task(obj.text, obj.isDone);
    var num = list.push(task) - 1;
    $('.list').append(task.el(num));
}
var but = $('#but').click(function() {
    if ($('#inp').val()) {
        var text = $('#inp').val();
        newTask({ text: text });
        $('.reset').val('');
        list.save();
    }
});