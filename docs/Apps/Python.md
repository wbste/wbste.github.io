# Python

## Path

`os.path` is a Python module that provides functions to interact with filesystem paths. It allows you to manipulate file paths in a way that is compatible with different operating systems. Here are some common functions provided by `os.path`:

- `os.path.join(path, *paths)`: Join one or more path components intelligently. If any component is an absolute path, all previous components are thrown away and joining continues from the absolute path component.

  Example:
  ```python
  import os
  print(os.path.join('home', 'user', 'documents', 'file.txt'))
  # Output: home/user/documents/file.txt (on Linux)
  # Output: home\\user\\documents\\file.txt (on Windows)
  ```

- `os.path.split(path)`: Split the path into a pair head and tail. The tail is the final component of the path, and the head is everything leading up to that. The result is always a tuple, even if the path ends in a slash.

  Example:
  ```python
  import os
  print(os.path.split('/home/user/documents/file.txt'))
  # Output: ('/home/user/documents', 'file.txt')
  ```

- `os.path.splitext(path)`: Split the path into a pair root and extension. The extension is everything starting from the last dot in the last path component; the root is everything before that. If there is no dot in the last path component, the root is the entire path and the extension is an empty string.

  Example:
  ```python
  import os
  print(os.path.splitext('/home/user/documents/file.txt'))
  # Output: ('/home/user/documents/file', '.txt')
  ```

- `os.path.basename(path)`: Return the final component of a path. This is the same as the tail if the path ends in a slash, or the last path component otherwise.

  Example:
  ```python
  import os
  print(os.path.basename('/home/user/documents/file.txt'))
  # Output: file.txt
  ```

- `os.path.dirname(path)`: Return the *full* directory component of a path. This is the same as the head if the path ends in a slash, or the whole path otherwise.

  Example:
  ```python
  import os
  print(os.path.dirname('/home/user/documents/file.txt'))
  # Output: /home/user/documents
  ```

- `os.path.dirname(file_path)`: Get just the folder name a file is in. This function will return the directory component of a path.

  Example:
```python
import os
file_path = '/home/user/documents/file.txt'
folder_name = os.path.basename(os.path.dirname(file_path))
print(folder_name)  # Output: documents
```

- `os.path.isabs(path)`: Return True if the path is absolute (i.e., it starts from the root of the filesystem).

  Example:
  ```python
  import os
  print(os.path.isabs('/home/user/documents'))
  # Output: True
  print(os.path.isabs('./relative_path'))
  # Output: False
  ```

- `os.path.exists(path)`: Return True if the path exists on the filesystem, or False otherwise.

  Example:
  ```python
  import os
  print(os.path.exists('/home/user/documents'))
  # Output: True (if the directory exists)
  # Output: False (if the directory does not exist)
  ```

To use `os.path` in your Python script, you first need to import it:
```python
import os
```
Then you can call any of its functions as described above.

## Current Directory

There are several ways to set the current working directory to the same location as your Python script:

- Using `os.chdir()` function:

```python
import os

script_path = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_path)
```

- Using the `pathlib` library (Python 3.4+):

```python
from pathlib import Path

script_path = Path(__file__).resolve().parent
os.chdir(str(script_path))
```

Both of these methods will change the current working directory to the same location as your script, making it easy to reference files in relation to the script's location.