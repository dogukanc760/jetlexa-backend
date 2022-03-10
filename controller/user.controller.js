var UserService = require('../services/user.services');
var User = require('../models/user.model')


exports.register = async function (req, res, next){
   try {
       var users = await UserService.register(req.body);
       return res.status(201).json({status:201, data:users, message:'Success'});
   } catch (error) {
       return res.status(400).json({message: error, status:400});
   }
}


exports.login = async function (req, res, next){
    try {
      var users = await UserService.login(req.body);
      if(users=='Wrong Pass' || users =='wrong mail or gsm'){
          return res.status(404).json({message: 'Wrong Pass', status:404});
      }
      return res.status(200).json({status:200, data:users, message:'Success'});  
    } catch (error) {
       
        return res.status(400).json({message: error, status:400});
    }
}

exports.getUsers = async function (req, res, next){
    try {
      var users = await UserService.getUser({});
      return res.status(200).json({status:200, data:users, message:'Success'});
    } catch (error) {
        return res.status(400).json({message: error, status:400});
    }
}

exports.getById = async function (req, res, next){
    try {
        var users = await UserService.getUser({_id:req.params.id});
        return res.status(200).json({status:200, data:users, message:'Success'});
    } catch (error) {
        return res.status(400).json({message: error, status:400});
    }
}


exports.update = async function (req, res, next){
    try {
        var users = await UserService.update(req.params.id, req.body);
        return res.status(200).json({status:200, data:users, message:'Success'});
    } catch (error) {
        return res.status(400).json({message: error, status:400});
    }
}

exports.delete = async function (req, res, next){
    try {
        var deleteUser = await UserService.delete(req.params.id);
        return res.status(200).json({status:200, data:deleteUser, message:'Success'});
    } catch (error) {
        return res.status(400).json({message: error, status:400});
    }
}