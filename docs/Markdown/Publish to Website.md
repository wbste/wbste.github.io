# Publish to Website

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/download)
- [GIT](https://git-scm.com/download/win)
- [Python 3.10+](https://www.python.org/downloads/)
	- That will install the command `PIP`. Make sure you add Python to PATH.

You'll have to close any terminals you have open already for commands to `PYTHON` and `PIP` to show up.

## Getting Started

The process to publish from Markdown to a website is done via a tool called [MKDocs](https://www.mkdocs.org/). On top of that, we use this theme to customize the look and feel of the site. Learn more about it at their [website](https://squidfunk.github.io/mkdocs-material/getting-started/).

You'll also want to download [this plugin](https://pypi.org/project/mkdocs-callouts/) to auto-convert callouts to the correct format (that way you don't have to run regex commands to replace them). 

To install all the above run these commands in PowerShell:

```powershell
pip install mkdocs-material
pip install mkdocs-callouts
pip install mkdocs-glightbox
pip3 install mkdocs-git-revision-date-localized-plugin
pip install mkdocs-awesome-pages-plugin
```

and make sure the `mkdocs.yml` file has the below added to it.

```yml
...
markdown_extensions:
  - nl2br
  - admonition
  - pymdownx.details
  - pymdownx.superfences

plugins:
  - search
  - callouts
  - glightbox
  - git-revision-date-localized
...
```

To enable table sorting and mathjax support, I also added some JavaScript files to `/docs/javascripts/`, labeled `mathjax.js` and `tablesort.js`. See the [Reference section](https://squidfunk.github.io/mkdocs-material/reference/) for the code. A `favicon.png` was added to `/docs/images/` and a matching `logo.svg` was added to the `/docs/` folder.

## Commands

-   `mkdocs new [dir-name]` - Create a new project.
-   `mkdocs serve` - Start the live-reloading docs server.
-   `mkdocs build` - Build the documentation site.
-   `mkdocs -h` - Print help message and exit.

> [!tip]
> no need to ever really build with GitHub actions, as it does it when you upload.

## Folder Structure

```
mkdocs.yml                                       # The configuration file.
.github/
    workflows/                               
        ci.yml                                   # Auto-builds the site
.gitignore                                       # File telling DevOps what to ignore.
.git                                             # Hidden folder where changes are tracked.
docs/
    index.md                                     # The documentation homepage.
    [more files].md                              # All the other markdown files and folders.
    staticwebapp.config.json                     # From static web app creation.
    ...                                          # Other markdown pages, images and other files.
	images/
	    favicon.png                              # Favicon matching logo.svg
	javascripts/
	    mathjax.js                               # From: https://squidfunk.github.io/mkdocs-material/reference/mathjax/
	    tablesort.js                             # From: https://squidfunk.github.io/mkdocs-material/reference/data-tables/#sortable-tables
	stylesheets/
	    extra.css                                # CSS used for custom theme colors
```

## GitHub Actions

```yml
name: ci 
on:
  push:
    branches:
      - master 
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
        with:
          python-version: 3.x
      - run: pip install mkdocs-material 
      - run: pip install mkdocs-callouts 
      - run: pip install mkdocs-glightbox 
      - run: mkdocs gh-deploy --force

```

## Azure Pipeline

Add the following into the `yml` file generated when creating a static web app

```yml
...
  - script: pip install mkdocs-material
    displayName: Install MkDocs Material Theme

  - script: pip install mkdocs-callouts
    displayName: Install MkDocs Callout Converter

  - script: pip install mkdocs-glightbox
    displayName: Install MkDocs Material GLightBox

  - script: pip3 install mkdocs-git-revision-date-localized-plugin
    displayName: Install MkDocs Page Last Updated

  - script: pip install mkdocs
    displayName: Install MkDocs

  - script: mkdocs build
    displayName: Build MkDocs
...
```

## Azure AAD

Add or create a `staticwebapp.config.json` file, and add the following so only specified users can access the website

```yml
{
    "routes": [
        {
            "route": "/*",
            "allowedRoles": [
                "authenticated"
            ]
        }
    ],
    "responseOverrides": {
        "401": {
            "redirect": "/.auth/login/aad?post_login_redirect_uri=.referrer",
            "statusCode": 302
        },
        "404": {
            "rewrite": "/404.html",
            "statusCode": 404
        }
    },
    "auth": {
        "identityProviders": {
            "azureActiveDirectory": {
                "userDetailsClaim": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
                "registration": {
                    "openIdIssuer": "https://login.microsoftonline.com/TENANT",
                    "clientIdSettingName": "AZURE_CLIENT_ID",
                    "clientSecretSettingName": "AZURE_CLIENT_SECRET"
                }
            }
        }
    },
    "globalHeaders": {
        "Cache-Control": "no-cache"
    }
}
```

## Formatting

`mkdocs.yml` controls a lot of stuff. Read the documentation in the Reference section above. Here's what I'm using so far. To remove downloading external stuff like fonts, I send `font: false` so it won't download from Google Fonts. Also disabled Mathjax as I'm not using that anymore, and TableSort really need yet.

```yml
# Project Information
site_name: wbste for notes
site_url: https://wbste.github.io/

# Repository
repo_name: wbste
repo_url: https://github.com/wbste/wbste.github.io
edit_uri: edit/main/docs/

# Configuration
theme:
  name: material
  font: false # disables downloading any fonts
    # text: Open Sans
  favicon: images/favicon.png
  palette:
    # Palette toggle for light mode
    - media: "(prefers-color-scheme: light)"
      primary: pink
      accent: pink
      scheme: default
      toggle:
        icon: material/weather-night 
        name: Switch to dark mode

    # Palette toggle for dark mode
    - media: "(prefers-color-scheme: dark)"
      primary: pink
      accent: pink
      scheme: slate
      toggle:
        icon: material/weather-sunny
        name: Switch to light mode

  icon:
    edit: material/file-edit
    logo: fontawesome/solid/person-falling-burst

  features:
    - navigation.instant
    - navigation.indexes
    - navigation.tabs
    - navigation.sections
    - navigation.top
    - navigation.tracking
    - toc.follow
    - search.suggest
    - search.highlight
    - search.share

# Extensions
markdown_extensions:
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.arithmatex:
      generic: true
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - admonition
  - nl2br
  - footnotes
  - pymdownx.details
  - attr_list
  - def_list
  - pymdownx.tasklist:
      custom_checkbox: true
  - pymdownx.superfences:
      custom_fences:
        - name: mermaid
          class: mermaid
          format: !!python/name:pymdownx.superfences.fence_code_format

extra_javascript:
#  - javascripts/mathjax.js # for MatJax
#  - https://polyfill.io/v3/polyfill.min.js?features=es6 # for MatJax
#  - https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js # for MatJax
#  - https://unpkg.com/tablesort@5.3.0/dist/tablesort.min.js # for TableSort
#  - javascripts/tablesort.js # for TableSort

# Extras
extra:
  generator: false
  social:
    - icon: material/information
      link: URL
copyright: SOMEONE


plugins:
  - search
  - callouts
  - glightbox
  - git-revision-date-localized
  
extra_css:
  - stylesheets/extra.css
```

To use a red for example, here's what the `extra.css` looks like:

```css
:root > * {
  --md-primary-fg-color:        #FF0000;
}
```

## Anchors

`mkdocs` converts all anchors to lower case, and defaults to removing special characters and spaces for `-`. That means, even if the header you're linking to is `# Header Text`, the link needs to be `#header-text`.
