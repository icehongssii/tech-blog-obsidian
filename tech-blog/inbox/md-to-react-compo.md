---
title: md-to-react-compo
created: 2024-02-03 16:51
last-updated: 2024-02-03 16:51
tags:
  - blog
  - temp
---

## 👯‍♂️ intro & tl;dr1



--- 

## 👯‍♂️ Main

- 마크다운 - 리액트 컴포넌트로 변환 시키기 
	- 이거 바꾸는 과정은 파이썬으로 해도 되는데 js로 함  -> 근데 굳이 리액트로 변환과정 사용하는 이유는!? 특별한 이유는 없다!! 
- 마크다운 - 리액트 컴포넌트로 변환 시키는 어플리케이션 자체는 js로 작성함 그리고 
	- md-react 라이브러리 통해서 HTML로 변환되고
	- 1. Markdown 형식의 텍스트 (`"# Example Markdown Title\n\nSome content here"`)가 `marked` 라이브러리를 통해 HTML로 변환됩니다.
2. 변환된 HTML은 React의 `createElement` 함수를 사용하여 React 컴포넌트로 만들어집니다.
3. `ReactDOMServer.renderToString` 함수를 사용하여 이 React 컴포넌트를 문자열 형태의 HTML 마크업으로 변환합니다.
4. 이 HTML 마크업은 AWS S3의 지정된 버킷 (`icehongssii-blogs`)에 지정된 파일 이름 (`your-file-name.html`)으로 업로드됩니다.


### 👯‍♂️ Lambda without Apigateway?



## 👯‍♂️ Conclustion

Summarize the main points and conclude your post.

--- 

## 👯‍♂️ Ref

- [^1]:  작성자. "제목," 사이트명, 발행날짜, [URL](www.naver.com)

