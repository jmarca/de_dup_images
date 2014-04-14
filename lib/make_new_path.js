// if the filename is stupid, postpone writing it

var makedir = require('makedir');
var date_regex = /(\d\d\d\d).(\d\d).(\d\d)/;
var time_regex = /(\d\d):(\d\d):(\d\d)/;

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
    var date_res = date_regex.exec(datetime[0])
    if(date_res){
        path.push(date_res[1])
        path.push(date_res[2])
        path.push(date_res[3])
    }else{
        return cb('no date in exif? '+JSON.stringify(task.exif.DateTime))
    }

    var time_res = time_regex.exec(datetime[1])
    if(time_res){
        path.push(time_res[1])
        path.push(time_res[2])
        path.push(time_res[3])
    }else{
        return cb('no time in exif? '+JSON.stringify(task.exif.DateTime))
    }

    // isolate the end of the file
    var fileparts = task.file.split('/')
    var filename = fileparts[fileparts.length - 1]
    task.newpath = path.join('/')
    task.newname = filename
    return cb(null,task)

}
