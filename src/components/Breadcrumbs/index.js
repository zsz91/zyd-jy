import NavLink from 'umi/navlink';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import router from '../../../config/router.config';
export default withBreadcrumbs(router)(({ breadcrumbs }) =>(
    <div className="Breadcrumbs">

        {
            breadcrumbs.map(({breadcrumb, match, name}, index) => {
                return (
                    <span key={breadcrumb.key}>
                        { breadcrumb.key== '/'  ? <span>{name}<NavLink to={'/Home'}>首页>></NavLink></span> :
                            breadcrumb.key== '/PolicyGuidelines' ? <span>{name}</span> :
                                <NavLink to={match.url}>{name}</NavLink>}
                        {(index < breadcrumbs.length - 1) && <i> {index >0 && '/'} </i>}
                </span>
                )
            })
        }
    </div>
))
