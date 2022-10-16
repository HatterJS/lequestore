import React  from "react";
import { Link } from "react-router-dom";

const addToFavoriteSVG = <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="white" fillOpacity="0.4"/>
    <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" stroke="black" strokeOpacity="0.3"/>
    <path d="M8.99998 19.0001C9.56564 22.9599 16.3333 27.1667 20 30.5C23.6666 27.1667 30.4343 22.9598 31 19C31.5 15.5 29.5 12 26 12C22.5 12 21.3333 15.0001 20 16.5001C18.6666 15.0001 17.5 12.0001 14 12.0001C10.5 12.0001 8.5 15.5001 8.99998 19.0001Z" fill="black" fillOpacity="0.3"/>
    <path d="M19.6636 30.87L20 31.1757L20.3363 30.87C21.2388 30.0495 22.3359 29.172 23.498 28.2445L23.5583 28.1963C24.697 27.2875 25.8919 26.3338 26.994 25.3595C28.1147 24.3688 29.1552 23.3433 29.9546 22.3034C30.7509 21.2675 31.3363 20.1814 31.495 19.0707C31.7606 17.2108 31.3656 15.3346 30.416 13.9102C29.4597 12.4756 27.9367 11.5 26 11.5C24.0785 11.5 22.789 12.3343 21.826 13.3421C21.3515 13.8387 20.9537 14.3796 20.6009 14.8735C20.5524 14.9415 20.5049 15.0083 20.4583 15.0738C20.297 15.3005 20.1465 15.5121 20 15.7064C19.8535 15.5122 19.703 15.3005 19.5417 15.0738C19.4951 15.0083 19.4476 14.9415 19.399 14.8736C19.0462 14.3796 18.6484 13.8387 18.174 13.3422C17.211 12.3344 15.9214 11.5001 14 11.5001C12.0633 11.5001 10.5403 12.4757 9.58396 13.9103C8.63433 15.3347 8.23932 17.211 8.505 19.0708C8.66367 20.1815 9.24901 21.2676 10.0453 22.3035C10.8448 23.3434 11.8853 24.3689 13.0059 25.3596C14.108 26.3339 15.3029 27.2875 16.4415 28.1963L16.502 28.2445C17.6641 29.172 18.7611 30.0495 19.6636 30.87Z" stroke="white" strokeOpacity="0.3"/>
</svg>

export default React.memo(function GoodsItem(props) {

    const [isFavorite, setIsFavorite] = React.useState(false);

    React.useEffect(() => {
        JSON.parse(localStorage.getItem('favorites')) && setIsFavorite(JSON.parse(localStorage.getItem('favorites')).map(obj => obj.id).includes(props.id));
    }, [props.id]);

    const addToFavorite = () => {
        const addToFavorite = {
            "id": props.id,
            "name": props.name,
            "cost": props.cost,
            "goodsImage": props.goodsImage
        };
        !isFavorite ?
            props.setFavorites(prev => [...prev, addToFavorite]) :
            props.setFavorites(JSON.parse(localStorage.getItem('favorites')).filter(obj => obj.id!==props.id));
        setIsFavorite(!isFavorite);
    }

    return (
        <div className='content__goodsItem'>
            <div><p>{props.name}</p></div>
            <Link to='/goods-card' state={{id: props.id}}><img src={props.goodsImage} alt="sorry" /></Link>
            <div>
                <p className="content__cost">{props.cost} грн.</p>
                <button 
                    className={isFavorite ? "addedToFavoriteBtn" : "addToFavoriteBtn"}
                    onClick={addToFavorite}>{addToFavoriteSVG}
                </button>
            </div>
        </div>
    );
});