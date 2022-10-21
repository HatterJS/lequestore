import React from "react";
import './multiRange.css';

function MultiRange({min, max, minRange, onChange}) {
    const [minValue, setMinValue] = React.useState(min);
    const [maxValue, setMaxValue] = React.useState(max);
    // const minValueRef = React.useRef(min);
    // const maxValueRef = React.useRef(max);
    const range = React.useRef(null);

    // Convert to percentage
    const getPercent = React.useCallback(
      (value) => Math.round(((value - min) / (max - min)) * 100),
      [min, max]
    );

    // Set width of the range to decrease from the left side
    React.useEffect(() => {
        const minPercent = getPercent(minValue);
        const maxPercent = getPercent(maxValue);
        // const maxPercent = getPercent(maxValueRef.current);
        if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minValue, maxValue, getPercent]); //if maxValueRef.current => delete maxValue

    // Set width of the range to decrease from the right side
    React.useEffect(() => {
        const minPercent = getPercent(minValue);
        // const minPercent = getPercent(minValueRef.current);
        const maxPercent = getPercent(maxValue);
        if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxValue, minValue, getPercent]); //if minValueRef.current => delete minValue

    // Get min and max values when their state changes
    React.useEffect(() => {
        onChange({ min: Number(minValue), max: Number(maxValue) });
    }, [minValue, maxValue, onChange]);

    function handleMin(event) {
        Number(event.target.value) < Number(maxValue)-minRange && setMinValue(event.target.value);
        // minValueRef.current = Math.min(Number(event.target.value), minValue + 1);
    }
    function handleMax(event) {
        Number(event.target.value) > (Number(minValue)+minRange) && setMaxValue(event.target.value);
        // maxValueRef.current = Math.min(Number(event.target.value), maxValue - 1);
    }

    return (
        <React.Fragment>
            <div className="multiRange">
                <input
                    type="range"
                    className="multiRange__range range-left"
                    min="0"
                    max="5000"
                    step="100"
                    value={minValue}
                    onChange={event => handleMin(event)}
                />
                <input
                    type="range"
                    className="multiRange__range range-right"
                    min="0"
                    max="5000"
                    step="100"
                    value={maxValue}
                    onChange={event => handleMax(event)}
                />
                <div className="slider">
                    <div className="slider__track" />
                    <div ref={range} className="slider__range" />
                    <div className="slider__left-value">{minValue}</div>
                    <div className="slider__right-value">{maxValue}</div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default MultiRange;