import { useRef } from 'react';

import './index.css'

export default function Video(props) {
    const videoRef = useRef();

    const playHandler = () => {
        if ((videoRef.current.paused)) {
            videoRef.current.play();
        }
        else {
            videoRef.current.pause();
        }
    }

    return <div className="video-block" onClick={playHandler}>
        {props.currentVideo?.sources?.length > 0 && <video ref={videoRef} controls allowFullScreen={false}>
            {props.currentVideo?.sources?.map(src => <source key={src} src={src}/>)}
        </video>}
        <div className="overlay"></div>
        <span className="title">{props.currentVideo?.title}</span>
        <div className="user">@{props.currentVideo?.user}</div>
    </div>;
}
