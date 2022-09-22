const addToCartSVG = <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
  <rect width="40" height="40" rx="10" fill="white" fill-opacity="0.3"/>
  <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" stroke="black" stroke-opacity="0.3"/>
  <path d="M28 13L19.5287 26.1306C19.1832 26.666 18.4318 26.7461 17.9813 26.2955L12 20.3143" stroke="black" stroke-opacity="0.2" stroke-width="3" stroke-linecap="round"/>
</svg>

function GoodsItem(props) {
    const onClickButton = () => {
        alert(props.name);
    }

    return (
        <div className='content__goodsItem' style={{backgroundImage: `url(${props.goodsImage})`}}>
            <div><p>{props.name}</p></div>
            <div>
                <p>{props.cost} грн.</p>
                <button onClick={onClickButton}>{addToCartSVG}</button>
            </div>
            <img src={props.goodsImage} alt="sorry" /> {/* for indexation*/}
        </div>
    );
}

export default GoodsItem;