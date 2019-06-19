var express = require('express');
var router = express.Router();
var mysql = require('../mysql/fun');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async (req, res, next) => {
  var val = req.body.data;
  let info = await mysql.login(val.username, val.password);
  if (info.code == 1) {
    req.session.username = val.username;
    return res.json({
      flog: 1,
      info: "登录成功"
    });
  } else {
    return res.json({
      flog: 0,
      info: "登录失败"
    });
  }
})

router.get('/getusername', async (req, res, next) => {
  if (!req.session.username) {
    return res.json({
      flog: 0,
      info: "登录状态已失效"
    })
  };
  let info = await mysql.getusername(req.session.username);
  if (info.code == 1) {
    return res.json({
      flog: 1,
      info: info.data
    });
  } else {
    return res.json({
      flog: 0,
      info: "登录状态已失效"
    });
  }
});

router.get('/foodinfo', async (req, res, next) => {
  let val = await mysql.getfootinfo();
  res.json({
    flog: 1,
    info: val
  });
});

router.get('/pagefoodinfobyid', async (req, res, next) => {
  var sid = req.query.id || 1;
  let count = await mysql.getfoodinfobyoCount();
  if (sid > Math.ceil((count / 4))) {
    return res.json({
      flog: 0,
      info: "数据已经加载完毕"
    });
  }
  var num = (sid - 1) * 4;
  var data = await mysql.pagefoodinfobyid(num);
  res.json({
    flog: 1,
    info:data
  })
})


router.get('/foodinfobyid', async (req, res, next) => {
  var val = req.query;
  let data = await mysql.getfoodinfobyid(val.id);
  if (data) {
    res.json({
      flog: 1,
      info: data
    });
  } else {
    res.json({
      flog: 0,
      info: "无该美食"
    });
  }
});

router.get('/delfoodinfobyid', async (req, res, next) => {
  var val = req.query;
  let info = await mysql.delfoodinfobyid(val.id);
  if (info.code == 1) {
    return res.json({
      flog: 1,
      info: "删除成功"
    });
  } else {
    return res.json({
      flog: 0,
      info: "删除失败"
    });
  }
})

router.post('/updatafoodbyid', async (req, res, next) => {
  var bodys = req.body.data;
  let info = await mysql.updatafoodbyid(bodys);
  if (info.code == 1) {
    return res.json({
      flog: 1,
      info: "修改成功"
    });
  } else {
    return res.json({
      flog: 0,
      info: "修改失败"
    });
  }
})

router.post('/addfoodinfo', async (req, res, next) => {
  var bodys = req.body;
  let info = await mysql.addfoodinfo(bodys.data);
  if (info.code == 1) {
    return res.json({
      flog: 1,
      info: "添加成功"
    });
  } else {
    return res.json({
      flog: 0,
      info: "添加失败"
    });
  }
})

router.get('/getorderall', async (req, res, next) => {
  let val = await mysql.getorderall();
  res.json({
    flog: 1,
    info: val
  });
});

router.get('/getuserall', async (req, res, next) => {
  let val = await mysql.getuserall();
  res.json({
    flog: 1,
    info: val
  });
})

router.post('/addactivity', async (req, res, next) => {
  var bodys = req.body.data;
  console.log(bodys)
  let info = await mysql.addactivity(bodys);
  await mysql.addoperation({
    operation: `上线活动:${bodys.activityname}`,
    adminname: '李白',
    operationtime: bodys.starttime
  });
  if (info.code == 1) {
    return res.json({
      flog: 1,
      info: "添加成功"
    });
  } else {
    return res.json({
      flog: 0,
      info: "添加失败"
    });
  }
})

router.get('/getoperationall', async (req, res, next) => {
  let val = await mysql.getoperationall();
  res.json({
    flog: 1,
    info: val
  });
})

router.get('/getuserchartall', async (req, res, next) => {
  let val = await mysql.getuserchartall();
  res.json({
    flog: 1,
    info: val
  });
})

router.get('/getUserDoChartInit', async (req, res, next) => {
  let val = await mysql.getUserDoChartInit();
  res.json({
    flog: 1,
    info: val
  });
});

router.post('/foodstocsave', async (req, res, next) => {
  let bodys = req.body.data;
  let info = await mysql.foodstocsave(bodys);
  if (info.code == 1) {
    return res.json({
      flog: 1,
      info: "添加成功"
    });
  } else {
    return res.json({
      flog: 0,
      info: "添加失败"
    });
  }
})

router.post('/updatauserbyid', async (req, res, next) => {
  var bodys = req.body.data;
  let info = await mysql.updatauserbyid(bodys);
  if (info.code == 1) {
    return res.json({
      flog: 1,
      info: "修改成功"
    });
  } else {
    return res.json({
      flog: 0,
      info: "修改失败"
    });
  }
})


module.exports = router;
