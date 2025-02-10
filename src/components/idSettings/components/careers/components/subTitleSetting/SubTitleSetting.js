import './subTitleSetting.css';

const SubTitleSetting = ({value, children}) => (
    <div className='box-sub-title-setting'>
        {!children 
            ? <p>{value}</p>
            : children
        }
    </div>
);

export default SubTitleSetting;