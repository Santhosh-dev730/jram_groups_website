const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const row1 = `
                            <div class="fold-marquee">
                                <div class="fold-track">
                                    <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits.
                                </div>
                            </div>`;
const row2 = `
                            <div class="fold-marquee">
                                <div class="fold-track">
                                    Create <span class="fold-focus">beyond</span> Limits. Create <span class="fold-focus">beyond</span> Limits. Create <span class="fold-focus">beyond</span> Limits. Create <span class="fold-focus">beyond</span> Limits. Create <span class="fold-focus">beyond</span> Limits. Create <span class="fold-focus">beyond</span> Limits.
                                </div>
                            </div>`;
const row3 = `
                            <div class="fold-marquee">
                                <div class="fold-track">
                                    Create beyond <span class="fold-focus">Limits.</span> Create beyond <span class="fold-focus">Limits.</span> Create beyond <span class="fold-focus">Limits.</span> Create beyond <span class="fold-focus">Limits.</span> Create beyond <span class="fold-focus">Limits.</span> Create beyond <span class="fold-focus">Limits.</span>
                                </div>
                            </div>`;
const row4 = `
                            <div class="fold-marquee">
                                <div class="fold-track">
                                    <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits.
                                </div>
                            </div>`;

const newContent = `${row1}${row2}${row3}${row4}\n                        `;

// Replace contents of all three `.fold-content` div elements securely
// Find the index of <div class="fold-content"
let searchIndex = 0;
while (true) {
    let startIdx = html.indexOf('<div class="fold-content"', searchIndex);
    if (startIdx === -1) break;
    let endOfStartTag = html.indexOf('>', startIdx) + 1;
    
    // Find the matching closing </div>
    // Since there are 4 inner fold-marquee divs, we can just search for the first </div> that closes fold-content
    // Actually, each fold-marquee has 2 closing divs. Total 8 inner closing divs.
    // Let's just find the exact string we know is at the end of fold-content.
    // We can use a regex that matches until `</div>\n                    </div>\n                </div>`
    
    // Instead, let's use a simple regex on the substring.
    let remainder = html.substring(endOfStartTag);
    // Find the sequence of closing tags for fold-content, fold-align, fold...
    let closeIdx = remainder.indexOf('</div>\\n                    </div>\\n                </div>');
    if (closeIdx === -1) {
       closeIdx = remainder.indexOf('</div>\\r\\n                    </div>\\r\\n                </div>');
    }
    if (closeIdx === -1) {
       // fallback: just find "</div>" followed by whitespace and "</div>"
       let match = remainder.match(/<\\/div>\\s*<\\/div>\\s*<\\/div>/);
       if (match) {
           closeIdx = match.index;
       }
    }
}
