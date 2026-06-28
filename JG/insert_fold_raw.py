import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Make sure we don't insert it twice!
if 'id="fold-effect"' in html:
    print("Already inserted")
    exit(0)

fold_html = """
<div class="screen " id="fold-effect">
	<div class="wrapper-3d">
		<div class="fold fold-top">
			<div class="fold-align">
				<div class="fold-content">
					<div class="marquee">
						<div class="track">
							<span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits.
						</div>
					</div>

					<div class="marquee">
						<div class="track">
							Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits.
						</div>
					</div>

					<div class="marquee">
						<div class="track">
							Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span>
						</div>
					</div>

					<div class="marquee">
						<div class="track">
							<span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits.
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="fold fold-center" id="center-fold">
			<div class="fold-align">
				<div class="fold-content" id="center-content">
					<div class="marquee">
						<div class="track">
							<span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits.
						</div>
					</div>

					<div class="marquee">
						<div class="track">
							Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits.
						</div>
					</div>

					<div class="marquee">
						<div class="track">
							Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span>
						</div>
					</div>

					<div class="marquee">
						<div class="track">
							<span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits.
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="fold fold-bottom">
			<div class="fold-align">
				<div class="fold-content">
					<div class="marquee">
						<div class="track">
							<span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits.
						</div>
					</div>

					<div class="marquee">
						<div class="track">
							Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits. Create <span class="-focus">beyond</span> Limits.
						</div>
					</div>

					<div class="marquee">
						<div class="track">
							Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span> Create beyond <span class="-focus">Limits.</span>
						</div>
					</div>

					<div class="marquee">
						<div class="track">
							<span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits. <span class="-focus">Create</span> beyond Limits.
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
"""

# Insert right before NEW SCALING SECTION
insert_marker = "<!-- NEW SCALING SECTION -->"
parts = html.split(insert_marker)

if len(parts) == 2:
    new_html = parts[0] + fold_html + "\n    " + insert_marker + parts[1]
    with open('index.html', 'w', encoding='utf-8') as fw:
        fw.write(new_html)
    print("Inserted successfully")
else:
    print("Marker not found")
