---
title: idontwaitingforwater기획서
created: 2024-02-16 18:14
last-updated: 2024-02-16 18:14
tags:
  - gameDev
---
인
## 👯‍♂️ intro & tl;dr

좋은 기획서 조건 
1. 아이디어가 담겨있고
2. 구현방안 담겨있고
3. 개발자가 이해하기 쉬워야함

- 이거 왜 만들어요? 게임 기획의도
- 이거 어떻게 동작? 기능에 대한 디테일설명
- 룰에서 벗어난경우(=예외처리), 룰에서 벗어난 경우? 


https://github.com/godotengine/godot/issues/70691

https://makergram.com/blog/play-chromes-dino-game-physically/ 골때리네 ㅋㅋ


- 시스템 기획 = 규칙 + 테이블 + UI + 연찰
- 몬스터 스폰기획
	- 랜덤하게 스폰했으면 좋겠다ㅋ

--- 

## 👯‍♂️ Main

- 기획서 내용
	- 명확하게, 이미지, 리스트, 세부적

- 기획서 종류 
	- 제안용(1장) -> 팀원전체
		- 기획의도
		- 목표 컨셉
		- 재미 
	- 시스템 -> 프로그래머에게 시스템설명 규칙
		- 명확한 규칙  & 진행방식
		- 프로그램및개발툴 이해
		- 자세하게 무엇만들어야하는지
	- 컨텐츠 -> 디자이너에게 리소스 
		- 어떤 리소스 파악해야하는지 
		- 컨셉 명확히
		- 디자인영역은피함
		- 목록/명칭/설명/비고/이펙트/사운드
		- 데이터테이블
### 👯‍♂️ 시작문서

- 기본사항 
	- 목차
	- 기획의도 & 목표
	- 목록분류
- 기술구현 = 사용툴 & 엔진등 이용한 설명, 기존 기술 및 구쳬적 사례 통해 개발자가 이해하기편함

### 👯‍♂️ 제안용

- 기획의도
	- 
	- 그림판으로 그린 것 같은 느낌으로 허접한 느낌을 준다
- 

- 한줄요약
	- 장르: 횡스크롤 러닝액션
	- 플랫폼: 브라우저
	- 개발환경: godot 4.2.1
	- 타겟층: 1980~2000년대 초 출생자 dommer
	- 키워드: 러닝액션
	- 게임소개:  doomer를 적실 물은 없다! 질척이는 괴물피해 물을 찾으러가는 여행
	- 게임목표: 뛰어서 장애물 피해서 가능한 많은 점수를 모우기
	- 키워드: 그림판, 하찮은, 킬링타임, doomer 
	- 기획의도: 하찮은 러닝게임을 만들자! 완벽하지 않지만 
- 컨셉 디자인
	- 세계관: 
	- 플레이어 캐릭터: 졸라맨
	- 몬스터: 보라색괴물
	-

### 👯‍♂️ 시스템

![](https://i.imgur.com/l8PPKvn.png)


- 규칙
	- 


### 👯‍♂️ 마일스톤 정의


### 👯‍♂️ 컨텐츠



### 👯‍♂️ 콘텐츠 기획서 장표

11. 4. 컨셉디자인
12. 콘텐츠 - 필요한 스프라이트 정의 
13. 콘텐츠 - 필요한 사운드 정의
14.
### 👯‍♂️ 시스템 기획서 장표

-> 개발하기전에 주의사항?  
-> EC2로 그냥 띄워나야하나?

```ad-important
title: 꼭 넣자 개발자들을위해
- 이거 왜 만들어? : 기획의도 
- 이거 어케 움직여요? : 기능 디테일
- 이런 상황은 어떻게? : 예외처리 
- 각 기능에 대한 디테일은 (이미 완성된사양/이번구간에 만들것/미래버전)으로 제시한다
```

AKfycbxSyi_S04aymNE8nz_rDsRPy0wK6mtVRaeG8gP_PMgcI3YYP1O_FsE4GP7gjhZc4E3q

https://script.google.com/macros/s/AKfycbxSyi_S04aymNE8nz_rDsRPy0wK6mtVRaeG8gP_PMgcI3YYP1O_FsE4GP7gjhZc4E3q/exec
1. 표지
2. 목차
3. 컨셉 제안 및 기획의도
4. 기술스펙
	1. 사용엔진: 고닷
	2. 인프라 : aws, linux, ec2, s3
	3. 프로젝트관리: jira, google spreadsheet
6. 마일스톤별 정의 및 스프린트 구성성
	1. 1차 마일스톤
	2. 2차 마일스톤
7. 개발을 편하게!
	1. 엑셀 지라 구글 시트 연동 ATATT3xFfGF0GyO1pTv-YK6vh9xnCPtSUWhVMuhT5nBfeE88w5KzLHNv-VSHWqBXDRGh60_66hBqc30t3vEOsNmnvcvqF1ikX2vvS5pAz3XSkTzgJdc4bxusskk_mI614GIbkoT4M-072sO9mCTbRTW37wclYx_to7rxqLaHRAKc-PFeDL8OCIg=F5E747FF
	2. 지라 - 깃허브 티켓
8. 개발스케줄 및 스프린트별 목표
10. 기술구현 - 인프라(AWS 아키텍처) + 표(aws)
11. 기술구현 - 자동배포(CI/CD) + 표 (깃허브액션)
12. 기술구현  -제약사항 미리 생각해두기, ==예외처리?==
	1. 400, 500 정의 
	2. 점수 맥스는 어디까지?
	3. 서버가 터지면?
13. 기술구현 - 기본 규칙==(기능디테일)==
	1. 뛰는 방법점프하는방법
	2. 점수는?
	3. 스피드 조절?
	4. 몬스터 스폰은 언제?
	5. 물체 닿으면?
	6. 물체를 잘 피했으면?

## 👯‍♂️ Conclustion

Summarize the main points and conclude your post.

--- 

## 👯‍♂️ Ref

- [^1]:  작성자. "제목," 사이트명, 발행날짜, [URL](www.naver.com)

