import './resultFile.css';
const ResultFile = ({ data }) => {
    return (
        <li className='excel-loaded-item'>
            <div className="excel-loaded-item__box-avatar">
                <div className="item__box-avatar--circle" style={{ background:data.avatar }}>
                    <span>{data['Nombre'][0]}</span>
                </div>
            </div>
            <div className="excel-loaded-item__info">
                <p>{data['Nombre']} {data['Apellido paterno']} {data['Apellido materno']}</p>
                {data.Matrícula && <p><b>{data.Matrícula}</b></p>}
            </div>
        </li>
    );
}

export default ResultFile;