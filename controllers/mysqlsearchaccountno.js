const minesql = require('../mysql.cfg');
var respObj = {};
var row = {}

minesql.query('select * from user_info_tab where account_no = "13015563143"', function (err, rows, fields) {
    if (err) {
        console.log(err);
    } else {
        console.log(rows)
        row = rows;
    }
})
var search_account_num = async (ctx, next)=>{
    var accountNo = ctx.request.body.accountNo || "";
    var password = ctx.request.body.password || "";
    
    if (row[0].account_no == accountNo && row[0].password == password) {
        respObj.code = 10001;
        respObj.msg = "succ"
    } else {
        respObj.msg = 'err'
    }


    ctx.response.body = respObj;
}

module.exports = {
    'POST /new/login': search_account_num
}