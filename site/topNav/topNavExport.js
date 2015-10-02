var fs = require('fs');

var xray= require('x-ray')();
var sHomePageUrl = 'http://www.ae.com/web/index.jsp';

var topNavExport = {
  export: function(callback){
    xray(sHomePageUrl, '.topNav', [{
      menus: xray('.menu','.flyout',[{
        href:'@href',
        flyouts: xray('.flyout', '.container-fluid',[{
          navSections: xray('.nav-section', '.nav-column',[{
            navLists: xray('.nav-section', 'li',[{
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
  },
  parse: function(data){
   var menus = data[0];
   for (var menu in menus){
    var flyouts = menus[menu];
    for (var flyout in flyouts){
      var navSections = flyouts[flyout];
      for(navSection in navSections){
        var navLists = navSections[navSection];
        for(var navList in navLists){
          var topNavAnchors = navLists[navList];
          for(var topNavAnchor in topNavAnchors){
            var navAnchors = topNavAnchors[topNavAnchor];
            for(navAnchor in navAnchors){
              var tonas = navAnchors[navAnchor];
              for(tona in tonas){
                var links = tonas[tona];
                for (link in links){
                  var key = links[link].topNavAnchor.a;
                  var url = links[link].topNavAnchor.href;
                  if(key !== undefined && url !== undefined)
                    console.log("key --->" + key + " - url- " + url);
                }
              }
            }
          }
        }
      }
    }
  }
}
}

module.exports = topNavExport;




