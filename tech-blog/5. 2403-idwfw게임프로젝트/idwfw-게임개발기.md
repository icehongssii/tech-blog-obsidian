---
title: idwfw-컨셉기획
created: 2024-02-20 01:10
last-updated: 2024-02-20 01:10
tags:
  - gameDev
---





## 메인화면

- 떨어지는 빗방울
	- 빗방울 rigidobj
	- 빗방울들 bg
		- 빗방울 인스턴스당 속도가 달라야한다
		- 모든 빗방울 인스턴스는 아래로 떨어져야한다
		- 모든 빗방울 인스턴스는 viewport 밖으로 나가면 사라진다
		- 계속해서 반복한다
	- 메인 hud
	- 메인씬
- 타이틀 + enter to play



## 화면전화 보통 어떻게 사용하는걸까?

- get_tree().change_scene_to_file("res://world.tscn")? 
- 아니면 visible = false나 Node.hide()
- 화면 전환은 보통 어떻게 이루어지는거지? 투토리얼에서는. hud 재사용하는 밥향이었는데 튜토리얼에서는 그냥넘어가네네


-----





-----


## 스크럼에서 커밋 단위는 어떻게 할까?





https://@github.com/kimchi-pasta-soft/idontwaitingforwater.git


https://github.com/kimchi-pasta-soft/idontwaitingforwater.git

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

https://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@github.com/kimchi-pasta-soft/idontwaitingforwater.git


https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

https://github.com/kimchi-pasta-soft/idontwaitingforwater.git



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






## Dev -> Main으로 넘어갈 때 게임 QA는 어떤식으로 진행도리까?

스프린트의 QA는 어떤식으로 진행되는가? 게임의 테스트 코든느 어떻게 작성하는가?;; 


https://www.reddit.com/r/godot/comments/tj4c4p/how_to_embed_game_on_own_website/

https://docs.godotengine.org/en/stable/tutorials/platform/web/customizing_html5_shell.html



## 개발 2일차(스프린트2)




- 가장 많이 시간을 쓴 곳 
	- 이슈가 진행중으로 바뀌면 자동으로 브랜치를 생성하는 오토메이션 추가할려고하는데 자꾸 org를 설정하라그래서 포기했음
	- 대신 커밋이나 브랜치가 리모트에 생성될때 이슈와 연동되는 작업을했다
	- git-flow 작업시작
		- 브랜치네이밍`feature/[프로젝트명-이슈번호]_이슈관련제목`
		- 커밋네이밍 


- fast-foward 병합은 왜 일어나는지 확실하게 알고가자


