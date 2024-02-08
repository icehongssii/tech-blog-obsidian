---
title: 무제 파일 1
created: 2024-02-08 16:43
last-updated: 2024-02-08 16:43
tags:
  - aws
  - cloud
  - gameDev
---
https://blog.hayeon.dev/posts/mcman/  
갠차는 블로그 https://blog.naver.com/jjingha0407  
비슷한 프로젝트  
https://github.com/doppiolab/mcman

https://blog.hayeon.dev/posts/mcman/  
나도 블로그 이렇게 만들래

https://blog.hayeon.dev/posts/background-toy/  
얘도 귀엽다 혹은  
runner같은거 만들어도 좋을듯 
## 👯‍♂️ intro & tl;dr

Brief introduction about the topic or what the post will cover.

- [👯‍♂️ intro & tl;dr](#%F0%9F%91%AF%E2%80%8D%E2%99%82%EF%B8%8F%20%08intro%20&%20tl;dr)
- [👯‍♂️ aws+마인크래프트 바닐라서버](#%F0%9F%91%AF%E2%80%8D%E2%99%82%EF%B8%8F%20aws+%EB%A7%88%EC%9D%B8%ED%81%AC%EB%9E%98%ED%94%84%ED%8A%B8%20%EB%B0%94%EB%8B%90%EB%9D%BC%EC%84%9C%EB%B2%84)
	- [👯‍♂️ ec2배포](#%F0%9F%91%AF%E2%80%8D%E2%99%82%EF%B8%8F%20%08ec2%EB%B0%B0%ED%8F%AC)
- [👯‍♂️ Conclustion](#%F0%9F%91%AF%E2%80%8D%E2%99%82%EF%B8%8F%20Conclustion)
- [👯‍♂️ Ref](#%F0%9F%91%AF%E2%80%8D%E2%99%82%EF%B8%8F%20Ref)

[영상-테크팀-AWS에 마크서버배포-20230419](https://www.youtube.com/watch?v=LBj14CoFwyQ)

--- 

## 👯‍♂️ aws+마인크래프트 바닐라서버

```ad-important
title: 마인크래프트 서버런쳐 스펙
- 마크버전 1.20.4
- 패브릭 로더 버전 0.15.6
- 인스톨러 버전 1.0.0
```

### 👯‍♂️ aws 비용계산(240208기준)

- [aws pricing calculator](https://calculator.aws/#/createCalculator/ec2-enhancement?nc2=pr)

| ap-northeast-2a 달에 대략 44.79 USD |
| ---- |
| ec2<br>- 4GB(t4g.nano, 온디맨드) |
| EBS 블록스토리지 크기<br>(Storage amount)<br>- 20GB |
| 데이터 전송<br>인스턴스 밖으로 데이터 빼낼 때 사용되는 것도 비용부과됨<br>(Data transfer)<br>-outbound data tranfer Internet 100GB |

만약에 메모리크기 8GB 정도로 늘리면 68.08 USD 예상

### 👯‍♂️ 기본VPC 생성 및 보안그룹

- default vpc 생성
- 인바운드 규칙; 들어오는 패킷에 대한 규칙
- 기본적으로 모든 트래픽이 왔다 갔다 할 수록 만들어져있는데 가상VM하나만 사용할것이므로 zero-trust 기존 삭제 후 아래 규칙 추가
	- 사용자지정 TCP, 25565, Anywhere IPv4
	- 사용자지정 UDP, 25565, Anywhere IPv4
	- 사용자지정 TCP, 22, Anywhere IPv4
	- 사용자지정 TCP, 443 , Anywhere IPv4

### 👯‍♂️ EC2 배포

- ubuntu 22.04, ARM 64bit, t5g.nano
- 마인크래프트 메모리가 굉장히 중요한 게임이라서 바닐라라면 최소 4GB, 동접자 수에 따라 더 늘어날 수도 있다
- pem키 생성(minecraft)
- 네트워크 설정은 아까 만들었던 디폴트 VPC + 기존 보안그룹
- 스토리지 구성은(=디스크 할당) 약 20GB 설정 이중에 10GB 마인크래프트 나머지는 OS. 이정도면 충분


### 👯‍♂️ EC2 서버 접속 및 파일 전송

- 아까 생성한 pem키 권한변경해주고 
	- 400권한만 줌 (owner)한테만 읽기권한 주는것 부여 기본적으로 rw,r,r인데 읽기 권한만 주는걸로 수정해줌 그렇지 않으면 permission deny뜨기 떄문
- 인스턴스 public ip 확인하고

```sh 
ssh -i mincraft.pem ubuntu@3.38.200.233
```
	-


### 👯‍♂️ EC2 모드서버(패브릭) 서버 설치

디렉토리 생성
```
/home/ubuntu/minecraft
```

```
bash <(curl -s https://raw.githubusercontent.com/KorTechTim/dedicatedserver/main/MineCraft/Minecraft_Linux_Fabric_Ver_1.0.0.0.sh)
```



- [모드 사이트에서 버전 확인](https://fabricmc.net/use/server/) 후에 cli에서 입력

```ad-important
title: 마인크래프트 서버런쳐 스펙
- 마크버전 1.20.4
- 패브릭 로더 버전 0.15.6
- 인스톨러 버전 1.0.0
```


```ad-error
title: 스크립트 
현재 MOJANG Server 자체적으로 문제가 있습니다. MOJANG Jar Server와 통신이 원활하지 않습니다.
이 메시지르 보시 경우 스크립트를 다시 실행 하세요 기존 설치 파일은 자동 삭제 합니다
6~7번 정도 실행하면 정상적인 서버와 연결되어 설치 됩니다. 서버가 정상화 되기 전까지 당분간 이렇게 진행해야 합니다
```


그래서 스크립트 오류 나는 부분이 있어서 내가 직접 설치함

https://github.com/KorTechTim/dedicatedserver/blob/main/MineCraft/Minecraft_Linux_Fabric_Ver_1.0.0.0.sh



- step1 패키지 다운로드
```
cd ~/minecraft
sudo apt update -y
sudo apt install screen openjdk-18-jdk -y
```

- step2 서버런쳐 다운로드 및 실행  
https://fabricmc.net/use/server/ 여기에서 직접 하면 되는데 마크버전1.20.4, 패브릭로더0.15.6, 인스톨러버전1.0.0 기준 

```
curl -OJ https://meta.fabricmc.net/v2/versions/loader/1.20.4/0.15.6/1.0.0/server/jar

java -jar fabric-server-mc.1.20.4-loader.0.15.6-launcher.1.0.0.jar nogui
```
- step3 EULA

```
cat <<-EOF > ~/minecraft/eula.txt
eula=true
EOF
```

- step4 방화벽 설정
```

sudo iptables -I INPUT -p udp --dport 25565 -j ACCEPT

  sudo iptables -I INPUT -p tcp --dport 25565 -j ACCEPT
  sudo apt-get install netfilter-persistent
  sudo netfilter-persistent save
```

- step 5 패브릭 api jar파일 다운로드 후에 인스턴스로 전송 
```
// 인스턴스에서 해당 경로 권한 변경
chmod o+w /minecraft

// 전송 
scp -i minecraft.pem fabric-api-0.95.4+1.20.4.jar ubuntu@3.38.200.233:/home/ubuntu/minecraft

// 실행
java -Xms2G -Xmx2G -jar fabric-server-mc.1.20.4-loader.0.15.6-launcher.1.0.0.jar nogui
```

 ./fabric-server-mc.${MinecraftVersion}-loader.${FabricVersion}-launcher.${InstallerVersion}.jar nogui

-Xma 최소메모리, -Xmx 최대 메모리 7GB로





- 포지서버와 다르게 패브릭 API 추가로 다운로드 필요한데 이때 버너 1.20.4 릴리즈 버전 다운로드 https://www.curseforge.com/minecraft/mc-mods/fabric-api/files/5072340 포지모드와 가장 큰 차이이다
- 이 jar파일을 `/home/ubuntu/minecraft/mods` 에 업로드

## 👯‍♂️ Conclustion

Summarize the main points and conclude your post.

--- 

## 👯‍♂️ Ref

- [^1]:  작성자. "제목," 사이트명, 발행날짜, [URL](www.naver.com)

