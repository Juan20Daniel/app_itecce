import React from "react";
import './settingBox.css';
const SettingBox = ({title='title', children}) => (
    <div className="setting-box">
        <span className="title">{title}</span>
        <div className="divider-line" />
        <div className="content">
            {children}
        </div>
    </div>
);

export default React.memo(SettingBox);