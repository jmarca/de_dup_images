var should=require('should')
var listing = require('../lib/listing')
var exif = require('../lib/extract_exif')
var make_new_path = require('../lib/make_new_path')
var async = require('async')

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
describe('make new paths based on exif data',function(){
    it('should create awesomness',function(done){
        listing('test',function(e,d){
            should.not.exist(e)
            should.exist(d)
            d.should.have.property('length')
            d.length.should.eql(5)
            async.each(d,function(filename,eachcb){
                filename = 'test/'+filename
                async.waterfall([
                    function(cb){
                        return cb(null,{file:filename})
                    }
                  ,exif
                  ,make_new_path
                ],
                                function(e,t){
                                    should.not.exist(e)
                                    should.exist(t)
                                    t.should.have.property('newpath')
                                    t.should.have.property('newname')
                                    t.newpath.should.eql(newpaths[t.file].newpath)
                                    return eachcb(null)
                                })
            }
                      ,done)

        })
    })

})