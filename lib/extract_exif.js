
var exif = require('libexif');
var fs = require('fs');


module.exports=function(fd,cb){
    fs.readFile(fd, function(e,buf){
        if(e) return cb(e)
        var parsed = exif.parse(buf)
        return cb(null,parsed)
    })
}
