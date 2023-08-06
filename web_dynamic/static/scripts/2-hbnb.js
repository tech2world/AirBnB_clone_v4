// js script executes when the DOM is loaded
// uses JQuery

let checked_box = {};
$(document).ready(function () {
    $('li input[type=checkbox]').change(function () {
        if ($(this).prop('checked')) {
            checked_box[this.dataset.name] = this.dataset.id;
        } else {
            delete checked_box[this.dataset.name];
        }
        $('div.amenties h4').text(Object.keys(checked_box).sort().join(", "));
    });

    // get API status
    $.getJSON("http://0.0.0.0:5000/api/v1/status/", (data) => {
        if (data.status === 'OK') {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    });
});
