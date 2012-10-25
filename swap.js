/*
TODO

add function to change standard image
http://javascript.internet.com/miscellaneous/change-image.html

add optional formatting with regular expressions


*/

//if google ORGANIC 
var gorganicnum = '';

//if yahoo ORGANIC
var yorganicnum = '';

//if bing ORGANIC
var borganicnum = '';

//if google PPC
var gppcnum = '';

//if yahoo PPC
var yppcnum = '';

//if bing PPC
var bppcnum = '';

//if other
var defaultNum = '';

//list of your 'branded' search terms separated by commas only
var brandedTerms = 'dontdeletethis';

//variables to deal with our CSS background header image
var idToChangeClass = 'wrapper-a';
var gBGurl = '../images/wrapper_0210.jpg';
var yBGurl = '../images/wrapper_0186.jpg';
var bBGurl = '../images/wrapper_0743.jpg';


//create an array out of the branded terms list
var brandedTermsArray = brandedTerms.split(',');

function _uGC(l,n,s) {
 if (!l || l=="" || !n || n=="" || !s || s=="") return "-";
 var i,i2,i3,c="-";
 i=l.indexOf(n);
 i3=n.indexOf("=")+1;
 if (i > -1) {
  i2=l.indexOf(s,i); if (i2 < 0) { i2=l.length; }
  c=l.substring((i+i3),i2);
 }
 return c;
}

// 
// Get the __utmz cookie value. This is the cookies that 
// stores all campaign information. 
// 
var z = _uGC(document.cookie, '__utmz=', ';'); 
// 
// The cookie has a number of name-value pairs. 
// Each identifies an aspect of the campaign. 
// 
// utmcsr  = campaign source 
// utmcmd  = campaign medium 
// utmctr  = campaign term (keyword) 
// utmcct  = campaign content  
// utmccn  = campaign name 
// utmgclid = unique identifier used when AdWords auto tagging is enabled 
// 
// This is very basic code. It separates the campaign-tracking cookie 
// and populates a variable with each piece of campaign info. 
// 
var source  = _uGC(z, 'utmcsr=', '|'); 
var medium  = _uGC(z, 'utmcmd=', '|'); 
var term    = _uGC(z, 'utmctr=', '|'); 
var content = _uGC(z, 'utmcct=', '|'); 
var campaign = _uGC(z, 'utmccn=', '|'); 
var gclid   = _uGC(z, 'utmgclid=', '|'); 
// 
// The gclid is ONLY present when auto tagging has been enabled. 
// All other variables, except the term variable, will be '(not set)'. 
// Because the gclid is only present for Google AdWords we can 
// populate some other variables that would normally 
// be left blank. 
// 
if (gclid !="-") { 
      source = 'google'; 
      medium = 'cpc'; 
} 
// Data from the custom segmentation cookie can also be passed 
// back to your server via a hidden form field 
var csegment = _uGC(document.cookie, '__utmv=', ';'); 
if (csegment != '-') { 
      var csegmentex = /[1-9]*?\.(.*)/;
      csegment    = csegment.match(csegmentex); 
      csegment    = csegment[1]; 
} else { 
      csegment = '(not set)'; 
} 

//
// One more bonus piece of information.  
// We're going to extract the number of visits that the visitor
// has generated.  It's also stored in a cookie, the __utma cookis
// 
var a = _uGC(document.cookie, '__utma=', ';');
var aParts = a.split(".");
var nVisits = aParts[5];


function isNotBrandedTerm(){

        for (i=0;i<brandedTermsArray.length;i++)
        {
                if (term.toLowerCase().indexOf(brandedTermsArray[i]) != -1){ // Made case insensitive
                //if(term == brandedTermsArray[i]){
                        return false;
                }
        } 
        
        return true;
}


//return the proper tag based on the rules
function getTag(){
        
        if(source == 'google' && (medium == "organic" || medium =="localpack")){
                return gorganicnum;
        } else if(source == 'yahoo' && medium == "organic"){
                return yorganicnum;
        } else if(source == 'bing' && medium == "organic"){
                return borganicnum;
        } else if(source == 'google' && medium == "cpc"){
                return gppcnum;
        } else if(source == 'yahoo' && medium == "cpc"){
                return yppcnum;
        } else if(source == 'bing' && medium == "cpc"){
                return bppcnum;
        } else {
                return defaultNum;
        }

}

function replaceQueryString( queryString, keys, newValues ) {
    var parts = queryString.split('&');
    
    // We're going to make an array of querystring key=value strings
    var new_parts = [];
    
    for( i in parts ) {
        var keyValue = parts[i].split('=');
        
        // Use jQuery to see if this key is in our desired set
        var replacePos = $.inArray(keyValue[0],keys);
        
        // If it is, it will give a non-negative integer, if not it'll give -1
        if( replacePos >= 0 )
            // We want to replace this key so make a new string for the key/value pair
            new_parts.push( keyValue[0] + '=' + newValues[replacePos] );
        else {
            // This isn't the key we want to replace, so leave it alone
            new_parts.push( parts[i] );
        }
    }
    
    // glue all the parts together and return them
    return new_parts.join('&');
}



function displayTag(){
	if(isNotBrandedTerm()){
		var testdiv = $('.afftag');
		var NumberSpans = testdiv[0].getElementsByTagName('span');

		for (var i=0; i < NumberSpans.length; i++) {
			// Get the full address from the original link
			var old_fulladdr = $(NumberSpans[i]).find('a').attr('href');
			var old_addr_parts = old_fulladdr.split('?');
   
			// The keys you want to replace
			var tobereplaced = ['tag'];
    
			// The respective values you want to assign
			var replacements = [getTag()];
    
			var new_query_string = replaceQueryString( old_addr_parts[1], tobereplaced, replacements );
    
			//var new_querystring = 'i=abc&p=def&g=ghi';
$(NumberSpans[i]).find('a').attr('href',old_addr_parts[0] + '?' + new_query_string);


				}//CLOSE IF
		} //CLOSE FOR
	}
