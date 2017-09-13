## Craft-Gulp-Setup
New Fancy Development Set-Uup for Craft and Gulp

## Setup
- All source files are in `src`.
- The `html` folder is the result of the source files and should not me checked in on git, only the src files should live there.
- We use autoprefixer. No need to add prefixes in the SCSS or CSS

## Installation
# Craft
- Download Craft (https://craftcms.com/) and drag the craft/app folder into your /craft destination
- Delete the rest of the downloaded Craft folder
- Create a database (UTF-8) for the project and edit the settings in /craft/config/db.php
- Edit the systems’s general configuration for your localhost in /craft/config/general.php
- Change the permissions for /craft/app, /craft/config and /craft/storage and their subfolders to 777 (only for localhost!)
- Point your browser to your projects URL. If you see a monkey in your browser, you’ve done everything right!

#Gulp
- Make sure to have the Node and [gulp-cli](https://demisx.github.io/gulp4/2015/01/15/install-gulp4.html) installed.
- Navigate to the project folder with the terminal and type: `npm install`.
- Once finished enter `gulp` to run the project