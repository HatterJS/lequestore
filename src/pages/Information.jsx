import React from 'react';

function Information() {

    // const [isLoad, setIsLoad] = React.useState(false);

    return (
        <div className='information'>
            {false ? <div> {/* FALSE ЗАМЕНИТЬ НА isLoad */}
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