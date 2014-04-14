// if the filename is stupid, postpone writing it

var date_regex = /(\d\d\d\d).(\d\d).(\d\d)/;
var time_regex = /(\d\d):(\d\d):(\d\d)/;

function fixit(name){


    name=name.replace(/\./g,'_');
    name=name.replace(/\//g,'_');
    name = name.replace(/,/g,'_');
    name = name.replace(/\s+$/,'');
    name = name.replace(/^\s/g,'');
    name = name.replace(/\s/g,'_');
    name = name.replace(/_+/g,'_');
    return name

}

module.exports=function(task,cb){
    // create a directory from the exif data
    //
    // make/model/year/month/day/filename.jpg
    var make = fixit(task.exif.Make)
    var model = fixit(task.exif.Model)
    var path = [make
               ,model
               ]

    var datetime=task.exif.DateTime.split(' ')
    var date_res = date_regex.exec(datetime[0])
    if(date_res){
        path.push(date_res[1])
        path.push(date_res[2])
        path.push(date_res[3])
    }else{
        console.log('no date in exif? '+JSON.stringify(task.exif.DateTime))
        return cb(new Error('no date'))
    }

    // var time_res = time_regex.exec(datetime[1])
    // if(time_res){
    //     path.push(time_res[1])
    //     path.push(time_res[2])
    //     path.push(time_res[3])
    // }else{
    //     console.log('no time in exif? '+JSON.stringify(task.exif.DateTime))
    //     return cb(new Error('no time'))
    // }

    // isolate the end of the file
    var fileparts = task.file.split('/')
    var filename = fileparts[fileparts.length - 1]
    task.newpath = path.join('/')
    task.newname = filename

    return cb(null,task)

}
