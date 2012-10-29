//Tracking Script
//Author: Garrett Tichy

//google ORGANIC
var gorganicnum = 'google-organic';

//yahoo ORGANIC
var yorganicnum = 'yahoo-organic';

//bing ORGANIC
var borganicnum = 'bing-organic';

//google PPC
var gppcnum = 'google-ppc';

//yahoo PPC
var yppcnum = 'yahoo-ppc';

//bing PPC
var bppcnum = 'bing-ppc';

//default
var defaultNum = 'haphav-default';


function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}


// 
// Get the __utmz cookie value. This is the cookies that 
// stores all campaign information. 
// 
var utmz = readCookie('__utmz'); //using a cookie reading function
var vals = (function() {

        var pairs = utmz.split('.').slice(4).join('.').split('|');
        var ga = {};
        for (var i = 0; i < pairs.length; i++) {
            var temp = pairs[i].split('=');
                ga[temp[0]] = temp[1];
        }
        return ga;
    })();// 

var source  = vals.utmcsr; 
var medium  = vals.utmcmd;
var term    = vals.utmctr; 
var content = vals.utmcct; 
var campaign = vals.utmccn; 
var gclid   = vals.utmgclid; 



//return the proper phone number based on the rules
function getParam(){
        if(source == 'google' && medium == "organic"){
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



function displayParam(){
		var testdiv = $('.afftag');
		var NumberSpans = testdiv[0].getElementsByTagName('span');

		for (var i=0; i < NumberSpans.length; i++) {
			// Get the full address from the original link
			var old_fulladdr = $(NumberSpans[i]).find('a').attr('href');
			var old_addr_parts = old_fulladdr.split('?');
   
			// The keys you want to replace
			var tobereplaced = ['tag'];
    
			// The respective values you want to assign
			var replacements = [getParam()];
    
			var new_query_string = replaceQueryString( old_addr_parts[1], tobereplaced, replacements );
    
			//var new_querystring = 'i=abc&p=def&g=ghi';
$(NumberSpans[i]).find('a').attr('href',old_addr_parts[0] + '?' + new_query_string);


				}//CLOSE IF
		//CLOSE FOR
	}
