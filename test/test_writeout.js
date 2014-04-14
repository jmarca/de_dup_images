var should=require('should')
var listing = require('../lib/listing')
var exif = require('../lib/extract_exif')
var make_new_path = require('../lib/make_new_path')
var writeout = require('../lib/writeout')
var async = require('async')
var fs=require('fs')
var newpaths = {
    'test/files/cimg0330.jpg':
    {newpath: 'CASIO_COMPUTER_CO_LTD/EX-Z55/2008/05/22',
     newname: 'cimg0330.jpg' }
  ,'test/files/dsc00014.jpg':
    {newpath: 'SONY/DCR-PC100/2003/05/26',
     newname: 'dsc00014.jpg' }
  ,'test/files/DSC_8057.JPG':
    {newpath: 'NIKON_CORPORATION/NIKON_D40/2013/08/03',
     newname: 'DSC_8057.JPG' }
  ,'test/files/DSCF3084.JPG':
    {newpath: 'FUJIFILM/X100S/2014/03/29',
     newname: 'DSCF3084.JPG' }
  ,'test/files/SAM_0183.JPG':
    {newpath: 'SAMSUNG/WB250F_WB251F_WB252F/2014/01/03',
     newname: 'SAM_0183.JPG' }
}

after(function(done){
    //return done()
    function rmdir(p){
        var len = p.length
        for(var i = 0; i < p.length; i++){
            var rmp=p.slice(0,len - i).join('/')
            try{
                fs.rmdirSync(rmp)
            } catch (x) {
                //console.log(x)
                // don't care
            }
        }
        //fs.rmdirSync(p[0])
        return null
    }

    var paths = Object.keys(newpaths).map(function(k){
                    fs.unlinkSync(newpaths[k].newpath+'/'+newpaths[k].newname)
                    return newpaths[k].newpath.split('/')
                })

    paths.forEach(rmdir)

    return done()
})

describe('create new files based on exif data',function(){
    it('should create awesomness',function(done){
        listing('test',function(e,d){
            should.not.exist(e)
            should.exist(d)
            d.should.have.property('length')
            d.length.should.eql(5)
            async.each(d
                      ,function(filename,eachcb){
                           filename = 'test/'+filename
                           async.waterfall([
                               function(cb){
                                   return cb(null,{file:filename})
                               }
                             ,exif
                             ,make_new_path
                             ,function(t,cb){
                                  t.write_out=true
                                  return cb(null,t)
                              }
                             ,writeout
                           ],
                                           function(e,t){
                                               should.not.exist(e)
                                               should.exist(t)
                                               var stats = fs.statSync(t.newpath
                                                                      +'/'
                                                                      +t.newname)
                                               should.exist(stats)
                                               stats.isFile().should.be.ok
                                               return eachcb(null)
                                           })
            }
                      ,done)

        })
    })

})