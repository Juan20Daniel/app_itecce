import './subTitleCareerSetting.css';

const SubTitleCareerSetting = ({value, children}) => (
    <div className='box-sub-title-setting'>
        {!children 
            ? <p>{value}</p>
            : children
        }
    </div>
);

export default SubTitleCareerSetting;