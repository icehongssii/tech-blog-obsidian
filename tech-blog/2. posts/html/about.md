
<style> a:link { color: blue; } a:visited { color: black; } a:hover { color: red; } a:active { color: green; }.center-image { display: block; margin: auto; width: 50%; /* Or your specific width */ height: auto; /* Maintains aspect ratio */ } </style>

## Icehongssii의 경력 기술서 목차

- <a href="#icehongssii">icehongssii의 자기소개</a>
- <a href="#경력기간">경력기간 == 2.9년</a>
	- <a href="#키토크에이아이">1. 키토크에이아이</a>
	- <a href="#델타박스오우">2. 델타박스 오우 </a>
- <a href="그외경험">경험들(추천서/상/발표/오픈소스)</a>
- <a href="TMI">TMI</a>

## 🥨 <a id="icehongssii">icehongssii의 자기소개</a>

<br>

**안녕하세요, 자동화로 제품에 기여하는 2.9년 차 파이썬 개발자 icehongssii입니다.**  
본명은 특이해서 부득이하게 닉네임으로 표시합니다..  🥶  

<br>
스타트업에서 서비스에 사용되는 데이터 추출, 정제, 적재(이하 ETL) 파이프라인 개발, 유지, 보수 업무를 주로 하였고  파이썬, Docker를 이용한 퍼블릭 <mark style="background: #BBFABBA6;">클라우드 서비스들(AWS ECS, ECR등</mark>)를 주로 사용하였습니다.   클라우드 환경에서 컨테이너 아키텍처를 이용한 애플리케 이션을 좋아합니다.  

<br>


> **그러다보니 퍼블릭 클라우드 환경에서 기술 조직을 이끄는 사람이 되고 싶어  k8s 교육과정을 수강(2023)했습니다.  무조건 MSA! 무조건 K8S! 가 답이라고는 생각하지 않지만 이러한 기술들이 오버헤드가 아니라 최적화로 여겨지는 곳에서 일하고 싶습니다.**


<br>

