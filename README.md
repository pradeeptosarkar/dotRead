<div align="center">
<h2s>Show some ❤️ by starring this awesome repository!</h2>
</div>


## Table of Contents
- [Introduction to dotRead](#introducing-dotread)
- [Demo](#live-demo)
- [Part of Hacktoberfest 2023](#open-source-programs-this-repo-has-been-part-of)
- [Contribution Guidelines](#contribution-guidelines)
- [Local Setup](#how-to-set-up-dotread-for-development)
- [GitHub Tutorial](#github-beginner-guide)

## Introducing dotRead

It's a tool for reading github code in the brower using Monaco editor. It helps in skimming the codebase with ease and have features like multiple open files.

## Live Demo

Here is the link for the live demo, give it a try

> [dotRead](https://dotread.netlify.app/)

## Open Source programs this repo has been part of
<a href="https://github.com/pradeeptosarkar/dotread"><img src="https://badges.frapsoft.com/os/v2/open-source.svg?v=103"></a>


<div align="center">
<img src="https://miro.medium.com/v2/resize:fit:1400/0*McOGR_vW3LivYNor.png" width="500px">
</div>

<div align="center">
    <a href="https://hacktoberfest.com/">HACTOBERFEST 2023</a>

</div>
<br>

<br>

<p align="right">(<a href="#top">back to top</a>)</p>

## Contribution Guidelines

Here are some set of guidelines to follow while contributing to `dotRead` :
```
1. Welcome to this repository, if you are here as an open-source program participant/contributor.
2. Participants/contributors have to **comment** on issues they would like to work on, and mentors or the PA will assign you.
3. Issues will be assigned on a **first-come, first-serve basis.**
4. Participants/contributors can also **open their issues**, but it needs to be verified and labelled by a mentor. We respect all your contributions, whether 
it is an Issue or a Pull Request.
5. When you raise an issue, make sure you get it assigned to you before you start working on that project.
6. Each participant/contributor will be **assigned 1 issue (max)** at a time to work.
7. Don't create issues that are **already listed**.
8. Please don't pick up an issue already assigned to someone else. Work on the issues after it gets **assigned to you**.
9. Create your file in an appropriate folder with appropriate name and extension.
10. Pull requests will be merged after being **reviewed** by  maintainers5.
11. We all are here to learn. You are allowed to make mistakes. That's how you learn, right!.
```

### How to Contribute: 


- Before Contribute Please read [CONTRIBUTING.md](https://https://github.com/pradeeptosarkar/dotRead/blob/master/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://https://github.com/pradeeptosarkar/dotRead/blob/master/CODE_OF_CONDUCT.md)
- Fork the repo to your Github.<br/>

- Clone the Forked Repository to your local machine.
	```
	git clone https://github.com/<username>/dotread.
	```
- Change the directory to dotRead.
	```bash
	cd dotread
	```
- Add remote to the Original Repository.
	```
	git remote add upstream https://https://github.com/pradeeptosarkar/dotRead
	```
- Check the remotes for this repository.
        ```
        git remote -v
        ```
- Always take a pull from the upstream repository to your master branch to keep it at par with the main project(updated repository).
        ```
        git pull upstream main
        ```
- Create a new branch.
        ```
        git checkout -b <your_branch_name>
        ```
- Perform your desired changes to the code base.
- Track your changes:heavy_check_mark: .
        ```
        git add . 
        ```
- Commit your changes .
        ```
        git commit -m "Relevant message"
        ```
- Push the committed changes in your feature branch to your remote repo.
        ```
        git push -u origin <your_branch_name>
        ```
- To create a pull request, click on `compare and pull requests`. Please ensure you compare your feature branch to the desired branch of the repository you are supposed to make a PR to.

- Add appropriate title and description to your pull request explaining your changes and efforts done.


- Click on `Create Pull Request`.


- Voila! You have made a PR to this repo. Sit back patiently and relax while your PR is reviewed

	

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ------------------------------------------------------------------------------------------------------------------------------------------------------------- -->

### Install dependencies
```
cd dotread
npm install
npm start
```
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ------------------------------------------------------------------------------------------------------------------------------------------------------------- -->


## How to Set up `dotRead` for Development?

### 🍴 Fork and Clone the Repo

First, you need to fork the `dotRead` repo. You can do this by clicking the `Fork` button on the top right corner of the repo. If you are new to forking, please watch this [YouTube Guide](https://www.youtube.com/watch?v=h8suY-Osn8Q) to get started.

Once forked, you can clone the repo by clicking the `Clone or Download` button on the top right corner of the forked repo.

Please change the directory after cloning the repository using the `cd <folder-name>` command.

> **Note:** Create a `.env.local` file and Copy all the contents of `.env.example` and paste into `.env.local` file that you created.After that update your `env variable` like `VITE_GITHUB_TOKEN`. If you don't know how to get token follow this [article](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

### Install Dependencies

Next, install the dependencies by running the following command in the `dotRead` repo. we recommend using `yarn` but you can install using `npm` too

```bash
yarn install
```

Or

```
npm install
```

if you don't have `yarn` installed on your PC, follow the steps below to install it..

**Windows**

1. open your command prompt as administrator.
2. write `corepack enable` and hit enter.
3. then `npm install --global yarn`

**Linux**

1. open terminal and hit `npm install --global yarn`

**MacOS**

1. open terminal and hit `npm install --global yarn`
   or
   `brew install yarn`

**Or Download Package**
If you are unable to install yarn following the above-mentioned process, then you can simply download the package and install it. Visit the official website of Yarn; there you can just expand the "Alternative" section and it will ask for the version to download for Windows, Linux, or Mac.
`https://classic.yarnpkg.com/en/docs/install#windows-stable`

> **Note**: `dotRead` runs on React 18. However, some of the dependencies are yet to upgrade to version 18. So please use the following command when you face difficulties installing the dependencies. Also, ensure to use Node.js version >= 16.x

### Start the Development Mode

Use the following command to start the app in the development mode:

```bash
yarn run dev
```

or if you installed dependencies using `npm` use below command

```
npm run dev
```

It runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.

## Github Beginner Guide
#### Are you a beginner in using Github?

You can refer to the following articles on the basics of Git and Github and also contact me, in case you are stuck:
- [Forking a Repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)
- [Cloning a Repo](https://help.github.com/en/desktop/contributing-to-projects/creating-an-issue-or-pull-request)
- [How to create a Pull Request](https://opensource.com/article/19/7/create-pull-request-github)
- [Getting started with Git and GitHub](https://towardsdatascience.com/getting-started-with-git-and-github-6fcd0f2d4ac6)
- [Learn GitHub from Scratch](https://lab.github.com/githubtraining/introduction-to-github)
	
	 
	 <p align="right">(<a href="#top">back to top</a>)</p>


<!-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------ -->

