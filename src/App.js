import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
  
} from "react-router-dom";
import Settings from './Settings'
import Content from './Content'
import React, { useState, useEffect, setState } from 'react';
import { useLocalStorage } from "./LocalStorage";

const APP_VERSION = '1-0'


function App() {
  const [settings, setSettings] = useLocalStorage("settings", "");
  const [settingsVisible, setSettingsVisible] = useState('')

  function applySettings(settings){
    setSettings(settings)
  }
  function saveSettings(settings){
    var a = document.getElementById("saveButton");
    var file = new Blob([JSON.stringify(settings)], {type: 'json'});
    a.href = URL.createObjectURL(file);
    a.download = settings.name+'v'+APP_VERSION;
  }
  function closeSettings(settings){
    setSettingsVisible(false)
  }
  function showSettings(){
    setSettingsVisible(true);
  }
  function newSettings(){
    setSettings({});
    setSettingsVisible(true);
  }
  const openSettings = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsText(file)
    fileReader.onload = () => {
      var settings = JSON.parse(fileReader.result)
      setSettings(settings);
    }

  }  

  const popover = {
    position: 'absolute',
    zIndex: '2',
    top:50,
    left:300,
    width:'600px',
    height:'600px',
    background:'#ffffff',
    boxShadow: '0px 0px 250px #ededed',
    padding:'25px'
  }
  return(
    <div>
      <Content settings={settings} showSettings={showSettings} newSettings={newSettings}/>
      { settingsVisible ? <div style={ popover }>
      <Settings openSettings={openSettings} applySettings={applySettings} saveSettings={saveSettings} settings={settings} closeSettings={closeSettings} key={settings}/>  
      </div> : null }
          
    </div>


  );
}

export default App;