- 업무와 제품 운영의 자동화로 편의성과 효율성을 증가시킵니다.
- 파이썬, Docker를 이용한 클라우드 서비스(AWS ECS, ECR)에서 데이터를 정제합니다.
- 제 비전은 조직의 매니저로 명료한 커뮤니케이션을 활용해 팀을 관리하고 서비스 개선을 위한 기술 서포트 및 리뷰를 하는 것입니다.
- 최근에는  [러닝 액션 게임](https://xxx.icehongssii.xyz/posts/프로젝트-idontwaitingforwater.md)과 메모 어플기반의 [이 블로그](https://xxx.icehongssii.xyz/posts/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-obsidianBlog.md) 개발했습니다..🎶🎶🎶🎶
- 2024.03.22 기준 NFT를 이용한 디스코드 채널 회원 인증 봇을 제작 중입니다.


```ad-important
저는 엄청나게 재밌는걸 + 재밌는 사람들과 만들고 싶습니다.
```


<div style="text-align: center;"> <img src="https://i.imgur.com/pGqSgls.png" class="center-image"/> </div>

<br>

---- 

## 🥨 <a id="경력기간">경력기간 == 총 2년 9개월</a>

  

### <a id="키토크에이아이">**1. [주식회사 키토크에이아이](https://www.keytalkai.com/)**</a>

키토크(추천키워드) 서비스 회사. 웹툰/드라마/영화/화장품 추천. 2021년 AWS 아마존 어드밴스드 기술 파트너 선정


<br>

#### **학습 데이터 ETL 파이프라인 구축 프로젝트**
  - 👉데이터 엔지니어 (2022.06-2022.12)
  - Skills: Python, Docker, MySQL, AWS(ECR, ECS), GitLab
  - **[파이프라인 유지보수 및 고도화]**
	- 기존에 로컬환경에서 실행되던 파이썬 어플리케이션 4개를 AWS 이용해 클라우드 마이그레이션, 이후 작업시간 약 90% 감소(6시간 → 30분)
	- 데이터 분석 전 후 작업 코드 분리 (AS-IS 단일 배치 -> TO-BE 병렬 배치)
	-  [MySQL 쿼리 최적화](https://xxx.icehongssii.xyz/posts/mysql%20%EC%BF%BC%EB%A6%AC%EC%B5%9C%EC%A0%81%ED%99%94%20-%20offset.md?ref=main), [Docker 이미지 최적화](https://xxx.icehongssii.xyz/posts/Docker%20%EC%9D%B4%EB%AF%B8%EC%A7%80%20%ED%81%AC%EA%B8%B0%20%EC%B5%9C%EC%A0%81%ED%99%94.md?ref=main)
	- AWS lambda로 운영 중이던 프로젝트 ECS로 이관작업 진행
	- 파이썬 코드 품질 관리 도입(black, isort)
	- 원활한 협업을 위해 브랜치, 커밋 룰 도입



#### **마이무비, 영화 추천 서비스**

- 👉데이터 엔지니어(2022.06-2022.12)
- Skills: Python, Docker, MySQL, AWS(ECR, ECS), GitLab, 업무 30% 영어사용
- [**영화 데이터 ETL 파이프라인 유지보수 및 고도화**]
	- 기존에 로컬환경에서 실행되던 파이썬 어플리케이션 AWS 이용해 클라우드 마이그레이션
	- Flask 이용 ECS 상태 대시 보드 및 슬랙 작업 알림봇 개발기여
	- 새 영화 키토크(추천 키워드) 제작을 위해 운영팀과 데이터 수집 기획

  
#### **글램아이, 화장품 추천 서비스**

  - 👉데이터 인턴(2021.03-2022.06)
  - Skills: Python, Github, MySQL, Pandas, Selenium
  - [**해외 화장품 매장 데이터 ETL 파이프라인 유지보수 및 고도화]**
	- 엑셀로 진행되던 데이터 정합성 검사 Python 이용 자동화
	- 텔레그램 작업 알림 종료 봇 제작
	- 크롤링에 사용되는 영어권 API 문서 작성 및 사내 공유
	- 이후 작업시간 약 80% 감소(30분 → 5분)
	- 사내 반복작업 개선 위해 인턴 대상 Python, Git, Docker 기초 교육 및 주간 스터디 진행
	- 커뮤니케이션; 데이터 수집 스케줄 관리를 위해 인턴 업무 진행 상황 추적 & 운영, 사업개발, 마케팅 부서에게 수집 상황 전달 및 스케줄 관리

  

### <a id="델타박스오우">2. [델타박스오우(Proofsuite)](https://www.proofsuite.com/)</a>

  

블록체인 이용 금융 솔루션, 탈중앙화 거래소, 가상화폐 투자 정보 서비스 제공 스타트업

<br>  

#### **Avocado, 가상화폐 투자 정보 를 한 눈에 볼 수 있는 서비스**

  
- 👉 주니어 백엔드 개발자 (2018.05-2019.03)
- Skills: Python, InfluxDB, MySQL, Docker, 업무 100% 영어 사용
- **[약 20개의 국내외 암호화폐 거래소 시세 API 통합 신규 개발]**
	- WebSocket, REST API 이용 마켓 리스트 및 시세 정보 수집, 정제 적재 파이프라인 개발
	- Influxdb CRUD, 벌크 삽입 수행 핸들러 개발
	- 각 거래소 API 문서 정리 및 사내 공유
	- 암호화폐 주간 분석 보고서 웹 수집 및 마크다운 변환 어플리케이션 개발
	- 기존 주간 분석보고서 작성에 사용되던 프리랜서 비용 약 50%절감
	- 회사에 처음 입사한 한국인 개발자로써 운영부서와 협업하여 서비스 기획 및 개발

  
  
--- 

## 🥨 <a id="그외경험">경험들(추천서/상/발표/오픈소스)</a>


### 추천서.

  

- [2019, 델타박스오우 CTO](https://adorable-nft-research-by-little-sweet-pumkins.s3.ap-northeast-1.amazonaws.com/%E1%84%8E%E1%85%AE%E1%84%8E%E1%85%A5%E1%86%AB%E1%84%89%E1%85%A5-%E1%84%83%E1%85%A6%E1%86%AF%E1%84%90%E1%85%A1%E1%84%87%E1%85%A1%E1%86%A8%E1%84%89%E1%85%B3%E1%84%8B%E1%85%A9%E1%84%8B%E1%85%AECTO.pdf)

  

### 상.

  

- 2023, KDT 쿠버네티스 교육과정 12회차 파이널 프로젝트 최우수상(과정)

	- 프로젝트 기획, PM, 프론트 엔드(React.js) 개발, CI/CD 파이프라인 개발(Github Action+ArgoCD)

- 2017, 한국소프트웨어기술진흥협회 소프트웨어 경진대회 동상

	- 프로젝트 기획, python, linux, 라즈베리파이

  

### 발표.

  

- 2021, [사내공유용 도커 튜토리얼](https://docs.google.com/presentation/d/1Z7TjL6qQa3ow8UlXikJWJ6r8kxTLcpVvruA9mv3O7XI/edit#slide=id.p)

- 2023, [K8S KDT 쿠버네티스 교육과정 12회차 파이널 프로젝트](https://docs.google.com/presentation/d/1ecVJeEOR9fxyIuGrKfFyQMlKkJjAfhQduOK0asxg3Qw/edit?usp=sharing) 발표자료


  

### 오픈소스와 커뮤니티.

  

- 2019, [MDN 웹 개발 문서 저장소 문서 오탈자 및 교정](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes/contributors.txt)

- 2021, 두근 두근 파이썬 - [SQLAlcchemy 한국어 번역 기여](https://github.com/SoogoonSoogoonPythonists/sqlalchemy-for-pythonist)

- 2022, 한국 데이터엔지니어 모임 - [테라폼 스터디](https://github.com/wjrmffldrhrl/Terraform-Study-1st)

  

### 교육.

  

- 2023, KDT 구름 쿠버네티스 교육과정 12회차 수료

- 2024, 고려사이버대학교 졸업

  
### 스킬.

- Backend & DB: Python, FastAPI, Flask

- Deployment & Cloud : Gitlab, AWS(SQS, S3, ECR, ECS, Lambda), Docker, Github Actions

- ETC : Linux, Slack, Discord, Telegram, Jira, Confluence, Godot


--- 
## 🥨 <a id="TMI">TMI</a>


<div class="center-image"> 
<iframe width="560" height="315" src="https://www.youtube.com/embed/xGytDsqkQY8?si=Ee0YeFatrr9yNWBo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> </div>

- 태권도  파란띠
- 카트라이더 클럽장 (정모/굿즈 제작)
- <a href="https://youtu.be/UdCSACeNlZU">NFT 코스프레 대회 1등</a>
- 최고 NFT 수익 0.1ETH -> 2.7ETH
- 유창한 영어실력
- `System.out.println("Hello World")` 보다는 `print("Hello World")`를 좋아합니다.. `console.log("Hello World")` 도 좋아합니다 근데  `fmt.Println("hello world")`는 합의를 봐야 할 것 같습니다.  알면 알수록 재밌는건 역시 echo 같지만요