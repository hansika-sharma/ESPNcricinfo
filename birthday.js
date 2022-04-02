const request = require("request");
const cheerio = require("cheerio");
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
console.log("before");
request(url, cb) //requested

function cb(err, response, html){
    if(err) {
        console.log(err);
    } else {
        extractHTML(html);
    }
}

function extractHTML(html){
    let $ = cheerio.load(html);
    // let teamsArr = $(".match-info.match-info-MATCH .team");
    // let teamName;
    // for(let i = 0;i<teamsArr.length ;i++){
    //     let hasclass =$(teamsArr[i]).hasClass("team-gray");
    //     //$ will search in full page
    //     if(hasclass == false) {
    //         //to search in element we use find function
    //         let teamNameElem = $(teamsArr[i]).find(".name");
    //         wTeamName = teamNameElem.text().trim();
    //         //console.log(teamNameElem.text());
    //     }
    // }
    let innigsArr = $(".card.content-block.match-scorecard-table>.Collapsible");
    //let htmlStr = "";
    for(let i=0 ; i< innigsArr.length ;i++) {
        // let Chtml = $(innigsArr[i]).html();
        // htmlStr += Chtml;
        //teams name
        let teamNameElem = $(innigsArr[i]).find(".header-title.label");
        let teamName = teamNameElem.text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();
        //console.log(teamName);

        //let hwtName = "";
        //let hwt = 0;
        
        //if(wTeamName == teamName) {
            //console.log(teamName);

            

            let tableElem = $(innigsArr[i]).find(".table.batsman");
            let allBatsman = $(tableElem).find("tr");
            for(let j=0 ; j<allBatsman.length ; j++) {
                let allColsOfPlayer = $(allBatsman[j]).find("td");
                let isbatsManCol = $(allColsOfPlayer[0]).hasClass("batsman-cell");
                if(isbatsManCol == true){
                    let href = $(allColsOfPlayer[0]).find("a").attr("href");
                    let name = $(allColsOfPlayer[0]).text();
                    let fullLink = "https://www.espncricinfo.com"+href;
                    //console.log(fullLink);
                    getBirthdaypage(fullLink, name, teamName);
                    //console.log(`teamNmae: ${teamName} playername: ${ playerName}`);
                }

    
            }
            //console.log(`Winning Team ${wTeamName} highest wicket taker playerName: ${hwtName} wickets: ${hwt}`);
        }
    }
    //console.log(htmlStr);
function getBirthdaypage(url, name, teamName) {
    request(url, cb);
    function cb(err, response, html) {
        if (err) {

        } else {
            extractBirthDay(html, name, teamName);
        }
    }
}
function extractBirthDay(html, name, teamName) {
    let $ = cheerio.load(html);
    let detailsArr = $(".player-card-description");
    let birthDay =  $(detailsArr[1]).text();
    console.log(`${name} plays for ${teamName} was born on ${birthDay}`);
    
}