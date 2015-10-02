var fs = require('fs');

var xray= require('x-ray')();
var sHomePageUrl = 'http://www.ae.com/web/index.jsp';
var outputFilename = 'navJsons/topNav.json';
var topNavExport = {
  export: function(callback){
    console.log("Inside export call");
    xray(sHomePageUrl, '.topNav', [{
      menus: xray('.menu','.flyout',[{
        href:'@href',
        flyout: xray('.flyout', '.container-fluid',[{
          navSection: xray('.nav-section', '.nav-column',[{
            navList: xray('.nav-section', 'li',[{
              topNavAnchor: xray('li', 'a',{
                a: '',
                href: '@href'
              })
            }])
          }])
        }])
      }])
    }])(function(err,arr){
      if(err) {
        console.log(err);
        return callback(undefined);
      }
      else{
      return callback(arr);
    }
  });
  }
}

module.exports = topNavExport;




