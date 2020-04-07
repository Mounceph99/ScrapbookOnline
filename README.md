# ScrapBook Online

## Screenshots of the System in Operation
- When the website is first visited, the login page will be displayed.
![Login](https://user-images.githubusercontent.com/60014665/78605492-a1193f00-7829-11ea-8064-5434dba40625.PNG)

- If you don't already have an account, you can click "Register!" and the register modal will be displayed.
![Register](https://user-images.githubusercontent.com/60014665/78605608-e50c4400-7829-11ea-88eb-888101a04030.PNG)

- Once you log in, the Dashboard will be displayed.
![Dashboard](https://user-images.githubusercontent.com/60014665/78605760-26045880-782a-11ea-8dc3-eeb2b35876e4.PNG)

- To upload a picture, click the camera icon on the left.
![Dashboard select upload](https://user-images.githubusercontent.com/60014665/78606095-bf336f00-782a-11ea-8c15-c20807ea1a23.PNG)

- A modal will appear where you can give your post a name and click the "Choose File" button to select your image.
![Upload picture](https://user-images.githubusercontent.com/60014665/78606327-205b4280-782b-11ea-9e0c-243360a8c73c.PNG)

- Clicking the "Choose File" button will open your file explorer where you can then navigate your computer to find your image.
![File explorer](https://user-images.githubusercontent.com/60014665/78606431-4f71b400-782b-11ea-8188-e143b85fbe84.PNG)

- Once your image is selected, click the "Post" button to upload your image to your Scrapbook.
![File chosen](https://user-images.githubusercontent.com/60014665/78606596-9364b900-782b-11ea-8620-34b48bb48cfd.PNG)

- If your image uploaded successfully, the modal will disappear and the following will appear.
![Image uploaded successfully](https://user-images.githubusercontent.com/60014665/78606716-c27b2a80-782b-11ea-9f9c-5a1eeccaaa18.PNG)

- To toggle Dark Mode, click the moon icon on the left.
![Darkmode](https://user-images.githubusercontent.com/60014665/78606993-3e757280-782c-11ea-89ff-f50b6eaf1db8.PNG)

- To like a post, click the heart icon below each post.
![Like Feature](https://user-images.githubusercontent.com/60014665/78607104-71b80180-782c-11ea-9c68-960ab65cedea.PNG)

- To view the comments on a post, click the chat bubble icon below each post.
![Dashboard select comment](https://user-images.githubusercontent.com/60014665/78607381-f3a82a80-782c-11ea-80b4-555a335285f6.PNG)

- The comments will display on the right of the Feed.
![View comments](https://user-images.githubusercontent.com/60014665/78607502-2e11c780-782d-11ea-94c5-4589f88e5f58.PNG)

- To leave a comment, type your message in the "Your comment here..." box and click send to post it. 
![Leave a comment](https://user-images.githubusercontent.com/60014665/78607613-6a452800-782d-11ea-82b3-9e451bc210dc.PNG)

- To view a users profile, click their username above any of their posts.
![Dashboard select user](https://user-images.githubusercontent.com/60014665/78607765-b3957780-782d-11ea-9084-27e70a113758.PNG)

- A users profile is displayed as follows with their follower count below their username and a collage of their posts on the right.
![View profile](https://user-images.githubusercontent.com/60014665/78608252-8e553900-782e-11ea-89eb-5583d0832334.PNG)

- To follow a user, click the "Follow" button below their follower count.
![Follow User](https://user-images.githubusercontent.com/60014665/78608424-e724d180-782e-11ea-9bee-1cd15a11d90e.PNG)

- To return to the dashboard from a user profile, click the Feed icon on the left.
![Profile select dashboard](https://user-images.githubusercontent.com/60014665/78608509-0b80ae00-782f-11ea-90ce-2f388ae6dace.PNG)

- To logout of Scrapbook Online, click the power button icon on the left.
![Dashboard select logout](https://user-images.githubusercontent.com/60014665/78608775-7af69d80-782f-11ea-802a-c8e6354d3e3c.PNG)

- Once logged out, the user will be returned to the login page.
![Logged out](https://user-images.githubusercontent.com/60014665/78608892-a2e60100-782f-11ea-9e31-0208f561c7f3.PNG)


## To Set Up Project

1. Install Node.js onto your computer.
2. Install Visual Studio Code for your editor.
3. Install GitHub Desktop for the version control.
4. Clone the repository onto the local with repository page, it will ask you to open GitHub desktop.
5. Install XAMPP Control Panel

## To Run the Project

1. Open VS Code and open the folder of codebase.
2. Open XAMPP Control Panel and START 'Apache' and 'mySQL' then select "Admin" for "mySQL"
3. On the redirect web tab that just happened, create a database and name it "scrapbook" 
4. Then on that database, create tables as follows:

	-Table 1: "users" Fields: "uid" as INT and PRIMARY KEY, "email" as VARCHAR(256), "password" as VARCHAR(256), "avatar_filename" as VARCHAR(256)
	
	-Table 2: "comments" Fields: "id" as INT and PRIMARY KEY, "userid" as INT, "postid" as INT, "comment" as VARCHAR(256)
	
	-Table 3: "posts" Fields: "id" as INT and PRIMARY KEY, "userid" as INT, "filename" as VARCHAR(256), "description" as VARCHAR(256), "likeCount" as INT
	
	-Table 4: "followers" Fields: "id" as INT and PRIMARY KEY, "userid" as INT, "followerid" as INT
	
	-Table 5: "likes" Fields: "likeId" as INT and PRIMARY KEY, "postid" as INT, "whoLiked" as INT
	
5. In order to run the server, open VSC and enter command on terminal "node main.js" which will open the server.
6. Open a browser and go to "localhost:8080".
 

## Project Description:

Welcome to ScrapBook Online!!!

This is an easy-to-use online platform for users to share their experiences and interact with others using pictures.
Users, who will be called ScrapBookers, will be able to create an account and upload pictures on 
their ScrapBook. ScrapBookers will have the option to leave comments on others ScrapBookers pictures in order to 
create a welcoming community. ScrapBookers will have the chance to follow their favorite ScrapBookers and friends so that 
they get notified when the followee uploads a picture to their ScrapBook.


## Developer Team	   : GitHub Usernames
Mounceph Morssaoui : Mounceph99
Joseph Loiselle    : JoeLoiselle
TianMing Chen      : Ming424
David Liang        : DavidLiang01
Jeffey Wilgus      : jeffrey-w
Yan Kassab	   	   : iyado1

## Tools, Languages and Techniques that are to be used:
Language: JavaScript, HTML, CSS
Tools: jQuery, NodeJS, Visual Studio Code, XAMPP Control Panel
Database: MySQL
CI: TravisCI
Testing: Mocha

## Core Features
- Upload Picture to their ScrapBook
- Follow other ScrapBookers
- Leave comments to uploaded pictures

## Additional Features:
- Dark mode
- Like posts
- Show post history on user page

## Quality of code:
Note that for more details and accurate rundown of code quality, see wiki page under "Code Style Guide"

## Objective: 
For Sprint 1:
- Have at least 3-4 meetings before the end of the sprint
	-Distribute issues
	-Discuss ideas
	-Discuss implementation
- Update README.md
	- Describe project 
	- Display team members and their GitHub
	- Display Tools, Languages and Techniques
	- Display Core and tentative features
	- List Objectives	
- Create high-level user stories for the core features
	- Upload Picture to their ScrapBook
	- Follow other ScrapBookers
	- Leave comments to uploaded pictures
- Discuss objectives for Sprint 2

For Sprint 2:
- Have at least 3-4 meetings before end of sprint
	-Distribute issues and task
	-Discuss databases
	-Discuss implementation
	- Discuss and Implement CI
- Update README.md
	- Update tools such as databases and CI
	- Update object for sprint 2
	- Mention dome objectives for sprint 3
- Implement a main interface to build of of
- Start implementation of register/login account
- Start implementation of core feature
	-Done implement core feature of uploading picture
	-Started comment feature
-Discuss objectives for Sprint 3

For Sprint 3:
- Update README.md
- Implement a backend
- Continue developing and finalized core features
- Implement user accounts (facilitating core features)
- Write a robust test suite and connect to CI tool
- Develop high level concepts/prototype for additional features
- Create Acceptance test

For Sprint 4:
- Have at least 1-2 meetings before end of sprint (deadline)
- Update README.md
- Implement supplemental features
	-Users can swap to Dark mode and normal mode
	-Users can like other users posts
	-Users can see their own post history
- Update user feed to prioritize their followers recent posts; Also have a global feed
-Write tests for the core features; Basically fill in the skeletons in "test/test_FILENAME.js"
-Implement additional test for supplemental features and write them in "test/test_FILENAME.js"
-This is the final sprint hence, all needs to be done.
