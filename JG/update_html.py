import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's just find the fold-marquee divs inside the fold-content by matching the EXACT content that was previously there.
# Since it's exactly the same in all three places, we can just replace the 4 marquees.

old_marquee = '''<div class="fold-marquee">
                                <div class="fold-track">
                                    Create beyond Limits. Create beyond Limits. <span class="fold-focus">Create beyond
                                        Limits.</span> Create beyond Limits. Create beyond Limits. Create beyond Limits.
                                    Create beyond Limits. <span class="fold-focus">Create beyond Limits.</span> Create
                                    beyond Limits.
                                </div>
                            </div>'''

# Clean up whitespace differences by using regex to match the pattern
pattern = r'<div class="fold-marquee">\s*<div class="fold-track">\s*Create beyond Limits\.\s*Create beyond Limits\.\s*<span class="fold-focus">Create beyond\s*Limits\.<\/span>\s*Create beyond Limits\.\s*Create beyond Limits\.\s*Create beyond Limits\.\s*Create beyond Limits\.\s*<span class="fold-focus">Create beyond Limits\.<\/span>\s*Create\s*beyond Limits\.\s*<\/div>\s*<\/div>'

row1 = '''                            <div class="fold-marquee">
                                <div class="fold-track">
                                    <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits.
                                </div>
                            </div>'''
row2 = '''\n                            <div class="fold-marquee">
                                <div class="fold-track">
                                    Create <span class="fold-focus">beyond</span> Limits. Create <span class="fold-focus">beyond</span> Limits. Create <span class="fold-focus">beyond</span> Limits. Create <span class="fold-focus">beyond</span> Limits. Create <span class="fold-focus">beyond</span> Limits. Create <span class="fold-focus">beyond</span> Limits.
                                </div>
                            </div>'''
row3 = '''\n                            <div class="fold-marquee">
                                <div class="fold-track">
                                    Create beyond <span class="fold-focus">Limits.</span> Create beyond <span class="fold-focus">Limits.</span> Create beyond <span class="fold-focus">Limits.</span> Create beyond <span class="fold-focus">Limits.</span> Create beyond <span class="fold-focus">Limits.</span> Create beyond <span class="fold-focus">Limits.</span>
                                </div>
                            </div>'''
row4 = '''\n                            <div class="fold-marquee">
                                <div class="fold-track">
                                    <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits. <span class="fold-focus">Create</span> beyond Limits.
                                </div>
                            </div>'''

new_content = row1 + row2 + row3 + row4

# We have 4 identical old_marquees inside each fold-content, repeated 3 times = 12 total old_marquees.
# But we want to replace each block of 4 old_marquees with 1 block of new_content!

# Wait, if we replace 4 old marquees with 4 new marquees, we can just find the block of 4!
full_pattern = pattern + r'\s*' + pattern + r'\s*' + pattern + r'\s*' + pattern

html = re.sub(full_pattern, new_content, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as fw:
    fw.write(html)
print('Replaced successfully')
