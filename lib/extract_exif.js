
var exif = require('libexif');
var fs = require('fs');


module.exports=function(task,cb){
    fs.readFile(task.file, function(e,buf){
        if(e) return cb(e)
        task.exif = exif.parse(buf)
        return cb(null,task)
    })
}
