# Rest API Template

This repository is a boilerplate for to build REST APIs with Node.Js, using ExpressJs and TypeScript.

## Features

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) integration
- Dependency Injection done with the nice framework from [TypeDI](https://github.com/pleerock/typedi)
- Simplified Database Query with the ORM [TypeORM](https://github.com/typeorm/typeorm)
- Easy Exception Handling thanks to [routing-controllers](https://github.com/pleerock/routing-controllers)
- Integrated Testing Tool thanks to [Jest](https://facebook.github.io/jest)
- Code linter to [ESLint](https://eslint.org/)
- Debug mode for dockerized environment
- Authentication using [FusionAuth](https://fusionauth.io/)
- [GitLab CI](https://docs.gitlab.com/ee/ci/) for deploy on the AWS Platform
- [GitHub Actions](https://github.com/features/actions) integration for CI

## Creating a based project

Creating the project just:

### Syntax

`generator.sh project-path project-name [git-repository]`

```bash
./generator.sh /tmp/project my-project
```

Exit:

```bash
Project name is my-project
Target dir is /tmp/project
Target repository is empty
Cloning...
Cloned :D

Run
    cd /tmp/project
    source dev.sh
```

Creating the project and binding to Git repository:

```bash
./generator.sh /tmp/project my-project git@github.com:my-user/my-project.git
```

Exit:

```bash
Project name is my-project
Target dir is /tmp/project/
Target repository is git@github.com:my-user/my-project.git
Cloning...
Initializing repository...
Initialized empty Git repository in /tmp/project/.git/
Cloned :D

Run
    cd /tmp/project/
    source dev.sh
```

### Devhelp

```bash
devhelp                Prints devhelp

db_setup               Setup environment

dkbuild                Builds project docker image

pkg_install            Install node packages

dkupa                  Starts docker services in attach mode (at first time, runs pkg_install)

dkupd                  Starts docker services in detached mode (at first time, runs pkg_install)

dk "cmd"               Runs the 'cmd' command inside the container

dkdown                 Stop and remove docker containers
```
