import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './information.css';
import { useEffect } from 'react';

function Information() {

    const [isLoad, setIsLoad] = React.useState(false);

    const informId = useLocation().state.id;

    const [informationData, setInformationData] = React.useState({});

    useEffect(() => {
        async function getData() {
            try {
                await axios.get(`http://185.237.204.125:9999/information/${informId}`).then(res => setInformationData(res.data));
            } catch(err) {
                alert('Помилочка! Перезавантажте сторінку.');
            }
            setIsLoad(true);
        };
        getData();
    }, [informId]);

    return (
        <div className='information'>
            {isLoad ?
                <div className='information__content'>
                    <div className="information__title">
                        <div></div>
                        <h1>{informationData.title}</h1>
                        <div></div>
                    </div>
                    <div className="information_description">
                        <p dangerouslySetInnerHTML={{__html: informationData.content}}></p>
                    </div>
                </div>
            :
                <div className="loader02">
                    <div className="border02">
                        <div className="shapeEye01"></div>
                        <div className="shapeEye02"></div>
                    </div>
                    <p>loading...</p>
                </div>
            }
        </div>
        
    );
}

export default Information;