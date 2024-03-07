// Obsidian Templater Script for dynamically copying Dataview query results into a new Markdown file

// Function to execute a given Dataview query and convert results into Markdown format
async function convertDataviewToMarkdown(query, app) {
    const dataview = app.plugins.plugins.dataview.api; // Get Dataview API
    let markdownResult = '## Query Results\n\n';

    try {
        // Execute the query and get results
        const result = dataview.page(query);
        // Check the type of results
        if (Array.isArray(result)) {
            // If the result is an array, handle it as a list of pages
            for (const page of result) {
                markdownResult += `### ${page.file.basename}\n`;
                for (const field in page) {
                    markdownResult += `**${field}**: ${page[field]}\n`;
                }
                markdownResult += '\n';
            }
        } else {
            // Handle other types of results (e.g., objects) here, if necessary
            markdownResult += 'Result is not in expected format\n';
        }
    } catch (error) {
        markdownResult += `Error executing query: ${error.message}\n`;
    }
    
    // Return the formatted markdown string
    return markdownResult;
}

// Main function to create a new Markdown file with Dataview results
async function createMarkdownFromDataview(tp, app) {
    // Retrieve the query from Templater user input
    const userQuery = tp.user.query; // This should match the variable name in your template
    const markdownContent = await convertDataviewToMarkdown(userQuery, app);
    
    // Define the new file path and name
    const newPath = `/YourFolderPath/newFileName.md`; // Customize your file path and name
    
    // Create the new file with the Dataview query results in Markdown format
    await app.vault.create(newPath, markdownContent);
    
    return `New file created: [[${newPath}]]`; // Return a link to the new file for easy navigation
}

// Run the main function to create the Markdown file
createMarkdownFromDataview(tp, app);
