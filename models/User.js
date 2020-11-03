const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});

userSchema.pre('save', (next) => {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                return;
            }

            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    return;
                }
                this.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = function (cb) {
    const user = this;

    jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    user.save(function (err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
};

userSchema.statics.findByToken = function (token, cb) {
    const user = this;

    jwt.verify(token, 'secretToken', function (err, decoded) {
        user.findOne({ _id: decoded, token: token }, function (err, user) {
            if (err) {
                return cb(err);
            }
            cb(null, user);
        });
    });
};

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
};
