```
<%*  
const dv = app.plugins.plugins["dataview"].api;  
const filename = tp.file.title 
const newname = "/posts/html"
const query = `TABLE qualifications, skills
FROM "posts/회사리스트"`;
console.log(filename)
const tFile = tp.file.find_tfile(filename);  
const queryOutput = await dv.queryMarkdown(query);

// write query output to file  
await app.vault.modify(tFile, queryOutput.value);  
%>
```