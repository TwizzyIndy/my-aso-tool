const gplay = require('google-play-scraper');
var moment = require('moment');

function searchTop250OutdatedApps(searchTerm, minYear, country='us') {
    gplay.search({
            term: searchTerm,
            num: 250,
            fullDetail: true,
            country: country
        })
        .catch(err => console.error(err))
        .then(async apps => {

            for (let app of apps) {
                var d = moment.utc(app.updated).local();
                if (d.year() <= minYear) {
                    printAppInfo(app);
                }
            }
        });
}

function printAppInfo(app) {
    console.log("Name : " + app.title);
    console.log("Updated : " + moment.utc(app.updated).local().toDate()) + "\n";
    console.log("Installs : " + app.installs + "\n");
}

searchTop250OutdatedApps("Photo", 2020, 'us');