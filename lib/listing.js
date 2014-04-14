var fs = require('fs')
var glob = require('glob')

module.exports=function(path,cb){
    var pattern = "**/*.jpg"
    glob(pattern,{'cwd':path,'nocase':true},cb)
}
