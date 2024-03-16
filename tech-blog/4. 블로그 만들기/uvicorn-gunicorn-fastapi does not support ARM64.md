---
title: uvicorn-gunicorn-fastapi does not support ARM64
created: 2024-03-12 20:11
last-updated: 2024-03-12 20:11
tags:
  - python
  - docker
  - troubleshooting
---

## 👯‍♂️ [uvicorn-gunicorn-fastapi](https://github.com/tiangolo/uvicorn-gunicorn-fastapi-docker)가 ARM64 support를 하지 않는다

즉 내 로컬(맥북 m1) 에서는 아래 이미지 빌드가 되지않는다

해당 이미지가 사용 중인 호스트 시스템의 아키텍처(`linux/arm64/v8`)와 요청한 이미지의 아키텍처(`linux/amd64`)가 일치하지 않음을 나타냅니다. 
이는 일반적으로 ARM 기반 시스템(예: Apple M1/M2 칩이 장착된 Mac, 일부 ARM 기반 Linux 서버)에서 AMD64(혹은 x86_64) 아키텍처용으로 빌드된 Docker 이미지를 실행하려고 할 때 발생합니다.


```dockerfile
# Use the base image with Python 3.10
FROM tiangolo/uvicorn-gunicorn:python3.10-slim

# Set the maintainer label
LABEL maintainer="Sebastian Ramirez <tiangolo@gmail.com>"

# Set the working directory to /app
WORKDIR /app

# Copy the Poetry configuration files
COPY pyproject.toml poetry.lock* /app/

# Install Poetry
RUN pip install --no-cache-dir poetry

# Disable the creation of virtual environments by Poetry
# and install the dependencies globally
RUN poetry config virtualenvs.create false \
  && poetry install --no-interaction --no-ansi

# Copy the main application to the container
COPY ./api /app
```

```sh
docker build -t myapp .
docker run -d --name myapp-container -p 8000:8000 myapp
```

```
WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested
```


작성자 @tiangolo가 
이 메시지는 멀티 아키텍처를 지원하는 공식 Docker 이미지(예: 공식 Python 이미지)를 사용하여 Docker 이미지를 기반으로 하는 이유와 관련된 문제를 설명하고 있습니다. 그러나 Docker Hub 자동 빌드나 Travis CI는 ARM 아키텍처로 컴파일할 수 없다는 문제점을 지적합니다.

이 메시지의 작성자는 라즈베리 파이와 같은 ARM 아키텍처에서 직접 이미지를 컴파일할 수 있으나, 이는 이상적이지 않다고 언급합니다.



--- 

## 👯‍♂️ Solution

```
docker buildx build --platform linux/amd64,linux/arm64/v8 -t icehongssi/uvicorn-gunicorn-fastapi-arm:latest  --push .


docker buildx create --name mybuilder --use


docker pull icehongssi/uvicorn-gunicorn-fastapi-arm:latest

docker run  --name myfastapi -p 8000:80 icehongssi/uvicorn-gunicorn-fastapi-arm:latest

```

## 👯‍♂️ Conclustion

Summarize the main points and conclude your post.

--- 

## 👯‍♂️ Ref & LINKS TO THIS PAGE

-  https://github.com/tiangolo/uvicorn-gunicorn-fastapi-docker/issues/5




[https://medium.com/@artur.klauser/building-multi-architecture-docker-images-with-buildx-27d80f7e2408](https://medium.com/@artur.klauser/building-multi-architecture-docker-images-with-buildx-27d80f7e2408)  


[https://collabnix.com/building-arm-based-docker-images-on-docker-desktop-made-possible-using-buildx/](https://collabnix.com/building-arm-based-docker-images-on-docker-desktop-made-possible-using-buildx/)