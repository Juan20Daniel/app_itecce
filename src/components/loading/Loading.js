import './loadingStyles.css';

const Loading = ({ loading }) => {
    return (
        <div className={`loading ${loading.status && "show-loader"}`}>
            <div className='loading-center'>
                <span className='Loading-span'>{loading.value}</span>
            </div>
        </div>
    )
}

export default Loading;