# Pluto Package repository

This repo acts as the list of all global pluto packages that can be installed through the CLI tool

To add a new package:

Some pre-requisites:
1. Git locally
2. Your lua library that you want to put on the package manager
3. The library doesn't use absolute require paths

- Create a project to contain your package (with the module.json) etc files.
- Push that project to github or another public accessible git hosting site
- Note this link:
![image](https://github.com/user-attachments/assets/f35e2e95-0b94-420f-af4b-7443f00c9c76)
- Fork this project and clone it locally
- Create a new branch "add-my-package-123"
- Add a git submodule with the link that you copied from above, then running `git submodule add ./packages/My-Package-Name/module https://github.com/qeffects/Placeholder-Package-4.git`
- If all is successful, push the branch changes to your fork
- And finally create a pull request pointing to this project
- After approval your package should show up in everyone's pluto package lists and be available for installation
