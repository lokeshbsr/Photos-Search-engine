import React from "react";
import {useHistory} from "react-router-dom";
import './SearchBar.css';
import axios from 'axios';


export default function ImageView(props) {

    const API_KEY = process.env.REACT_APP_API_KEY
    let histroy = useHistory();
    let pic= {} ;
    pic = props.imageObj;

    // useEffect(()=>{
    //     alert("loki effect");
    //     console.log("useEffect loki=>>> "+props.imageObj);
    //     pic = props.imageObj;
    // },[]);

    let DownloadImage = async() => {
        await axios.get(pic.links.download,{
            headers: {
                Authorization: `Client-ID ${API_KEY}`
            }
        });
    }

    return(
        <>
        <div>
              <div className="goBack" onClick={()=>histroy.push("/")}>&#10092;  Back</div>
              <div className="card-list-show">
                    <div className="card-show" key={pic.id}>
                      <img
                        className="card--image"
                        alt={pic.alt_description}
                        src={pic.urls.full}
                        width="50%"
                        height="50%"
                      ></img>
                    </div>
                </div>
              <div className="imageDetails">
                    <div>
                      <h1>Image Details</h1>
                      <p>{pic.alt_description}</p>
                      <p><span>User: </span> {pic.user.name}</p>
                      <p><span>Likes: </span>{pic.likes}</p>
                      <p><span>No of Downloads: </span> {pic.downloads}</p>
                    </div>
                    <div>
                         <div className="buttons" onClick={DownloadImage}><p className="p">Download</p></div>
                         <div className="buttons spaceTop"><p className="p">Share</p></div>
                    </div>                
              </div>
        </div>
        </>
    );

}