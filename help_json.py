#!/usr/bin/env python

s = '''
a
a
a
'''

import sys
import pyperclip
s = pyperclip.paste()

while -1 != s.find("  "):
    s = s.replace("  "," ")

out = '''    {
        "name":"",
        "attr":[
'''

for line in s.splitlines():
    out = out + '            "'+line+'",'+"\r\n"

out = out + '''        ]
    },'''



print(out)
pyperclip.copy(out)