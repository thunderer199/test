import { getVideo } from "../../services/video";
import Slider from "../../components/Slider";

import './index.css';
import Video from "../../components/Video";

const lastHourVideos = [
    getVideo(),
    getVideo(),
    getVideo(),
    getVideo(),
]
const trendingVideos = [
    getVideo(),
    getVideo(),
    getVideo(),
    getVideo(),
    getVideo(),
]


export default function Discover() {
    return (
        <div className={"discover-page"}>
            <div className="slider-wrapper">
                <Slider
                    data={[
                        'https://picsum.photos/900/300',
                        'https://picsum.photos/600/700'
                    ]}
                    sliderLength={1}
                >
                    {currentImages => {
                        return currentImages.map(src => <img key={src} src={src} alt={`Slide ${src}`}/>);
                    }}
                </Slider>
            </div>
            <div className="trending">
                <Slider
                    data={trendingVideos}
                    sliderLength={2}
                >
                    {
                        videos => videos.map(v => {
                            return <Video key={v.title} currentVideo={v}/>
                        })
                    }
                </Slider>

            </div>
            <div className="last-videos">
                {
                    lastHourVideos.map(v => {
                        return <Video key={v.title} currentVideo={v}/>
                    })
                }
            </div>
        </div>
    )
}
