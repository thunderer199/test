import { useState } from "react";

import './index.css'

export default function Slider({ data, sliderLength = 1, children }) {
    const [startIdx, setStartIdx] = useState(0);
    return <div className={'slider-component'}>
        {startIdx > 0 && (<div className="left" onClick={() => setStartIdx(c => c - 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
        </div>)}
        <>
            {children(
                data.slice(startIdx, startIdx + sliderLength)
            )}
        </>
        {(startIdx + sliderLength) < data.length && (<div className="right" onClick={() => setStartIdx(c => c + 1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                </svg>
            </div>
        )}
    </div>
}
