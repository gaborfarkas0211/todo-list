const spinner = $('#spinner');
const formButton = $("#add-list-form :submit");

function startSpinner() {
    spinner.addClass('spinner');
    formButton.prop("disabled", true);
}

$(document).ready(function () {
    startSpinner();
    getList();
});

$(document).on('click', '.check', function () {
    if ($(this).hasClass('not-allowed')) {
        return false;
    }
    startSpinner();

    span = this.closest('span');
    list = this.closest('li');
    updateListItem(span, list);
});

$(document).on('click', '.close', function () {
    startSpinner();

    span = this.closest('span');
    list = this.closest('li');
    deleteListItem(span.id, list);
});

$('#add-list-form textarea').blur(function () {
    if (!$(this).val()) {
        $(this).addClass('hasError');
    } else {
        $(this).removeClass('hasError');
    }
});

function getList() {
    $.get("api/todo-list")
        .done(function (data) {
            if (data.length == 0) {
                let div = $("<div></div>")
                    .attr({ id: "no-data" })
                    .addClass("col-md-4 col-md-offset-4 text-center")
                    .appendTo("#todo");
                let h3 = $("<h3>You don't have any list to do.</h3>");
                div.append(h3);
            } else {
                let div = $("<div></div>")
                    .attr({ id: "list" })
                    .addClass("col-md-8 col-md-offset-2")
                    .appendTo("#todo");
                let ul = $("<ul id='todo-list' class='list-group'></ul>")
                    .attr({ id: "todo-list" })
                    .addClass('list-group');

                div.append(ul);
                $.each(data, function (index, list) {
                    addToList(list);
                });
            }
        })
        .always(function () {
            spinner.removeClass('spinner');
            formButton.prop("disabled", false);
        });
}

$("#add-list-form").submit(function (event) {
    event.preventDefault();
    let input = $("textarea");

    if (!$.trim(input.val())) {
        $(input).addClass("hasError");
        return false;
    }

    formButton.prop("disabled", true);
    spinner.addClass('spinner');

    if ($("#todo-list li").length === 0) {
        $("#no-data").remove();
        let div = $("<div></div>")
            .attr("id", "list")
            .addClass("col-md-8 col-md-offset-2")
            .appendTo("#todo");
        div.append("<ul id='todo-list' class='list-group'></ul>");
    }

    $.post("api/todo-list/create", $("#add-list-form").serialize())
        .done(function (data) {
            addToList(data);
        })
        .always(function () {
            formButton.prop("disabled", false);
            spinner.removeClass('spinner');
        });
});

function updateListItem(checkButton, item) {
    $.post("api/todo-list/update?id=" + checkButton.id)
        .done(function (data) {
            $(item).css('textDecoration', 'line-through');
            $(checkButton).addClass("not-allowed");
        })
        .always(function () {
            formButton.prop("disabled", false);
            spinner.removeClass('spinner');
        });
}

function deleteListItem(id, item) {
    $.ajax({
        url: "api/todo-list/delete?id=" + id,
        type: 'DELETE',
    })
        .done(function () {
            item.remove();
            if ($("#todo-list li").length === 0) {
                $("#list").remove();
                let div = $("<div></div>")
                    .attr({ id: "no-data" })
                    .addClass("col-md-4 col-md-offset-4 text-center")
                    .appendTo("#todo");
                let h3 = $("<h3>Currently no data</h3>");
                div.append(h3);
            }
        })
        .always(function () {
            formButton.prop("disabled", false);
            spinner.removeClass('spinner');
        });
}

function addToList(list) {
    let lineThrough = '';
    let notAllowed = '';
    if (list.status == 1) {
        lineThrough = 'lineThrough';
        notAllowed = 'not-allowed';
    }
    let li = $('<li>' + list.description + '</li>')
        .addClass('list-group-item list-group-item-action ' + lineThrough);

    let deleteSpan = $("<span class='glyphicon glyphicon-remove'></span>")
        .attr({ id: list.id, status: list.status })
        .addClass('close');

    let checkSpan = $("<span class='glyphicon glyphicon-ok'></span>")
        .attr({ id: list.id, status: list.status })
        .addClass("check " + notAllowed);

    li.append(deleteSpan);
    li.append(checkSpan);

    $("#todo-list").append(li);
}