<html>
	<head>
		<?php
  $client_id = "DgVPs9wAu3RODQR0vcD0"; //발급받은 client id & secret key
  $client_secret = "a9hqAN6PS0";
  $encText = urlencode("네이버"); //검색할 Text를 url인코딩
  /*요청 변수(query, display, start, sort... 네이버 참고)
    json ver: https://openapi.naver.com/v1/search/book.json?...
    xml ver : https://openapi,naver.com/v1/search/book.xml?...
  */
  $url = "https://openapi.naver.com/v1/search/news.json?query=".$encText;
  $is_post = false;
  /*
  curl = 원하는 url에 값을 넣고 리턴되는 값을 받아오는 함수
  */
  $ch = curl_init(); //세션 초기화
  /*curl_setopt : curl옵션 세팅
    CURLOPT_URL : 접속할 url
    CURLOPT_POST : 전송 메소드 Post
    CURLOPT_RETURNTRANSFER : 리턴 값을 받음
  */
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_POST, $is_post);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $headers = array();
  $headers[] = "X-Naver-Client-Id: ".$client_id;
  $headers[] = "X-Naver-Client-Secret: ".$client_secret;
  /*
    CURLOPT_HTTPHEADER : 헤더 지정 (네이버 api를 사용하려면 필요하다)
    CURLOPT_SSL_VERIFYPEER : 인증서 검사x
    https 접속시 필요
  */
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
 
/*
  curl_exec : 실행
  curl_getinfo : 전송에 대한 정보
  CURLINFO_HTTP_CODE : 마지막 HTTP 코드 수신
*/
  $response = curl_exec ($ch);
  $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  echo "status code: ".$status_code."";
  curl_close ($ch);
  if($status_code == 200) { //정상
    echo $response;
  }
  else {
    echo "Error 내용: ".$response;
  }
?>
        <meta charset="utf-8">
        <title>진눈깨비</title>
        <link rel="stylesheet" href="style.css">
        <script src="js/jquery-3.4.1.min.js"></script>
        <script src = "script.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding&display=swap" rel="stylesheet">
	</head>
	<body>
        <header>
            <a href="index.html" class="logo "><img src="images/mainLogo.png" alt = "로고"></a>
            <div class = "searchType">
                <ul>
                    <li class="tab_item"><a href="index.html">학교 검색</a></li> | 
                    <li class="tab_item"><a href="index2.php">기사 검색</a></li>
                </ul>
            </div>
            <nav class="menu_container">
                <div class = "nav menubar">
                    <a><img id="mynav" src ="images\menubutton.png" ></a>
                    <ul class="menu">
                        <li><a href="index.html" class="nav_item">검색</a></li>
                        <li><a href="developer.html" class="nav_item">개발자</a></li>
                        <li><a href="whatisthispage.html" class="nav_item">페이지 소개</a></li>
                    </ul>
                </div>
            </nav>
        </header>
        <article>
			<form action ="/swBuildersChallenge/searchResult.html">
				<div class="searchArea">
					<input type ="text" placeholder="학교명을 검색하세요" id="inputArea">
					<button id="searchButton" onclick = "search();">
						<img class = "btn_img" src="images\searchbutton_3.png">
					</button>
				</div>
				<div id="newsOutput">
				</div>
			</form>
        </article>
        <footer>        	
            &copy; 2019. Team 진눈깨비 All Rights Reserved.
        </footer>
	</body>
</html>