# Shiori

I was looking for a lightweight bookmark manager tool. Stumbled across [Shiori](https://github.com/go-shiori/shiori). The intent was to move my bookmarks over and add a bit more context to them. At first I was going to use AI to generate tags (and still may), but I figured since the extract is searchable, that's a better place to enter data. The below outlines the process from using my exported `bookmarks.html` file from Firefox, parsing it, sending the website's contents to a local LLM to summarize, and feeding back into the db. FYI I run the server in portable mode on Windows with `.\shiori.exe serve --portable`

> [!tip]
> Setup the software with the settings you want (metadata, archive, etc.) before you do the below.

![](_assets/cover.png)

> [!danger]
> I used AI to write all the below. It may break/not work for you/etc. Always review and understand code before running. **Run at your own risk**.

## Bookmark to CLI

I ran the [CLI call](https://github.com/go-shiori/shiori/blob/master/docs/CLI.md) `.\shiori add https://example.com` (because PowerShell) to create the entries based on the extracted data. V1 is just the bookmark, V2 creates bookmarks and tags based on the folder name. The below just outputs to the terminal, and I copy/paste into another terminal to add them.

I also used this to create a CSV with just the URLs in it, with the header `url`. I called the file `website-list.csv`.

### V1

```python
import re
import os

def clear_console():
    os.system('cls')  # for Windows

clear_console()

# Get the current working directory
cwd = os.getcwd()

# Change the CWD to the location of this script
script_dir = os.path.dirname(os.path.realpath(__file__))
os.chdir(script_dir)

# Open and read the file
with open("bookmarks.html", "r") as file:
    content = file.read()

pattern = r'<H3.*?>(.*?)</H3>'
matches = re.findall(pattern, content)
formatted_folders = ["{}".format(match) for match in matches]
print("Bookmark folders\n")
print("\n".join(formatted_folders))

links = re.findall('<A HREF="([^"]*)"', content)
formatted_links = [".\shiori add {}".format(link) for link in links]
print("\n\nFormatting to make CLI calls\n")
print("\n".join(formatted_links))

formatted_links = ["{}".format(link) for link in links]
print("\n\nFormatting to make CSVs\n")
print("\n".join(formatted_links))
```

### V2

```python
import re
import os
from pathlib import Path
def clear_console():
    os.system('cls')  # for Windows


clear_console()

# Get the current working directory
cwd = os.getcwd()

# Change the CWD to the location of this script
script_dir = os.path.dirname(os.path.realpath(__file__))
os.chdir(script_dir)

def parse_bookmarks_file(filename):
    """
    Parses a bookmarks.html file and extracts URL, title, and tags information.

    Args:
        filename (str): The path to the bookmarks.html file.

    Returns:
        list: A list of dictionaries, where each dictionary represents a bookmark with keys
              'url', 'title', and 'tags'.
    """

    bookmarks = []
    current_folder = []  # Keep track of current folder hierarchy
    with open(filename, 'r') as f:
        lines = f.readlines()

    # Regular expression patterns to match different parts of the HTML data
    url_pattern = re.compile(r'HREF="(.*?)"')
    title_pattern = re.compile(r'>([^<]*)<')
    # Updated pattern for folders
    folder_pattern = re.compile(r'<H3.*?>(.*?)</H3>')

    for line in lines:
        folder_match = folder_pattern.search(line)
        if folder_match:
            # Reset folder hierarchy for each new folder
            current_folder = [folder_match.group(1)]

        url_match = url_pattern.search(line)
        title_match = title_pattern.search(line)

        if url_match:
            url = url_match.group(1)
            title = title_match.group(1) if title_match else None
            tags = current_folder  # Use current folder hierarchy as tags

            bookmarks.append({'url': url, 'title': title, 'tags': tags})

    return bookmarks


def generate_shiori_commands(bookmarks, tags_as_folders=False):
    """
    Generates Shiori add commands based on the extracted bookmark information.

    Args:
        bookmarks (list): A list of dictionaries representing bookmarks.
        tags_as_folders (bool, optional): Whether to treat tags as folders (default: False).

    Returns:
        list: A list of Shiori add commands as strings.
    """

    commands = []
    for bookmark in bookmarks:
        url = bookmark['url']
        title = bookmark['title'] or '(no title)'
        tags = ','.join(bookmark['tags'])

        if tags_as_folders:
            folder_path = '/'.join(tags) if tags else ''
            command = f".\\shiori add {url} -t {folder_path}"
        else:
            command = f".\\shiori add {url} -t {tags}"

        commands.append(command)

    return commands


# Replace 'bookmarks.html' with the actual path to your file
bookmarks = parse_bookmarks_file('bookmarks.html')
commands = generate_shiori_commands(bookmarks)

print("Generated Shiori commands:")
for command in commands:
    print(command)

```

## Summarize URLs

Took that CSV and fed it through Beautiful Soup then into [LM Studio](../AI/Chat.md) in server mode to create `websites-with-summaries.csv`. Since it's the standard OpenAI format you can use whatever you have access to and just update the `base_url` and other required fields below.

```python
import csv
import os
import requests
from bs4 import BeautifulSoup
from openai import OpenAI
import pandas as pd

def clear_console():
    os.system('cls')  # for Windows

clear_console()

# Get the current working directory
cwd = os.getcwd()

# Change the CWD to the location of this script
script_dir = os.path.dirname(os.path.realpath(__file__))
os.chdir(script_dir)

# Set your OpenAI secret key
client = OpenAI(base_url="http://localhost:8000/v1", api_key="not-needed")

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
}

def get_text(url):
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    text = soup.get_text()
    return text[:1000]   # Return first few hundred words

def summarize(text):
    response = client.chat.completions.create(
    model="local-model", # this field is currently unused
    messages=[
        {"role": "system", "content": "You are an expert website description summary tool."},
        {"role": "user", "content": f"Summarize this webpage to around 500 characters. Add keywords at the end to make it easier to search for in the future. Text to summarize: {text}"}
    ],
    temperature=0.7,
    )
    return response.choices[0].message.content

def main():
    # Read CSV file using pandas
    df = pd.read_csv('websites.csv')
    with open("websites_with_summaries.csv", "w", newline="") as csvfile:
        writer = csv.writer(csvfile)
        for index, url in enumerate(df['url']):   # Assuming CSV has one column named 'url'
            print(f"\nProcessing {index + 1}/{len(df)}:")
            
            try:
                text = get_text(url)
                summary = summarize(text)
                
                writer.writerow([url, summary])
                
                print(summary)
            except Exception as e:
                writer.writerow([url, f"Error processing {url}: {e}"])
                print(f"Error processing {url}: {e}")

if __name__ == "__main__":
    main()
```

## Extract into DB

I converted the CSV to XLSX (I don't get how Excel treats commas just fine within cells and CSVs struggle).

> [!warning]
> You're writing to your database! I recommend you write to a backup first, and see how it goes. You can always just browse the data with a tool like [DB Browser for SQLite](https://sqlitebrowser.org/).

```python
import openpyxl
import sqlite3
import os

def clear_console():
    os.system('cls')  # for Windows

clear_console()

# Get the current working directory
cwd = os.getcwd()

# Change the CWD to the location of this script
script_dir = os.path.dirname(os.path.realpath(__file__))
os.chdir(script_dir)

# Define source and destination files
excel_file = r"websites-with-summaries.xlsx"
database_file = r"shiori-data\shiori.db"

# Connect to database
conn = sqlite3.connect(database_file)
cur = conn.cursor()

# Open Excel workbook
wb = openpyxl.load_workbook(excel_file)

# Access specific sheet (optional)
sheet = wb["websites-with-summaries"]  # Change "Sheet1" to your desired sheet name

# Iterate through rows and update database
for row in sheet.iter_rows(min_row=2):  # Skip header row (start from row 2)
    url = row[0].value.strip()  # Access URL value from first cell
    excerpt = row[1].value.strip()  # Access excerpt value from second cell
    # Update excerpt in database
    sql = "UPDATE bookmark SET excerpt = ? WHERE url = ?"
    cur.execute(sql, (excerpt, url))

# Commit changes and close connection
conn.commit()
conn.close()

print("Excerpts updated successfully from Excel file!")

```

## Success

Now you should have a much richer library of bookmarks and metadata. You could expand (and heavily optimize) the above to apply to tags and who knows what else.