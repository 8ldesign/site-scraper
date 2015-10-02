var fs = require('fs');

var xray= require('x-ray')();
var sHomePageUrl = 'http://www.ae.com/web/index.jsp';
var outputFilename = 'navJsons/topNav.json';


// var xMenu = xray('.menu', [{
//       submenu: xray('.nav-section',[{
//         a: '',
//         href:
//       }])
//     }]);
var xMenu = xray('.menu', ['a']);
var xTopNav = xray(sHomePageUrl, '.topNav', [{
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
fs.writeFile(outputFilename, JSON.stringify(arr), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
  });
});
  //console.log(JSON.stringify(arr));});
  //console.log(arr[0].tags[0].flyout[0].navSection[0].navList[1]);});
// var xTopNav = xray(sHomePageUrl, '.topNav', [{
//   menu: xray('.menu', 'div', [{
//    div: xray('.site-top-link','a',[{
//     a: '',
//     href: '@href'
//   }])
//   }])
// }])(function(err,arr){ console.log(arr[0].menu[2])});

