const  response  =require('express');
const User = require('../Modules/user');

exports.login = (req,res) => {
    const {email,password} = req.body;

    User.find({email:email,password:password})
    .then(response=>{
        if (!email || !password) {
            res.status(200).json({Message:"Please provide an email and password",isAuthenticated:false,user:response});
        }

        if(response.length > 0){
            res.status(200).json({Message:"User login Successfully",isAuthenticated:true,name:User.firstName});
        }
        else{
            res.status(200).json({Message:"User login unSuccessfully",isAuthenticated:false,user:response});
        }
    })
    .catch(err => res.status(500).json({error:err}));
}

exports.signUp = (req, res) => {
	const { email, firstName, lastName, password } = req.body;
   
	const signupUser = new User({
		email: email,
		firstName: firstName,
		lastName: lastName,
		password: password,
	});

    if (!email || !password || !firstName || !lastName) {
        res.status(200).json({Message:"Please provide all the fildes",isAuthenticated:false});
    }

        signupUser
		.save()
		.then((result) => {
			res.status(200).json({
				status: true,
				message: 'User Signed Sucessfully',
                user:result
			});
		})
		.catch(err => res.status(500).json({error:err}));
};