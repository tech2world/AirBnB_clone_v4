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
    $.getJSON("http://0.0.0.0:5000/api/v1/places_search/", (data) => {
        if (data.status === 'OK') {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    });
    // fetch place data
    $.post({
		url: `${HOST}/api/v1/places_search`,
		data: JSON.stringify({}),
		headers: {
			"Content-Type": "application/json",
		},
		success: (data) => {
			data.forEach((place) =>
				$("section.places").append(
					`<article>
			<div class="title_box">
			<h2>${place.name}</h2>
			<div class="price_by_night">$${place.price_by_night}</div>
			</div>
			<div class="information">
			<div class="max_guest">${place.max_guest} Guest${
						place.max_guest !== 1 ? "s" : ""
					}</div>
			<div class="number_rooms">${place.number_rooms} Bedroom${
						place.number_rooms !== 1 ? "s" : ""
					}</div>
			<div class="number_bathrooms">${place.number_bathrooms} Bathroom${
						place.number_bathrooms !== 1 ? "s" : ""
					}</div>
			</div> 
			<div class="description">
			${place.description}
			</div>
				</article>`
				)
			);
		},
		dataType: "json",
	});
    // places filter
    $(".filters button").bind("click", searchPlace);
	searchPlace();
});
