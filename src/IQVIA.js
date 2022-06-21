import React, { useState, useEffect, setState } from 'react';
import { init, AuthType, Action } from "@thoughtspot/visual-embed-sdk";
import { SearchEmbed, LiveboardEmbed, AppEmbed, useEmbedRef } from '@thoughtspot/visual-embed-sdk/react';

function IQVIA() {
    const [tsVisible, setTsVisible] = useState('')
    const [searchString, setSearchString] = useState('')


    useEffect(() => {
        init({
            thoughtSpotHost: 'https://se-thoughtspot-cloud.thoughtspot.cloud/#',
            authType: AuthType.None,
        });
        setTsVisible(false);
    }, [])
          
    
    function hideReport(){
        setTsVisible(false);
    }                  
    function toggleReport(filterVal){
        var newSearchString = '[Quarter] [Payment Amount] '
        newSearchString+=" [State].'"+filterVal+"'"
        setTsVisible(true);
        setSearchString(newSearchString)
    }
    return(
        <div style={{height:'100%',display:"flex",fontFamily:'Optimo-Plain,Helvetica Neue,Helvetica,Arial,sans-serif'}}>
            <div style={{flex:1,height:'100%',width:'100%',display:"flex",flexDirection:'column'}}>

                <div style={{flex:1, minHeight:'50px',maxHeight:'50px',display:"flex",flexDirection:'row', backgroundImage:'linear-gradient(to right, #1f084d, #2a6aa6)'}} >
                    <div style={{flex:1,display:'flex',width:'50%',justifyContent:'flex-start',alignItems:'center'}}> 
                        <img style={{filter: 'grayscale(100%) brightness(4.0)'}} src="logo.png" height='100%'/>  
                    </div>
                    <div style={{flex:1,display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                        <input className="whiteinput" style={{border:'1px solid #cccccc', color:'#ffffff', background:'#cccccc99',height:'32px',width:'300px'}} placeholder='Search'>
                        </input>
                        <svg style={{paddingLeft:'20px',paddingRight:'20px', color:'#ffffff'}}  mlns="http://www.w3.org/2000/svg" viewBox="-3 -2 24 24" width="24" fill="currentColor"><path d="M18 17H0a8.978 8.978 0 0 1 3-6.708V6a6 6 0 1 1 12 0v4.292A8.978 8.978 0 0 1 18 17zM6.17 18h5.66a3.001 3.001 0 0 1-5.66 0z"/></svg>
                    </div>
                </div>
                <div style={{height:'100%',width:'100%',display:"flex",flexDirection:'row'}} >
                    <div style={{flex:1,maxWidth:'250px',display:"flex",flexDirection:'column',background:'#1f084d', paddingTop:'20px', fontSize:'12px', borderTop:'1px solid #554378ff'}}>
                        <div style={{background:'#554378ff',height:'40px',paddingLeft:'30px',display:'flex',alignItems:'center',color:'#ffffff'}}>
                            My Dashboards
                        </div>
                        <div style={{height:'40px',paddingLeft:'45px',display:'flex',alignItems:'center',color:'#554378ff'}}>
                            Hospital Financials Overview
                        </div>
                        <div style={{background:'#554378ff',height:'40px',paddingLeft:'45px',display:'flex',alignItems:'center',color:'#ffffff'}}>
                            Sales Territory Overview
                        </div>
                    </div>                
                    <div style={{display:"flex",flexDirection:'column',flex:1, background:'#f6f7fd',padding:'15px'}}>
                        <div>
                        <div onClick={() => toggleReport('New York')} className="hoverer" style={{position:'absolute',marginTop:'calc(25% - 10px)',marginLeft:'20%',width:'300px',height:'5%'}}></div>
                        <div onClick={() => toggleReport('Pennsylvania')} className="hoverer" style={{position:'absolute',marginTop:'calc(30% - 10px)',marginLeft:'20%',width:'300px',height:'5%'}}></div>
                        <div onClick={() => toggleReport('Deleware')} className="hoverer" style={{position:'absolute',marginTop:'calc(35% - 10px)',marginLeft:'20%',width:'300px',height:'5%'}}></div>
                        <div onClick={() => toggleReport('Virginia')} className="hoverer" style={{position:'absolute',marginTop:'calc(40% - 10px)',marginLeft:'20%',width:'300px',height:'5%'}}></div>
                        <img src="apollo.png" width='100%'/>

                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
            {
                tsVisible ? 
                <div style={{position:'absolute', width:'70%', height:'70%', top:'10%',left:'15%'}}>
                    <div onClick={hideReport} style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                        <svg style={{color:'#ffffff'}} xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" fill="currentColor"><path d="M11.414 10l2.829-2.828a1 1 0 1 0-1.415-1.415L10 8.586 7.172 5.757a1 1 0 0 0-1.415 1.415L8.586 10l-2.829 2.828a1 1 0 0 0 1.415 1.415L10 11.414l2.828 2.829a1 1 0 0 0 1.415-1.415L11.414 10zM4 0h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"></path></svg>
                    </div>
                    <div style={{boxShadow:'0px 0px 55px #636363dd',background:'#f6f8fa'}}>
                            <SearchEmbed       
                                hideDataSources={true} 
                                dataSources={['3049a362-e343-4cb2-8ecd-742d5920e38c']} 
                                frameParams={{width:'100%',height:'70vh'}}
                                enabledActions={[]}
                                searchOptions={{ 
                                    searchTokenString: searchString,
                                    executeSearch: true,
                                }} 
                                hiddenActions={[Action.Pin,
                                    Action.Save,
                                    Action.Share, Action.Download, Action.EditDetails, Action.QueryDetailsButtons
                                ]}
                                />
                    </div>
                </div>
                : <div></div>
            }

        </div>
    )
}
export default IQVIA;