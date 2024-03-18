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


- 마크다운 - 리액트 컴포넌트로 변환 시키는 어플리케이션 자체는 js로 작성함 
	- md-react 라이브러리 통해서  md -> HTML -> react 컴포넌트 -> 다시 HTML로 변환 [^1]:  
- 여튼 변환된 HTML은 s3에 저장됨
- 근데 궁금한건 람다 함수가 s3에 쓰기 권한이 있는가?
	- 최소한의 IAM policy 생성(s3 getObj, putObj)해서 내 람다함수에 입혀줌
- 근데 내가  사용한 코드에 awd-sdk 라이브러리가 없어서 이거를 람다함수에 넣어줘야하는데?

```ad-error
title: **Not Included in Deployment Package:** 

If you are deploying your Lambda function as a package, ensure that `aws-sdk` and all other dependencies are included in the package. Lambda does not automatically include external packages unless they are part of the standard runtime environment.
```





- [ ] lambda 함수 생성
	- https://github.com/icehongssii12345/tech-blog/tree/main/tech-blog/posts 에 푸쉬 일어날때마다 이 안에 있는 마크다운 파일이 html으로 변환되어 
	-  https://icehongssii-blogs.s3.ap-northeast-2.amazonaws.com/ 아래에 저장됨
- [ ] 웹훅 
	- apigateway와 lambda function URL과 뭔차이지? 
	- 일단 webhook에 lambda function url 넣었음

- 어떻게 블로그 운영?
	- 리액트앱은 s3에 배포될것임
		- 블로그 포스팅 전부 s3
		- icehongssii-blog/blogs/html-converted
		- icehongssii-blog/portfolio


아.. 도저히 서버 관리는 하기 싫기때문에 정적인 웹사이트로간다!
누가 내 블로그를 그만큼 자주 오겠는가? 깔깔!!
누가 내 레포를 그만큼 자주 보겠는가? 깔깔!! 

그냥 내 블로그 클릭할때마다 깃허브 마크다운 ->  html 변환하는 react로 간다 

- [ ] 블로그 리스트 부터 구현 
	- [x] responsive 헤더 구현 ✅ 2024-02-05
	- [ ] s3 obj에서 리스트 가져오기, 이때 aws config는 어떻게 관리해야하는거지?;;  이 리액트앱을 통해서만 클릭할때 s3 obj가져오게 하고 시픈데.. 
	- [ ] 글씨체 변경하기
	- [ ] 이거를 눌렀을 때 이 안에 있는 내용들을 마크다운으로 변환시키는 코드 작성해줘

- 먼저 리스트 보여주기 
- 리스트를 눌럿을때 해당 파일을 마크다운으로 바꾸기
- css 적용하기 (그전꺼 보면서)
- 포트포리오 만들기
	- 레이아웃 responsive 스타일로 만들기 
	- 테두리는 삐뚤삐둘하게 만들자

### 👯‍♂️ Lambda without Apigateway?



## 👯‍♂️ Conclustion

Summarize the main points and conclude your post.

--- 

## 👯‍♂️ Ref

- [^1]: 불필요한 과정처럼 보이는데 이유가 있음 
	- The process of converting HTML to a React component and then back to HTML might seem redundant, but it serves specific purposes, especially in the context of server-side rendering (SSR) and dynamic content generation:
		 1. **Dynamic Content Handling:** Initially, you might have static HTML or Markdown content. Converting this to a React component allows you to dynamically manipulate, enhance, or embed additional interactive features into the content, which is not possible with static HTML alone.
		 2. **Server-Side Rendering:** After enhancing or manipulating the content with React, converting it back to HTML is a part of SSR. This step is crucial for SEO and for sending a fully rendered page to the client, which can improve the page's load time and be displayed even if JavaScript is disabled on the client's browser.
		 3. **React Ecosystem Benefits:** Using React for this process allows you to leverage the vast ecosystem of React, including various tools and libraries for UI components, state management, and more, which might not be as conveniently accessible or manageable with static HTML.
	 - In summary, this approach combines the benefits of dynamic content manipulation (using React) with the advantages of server-side rendering (producing final HTML), offering a balance between interactivity, SEO, and performance.  
1

