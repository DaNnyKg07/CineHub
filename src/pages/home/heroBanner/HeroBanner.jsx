import React, {useState, useEffect} from 'react'
import "./style.scss"
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
    const [background, setBackground]= useState('');
    const [query, setQuery]= useState('');
    const navigate = useNavigate();
    const {url} = useSelector((state)=> state.home);
    const {data, loading} = useFetch("/movie/upcoming");

    useEffect(()=>{
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
        setBackground(bg);
    },[data])

    const searchQueryHandler = (event)=>{
        if(event.key === "Enter" && query.length>0){
            navigate(`/search/${query}`)
        }
    }
    const searchQueryOnTap = (event)=>{
        if(query.length>0){
            navigate(`/search/${query}`)
        }
    }

  return (
    <div className="heroBanner">
    {!loading && (
        <div className='backdrop-img'>
        <Img src={background}/>
    </div>
    )}
    <ContentWrapper>
    <div className=' opacity-layer'></div>
        <div className="heroBannerContent">
            <span className='title'>Welcome</span>
            <span className='subTitle'>Stream, Binge, Repeat. Unlock the Cinematic Universe</span>
            <div className='searchInput'>
                <input
                    type='text'
                    placeholder='Search for movie and tv shows...'
                    onKeyUp={searchQueryHandler}
                    onChange={(e)=> setQuery(e.target.value)}
                />
                <button onClick={(e)=>searchQueryOnTap(e)}>Search</button>
            </div>
        </div>
    </ContentWrapper>
    </div>
  )
}

export default HeroBanner
