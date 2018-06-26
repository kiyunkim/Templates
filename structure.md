# Folder Structure

```text
root
├─index.html
├─favicon.ico
├─img/
│ └─..
├─css/
│ ├─_variables.scss
│ ├─_mixins.scss
│ └─..
├─js/
│ ├─app
│ │ ├─main.js
│ │ └─settings
│ │    ├─..
│ │    │ └─..
│ │    └─save.js
│ └─lib/
│    ├─jquery.js
│    └─..
├─package.json
├─.gitignore
└─..
```

## SASS files

```text
sass/ 
| 
|– base/ 
|   |– _reset.scss       # Reset/normalize 
|   |– _typography.scss  # Typography rules 
|   ...                  # Etc… 
| 
|– components/ 
|   |– _buttons.scss     # Buttons 
|   |– _carousel.scss    # Carousel 
|   |– _cover.scss       # Cover 
|   |– _dropdown.scss    # Dropdown 
|   |– _navigation.scss  # Navigation 
|   ...                  # Etc… 
| 
|– helpers/ 
|   |– _variables.scss   # Sass Variables 
|   |– _functions.scss   # Sass Functions 
|   |– _mixins.scss      # Sass Mixins 
|   |– _helpers.scss     # Class & placeholders helpers 
|   ...                  # Etc… 
| 
|– layout/ 
|   |– _grid.scss        # Grid system 
|   |– _header.scss      # Header 
|   |– _footer.scss      # Footer 
|   |– _sidebar.scss     # Sidebar 
|   |– _forms.scss       # Forms 
|   ...                  # Etc… 
| 
|– pages/ 
|   |– _home.scss        # Home specific styles 
|   |– _contact.scss     # Contact specific styles 
|   ...                  # Etc… 
| 
|– themes/ 
|   |– _theme.scss       # Default theme 
|   |– _admin.scss       # Admin theme 
|   ...                  # Etc… 
| 
|– vendors/ 
|   |– _bootstrap.scss   # Bootstrap 
|   |– _jquery-ui.scss   # jQuery UI 
|   ...                  # Etc… 
| 
| 
`– main.scss             # primary Sass file 

```
[Architecture For A Sass Project](https://www.sitepoint.com/architecture-sass-project/)
[How to structure your front-end application](https://wecodetheweb.com/2015/05/28/how-to-structure-your-front-end-application/)  
[Good front-end architecture](https://www.sitepoint.com/good-front-end-architecture/)  
[Understanding the modern front end web application project structure](https://www.sohamkamani.com/blog/2015/08/21/frontend/)