![](https://i.imgur.com/nyWXlkw.png)

reset mixed 이후에...

![](https://i.imgur.com/R7FGwez.png)


- [husky와 commitlint로 jira 이슈번호 자동화 시키기](https://xionwcfm.tistory.com/430)

- [마켓컬리 브랜치 관리?](https://helloworld.kurly.com/blog/squad-b-team-building/) - 아래 그림참고  
![](https://i.imgur.com/cPPAv4l.png)
- [클린 애자일 책관련 내용](https://eunjin3786.tistory.com/317)
- camera2d와 씨름하다.. 카메라 2dㄹ르 또 아예 삭제하자니 아예 화면밖으로 나간다  
![](https://i.imgur.com/m1h8lFw.gif)




- 패럴럭스 스크롤링 추천 

- 배경음악은 코파일럿으로 바꾸자
- rebase와 push는 언제하는가?
- 지긋지긋한 DS-Store 삭제하기 https://stackoverflow.com/questions/107701/how-can-i-remove-ds-store-files-from-a-git-repository  
왜 생기나> 파인터나 스포트라이트로 접근하면 걍 생기는파일이라 깃 이그노어에 적음  
It creates .DS_Store files because it needs to store the custom attributes of the folders that you open in Finder, such as the icon positions, view options, and Spotlight comments1. This helps Finder to remember how you want to display each folder on your Mac2. However, some people find these files annoying or unnecessary, especially when they are shared on network drives or USB devices34.




## 개발 3일차(스프린트2) -> 거의 개발 못함

https://www.youtube.com/watch?v=xzj0ech1XWI

그리고 camera2d를 달아버리면 이런식으로 땅이 계속 위치가 바뀌는 현상이 발생한다 현재까지


![](https://i.imgur.com/7nUg6KV.gif)

그래서 땅을 일단  staticbody2d 로 바꿔야한

```ad-important
title: staticbodty2d

A 2D physics body that can't be moved by external forces. When moved manually, it doesn't affect other bodies in its path.
```


https://docs.godotengine.org/en/4.2/tutorials/physics/physics_introduction.html

보니까 staticboy2d는 detection을 감지하지만 아무론 response를 하지 않는 env에서 많이 쓰인다고함함

원래는 ground를 parallax layer를 사용했었는데

```ad-important
title: parallax layer

A ParallaxLayer must be the child of a ParallaxBackground node. Each ParallaxLayer can be set to move at different speeds relative to the camera movement or the ParallaxBackground.scroll_offset value.


```

보니까각각의  parallax layer는 서로 다른 속도로 움직일 수 있다고함  
근데 땅이 움직일 필요가 없기 떄문에..  
잘못만들어졌단걸 꺠달음

![](https://i.imgur.com/wq3vnDV.png)

이렇게 되어있는 상태에사ㅓ

그래서


parallax 밖에 이런 배경화면을 하나 다시 만들었음 
```
staticbody2d
- collisionshape
- sprite2d(실제 이미지)
```

그리고 player안에 카메라2d가 달려있는 상태이다 (= 캐릭터의 움직임에 따라 화면이 바뀌는 상태)  
![](https://i.imgur.com/ruZk9Gk.png)


parallax안에 땅을 staticbody로 바꾸고  player안에 여전히 카메라 2d를 두면..

![](https://i.imgur.com/zAO8Qgz.gif)

이렇게 뛸때마다 같이 움직인다.. 그때 나쁘지 않은 느낌이다  
여기서 발 견할 수 있는 문제는..  
땅이 직선이 아니라서 collisionshope를 직접 입히기가 힘들었던거 + 보라색이 camera2d의 영역..  
![](https://i.imgur.com/V35pSCz.png)


그러다가 camera2d 줌을 1.5배로 하니까 그나마 맞춰진다 ㅋ ㅜ  
땅이 좀 아래도 떨어졌으면 조켔다 ..



https://www.youtube.com/@kortechtim 이거 확인해보기기



-----


다시 staticvody로 바꾸기 


![](https://i.imgur.com/S0tU3M7.jpg)


어떻게 해야 커브길을 걷게 하게 할 수 있을까?  
![](https://i.imgur.com/kZXRTPX.gif)


곡선을 따라 걷게하는게 심히 빡세다.. path2d + path2follow로 걷게 할 수 있찌만 스프린트가 늦었으므로...  
일단은 이거 포기한다 ㅜ  
https://www.youtube.com/watch?v=tHrT4KoDZ_Y


![](https://i.imgur.com/5yERvaX.gif)

결국 그냥 일반적인 길로 가기로했다..이제 이 길을 무한번 생성하면 된다다

점프스프라이트 추가  
![](https://i.imgur.com/uMUd17b.png)




## 스코어는? _process는 렌더링 너무 많다

![](https://i.imgur.com/soXkXEH.gif)

그냥 타이머쓰자자_

```python
extends Node2D


var time = 0 
# Called when the node enters the scene tree for the first time.
func _ready():
	pass



# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	time += 30 * 0.1
	$CanvasLayer/Label.text = str(time) +"s"

```

를 그래서 그냥  0.3초마다 갱신하게했더니 이번에는 너무 느린감이있다

```python
extends Node2D


var score = 0 
# Called when the node enters the scene tree for the first time.
func _ready():
	$Timer.wait_time = 0.3
	$Timer.start()



# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass


func _on_timer_timeout():
	score +=1  
	$CanvasLayer/Label.text = str(score) +"S"

```

![](https://i.imgur.com/bS7Ar3d.gif)


하지만 일단 구현했으니 고




----



https://stackoverflow.com/questions/75617655/when-should-i-use-a-kinematicbody-or-a-rigidbody-for-2d-platformer-characters  
---> 엄청나다! 

대박 고닷 튜토리얼 https://kidscancode.org/godot_recipes/3.x/physics/kinematic_to_rigidbody/  ---> 엄청나다

그래서 몬스터를 rigidbody에서 characterbody로 바꾸었다
- 일단 몬스터를 rigidvody로 만들면 아래처럼 캐릭터바디가 몬스터를 부딪히면 저렇게 밀어낸다..

## 플랫포머란

platform을 뛰어다니는게임


## Jump Height를 변경하자. 캐릭터가 몬스터를 못 건너 뛰고 있다 ㅜㅜ --> 이게 생각보다 엄청 어려웠다;;


왜 이렇게 됐는지 기억이 안난다..  
![](https://i.imgur.com/i0OlHCe.gif)


이렇게 되는데 점프를 길게 하고 싶다!!

![](https://i.imgur.com/qN5YT6q.gif)


- 지금 깨달았는데 y축으로만 이동하고 x축으로는 거의 이동이 안된느걸 볼 수 있다..
- https://www.youtube.com/watch?v=hG9SzQxaCm8 이것도 보랜다!!!  -> gdc better jump
- https://youtu.be/IOe1aGY6hXA?feature=shared godot jump -> 이거 보고선 너무 도움되었다..최고의 교육자료다..


![](https://i.imgur.com/2ODyQMf.gif)


드디어 넘을 수 있게 되었다.. 여기서 이용한것중하나는 `여기에서 점프 최대 높이에서 중령 영향 절반 감소시켜서 땅에 닿기전 시간이 더 걸리게됨 -> 이거를 구현하면 좀 더 오래 있을 수 있을 것 같군 ` 이거인것같다...








이제서야 간극이 줄음을 확인 할 수 있음  
이제 이 타일맵은 무한으로 하는법?  
아니 그런데 레딧에서 이런걸봄


![](https://i.imgur.com/s8N3kOy.png)

아 이런 개같은.. https://github.com/godotengine/godot/issues/85680

physicslayer https://youtu.be/S8lMTwSRoRg?t=3090








## 볼만한 개발 블로그
https://m.blog.naver.com/PostList.naver?blogId=sorang226&tab=1

## 재밋는 고닷게임

https://www.youtube.com/watch?v=3OpH4j4zpPU

## 코요테 타임이란?

아 점프 눌렀다고! 


- https://bbs.ruliweb.com/community/board/300143/read/56621623 -> 루리웹에서 너무 쉽게 설명해줌 
- 셀르스타른ㄴ 게임에서 숨겨진 메커니즘 코요테타임과 점프 버퍼링도 포함됨 https://gall.dcinside.com/mgallery/board/view/?id=celeste&no=1177
	- 여기에서 점프 최대 높이에서 중령 영향 절반 감소시켜서 땅에 닿기전 시간이 더 걸리게됨 -> 이거를 구현하면 좀 더 오래 있을 수 있을 것 같군 



## 링크드인 포스팅 말고 딴거없나 ㅜ 이직하려면;

![](https://i.imgur.com/C1lIGEU.png)  
https://namu.wiki/w/%EC%A3%BC%EB%8F%99%EC%9A%B0



## 계속 도움받고있따

![](https://i.imgur.com/acBq6Eg.jpg)

![](https://i.imgur.com/GbKZnJR.png)  
https://www.reddit.com/r/godot/comments/16q9cwb/tilemap_for_2d_infinite_runner/

![](https://i.imgur.com/Wh4ljIS.png)

그러니까 연속적인 모형에서 타일맵은 비추라는거다..  
그래서 다시 staticbody로 돌아오기로했다 이거에 대한 근거는뭐지?


not sure what format of endless runner u aiming, but i use Tilemap for my top down generated map and works awesome  
for games such as geometry dash, u may want to do some kind of scenes for each chunk to be picked randomly

chrome dino, has like Line that always on screen, like a paralax effect  
and the objects that spawms are scenes u made, they are picked randomly and places outside the screen borders  
the intencity of the placing obsticles depends on dino level or highscore

im just saying tilemaps are more complicated than placing objects on screen and let them slide from right to left of your screen as obsticles  
also tilemaps has limits, assuming you know how to draw tilemap for every obsticle u want to make, u cannot resize them properly in godot, since its a tilemap it will not work correctly..  
tilemaps are meant to be same size as u draw them

in the other hand, if u free draw a circle, u can place it as obstacle on whatever size u want, make bunch of obstacles

start playing around with different nodes and different approaches, its the best way to learn stuff..


-----


## CORD 문제 도커로 배포시


Error  
The following features required to run Godot projects on the Web are missing:  
Cross Origin Isolation - Check web server configuration (send correct headers)  
SharedArrayBuffer - Check web server configuration (send correct headers)


![](https://i.imgur.com/GNe0BaG.png)



```Dockerfile
FROM nginx 
COPY /Users/icehongssii/ws/export- /usr/share/nginx/html/
```


```

//  /Users/icehongssii/ws/export-
- Dockerfile
- index.html
- ... 고닷 파일들 
```


### nginx.conf만 바꾼다



```ad-important

        add_header 'Cross-Origin-Embedder-Policy' 'require-corp';
        add_header 'Cross-Origin-Opener-Policy' 'same-origin';  
    추가
    
```




```
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    keepalive_timeout  65;

    include /etc/nginx/conf.d/*.conf;

    server {
        listen 80;

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        add_header 'Cross-Origin-Embedder-Policy' 'require-corp';
        add_header 'Cross-Origin-Opener-Policy' 'same-origin';  
        }
    }
}

```

하지만 안된다 ㅗㅗ  
브라우저 캐시지워도 안됨됨

### conf.d/deafault.d만 바꾼다 ✅해결됨

여기에서 

```ad-important
  add_header Cross-Origin-Opener-Policy "same-origin" always;
    add_header Cross-Origin-Embedder-Policy "require-corp" always;


```

이거 추가하니까 된다

```
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;

    add_header Cross-Origin-Opener-Policy "same-origin" always;
    add_header Cross-Origin-Embedder-Policy "require-corp" always;



}

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}

```



그리고 도커파일

```Dockerfile
FROM nginx 
COPY default.conf /etc/nginx/conf.d
COPY . /usr/share/nginx/html
RUN apt-get update && apt-get install apt-file -y && apt-get install vim -y
```


```
docker build --no-cache -t my-godot-game .
docker run -d -p 80:80 my-godot-game

```


잘됨 ㅜㅜ  
그래서 내가 뭐한거냐?


## Brave에서 엄청느림

![](https://i.imgur.com/REhy1AE.png)


## Chrome 콘솔

![](https://i.imgur.com/jkEiAVl.png)





내 개인 프로젝트
- 게임
	- 기획 pdf
	- 관리방법
- 내 개발블로그 (obsidian)
	- aws - lambda 
- obsidian plug in 
- 




포트폴리오 구성?

- 깃허브가 옵시디언저장소임
- 깃허브에서 변경사항 일어날때마다 웹훅이 lambda 실행시킴
-  저장내용 s3에 호스팅됨
- https://medium.com/young-developer/react-markdown-code-and-syntax-highlighting-632d2f9b4ada
  

- obsidian에서 git으로 백업 x분씩
- 깃허브에서 변경사항 받으면 람다에서 받고 



개발자면 경력기술서만 정리 잘하면되고, 포폴은 깃헙 주소나 기술블로그 같은거 하면 링크 추가.


리액트js

고닷게임 embeded

 포트폴리오는 본인의 강점과 특성이 잘 드러난 자료로, 반드시 공개가 가능한 범위 내에서 제출 바랍니다. (미 출시작/클라이언트 등의 요청에 의한 비공개 작업물 / 저작권 침해의 소지가 있는 작업물 제출 불가)


내가 보여주고싶은거?  
걍 한페이지에 담아야함

/게임기획  
/게임개발  
/자기소


한줄표혀, 사진, 연락처, 간략소개, devLife(보유기술), 프로젝트 최근 1-2, 

이력서 -> 경력기술서  
포트폴리오
- 게임
- 테크 블로그 빌딩(markdown - react static 배포)
- obsidian 플러그인(s3호스팅)


자소서  - 자소서(텍스트위주)  
이력서  - 경력기술서  
	-  
경력기술서 = 포트폴리오??.........

입사지원서 (자유 양식),  경력기술서  
신입일 경우 자기소개서를, 경력일 경우 경력기술서를 중심으로 기술해 주시기 바랍니다.  
포트폴리오 첨부 시, 하단 안내 사항을 확인해 주시기 바랍니다. 



- 게임만든거
- 게임기획서
- 게임개발내용
- NFT 리서치
- 경력기술서
- 테크블로그들

개쩌는 ㅂ미디엄블로그 

https://blog.outsider.ne.kr/1706?category=38

https://medium.com/@dudwls96/cloud-native-%ED%99%98%EA%B2%BD%EC%97%90-%EB%A7%9E%EB%8A%94-docker-image-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0-7e03b7ef31bb



# 기획서


![](https://i.imgur.com/dsogiIR.png)  
![](https://i.imgur.com/zZz76ju.png)  
![](https://i.imgur.com/oj9IXqB.png)  
![](https://i.imgur.com/0cp1kdo.png)  
![](https://i.imgur.com/ixRzHKc.png)  
![](https://i.imgur.com/M3LAE9L.png)  
![](https://i.imgur.com/4C5egcI.png)  
![](https://i.imgur.com/ndYkgIo.png)  
![](https://i.imgur.com/yqVp98L.png)
