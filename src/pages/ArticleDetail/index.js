import React from 'react';
import Detail from 'components/Detail';
export default function (props){
  return(
      <Detail {...props.location.state}/>
  )
}
