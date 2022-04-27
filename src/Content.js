import React, { useState, useEffect, setState } from 'react';
import { init,  AuthType} from '@thoughtspot/visual-embed-sdk';
import { SearchEmbed, LiveboardEmbed } from '@thoughtspot/visual-embed-sdk/react';


function Content(props) {
const {
  settings,
  showSettings,
  newSettings
} = props
const thoughtspot_URL = "https://se-thoughtspot-cloud.thoughtspot.cloud/#" 

const [renderType, setRenderType] = useState('')
const [renderContent, setRenderContent] = useState('')


useEffect(() => {
  init({
    thoughtSpotHost: thoughtspot_URL,
    authType: AuthType.None,
  });
}, [])

function renderLink(type,content){
  setRenderContent(content);
  setRenderType(type);
}
const leftMenu = {
  background: settings.primaryColor,
  color: settings.secondaryColor,
  borderRight: '1px solid #dddddd',
  width: '150px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0px 0px 15px #dddddd'
}
if (settings.links){
  var linkContainers = []
  var topLevel = []
  for (var link of settings.links){
    if (!settings.linkParents[link] || settings.linkParents[link]=='None'){
      topLevel.push(link)
    }
  }
  for (var link of topLevel){
    var childrenLinks = []
    for (var child of settings.links){
      if (settings.linkParents[child]==settings.linkNames[link]){
        childrenLinks.push(
          <LinkContainer
          key={child}
          id={child}
          name={settings.linkNames[child]}
          content={settings.linkContents[child]}
          type={settings.linkTypes[child]}
          renderLink={renderLink}
        />
        )
      }
    }
    linkContainers.push(<LinkContainer
      key={link}
      id={link}
      name={settings.linkNames[link]}
      content={settings.linkContents[link]}
      type={settings.linkTypes[link]}
      renderLink={renderLink}
      children={childrenLinks}
    />)
  }
}
document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);


var renderPage = <div>Select a Link!</div>
if (renderType=='Search'){
  renderPage = <SearchEmbed hideDataSources={true} frameParams={{width:'100%',height:'100vh'}}
  />
}
if (renderType=='Liveboard'){
  renderPage = <LiveboardEmbed  hideDataSources={true} liveboardId={renderContent} frameParams={{width:'100%',height:'100vh'}}
  />
}
if (renderType=='Answer'){
  renderPage = <SearchEmbed hideDataSources={true} answerId={renderContent} frameParams={{width:'100%',height:'100vh'}}
  />
}
if (renderType=='URL'){
  renderPage = <iframe style={{width:'100%',height:'100%',border:'none'}} src={renderContent}></iframe>
}

const logoImageHolder = {
  height: '150px',
  width: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignItems:'center',
  marginTop:'20px',
  marginBottom:'20px'
}
function openTS(){
  window.open(settings.URL,'_blank')
}
return (
  <div id="container">
      <div style={leftMenu}>
        <div style={logoImageHolder}><img src={settings.logoImage}className="logoImage"></img></div>

        {linkContainers}
        <div style={{display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'flex-end',height:'100vh'}}>
          <div onClick={newSettings}>
          <PlusIcon />
          </div>
          <div onClick={showSettings}>
          <SettingsIcon />
          </div>
          <div style={{width:'30px',height:'30px'}} onClick={openTS}>
          <TSLogo />
          </div>
        </div>

      </div>
      <div id="TSContainer">
        {renderPage}
      </div>
  </div>
)
}
function LinkContainer(props){
  const {
    id,
    name,
    content,
    type,
    renderLink,
    children,
  } = props
  
  const [hoverVisible, setHoverVisible] = useState('')

  function handleLinkClick(){
    renderLink(type, content)
  }
  var isDropdown=false;
  if (children){
    if (children.length>0){
      isDropdown=true;
    }
  }

  function handleMouseEnter(){
    setHoverVisible(true)
  }
  function handleMouseLeave(){
    setHoverVisible(false)
  }
  return(
    <div>

      {isDropdown 
        ?
        <div className="contentLink" onMouseEnter={handleMouseLeave} onMouseLeave={handleMouseEnter}>
            {name}
            {hoverVisible ? 
              null
            : 
            <div className='hoverMenu'>
              {children}
            </div>}

        </div>
        :
        <div className="contentLink" onClick={handleLinkClick}>
            {name}
        </div>      
      }      
  </div>)
}




