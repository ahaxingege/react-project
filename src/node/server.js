const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const db = require('./dbconnect.js')
const path = require('path')
const cors = require('cors');
//post参数解析
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())
app.use(cors());
//静态文件开启
app.use(express.static(path.join(__dirname, './public')))
//开启admin 静态文件
app.use('/', express.static(path.join(__dirname, './admin')))
//router
const user = require('./router/user.js')
const book = require('./router/book.js')
const upload = require('./router/upload.js')

app.use('/api/user', user)
app.use('/api/book', book)
// app.use('/api/upload', upload)


app.listen(3978, () => {
	console.log('server start in port' + 3978)
})
