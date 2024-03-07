```
<%*  
const dv = app.plugins.plugins["dataview"].api;  
const filename = tp.file.title 
const newname = "/posts/html/"+filename+".md"
console.log(newname);
const originalFileContent = await tp.file.content;
const dataviewRegex = /```dataview\n([\s\S]*?)```/gm;
let match;
let newFileContent = originalFileContent;
while ((match = dataviewRegex.exec(originalFileContent)) !== null) { const query = match[1].trim();
console.log(query)
const queryOutput = await dv.queryMarkdown(query);
newFileContent = newFileContent.replace(match[0], queryOutput.value);
}
const tFile = tp.file.find_tfile(newname);  
//const queryOutput = await dv.queryMarkdown(query);
await app.vault.modify(tFile, newFileContent);
//await app.vault.modify(tFile, queryOutput.value);  
%>
```


