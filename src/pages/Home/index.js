import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Grid } from "@material-ui/core";
import { getVideo } from "../../services/video";
import useSwipe from "../../hooks/useSwipe";
import useDblPress from "../../hooks/useDblPress";

import './index.css';
import Video from "../../components/Video";

export default function Home() {
    const scrollRef = useRef();

    const [pointer, setPointer] = useState(0);
    const [listLikes, setListLikes] = useState([]);
    const [videoList, setVideoList] = useState(() => [getVideo()]);

    const loadVideo = () => setVideoList((list) => [...list, getVideo()]);

    const onUp = useCallback(() => {
        setPointer((c) => c + 1);
    }, []);

    const onDown = useCallback(() => {
        setPointer((c) => (c > 0 ? c - 1 : 0));
    }, []);

    useSwipe(scrollRef, onUp, onDown);

    const likeHandler = useCallback(() => {
        setListLikes(
            (list) => list.find(({ title }) => title === videoList[pointer].title) ?
                list.filter(({ title }) => title !== videoList[pointer].title) :
                [...list, videoList[pointer]]
        );
    }, [pointer, videoList]);

    useDblPress(scrollRef, likeHandler);

    useEffect(() => {
        if (pointer >= videoList.length) {
            loadVideo();
        }
    }, [pointer, videoList]);

    const currentVideo = useMemo(() => videoList?.[pointer], [videoList, pointer]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                {listLikes.map((video) => (<p key={video.title}>{video.title}</p>))}
            </Grid>
            <Grid item xs={6} ref={scrollRef}>
                <Video currentVideo={currentVideo}/>
            </Grid>
        </Grid>
    );
}
