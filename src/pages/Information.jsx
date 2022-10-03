import React from 'react';

function Information() {

    const [isLoad, setIsLoad] = React.useState(false);
    setIsLoad(false);

    return (
        <div className='information'>
            {isLoad ? <div>

            </div> :
            <div className="loader02">
                <div className="border02">
                    <div className="shapeEye01"></div>
                    <div className="shapeEye02"></div>
                </div>
                <p>loading...</p>
            </div>}
        </div>
        
    );
}

export default Information;