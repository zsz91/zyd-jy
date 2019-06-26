import React from 'react';
const PhotoCard  = props => {
    return(
        <div className="photoCard" onClick={()=>props.onClick(props)}>
            <img src={props.siteUrl + props.typeImg} alt=""/>
            <span>{props.title}</span>
        </div>
    )
}
export default PhotoCard;