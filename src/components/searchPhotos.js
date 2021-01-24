import React,{ useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import Unsplash, { toJson } from "unsplash-js";
import './SearchBar.css';
import axios from 'axios';
import  InfiniteScroll from "react-infinite-scroll-component";

// access key for unsplash api
const API_KEY = process.env.REACT_APP_API_KEY

// used functionality approach
export default function SearchPhotos(props) {

  // used hooks to store and manipulate the the data and histroy for routing(url changes)
    const [search, setQuery] = useState("");
    const [pics, setPics] = useState([]);
    const history = useHistory();
    const unsplash = new Unsplash({
        accessKey: API_KEY,
      });
    const [initialLoading,setLoadingState]=useState(true);
    const [pageIndex,setPAgaeIndex]=useState(1);

    // used effect for (effects code based on set state condition)
    useEffect(()=> {
        initialLoadImages();
    },[initialLoading]);

     let initialLoadImages = async () => {
            // for first time we will get the photos randomly based on flag condition
            if(initialLoading) {
              await axios.get('https://api.unsplash.com/photos/random?count=30', {
                headers: {
                    Authorization: `Client-ID ${API_KEY}`
                }
            }).then((json => {
                console.log("loki"+json.data);
                setPics([...pics,...json.data]);
                })).catch(error => {
                    console.log(error);
                });
        } 
        // on the change in scroll effect will get the data from the next page of unsplash photos.
        else {
              setPAgaeIndex(pageIndex+1);
              let url = `https://api.unsplash.com/search/photos?query=${search}&per_page=20&page=${pageIndex}`;
              await axios.get(url, {
                headers: {
                    Authorization: `Client-ID ${API_KEY}`
                }
              }).then(toJson)
              .then((json) => {
              console.log(json.data.results);
              setPics([...pics,...json.data.results]);
              }).catch((error)=>alert(error));
        }
     }
       
    // on search engine to get the photos of entered photo name.
    const searchPhotos = async (e) => {
        setLoadingState(false);
        setPics([]);
        unsplash.search
        .photos(search,1,30,2)
        .then(toJson)
        .then((json) => {
        console.log(json);
        setPics(json.results);
        history.push("?search="+search);
        }).catch((error)=>alert(error));
        console.log("Submitting the Form");
        e.preventDefault();
      };
    console.log(search);

    // moving to Image Details Page
    const getImageDetails = (pic)=>{
      props.imageDetails(pic)
      history.push("/images/"+pic.id);
    }

    // rendering the component
  return (
    <>
         <div>
          <form className="form" onSubmit={searchPhotos}> 
                  <input
                    type="text"
                    name="search"
                    className="input"
                    placeholder={`Try "dog" or "apple"`}
                    value={search}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button type="submit" className="button">
                    Search
                  </button>
          </form>
          </div>
          <div>
            {/* used infinite scroll libirary */}
          <InfiniteScroll dataLength={pics.length} loader={<h4>Loading...</h4>} 
            next={initialLoadImages} hasMore={true}>
                <div className="card-list">
                  {pics.map((pic) =>
                    <div className="card" key={pic.id}>
                      <img onClick={()=>getImageDetails(pic)}
                        className="card--image"
                        alt={pic.alt_description}
                        src={pic.urls.thumb}
                        width="100%"
                        height="50%"
                      ></img>
                    </div>)};
                </div>
          </InfiniteScroll>
          </div>
    </>
  );
}