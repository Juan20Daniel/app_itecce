const IconsSvg = ({ type, width, height, color }) => {
    return (
        <>
            {type === "menu" &&
                <svg width={width} height={height} viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H16V2H0V0ZM0 5H16V7H0V5ZM0 10H16V12H0V10Z" fill={color}/>
                </svg>
            }
            {type === "x" &&
                <svg width={width} height={height} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4983 0L9.42667 7.07L2.35667 0L0 2.35667L7.07 9.42667L0 16.4967L2.35667 18.8533L9.42667 11.7833L16.4983 18.8533L18.855 16.4967L11.785 9.42667L18.855 2.35667L16.4983 0Z" fill={color}/>
                </svg>
            }
            {type === "chevron" &&
                <svg width={width} height={height} viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.70706 11.707L7.41406 6.00003L1.70706 0.293031L0.677671 1.35484L5.32283 6L0.677671 10.6452L1.70706 11.707Z" fill={color}/>
                </svg>
            }
        </>
    )
}

export default IconsSvg;