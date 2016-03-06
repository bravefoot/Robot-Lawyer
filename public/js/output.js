$(document).ready(function() {
    // Populate user name and gravatar
    $.ajax({
        url: '/user'
    }).done(function(data) {
        $("#name").html(data.legalInfo.fullName);
        $("#address").html(data.legalInfo.streetAddress);
        $("#location").html(data.legalInfo.streetAddressCity +
            ' UT ' + data.legalInfo.streetAddressZip);
        $("#phone").html(data.legalInfo.phoneNumber);
        $("#email").html(data.email);
        $("#defendant").html(data.legalInfo.fullName);
        $("#fullname").html(data.legalInfo.fullName);
        $("#signature").html(data.legalInfo.fullName);
        Date.prototype.yyyymmdd = function() {
            var yyyy = this.getFullYear().toString() + '/';
            var mm = (this.getMonth() + 1).toString() + '/'; // getMonth() is zero-based
            var dd = this.getDate().toString() + '/';
            return yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[
                1] ? dd : "0" + dd[0]); // padding
        };
        currentdate = new Date();
        $("#date").html(currentdate.yyyymmdd());
        var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location
                    .search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ?
                        true : sParameterName[1];
                }
            }
        };
        var casenum = getUrlParameter('caseNumber');
        var defense = getUrlParameter('defense');
        $("#caseNumber").html(casenum);
        $("#defense").html(defense);
        d = new Date();
        d.yyyymmdd();
        console.log(data);
    });
});
// name
// address
// location   (city, state, zip)
// phone
// email
// defendant    name
// defense  ==
// date  js        today.date() stuff
// signature     cursive of name?
// fullname      name
// caseNumber
/*


?=
caseNumber=23423&    defense=23asdfasdffdasfa.dfasd.fasdfsdaf





*/