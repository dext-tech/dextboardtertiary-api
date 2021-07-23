const sql = require("./db")
const moment = require('moment')

// constructor
const User = function(user){
    this.id = user.id
    this.first_name = user.first_name
    this.last_name = user.last_name
    this.email = user.email
    this.password = user.password
}

User.create = (user, result) => {
    sql.query("INSERT INTO users SET ?", user,
        (err, res) => {
            if(err){
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("create user: ", { id: res.insertId, ... user });
            result(null, { id: res.insertId, ...user });
        }
    )
}   

User.registerUser = (user) => {
    return new Promise((resolve, reject)=>{
        const queryString = "INSERT INTO users SET ?";
        sql.query(queryString, user, (err, res)=>{
            if(err){
                console.log("error: ", err)
                return reject(err);
            }
            console.log("create user: ", {id: res.insertId, ... user});
            resolve({id: res.insertId, ... user})
        })
    })    
}


User.findById = (id, result) => {
    sql.query("SELECT * FROM users WHERE id = " + id,
        (err, res) => {
            if(err){
                console.log("error: ", err)
                result(err, null)
                return
            }
            if(res.length){
                console.log("found user: ", res[0])
                result(null, res[0])
                return
            }

            result({ kind: "not_found" }, null)
        }
    )
}

User.findByEmail = (email) => {

    return new Promise((resolve, reject)=>{
        const queryString = "SELECT * FROM users WHERE email = \"" + email + "\"";
        sql.query(queryString, (err, data)=>{
            if(err){
                return reject(err);
            }
            if(data.length){
                console.log(data)
                resolve(data[0])
            } else {
                resolve(null)
            }
        })
    })

}



User.getAll = result => {
    sql.query("SELECT * FROM users",
        (err, res) => {
            if(err){
                console.log("error: ", err);
                result(null, err);
                return
            }
            console.log("users: ", res)
            result(null, res)
        }
    )
}

User.updateById = (id, user, result) => {
    sql.query("UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ? ",
        [user.first_name, user.last_name, user.email], // php myadmin
        (err, res) => {
            if(err){
                console.log("error: ", err)
                result(null, err)
                return
            }

            if(res.affectedRows == 0){
                result({kind: "not_found"}, null)
                return
            }

            console.log("updated user: ", {id: id, ...user})
            result(null, {id:id, ...user})
        }
    )
}

User.remove = (id, result) => {
    sql.query(
        "DELETE FROM users WHERE id = ? ",
        id,
        (err, res) => {
            if(err){
                console.log("error: ", err)
                result(null, err)
                return
            }
            if(res.affectedRows == 0){
                // not found user with the id
                result({kind: "not_found"}, null)
                return
            }
            console.log("deleted user with id: ", id);
            result(null, res)
        }

    )
}

module.exports = User;