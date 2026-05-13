import os, re

files = ['index.html', 'about us.html', 'Residential.html', 'Office Parks.html', 'Hospitality.html', 'Retail FB.html', 'Data Centres.html', 'International Projects.html']
nav_links = [
    ('about us.html', 'About'),
    ('Residential.html', 'Residential'),
    ('Office Parks.html', 'Office Parks'),
    ('Hospitality.html', 'Hospitality'),
    ('Retail FB.html', 'Retail & Mall'),
    ('Data Centres.html', 'Data Centre'),
    ('International Projects.html', 'International Projects')
]

for filename in files:
    filepath = os.path.join(r'c:\Users\admin\Desktop\Ankur Group_', filename)
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Navigation Links
    nav_pattern = re.compile(r'(<nav class="nav-links">)(.*?)(</nav>)', re.DOTALL)
    
    def nav_replacer(match):
        start = match.group(1)
        end = match.group(3)
        new_nav = '\n'
        for href, text in nav_links:
            active = ''
            if href == filename and filename != 'index.html':
                active = ' class="active"'
            new_nav += f'            <a href="{href}"{active}>{text}</a>\n'
        new_nav += '        '
        return start + new_nav + end
        
    content = nav_pattern.sub(nav_replacer, content)

    # 2. Update Accordion Links
    content = re.sub(r'<h4>Residential</h4>.*?<a href="[^"]*" class="btn btn-outline">Explore</a>', lambda m: m.group(0).replace(re.search(r'href="[^"]*"', m.group(0)).group(0), 'href="Residential.html"'), content, flags=re.DOTALL)
    content = re.sub(r'<h4>Office Parks</h4>.*?<a href="[^"]*" class="btn btn-outline">Explore</a>', lambda m: m.group(0).replace(re.search(r'href="[^"]*"', m.group(0)).group(0), 'href="Office Parks.html"'), content, flags=re.DOTALL)
    content = re.sub(r'<h4>Hospitality</h4>.*?<a href="[^"]*" class="btn btn-outline">Explore</a>', lambda m: m.group(0).replace(re.search(r'href="[^"]*"', m.group(0)).group(0), 'href="Hospitality.html"'), content, flags=re.DOTALL)
    content = re.sub(r'<h4>Retail & Mall</h4>.*?<a href="[^"]*" class="btn btn-outline">Explore</a>', lambda m: m.group(0).replace(re.search(r'href="[^"]*"', m.group(0)).group(0), 'href="Retail FB.html"'), content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
print('Done!')
