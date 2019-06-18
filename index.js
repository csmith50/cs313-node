const express = require('express')
const app = express();
const path = require('path')
const PORT = process.env.PORT || 8080

//function taken from: https://stackoverflow.com/questions/814613/how-to-read-get-data-from-a-url-using-javascript
var parseURL = function (url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

var calcRate = function (type, weight) {
	if (type == 'stamp') {
		if (weight < 1)
			return 0.55;
		else if (weight > 1 && weight < 2)
			return 0.7;
		else if (weight > 2 && weight < 3)
			return 0.85;
		else 
			return 1;
	}
	else if (type == 'metered') {
		if (weight < 1)
			return 0.50;
		else if (weight > 1 && weight < 2)
			return 0.65;
		else if (weight > 2 && weight < 3)
			return 0.8;
		else 
			return .95;
	}
	else if (type == 'large') {
		if (weight < 1)
			return 0.55;
		else if (weight < 2)
			return 1.15;
		else if (weight < 3)
			return 1.30;
		else if (weight < 4)
			return 1.45;
		else if (weight < 5)
			return 1.6;
		else if (weight < 7)
			return 1.9;
		else if (weight < 8)
			return 2.05;
		else if (weight < 9)
			return 2.2;
		else if (weight < 10)
			return 2.35;
		else if (weight < 11)
			return 2.65;
		else if (weight < 12)
			return 2.65;
		else
			return 2.80;
	}
	else {
		if (weight < 5)
			return 3.66;
		else if (weight < 9)
			return 4.39;
		else if (weight < 13)
			return 5.19;
		else
			return 5.71;
	}
}


express()
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
  	.set('view engine', 'ejs')
  	.get('/getRate', (req, res) => res.render('rate', {parseURL: parseURL, calcRate, calcRate, url: req.url}))
  	.listen(PORT, () => console.log(`Listening on ${ PORT }`))