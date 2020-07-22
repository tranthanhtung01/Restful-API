import {TeacherNameModel} from '../model/teacher.model';
import {StudentNameModel} from '../model/student.model';

var jwt = require('jsonwebtoken');
var express = require('express');
var cookieParser = require('cookie-parser');

const passwordHash = require('password-hash');
var app = express();
app.use(cookieParser());

export async function signInTeacher(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const Email = await TeacherNameModel.findOne({
      'auth.email': email,
    });
    if (!Email) {
      res.status(400);
      return res.json({
        message: 'User do not exist.',
        data: false,
      });
    }
    const password_hash = passwordHash.verify(password, Email.auth.password);

    if (!password_hash) {
      res.status(400);
      return res.json({
        message: 'Password wrong.',
        data: false,
      });
    }
    var token = jwt.sign(
      {
        _id: Email.id,
        teacherName: Email.teacherName,
        specialized: Email.specialized,
        address: Email.address,
        email: Email.auth.email,
      },
      'nodemy',
      {
        algorithm: 'HS256',
        expiresIn: '10h',
      },
    );
    res.cookie('token', token, {maxAge: 24 * 60 * 60 * 1000});
    res.status(200);
    return res.json({
      message: 'login in success',
      data: true,
      token: token,
    });
  } catch (err) {
    res.status(500);
    return res.json({
      message: err.message,
    });
  }
}
export async function signInStudent(req, res) {
  try {
    const user = req.body.user;
    const password = req.body.password;

    const User = await StudentNameModel.findOne({user: user});
    if (!User) {
      res.status(400);
      return res.json({
        message: 'User do not exist.',
        data: false,
      });
    }
    const password_hashSD = passwordHash.verify(password, User.password);
    if (!password_hashSD) {
      res.status(400);
      return res.json({
        message: 'Password wrong.',
        data: false,
      });
    }
    var token = jwt.sign(
      {
        _id: User.id,
        studentName: User.studentName,
        className: User.className,
        dateOfBirth: User.dateOfBirth,
        address: User.address,
        user: User,
      },
      'nodemy',
      {
        algorithm: 'HS256',
        expiresIn: '10h',
      },
    );
    res.cookie('token', token, {maxAge: 24 * 60 * 60 * 1000});
    res.status(200);
    console.log(req.cookies);
    return res.json({
      message: 'login in success',
      data: true,
      token: token,
    });
  } catch (err) {
    res.status(500);
    return res.json({
      message: err.message,
    });
  }
}

export async function userTeacher(req, res, next) {
  var token = req.headers.authorization.split('Bearer')[1].trim();
  var jwtDecode = jwt.verify(token, 'nodemy');
  TeacherNameModel.find({_id: jwtDecode._id}).then(function (data) {
    // res.json(data);
    if (data[0].role === 'admin') {
      res.json('Welcome admin');
    } else {
      res.json('You are not the admin');
    }
  });
}
export async function userStudent(req, res, next) {
  var token = req.headers.authorization.split('Bearer')[1].trim();
  var jwtDecode = jwt.verify(token, 'nodemy');
  StudentNameModel.find({_id: jwtDecode._id}).then(function (data) {
    // res.json(data);
    if (data[0].role === 'user') {
      res.json('Welcome user');
    } else {
      res.json('You are not the user');
    }
  });
}

// var jwtDecode = jwt.verify(t oken, 'nodemy');
// res.json(jwtDecode);

// function setCookie{key,value,timeExpries){
//  var newDay = new Date();
//  newDay.setTime(timeExpries*60*60*1000*24+newDay.getTime());
//   return document.cookie=`${key}=${value};expries:${newDay.toUTCString()}`;
// console.log(setCookie("token","12345",1));
