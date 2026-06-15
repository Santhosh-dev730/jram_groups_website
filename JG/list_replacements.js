const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logs = [
    'C:\\Users\\Santhosh\\.gemini\\antigravity-ide\\brain\\ac92b3ed-63d2-4e33-8def-26e5a25df41c\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\Santhosh\\.gemini\\antigravity-ide\\brain\\60845431-b6b4-4df8-98ba-636dfeec345d\\.system_generated\\logs\\transcript.jsonl'
];

async function main() {
    let index = 0;
    for (const logPath of logs) {
        if (!fs.existsSync(logPath)) continue;
        
        const fileStream = fs.createReadStream(logPath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        for await (const line of rl) {
            try {
                const data = JSON.parse(line);
                if (data.tool_calls) {
                    for (let tc of data.tool_calls) {
                        if (tc.name === 'replace_file_content' || tc.name === 'multi_replace_file_content') {
                            let targetFile = tc.args.TargetFile || tc.args.targetFile || '';
                            if (typeof targetFile === 'string') {
                                targetFile = targetFile.replace(/^"|"$/g, '');
                            }
                            if (targetFile.endsWith('index.html')) {
                                console.log(`[${index++}] Log: ${path.basename(logPath)}, Step: ${data.step_index}, Tool: ${tc.name}`);
                                if (tc.name === 'multi_replace_file_content') {
                                    let chunks = tc.args.ReplacementChunks || tc.args.replacementChunks;
                                    if (typeof chunks === 'string') chunks = JSON.parse(chunks);
                                    if (Array.isArray(chunks)) {
                                        for (let c of chunks) {
                                            const target = c.TargetContent || c.targetContent || '';
                                            console.log(`  CHUNK target (len ${target.length}): ${JSON.stringify(target.substring(0, 100))}`);
                                        }
                                    }
                                } else {
                                    const target = tc.args.TargetContent || tc.args.targetContent || '';
                                    console.log(`  SINGLE target (len ${target.length}): ${JSON.stringify(target.substring(0, 100))}`);
                                }
                            }
                        }
                    }
                }
            } catch (e) {}
        }
    }
}

main();
