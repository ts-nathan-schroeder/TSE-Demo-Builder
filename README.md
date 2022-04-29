

## TSE Demo Builder

This application is designed to enable quick TSE demos that mimic a client environment. 


# VERSION 1.0.0

### Step 1: Installation

Install Node JS [https://nodejs.org/en/download/]. This app uses version 16.

`git clone https://github.com/hannsta/TSE-Demo-Builder.git` 
Clones the repository. 

`npm install`
Installs Node Modules. This will only need to be done once on installation. 

`npm start` 
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Step 2: Click the Gear Icon

This will open the configuration menu. 

### Step 3: Customize your Demo

Adjust Colors, add a logo, add navigation links. See configuration details below. Note you will need to enable CORS allowed origins on your thoughtspot instance for localhost:3000

### Step 4: Save for re-use

The settings supplied here can be saved and reloaded. Clicking save will download a text file containing the configuration JSON. This can then be re-loaded with "open"


### Configuration options

| Setting | Description |
| ------------- | ------------- |
| Settings Name | This is the name of your configuration settings. When you click save, the file will be saved with this name, allowing for re-use. |
| Thoughtspot URL | The URL of your thoughtspot instance. Note that you will need to sign into thoughtspot using your own credentials. This application is not configured for SSO. |
| Logo Image | Logo of the company your are demoing to. PNG images work best for transparency reasons.
| Primary Color | This the main color of the nav menu. This will also be the primary text color when an link is hovered over. |
| Secondary Color | Complimentary color used for text, and on-hover menus. |
| Orientation | Whether the navigation menu will be displayed on the left or top of the page |
| Links | This is the content that will show up in the nav menu. See Link Configuration for more info. |

### Link Configuration
##### Link Name
This is what will be displayed in the nav menu
##### Link Type
| Link Type | Description | Configuration |
| ------------- | ------------- | ------------- |
| None | Empty link that does nothing on click | None |
| Search | TS Search embed. | List of datasources GUIDs comma delimited |
| Answer | TS Search embed, with a default answer. | Answer GUID |
| Liveboard | TS Liveboard embed. | Liveboard GUID. |
| Menu | This link will expose a sub-menu on hover. Contents of this menu will be determined by the parent dropdown. | None |
| URL | This will embed a webpage within an Iframe. The configuration space accepts any URL. Good for specifying a home page that is the client's actual website. | Full URL |
| App | This will embed the thoughtspot application, landing on the page specified in the configuration panel. | Home, Liveboards, Answers |

##### Link Conifugration Space 
This is used to provide additional details needed to render the link. See Link Type descriptions above for more information on each option.
##### Link Parent
This is used to embed links within menus. First create a Menu Type link and provide a name. Any link that you want to show up within that menu, you will want to set that link's parent attribute to be the menu's name.


