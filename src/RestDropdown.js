import React, { useState, useEffect, setState } from 'react';

function RestDropdown(props){
    const {
        URL,
        username,
        password,
    } = props


    useEffect(() => {

    }, [])





    function getToken(){
        var body = JSON.stringify({username:username,password:password})
        fetch(URL+"/tspublic/rest/v2/session/gettoken",{
            method:'POST',
            body:body,
            headers:{
                
            }
        })
    }
    var disp = popupVisible ? 'flex' : 'none';

    var style = {
        display:disp,
        position:'absolute',
        top:'35%',
        left:'35%',
        width:'400px',
        borderRadius:'5px',
        boxShadow:'0px 0px 150px #cccccc',
        flexDirection:'column',
        background:'#ffffff'
    }
    var bannerColor = primaryColor;
    if (bannerColor =='#ffffff'){
        bannerColor = secondaryColor;
    }
    return (
        <div style={style}>
            <div style={{position:'absolute',marginLeft:'370px',marginTop:'22px',color:'#999'}} onClick={togglePopupVisible}><CloseIcon /></div>
            <div style={{background:bannerColor,padding:'5px',height:'3px',borderRadius:'5px 5px 0px 0px'}}>
            </div>
            <div style={{padding:'10px 15px 10px 15px',color:'#343434'}}>
                <div style={{fontSize:'18px',fontWeight:500}}>{value}</div>
                <div style={{fontSize:'12px',fontWeight:'400',marginBottom:'10px'}}>{title}</div>
                <textarea style={{fontFamily:'Open Sans',height:'130px',width:'360px',borderRadius:'5px',border:'2px solid #efefef'}} value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
                <div className="button" style={{border:'2px solid var(--secondary-color)',fontSize:'14px',marginTop:'10px',height:'45px',width:'80px',display:'flex',justifyContent:'center',alignItems:'center',background:'var(--primary-color)',color:'var(--secondary-color)'}} onClick={saveButton}>Save</div>
            </div>
         </div>
    )
}


export default RestDropdown;