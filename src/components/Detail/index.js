import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
export default function (props) {
  const { title, time, content, } = props;
  return(
      <div className="Detail">
      {!props.isHideBrea && <Breadcrumbs/> }
          <div className="AcademicNews-container top15">
              <div className="AcademicNews-header">
                  <p className='AcademicNews-title center big-title'>{title}</p>
                  <p className='AcademicNews-time center'>{time}</p>
              </div>
              {
                  typeof content === 'string' ? <div className="AcademicNews-title-content top15" dangerouslySetInnerHTML={{ __html: content }} ></div> :
                      <div className="AcademicNews-title-content top15">{content}</div>
              }
          </div>
      </div>
  )
}
