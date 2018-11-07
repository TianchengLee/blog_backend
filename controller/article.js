const moment = require('moment')
const conn = require('../db/db.js')
module.exports = {
  handleGetArticles(req, res) {
    // if (!req.query.hasOwnProperty('page') || !req.query.hasOwnProperty('pageSize')) return res.status(400).send({ status: 400, msg: '参数错误, 必须传入page和pageSize' })
    let page = req.query.page || 1
    let pageSize = req.query.pageSize || 10
    let keywords = req.query.keywords || ''

    const statementSql = `from articles as a
    left join users as u
    on a.author_id = u.id
    where concat(title, content, username, nickname) like '%${keywords}%'`

    const queryArticlesSql = `select a.id as aid, a.title, a.content, a.ctime, u.id as uid, u.username, u.nickname ${statementSql}
    order by aid desc
    limit ${(page - 1) * pageSize}, ${pageSize};`

    const queryArticleTotalCountSql = `select count(*) as totalCount ${statementSql}`

    conn.query(queryArticlesSql + queryArticleTotalCountSql, (err, result) => {
      if (err) return res.status(500).send({ status: 500, msg: '数据获取失败, 请重试!', data: null })
      res.send({ status: 200, msg: 'ok', totalCount: result[1][0].totalCount, data: result[0] });
    })
  },
  handleArticleAddPost(req, res) {
    if (!req.session.isLogin) return res.status(400).send({ status: 400, msg: '您的登录信息已失效, 请保存文章后重新登录' });
    const body = req.body
    body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
    body.author_id = req.session.user.id
    const insertSql = 'insert into articles set ?'
    conn.query(insertSql, body, (err, result) => {
      if (err) return res.status(500).send({ status: 500, msg: '文章发表失败,请重试!' })
      res.send({ status: 200, msg: 'ok', articleId: result.insertId });
    })
  },
  handleArticleInfoGet(req, res) {

  }
}