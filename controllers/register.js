const db = require('../mysql.cfg');
var respObj = {};
var row = {};

var register = async (ctx, next)=>{
    var accountNo = ctx.request.body.accountNo || "";
    var password = ctx.request.body.password || "";
    var sex = ctx.request.body.sex || "";
    var searchSql = 'select * from user_info_tab where account_no = "'+ accountNo +'"';
    var isExist = false;

    if (accountNo != "" && password != "" && sex != "") {
        db.query(searchSql, function(err, rows, fields){
            if (err) {
                console.log('err');
                    respObj.code = 10010;
                    respObj.msg = 'error'
                ctx.response.body = respObj;
            } else {
                if (rows.length > 0) {
                    console.log(rows.length)
                    isExist = true;
                    respObj.code = 10003;
                    respObj.msg = 'the user is exist'
                    console.log(respObj)
                    ctx.response.body = respObj;
                } else {
                    isExist = false;
                    var sql = 'insert into user_info_tab (account_no, password, sex, deleted) values (' + accountNo + ', ' + password + ', "' + sex + '", "F")';
                    db.query(sql, function(err, result, fields){
                        if (err) {
                            console.log("err");
                            respObj.code = '10002';
                            respObj.msg = 'err';
                            ctx.response.body = respObj;
                        } else {
                            console.log("rows")
                            respObj.code = "10001";
                            respObj.msg = 'succ';
                            ctx.response.body = respObj;
                        }
                    })
                }
            }
        })

        // if (isExist) {
        //     respObj.code = 10003;
        //     respObj.msg = 'the user is exist'
        //     ctx.response.body = respObj;
        // } else {
        //     var sql = 'insert into user_info_tab (account_no, password, sex, deleted) values (' + accountNo + ', ' + password + ', "' + sex + '", "F")';
        //     db.query(sql, function(err, rows, fields){
        //         if (err) {
        //             console.log(err);
        //             respObj.code = '10002';
        //             respObj.msg = 'err';
        //             ctx.response.body = respObj;
        //         } else {
        //             console.log(rows)
        //             respObj.code = "10001";
        //             respObj.msg = 'succ';
        //             ctx.response.body = respObj;
        //         }
        //     })
        // }

    } else {
        console.log("缺少必要的东西")
    }

        
}

module.exports = {
    'POST /new/register': register
}