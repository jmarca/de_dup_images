var should=require('should')
var listing = require('../lib/listing')
var exif = require('../lib/extract_exif')
var check = require('../lib/filename_checker')
var make_new_path = require('../lib/make_new_path')
var writeout = require('../lib/writeout')
var fingerprint = require('../lib/fingerprint')
var async = require('async')
var fs=require('fs')


var opts = require("nomnom")
           .option('path', {
               'abbr': 'p',
               'required': true,
               'help': 'the root path to all your jpeg files'
           })
           .option('newpath',{'abbr':'n'
                             ,'required':true
                             ,'help':'where the files will end up when copied'
                             })
           .parse();

var bighash = {}

listing(opts.p,function(e,d){
    should.not.exist(e)
    should.exist(d)
    d.should.have.property('length')
    d.length.should.eql(5)
    async.each(d
              ,function(filename,eachcb){
                   filename = opts.path+'/'+filename
                   async.waterfall([
                       function(cb){
                           return cb(null,{file:filename})
                       }
                     ,exif
                     ,fingerprint
                     ,check
                     ,function(t,cb){
                          // store in hash if name is no good
                          // delete from hash if exists and name is okay

                          if(t.goodname){
                              if(bighash[t.id] !== undefined){
                                  delete bighash[t.id]
                              }
                          }else{
                              bighash[t.id]=t
                          }
                      }
                     ,make_new_path
                     ,function(t,cb){
                          t.newpath = opts.newpath+'/'+t.newpath
                          return cb(null,t)
                      }
                     //,writeout
                   ]
                                  ,eachcb)
                   return null
               }
              ,function(err){
                   if(err) throw new Error(err)
                   // if any files are left, save as is?
                   console.log('have files left')
                   Object.values(bighash).forEach(function(t){
                       console.log(t)
                   })
                   return null

               }
              );



        })
    })

})