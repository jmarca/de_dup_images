// if the filename is stupid, postpone writing it

var makedir = require('makedir');
var date_regex = /\d\d\d\d.\d\d.\d\d/;
var time_regex = /\d\d:\d\d:\d\d/;

module.exports=function(task,cb){
    if(!task.write_out){
        return cb(null,task)
    }
    // create a directory from the exif data
    //
    // make/model/year/month/day/filename.jpg

    var path = [task.exif.Make
               ,task.exif.Model
               ]
    var datetime=task.exif.DateTime.split(' ')
    var date = datetime[0].')
    // isolate the end of the file
    var fileparts = task.file.split('/')
    var filename = fileparts[fileparts.length - 1]

var p = '/home/james/some/crazy/long/path'
function doSomethingToPath(path){
      return function(err){
          if(err) throw new Error (err);
          console.log('made '+path);
      };
};
makedir.makedir(p,doSomethingToPath(p));

    return cb(null,task)
}
