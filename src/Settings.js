import React, { useState, useEffect, setState, useRef } from 'react';
import { init,  AuthType} from '@thoughtspot/visual-embed-sdk';
import { SearchEmbed } from '@thoughtspot/visual-embed-sdk/react';
import { SketchPicker } from 'react-color';


function SettingsMenu(props) {
const {
  applySettings,
  saveSettings,
  closeSettings,
  openSettings,
  settings
} = props

const fileInput = useRef(null)
const imageInput = useRef(null)

const [name, setName] = useState('')
const [URL, setURL] = useState('')
const [links, setLinks] = useState('')
const [linkTypes, setLinkTypes] = useState('')
const [linkNames, setLinkNames] = useState('')
const [linkContents, setLinkContents] = useState('')
const [linkParents, setLinkParents] = useState('')
const [primaryColor, setPrimaryColor] = useState('')
const [secondaryColor, setSecondaryColor] = useState('')
const [orientation, setOrientation] = useState('')
const [logoImage, setLogoImage] = useState('')
const [displayPrimaryPicker, setDisplayPrimaryPicker] = useState('')
const [displaySecondaryPicker, setDisplaySecondaryPicker] = useState('')

function updatePrimaryColor(color){
  setPrimaryColor(color.hex);
};
function updateSecondaryColor(color){
  setSecondaryColor(color.hex);
};


const handleLinkTypeChange = (linkId, value) => {
  setLinkTypes({ ...linkTypes, [linkId]: value });
};
const handleLinkNameChange = (linkId, value) => {
  setLinkNames({ ...linkNames, [linkId]: value });
};
const handleLinkContentChange = (linkId, value) => {
  setLinkContents({ ...linkContents, [linkId]: value });
};
const handleLinkParentChange = (linkId, value) => {
  setLinkParents({ ...linkParents, [linkId]: value });
};
const addLink = () =>{
  setLinks([...links, links.length])
  setLinkNames({ ...linkNames, [links.length]: undefined });
  setLinkContents({ ...linkContents, [links.length]: undefined });
  setLinkParents({ ...linkParents, [links.length]: undefined });
  setLinkTypes({ ...linkTypes, [links.length]: undefined });
}
const getSettingsObj = () =>{
  var settings = {
    name: name,
    URL: URL,
    links: links,
    linkTypes: linkTypes,
    linkNames: linkNames,
    linkContents: linkContents,
    linkParents: linkParents,
    primaryColor: primaryColor,
    secondaryColor: secondaryColor,
    orientation: orientation,
    logoImage: logoImage
  }
  return settings;
}
const saveSettingMenu = () =>{
  saveSettings(getSettingsObj());
}
const applySettingMenu = () =>{
  applySettings(getSettingsObj());
}
useEffect(() => {
  if (settings){
    setName(settings.name)
    setURL(settings.URL)
    setLinks(settings.links)
    setLinkTypes(settings.linkTypes)
    setLinkNames(settings.linkNames)
    setLinkContents(settings.linkContents)
    setLinkParents(settings.linkParents)
    setPrimaryColor(settings.primaryColor)
    setSecondaryColor(settings.secondaryColor)
    setOrientation(settings.orientation)
    setLogoImage(settings.logoImage)
  }
}, [])
const popover = {
  position: 'absolute',
  zIndex: '2',
}
const cover = {
  position: 'fixed',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px',
}

if (!links){
  setLinks([])
}else{
  var linkObjs   = links.map(link => (
    <Link
      key={link}
      id={link}
      saveLinkName={handleLinkNameChange}
      saveLinkType={handleLinkTypeChange}
      saveLinkContent={handleLinkContentChange}
      saveLinkParent={handleLinkParentChange}
      name={linkNames[link]}
      type={linkTypes[link]}
      content={linkContents[link]}
      parent={linkParents[link]}
      linkNames={linkNames}
    />
  ));
} 

const handleSettingsRead = async (event) => {
  openSettings(event.target.files[0])
}
const handleFileRead = async (event) => {
  const file = event.target.files[0]
  const base64 = await convertBase64(file)
  setLogoImage(base64);
}
const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result);
    }
    fileReader.onerror = (error) => {
      reject(error);
    }
  })
}
const triggerInputFile = () => {
  fileInput.current.click()
}
const triggerInputImage = () => {
  imageInput.current.click()
}
const hideSettings = () => {
  closeSettings();
}
return (
  <div id="settingsContainer">
    <div id="settingsHeader">
      <div className="button" onClick={applySettingMenu}>
        <ApplyIcon />
        Apply
      </div>
      <div className='close'>
        <div className="button" onClick={triggerInputFile} >
          <OpenIcon />
          Open
        </div>
        <input type="file" 
            ref={fileInput} 
            name="file" 
            className="upload-file" 
            id="file"
            onChange={handleSettingsRead}
            encType="multipart/form-data" 
            style={{display:'none'}}
            required/>
        <div className="button" onClick={saveSettingMenu}>
          <SaveIcon />
          <a id="saveButton"> Save </a>
        </div>
        <div className="button"  onClick={hideSettings}>
          <CloseIcon />
          Close
        </div>      
      </div>

    </div>
    <div className="settingLabel">Settings Name</div> 
    <input type="text" value={name} onChange={e => setName(e.target.value)}></input>
    <div className="settingLabel">Thoughtspot URL</div> 
    <input style={{width:'500px',height:'30px'}} type="text" value={URL} onChange={e => setURL(e.target.value)}></input>
    
    <div className="horizontalMenu">
      <div className="verticalMenu">
        <div className="settingLabel">Logo Image</div> 
        <img className="logoImage" onClick={triggerInputImage} src={logoImage}></img> 
      </div>
      <div className="verticalMenu">
        <input ref={imageInput} type="file" name="file" 
                                  className="upload-file" 
                                  id="file"
                                  onChange={handleFileRead}
                                  style={{display:'none'}}
                                  encType="multipart/form-data" 
                                  required/>
        
        <div className="settingLabel">Primary Color</div> 
        <div className="colorPlaceholder" style={{background: primaryColor, border:'1px solid #ccc'}} onClick={e => setDisplayPrimaryPicker(true) }></div>
        { displayPrimaryPicker ? <div style={ popover }>
              <div style={ cover } onClick={() => setDisplayPrimaryPicker(false) }/>
              <SketchPicker color={primaryColor}
                  onChangeComplete={updatePrimaryColor}
              />
            </div> : null }

        <div className="settingLabel">Secondary Color</div> 
        <div className="colorPlaceholder" style={{background: secondaryColor, border:'1px solid #ccc'}} onClick={e => setDisplaySecondaryPicker(true) }></div>
        { displaySecondaryPicker ? <div style={ popover }>
              <div style={ cover } onClick={ e => setDisplaySecondaryPicker(false) }/>
              <SketchPicker color={secondaryColor}
                  onChangeComplete={updateSecondaryColor}
              />
            </div> : null }
      </div>
      <div className="verticalMenu">
        <div className="settingLabel">Orientation</div> 
        <select onChange={e => setOrientation(e.target.value)} value={orientation}> 
            <option value="Horizontal">Horizontal</option>
            <option value="Vertical">Vertical</option>
        </select>
      </div>
    </div>
    

    <div className="settingLabel">Links</div> 
    <div className="linkContainer">
      {linkObjs}
    </div>
    <div className="button" onClick={addLink}>
      <PlusIcon />
      Add Link
    </div>

  </div>
)
}

