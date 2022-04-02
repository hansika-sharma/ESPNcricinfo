const request = require("request");
const cheerio = require("cheerio");
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary"
console.log("before");
request(url, cb); //requested
function cb(err, response, html) {
    if(err) {
        console.log(err);
    } else {
        extractHTML(html);
    }
}

function extractHTML(html) {
     let $ = cheerio.load(html);  //pass the html
     let elemsArr = $(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
     let text = $(elemsArr[0]).text();  //it will get the text
     let htmldata = $(elemsArr[0]).html();  //get the html of elemsArr
     console.log("text data", text);
     console.log(" html data", htmldata);
}

//console.log("after");