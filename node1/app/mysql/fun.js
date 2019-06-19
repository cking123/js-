/**
 * 所有的数据库的访问方法
 */
let connection = require('./init');


function login(name, password) {
    let sql = `select * from admin where username='${name}' and password='${password}'`;
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            if (results.length) {
                resolve({
                    code: 1
                })
            } else {
                resolve({
                    code: 0
                })
            }
        })
    });
}

function foodstocsave(data) {
    let sql = `UPDATE foodinfo set stock='${data.num}' where id=${data.id}`;
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            if (results) {
                resolve({
                    code: 1
                })
            } else {
                resolve({
                    code: 0
                })
            }
        })
    });
}

function getusername(name) {
    let sql = `select * from admin where username='${name}'`;
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            if (results.length) {
                resolve({
                    code: 1,
                    data: results
                })
            } else {
                resolve({
                    code: 0
                })
            }
        })
    });
}

function getfootinfo() {
    let sql = `select * from foodinfo`;
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            resolve(results);
        })
    });
}

function getfoodinfobyid(id) {
    let sql = `select * from foodinfo where id=${id}`;
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            resolve(results);
        })
    });
}

function delfoodinfobyid(id) {
    let sql = `DELETE FROM foodinfo WHERE id=${id}`;
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            if (results) {
                resolve({
                    code: 1
                })
            } else {
                resolve({
                    code: 0
                })
            }
        })
    });
}

function updatafoodbyid(data) {
    let sql = `UPDATE foodinfo SET name='${data.name}',addtime='${data.addtime}',price='${data.price}',stock='${data.stock}' where id=${data.id}`;
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            if (results) {
                resolve({
                    code: 1
                })
            } else {
                resolve({
                    code: 0
                })
            }
        })
    });
}

function addfoodinfo(data) {
    let sql = `INSERT INTO foodinfo VALUES (null,'${data.name}','${data.url}','${data.addtime}','${data.price}','${data.stock}')`;
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            if (results) {
                resolve({
                    code: 1
                })
            } else {
                resolve({
                    code: 0
                })
            }
        })
    });
}

function getorderall() {
    let sql = `select * from orders`;
    console.log(sql);
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            resolve(results);
        })
    });
}

function getuserall() {
    let sql = `select * from user`;
    console.log(sql);
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            resolve(results);
        })
    });
}

function addactivity(data = '') {
    let sql = `INSERT INTO activity VALUES (null,'${data.activityname}','${data.region}','${data.starttime}','${data.endtime}','${data.distribution}','${data.nature}','${data.resources}','${data.form}')`;
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            if (results) {
                resolve({
                    code: 1
                })
            } else {
                resolve({
                    code: 0
                })
            }
        })
    });
}

function getoperationall() {
    let sql = `select * from operation`;
    console.log(sql);
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            resolve(results);
        })
    });
}

function addoperation(data = '') {
    let sql = `INSERT INTO operation VALUES (null,'${data.operation}','${data.adminname}','${data.operationtime}')`;
    console.log(sql)
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            if (results) {
                resolve({
                    code: 1
                })
            } else {
                resolve({
                    code: 0
                })
            }
        })
    });
}

function getuserchartall() {
    let sql = `select * from userchart`;
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            resolve(results);
        })
    });
}

function getUserDoChartInit() {
    let sql = `select * from chartInit`;
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            resolve(results);
        })
    });
}

function updatauserbyid(data){
    let sql = `UPDATE user SET username='${data.username}',province='${data.province}',city='${data.city}',address='${data.address}', zipcode='${data.zipcode}' where id=${data.id}`;
    console.log(sql)
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            if (results) {
                resolve({
                    code: 1
                })
            } else {
                resolve({
                    code: 0
                })
            }
        })
    });
}

function pagefoodinfobyid(num){
    let sql = `select * from foodinfo limit ${num},4`;
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            resolve(results);
        })
    });
}

function getfoodinfobyoCount() {
    return new Promise((resolve, reject) => {
        let sql = `select count(id) from foodinfo`;
        console.log(sql)
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            resolve(results[0]['count(id)'])
        })
    })
}

exports.login = login;
exports.getfootinfo = getfootinfo;
exports.getfoodinfobyid = getfoodinfobyid;
exports.delfoodinfobyid = delfoodinfobyid;
exports.addfoodinfo = addfoodinfo;
exports.getorderall = getorderall;
exports.getuserall = getuserall;
exports.addactivity = addactivity;
exports.getoperationall = getoperationall;
exports.getuserchartall = getuserchartall;
exports.addoperation = addoperation;
exports.updatafoodbyid = updatafoodbyid;
exports.getUserDoChartInit = getUserDoChartInit;
exports.getusername = getusername;
exports.foodstocsave = foodstocsave;
exports.updatauserbyid=updatauserbyid;
exports.pagefoodinfobyid=pagefoodinfobyid;
exports.getfoodinfobyoCount=getfoodinfobyoCount;