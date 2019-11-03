var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(list){
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="/search_var" method="POST">
        <input type="text" name = "key" placeholder = "검색어를 입력하시오"><input type="submit">
    </form>
    <p>${list}</p>
</body>
</html>
  `;
}
var app = http.createServer(function(request,response){
	var _url = request.url;
	var queryData = url.parse(_url, true).query;
	var pathname = url.parse(_url, true).pathname;
    if(pathname == '/'){
		if(queryData.id === undefined){
			fs.readdir('./data', function(error, filelist){
				var request = require('request')
				var NAVER_CLIENT_ID     = 'DgVPs9wAu3RODQR0vcD0'
				var NAVER_CLIENT_SECRET = 'a9hqAN6PS0'
				var option = {
				  query  :fs.readFileSync('data/keys'), //이미지 검색 텍스트
				  display:100,
				  start  :1, //검색 시작 위치\
				  sort   :'sim', //정렬 유형 (sim:유사도)
				  filter :'small' //이미지 사이즈
				}

				request.get({
				  uri:'https://openapi.naver.com/v1/search/news.json',
				  qs :option,
				  headers:{
					'X-Naver-Client-Id':NAVER_CLIENT_ID,
					'X-Naver-Client-Secret':NAVER_CLIENT_SECRET
				  }
				}, function(err, res, body) {
					let json = JSON.parse(body) //json으로 파싱
					console.log(json)
					var list = '<table><tr><th>제목</th><th>내용</th></tr>';
					var i = json['start'];
					while(i < json['items'].length){
						list = list + `<tr>
<td>
<a href="${json['items'][i]['link']}">
${json['items'][i]['title']}</a>
</td>
<td>
	${json['items'][i]['description']}</td>
</tr>`;
						i=i+1;
						console.log(i);
					}
					list = list+'</table>'
					var template = templateHTML(list);
					response.writeHead(200);
					response.end(template);
				});
     	 });
		}
    }  else if(pathname === '/search_var') {
    var body = '';
    request.on('data', function(data){
      body = body + data;
    });
    request.on('end', function(){
		var post = qs.parse(body);
		var key = post.key;
		console.log(key);
		fs.writeFile(`data/keys`, key, 'utf8',function(err){
			response.writeHead(302, {Location:`/`});
			response.end();
		});
    });
  }
});
app.listen(3000);