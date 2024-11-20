import React from "react";
const Interseptor = ({elementRef}) => (
    <div className="interceptor" ref={elementRef} />
);

export default React.memo(Interseptor);