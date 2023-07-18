import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './breadCrumbs.css';
import { useSelector } from 'react-redux';
import IconsSvg from '../../assets/IconsSvg';
const BreadCrumbs = () => {
    const { breadCrumbs } = useSelector(state => state.credenciales);
    return (
        <div className="breadCrumbs">
            <ul className='box-breadcrumbs'>
                {breadCrumbs.map((breadcrumb, index) => (
                    <Fragment key={index}>
                        <li>
                            <Link to={breadcrumb.rute} key={index} className={`bc_link ${(index+1 !== breadCrumbs.length) ? "bc_active" : "bc_inactive"}`}>
                                {breadcrumb.page}
                            </Link>
                        </li>
                        {index+1 !== breadCrumbs.length &&
                            <li>
                                <IconsSvg type="chevron" width={5} height={9} color="#000" />
                            </li>
                        }
                    </Fragment>
                ))}
            </ul>
        </div>
    );
}

export default BreadCrumbs;