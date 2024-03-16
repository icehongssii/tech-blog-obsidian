---
title: 영상-gcd마인크래프트
created: 2024-02-08 23:34
last-updated: 2024-02-08 23:34
tags:
  - gameDev
  - gcp
  - cloud
---

## 👯‍♂️ intro & tl;dr


영상 목록

- [영상-유튜브, 팀테크, GCP 야생서버 구축하기1편 vm 배포, 202307](https://www.youtube.com/watch?v=oUYsbycuuc0&t=57s)
- [영상-유튜브, 팀테크, GCP 야생서버 구축하기2편 바닐라 서버, 202307](https://www.youtube.com/watch?v=aPMlYg_q-UA)
- [영상-유튜브, 팀테크, GCP 야생서버 구축하기3편 플러그인 야생 서버, 202307](https://www.youtube.com/watch?v=VXX8og1do9g)
- [영상-유튜브, 팀테크, GCP 야생서버 구축하기4편 VM CPU, MEM변경, 202307](https://www.youtube.com/watch?v=0QTA7qMoaic)
- [영상-유튜브, 팀테크, GCP 야생서버 구축하기5편 디스크, 202307](https://www.youtube.com/watch?v=b86lcKjUbuc)
- [영상-유튜브, 팀테크, GCP 야생서버 구축하기6편 데이터팩, 202307](https://www.youtube.com/watch?v=jAnrurA3e2M)
- [영상-유튜브, 팀테크, GCP 야생서버 구축하기7편 월드맵, 202308](https://www.youtube.com/watch?v=CQTOH9RqDC4)
- [영상-유튜브, 팀테크, GCP 야생서버 구축하기8편 모히스트, 202308](https://www.youtube.com/watch?v=HD-vw9vzEmk)
- [영상-유튜브, 팀테크, GCP 야생서버 구축하기9편 Folia1.20.1, 202308](https://www.youtube.com/watch?v=_HKFnzMx9WY)
- [영상-유튜브, 팀테크, GCP 야생서버 구축하기10편 PaperMC 1.20.1, 202308](https://www.youtube.com/watch?v=PY9-NXWEbqs&t=23s)
- [영상-유튜브, 팀테크, GCP 야생서버 구축하기11편 Vanilla 1.20.2, 202308](https://www.youtube.com/watch?v=EPxqOFFMMEc)
- [영상-유튜브, 팀테크, GCP 야생서버 구축하기12편 서버 도메인, 202310](https://www.youtube.com/watch?v=t8HCpLdRwfk)
- [영상-유튜브, 팀테크, GCP 야생서버 구축하기13편 MySQL 및 디비, 202311](https://www.youtube.com/watch?v=RoqgNzZPwxo&t=170s)
- [영상-유튜브, 팀테크, GCP 야생서버 구축하기14편 무정부서버(리프록시서버 리눅스2b2t), 202311](https://www.youtube.com/watch?v=bEpZXXetLzk&t=4s)
- [영상-유튜브, 팀테크, GCP 야생서버 구축하기15편 프록시+페이퍼서버(멀티서버), [202311](https://www.youtube.com/watch?v=njxKTySWaKQ)
- [영상-유튜브, 팀테크, GCP 야생서버 구축하기16편 1.20.3~1.20.4 바닐라 서버구축, 202311](https://www.youtube.com/watch?v=_KKuEcxk_5k)
- [영상-유튜브, 팀테크, GCP 야생서버 구축하기17편 리눅스 레디스, 202312](https://www.youtube.com/watch?v=nEpNlRiLBek&t=8s)
- [영상-유튜브, 팀테크, GCP 야생서버 구축하기18편 새서버데이터 옮기기, 202312](https://www.youtube.com/watch?v=9l-3EEMVLV0)

--- 



## 👯‍♂️ Main


### 👯‍♂️ GCP - VM 인스턴스 배포

- e2-standard-4(vCPU4, 코어2개, 메모리16GB), 부팅디스크 ubuntu(x86/64, amd64 jammy image built on 2024-02-08)22.04, 크기 30GB
- 방화벽 허용 -> HTTP 트래픽 허용, HTTPS 트래픽 허용, 부하 분산기 상태 점검 허용

- ID/비밀번호로 인스턴스 접속가능하게 설정
```
sudo passwd ubuntu
sudo nano /etc/ssh/sshd_config
들어가서
PasswordAuthentification yes
로 주석처리 변경
sudo systemctl resstart sshd
```
- VPC 
	- TCP 25565
	- UDP 25565

 그리고 클라이언트 컴퓨터(내 로컬컴퓨터에서 ) `ssh ubuntu@external_ip`로 여러번 접속시도했으나 실패 이때 뜨는 로그 확인(인스턴스 직렬콘솔 확인해보면)
```ad-error
title: ssh키 재생성, 근데 퍼블릭키없이 비밀번호 로그인인데 왜?
내 로컬 컴퓨터 know_hosts에는 `34.47.88.189 ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICbhI+Oj2v1rCQ2Cn7KZDv8RxJ6zsCiA6wkxg1iyzJg4` 라고 적혀있고 내 vm 인스턴스 직렬포트 로그에는 `Feb 13 09:04:44 minecraft-240214 google_guest_agent[478]: ERROR non_windows_accounts.go:217 invalid ssh key entry - expired key: crispylegs1921:ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBGm76lvbodkUSjC9IvhI/LjRt0Q9z0qe2lWCTl3JFaJedFRkAIeU5D6R2Fd12aMBQxyNA0kQWS8drSKLj3tTk54= google-ssh {"userName":"crispylegs1921@gmail.com","expireOn":"2024-02-13T08:23:15+0000"} Feb 13 09:04:44 minecraft-240214 google_guest_agent[478]: ERROR non_windows_accounts.go:217 invalid ssh key entry - expired key: crispylegs1921:ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAFglmiAeTIfZCSZYbujyJZZf2N5ZjUC2vmjYfXT1vcAHejBQUD9jakSroUL8Bj4cNVug2DheSgyJd4S7TDWpBL+Rdy2d8zNNNr2Cq7cWiehz4Ut27/x2wi2W14mBT6DEKK8YfJNcpOZrWpaKMLNw+V/2gkPVJFagcdzb6VXnRiUq3nWvxDAlalYlmxvjHO50LMr0KSrH19wgzSaeAaMaMoUzkxehVfVpJNA1NxE0Yz86SeBZHX34J9gcBWwWlf5gK8M9NYbDxeps4ssZJQt0kz5EyZVIgj7iCrJaIxK8yMQ0PBfNgxouo8m1RLmhuaK14XvVrIYhzyyMwH1+jAJ5WsM= google-ssh {"userName":"crispylegs1921@gmail.com","expireOn":"2024-02-13T08:23:30+0000"} F

```

클라이언트에서 아래 실행하고
```
`ssh-keygen -t rsa -b 2048 -C crispylegs1921@gmail.com
```
이때 생성된 공개키를(id_rsa.pub) 인스턴스 ssh키에 넣어주고
ssh -i id_rsa crispylegs192@external_ip로 로그인하면 성공


## 👯‍♂️ Conclustion

Summarize the main points and conclude your post.

--- 

## 👯‍♂️ Ref

- [^1]:  작성자. "제목," 사이트명, 발행날짜, [URL](www.naver.com)

