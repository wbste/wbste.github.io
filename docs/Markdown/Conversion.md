# Conversion

## Convert Word to Markdown

Navigate to the folder where the Word file is, and run this after changing the names:

`pandoc --extract-media=./_assets -s convert.docx  --wrap=none -t markdown -o convert.md`

After that, you can Find/Replace a regex of `\{(.+)\}` to remove the dimensions for images.

Finally run a Find/Replace for `./_assets/media/` to `./_assets/` to align the images (and move the images!) so they're in the same structure as current notes.

## Convert Markdown to...

Make sure you have the following installed:
- [Pandoc](https://pandoc.org/installing.html)
- [Node.js](https://nodejs.org/en/download/)
- [Mermaid Filter (for diagrams)](https://github.com/raghur/mermaid-filter)

You'll need to tweak the Mermaid Filter above to get it to look better. Go to `%APPDATA%\nvm\v16.13.2\node_modules\mermaid-filter\index.js`, and update the line ~36 `MERMAID_FILTER_SCALE` to `2`. To make things look a bit nicer, change `MERMAID_FILTER_THEME` to `neutral`, and `MERMAID_FILTER_BACKGROUND` to `transparent`. Couldn't get SVG to work in DOCx.

### Word

This will create a Word document with Mermaid diagrams loaded as PNG (see [Mermaid Diagrams](#Mermaid%20Diagrams) above to make sure that words/looks good).

> [!missing]
> Pandoc won't output good looking [**callouts**](https://help.obsidian.md/How+to/Use+callouts) with native Obsidian Notes syntax.

> [!success]
> Tables look good, code blocks are useable, and mermaid is fine with the filter.

> [!example]
> Can shift all headers with `--shift-heading-level-by=-1`.

```powershell
# Invokes standard Windows dialog box
Add-Type -AssemblyName System.Windows.Forms

# Sets paths for directories
$StartingDir = "$env:USERPROFILE"
$DesktopPath = [Environment]::GetFolderPath("Desktop")

# Creates the object
$FileBrowser = New-Object System.Windows.Forms.OpenFileDialog -Property @{ 
    InitialDirectory = $StartingDir
    Filter = 'Markdown (*.md)|*.md|Text (*.txt)|*.txt'
}

# Opens the dialog box
$null = $FileBrowser.ShowDialog()

# variable where all things are stored FYI: $FileBrowser

# Splits the filename and extension to just the filename and stored as $Prefix variable. So Test.md becomes Test.
$Prefix=$FileBrowser.SafeFileName.Split(".")[0]

# Sets execution directory for Pandoc, so it can correctly get any relative path images and the like.
$FileLocation = Split-Path -Path $FileBrowser.FileName
Set-Location -Path $FileLocation

# Sets output directory for where the file will be saved.
$OutputFile = "$DesktopPath\" + $Prefix + ".docx"
# Creates the file
pandoc --to docx --from markdown+hard_line_breaks $FileBrowser.Filename --reference-doc="$env:USERPROFILE\Template.docx" --output $OutputFile --filter mermaid-filter.cmd

# Remove a file that is useless
Remove-Item mermaid-filter.err

# Opens the file
& $OutputFile
```

Can also add the above into something like this to run through them all in a specific folder, to create one output file per input file.
```powershell
Get-ChildItem -filter *.md | ForEach-Object {pandoc --to docx --from markdown+hard_line_breaks $_.Name --reference-doc="$env:USERPROFILE\Template.docx" --output ($_.Basename + '.docx') --filter mermaid-filter.cmd}

# Remove a file that is useless
Remove-Item mermaid-filter.err

```

Combine multiple files (like meeting minutes) into one output file. Make sure if running the below there is a space at the end of each markdown file that is combined. Otherwise headers may not register correctly when converted.

```powershell
Add-Type -AssemblyName System.Windows.Forms
$FolderBrowser = New-Object System.Windows.Forms.FolderBrowserDialog -Property @{
    RootFolder = 'MyDocuments'
    ShowNewFolderButton = $false
}
$null = $FolderBrowser.ShowDialog()

Set-Location -Path $FolderBrowser.SelectedPath

# Sets paths for directories
$StartingDir = "$env:USERPROFILE"
$DesktopPath = [Environment]::GetFolderPath("Desktop")

# Outputs File
$OutputFile = "$DesktopPath\Minutes.docx"

# Creats combined file and exports to Word
Set-Content -Path .\combined.txt (Get-Content WW*.md) | pandoc --to docx --from markdown+hard_line_breaks combined.txt --reference-doc="$env:USERPROFILE\Template.docx" --output $OutputFile --filter mermaid-filter.cmd

# Removes files
Remove-Item mermaid-filter.err
Remove-Item combined.txt

# Opens the file
& $OutputFile

```

### PDF

> [!success]
> Pandoc won't output good looking **tables**, and [**callouts**](https://help.obsidian.md/How+to/Use+callouts) with native Obsidian Notes syntax doesn't work. However mermaid graphs look okay, and table of contents works. **Too** many things broken, better to export to Word, then PDF from there. Can create bookmarks based on Headings in the **Options** menu.
