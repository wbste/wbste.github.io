# Programming

## Git

### Shrink local files

- To shrink local .git folder, run `git repack -a -d -f --depth=250 --window=250`

### Remove all history

Make sure there are no protection rules under **Settings > Branches** first.

1.  Checkout

`git checkout --orphan latest_branch`

2.  Add all the files

`git add -A`

3.  Commit the changes

`git commit -am "commit message"`

4.  Delete the branch

`git branch -D main`

5.  Rename the current branch to main

`git branch -m main`

6.  Finally, force update your repository

`git push -f origin main`

## Python

1. Don’t install the latest major version of Python
2. Use only the [python.org](https://python.org) installer on Windows and Mac, or official repositories on Linux.
3. Never install or run anything outside of a virtual environment
4. Limit yourself to the basics: “pip” and “venv”
5. If you run a command, use “-m”
6. When creating a virtual environment, be explicit about which Python you use
7. I would recommend to `python -m venv` and that's all.

The `-m` flag is, at its simplest, a means to execute python scripts from the command line by using modulenames rather than filenames. The real power of `-m`, however, is in its ability to combine the power of `import` statements (e.g., support for explicit relative imports and automatic package `__init__` evaluation) with the convenience of the command line.
