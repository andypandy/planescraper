var scraper = require('scraper');

scraper({
		'uri': 'http://aso.com/listings/AircraftListings.aspx?mg_id=22&act_id=1&mmg=true',
		'headers': {
			'User-Agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'
		}
	}, function(err, $) {
		if (err) {console.log(err)};

		var prices = [];
		$('.photoListingsPrice').each(function() {
			var dirtyPrice = $(this).text();
			if(dirtyPrice != '$: Inquire') {
				var trimmedPrice = $(this).text().replace(/\D/g, '');
				prices.push(parseInt(trimmedPrice));
			}
		});

		var sum = prices.reduce(function(a, b) { 
			return a + b;
		});
		var avg = sum / prices.length;

		console.log('Cessna 172 Prices');
		console.log('Number of listings (with a price): ' + prices.length);
		console.log('Average price: ' + avg);
		
	}
);