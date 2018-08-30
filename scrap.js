if (!process.argv[2]) {
 	console.log('Usage : ./executable URL');
 	process.exit(1)
}

const scrap = require('website-scraper');
const websiteUrl = process.argv[2];

var nameSite = websiteUrl;
nameSite = /^(http(s)?:\/\/)?(.+)$/i.exec(nameSite);
nameSite = nameSite[3];

var fs = require('fs');

if (fs.existsSync(nameSite)) {
	console.log('Error : Existing folder.');
	process.exit(1)
}
scrap({
    urls: [websiteUrl],
    urlFilter: function (url) {
        return url.indexOf(websiteUrl) === 0;
    },
    recursive: true,
    maxDepth: 100,
    prettifyUrls: true,
    filenameGenerator: 'bySiteStructure',
    directory: nameSite,
}).then((data) => {
    console.log("The site has been successfully downloaded.");
}).catch((err) => {
    console.log("Error :", err);
});
