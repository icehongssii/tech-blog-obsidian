```
<%*  
const dv = app.plugins.plugins["dataview"].api;  
const filename = tp.file.title 
const newname = "/2. posts/html/"+filename

const originalFileContent = await tp.file.content;
let newFileContent = originalFileContent;

// 데이타뷰에있는것들
const dataviewRegex = /```dataview\n([\s\S]*?)```/gm;
let match;

// 마크다운으로 변경 
while ((match = dataviewRegex.exec(originalFileContent)) !== null) 
		{     const query = match[1].trim();
			  const queryOutput = await dv.queryMarkdown(query);
			   newFileContent = newFileContent.
			                    replace(match[0], queryOutput.value);
		}

//파일 이미 존재시 수정하고 
try{
				const tFile = tp.file.find_tfile(newname);  
				await app.vault.modify(tFile, newFileContent);
} catch (e){
// 정확히 무슨 에러인지 몰라서 공란으로 둠 
// 없으면 새로 생성
				await tp.file.create_new(newFileContent, newname) 
}

%>
```