function Link(props){

  const {
    id,
    name,
    type,
    parent,
    content,
    saveLinkName,
    saveLinkType,
    saveLinkContent,
    saveLinkParent,
    linkNames
  } = props

  function handleNameChange(linkName){
    saveLinkName(id,linkName)
  }
  function handleTypeChange(linkType){
    saveLinkType(id,linkType)
  }
  function handleParentChange(linkParent){
    saveLinkParent(id,linkParent)
  }
  function handleContentChange(linkContent){
    saveLinkContent(id,linkContent)
  }
  var contentInput = null;
  if (type=='Menu'){
    contentInput = null;
  }
  else if (type=="None"){
    contentInput = null;
  }else{
    contentInput = <input style={{width:'250px',marginRight:'5px'}} value={content} onChange={e => handleContentChange(e.target.value)} />;
  }

  var parentOptions = []
  for (var link of Object.values(linkNames)){
    parentOptions.push(<option value={link}>{link}</option>)
  }

  return(
    <div className="link">
      <input style={{width:'100px',marginRight:'5px'}} value={name} onChange={e => handleNameChange(e.target.value)} />
      <select style={{width:'80px',marginRight:'5px'}} onChange={e => handleTypeChange(e.target.value)} value={type}> 
        <option value="None">None</option>
        <option value="Search">Search</option>
        <option value="Liveboard">Liveboard</option>
        <option value="Answer">Answer</option>
        <option value="URL">URL</option>
        <option value="Menu">Menu</option>
      </select>
      {contentInput}
      <select style={{width:'80px',marginRight:'5px'}} onChange={e => handleParentChange(e.target.value)} value={parent}> 
        <option value="None">None</option>
        {parentOptions}
      </select>
      </div>
  )
}
function CloseIcon(){
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" fill="currentColor"><path d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"></path><path d="M11.414 10l2.829 2.828a1 1 0 0 1-1.415 1.415L10 11.414l-2.828 2.829a1 1 0 1 1-1.415-1.415L8.586 10 5.757 7.172a1 1 0 0 1 1.415-1.415L10 8.586l2.828-2.829a1 1 0 0 1 1.415 1.415L11.414 10z"></path></svg>;
}
function OpenIcon(){
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -4 24 24" width="24" fill="currentColor"><path d="M10.83 2H17a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h5c1.306 0 2.417.835 2.83 2zM17 4H9.415l-.471-1.334A1.001 1.001 0 0 0 8 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"></path><path d="M1 5h18v2H1z"></path></svg>;
}
function ApplyIcon(){
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" fill="currentColor"><path d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"></path><path d="M8.414 9H14a1 1 0 1 1 0 2H8.414l2.536 2.536a1 1 0 0 1-1.414 1.414l-4.243-4.243a.997.997 0 0 1 0-1.414L9.536 5.05a1 1 0 1 1 1.414 1.414L8.414 9z"></path></svg>;
}
function SaveIcon(){
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 24 24" width="24" fill="currentColor"><path d="M2 0h11.22a2 2 0 0 1 1.345.52l2.78 2.527A2 2 0 0 1 18 4.527V16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v14h14V4.527L13.22 2H2zm4 8h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zm0 2v4h6v-4H6zm7-9a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1zM5 3h5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 3h3V5H6v1z"></path></svg>;
}
function PlusIcon(){
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" fill="currentColor"><path d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm7 11v4a1 1 0 0 1-2 0v-4H5a1 1 0 0 1 0-2h4V5a1 1 0 1 1 2 0v4h4a1 1 0 0 1 0 2h-4z"></path></svg>;
}
export default SettingsMenu;