function UserIcon(){
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" fill="currentColor"><path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-14a4 4 0 0 1 4 4v2a4 4 0 1 1-8 0V8a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2a2 2 0 1 0 4 0V8a2 2 0 0 0-2-2zM5.91 16.876a8.033 8.033 0 0 1-1.58-1.232 5.57 5.57 0 0 1 2.204-1.574 1 1 0 1 1 .733 1.86c-.532.21-.993.538-1.358.946zm8.144.022a3.652 3.652 0 0 0-1.41-.964 1 1 0 1 1 .712-1.868 5.65 5.65 0 0 1 2.284 1.607 8.032 8.032 0 0 1-1.586 1.225z"></path></svg>
}
function SettingsIcon(){
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" fill="currentColor"><path d="M20 8.163A2.106 2.106 0 0 0 18.926 10c0 .789.433 1.476 1.074 1.837l-.717 2.406a2.105 2.105 0 0 0-2.218 3.058l-2.062 1.602A2.104 2.104 0 0 0 11.633 20l-3.29-.008a2.104 2.104 0 0 0-3.362-1.094l-2.06-1.615A2.105 2.105 0 0 0 .715 14.24L0 11.825A2.106 2.106 0 0 0 1.051 10C1.051 9.22.63 8.54 0 8.175L.715 5.76a2.105 2.105 0 0 0 2.207-3.043L4.98 1.102A2.104 2.104 0 0 0 8.342.008L11.634 0a2.104 2.104 0 0 0 3.37 1.097l2.06 1.603a2.105 2.105 0 0 0 2.218 3.058L20 8.162zM14.823 3.68c0-.063.002-.125.005-.188l-.08-.062a4.103 4.103 0 0 1-4.308-1.428l-.904.002a4.1 4.1 0 0 1-4.29 1.43l-.095.076A4.108 4.108 0 0 1 2.279 7.6a4.1 4.1 0 0 1 .772 2.399c0 .882-.28 1.715-.772 2.4a4.108 4.108 0 0 1 2.872 4.09l.096.075a4.104 4.104 0 0 1 4.289 1.43l.904.002a4.1 4.1 0 0 1 4.307-1.428l.08-.062A4.108 4.108 0 0 1 17.7 12.4a4.102 4.102 0 0 1-.773-2.4c0-.882.281-1.716.773-2.4a4.108 4.108 0 0 1-2.876-3.919zM10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path></svg>
}
function PlusIcon(){
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" fill="currentColor"><path d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm7 11v4a1 1 0 0 1-2 0v-4H5a1 1 0 0 1 0-2h4V5a1 1 0 1 1 2 0v4h4a1 1 0 0 1 0 2h-4z"></path></svg>;
}
function TSLogo(){
  return <svg xmlns="http://www.w3.org/2000/svg" focusable="false" width="100%" height="100%" viewBox='0 0 512 512'><g fill="currentColor" fill-rule="evenodd"><path d="M328.33 378.112c0-20.677 16.767-37.445 37.444-37.445 20.684 0 37.448 16.768 37.448 37.445 0 20.68-16.764 37.448-37.448 37.448-20.677 0-37.445-16.768-37.445-37.448M106 209.61h100.634v203.608h18.72V209.61h18.724v203.608h18.724V209.61h18.72v203.608h18.725V209.61H400.88v-18.724H106v18.724M106 172.165h294.88v-18.724H106zM106 134.72h294.88V116H106z"/></g></svg>;
}
export default Content;