import { useEffect, useState } from "react";
import { sendMessagesRGB } from "../../utilities/sendMessage";
import styles from "./Video.module.css";

function Video({ ip }) {
    const [isSync, setIsSync] = useState(false);
    const [tick, setTick] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            if (tick === 1) setTick(0)
            else setTick(tick + 1)
            getCanvasRFG();
        }, 50);
    }, [tick])

    function getCanvasRFG() {
        let canvas = document.querySelector(".canvas");
        if (!canvas) return;
        let context = canvas.getContext("2d");

        let height = canvas.height;
        let width = canvas.width;
        let data = context.getImageData(0, 0, width, height);
        let blockSize = 5;
        let i = -4;
        let count = 0;
        let rgb = { r: 0, g: 0, b: 0 };
        let length = data.data.length;

        while ((i += blockSize * 4) < length) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i + 1];
            rgb.b += data.data[i + 2];
        }

        // ~~ used to floor values
        // console.log("a", rgb)

        rgb.r = ~~(rgb.r / count);
        rgb.g = ~~(rgb.g / count);
        rgb.b = ~~(rgb.b / count);

        rgb.ip = ip;

        // console.log(rgb)
        sendMessagesRGB(rgb)
    }

    async function onClick() {
        setIsSync(true);
        let track;
        await navigator.mediaDevices.getDisplayMedia({
            video: {
                width: { ideal: 160, max: 160 },
                height: { ideal: 90, max: 90 }
            }
        })
            .then(
                async (mediaStream) => {
                    // console.log(mediaStream);
                    track = mediaStream.getVideoTracks()[0];
                    const media_processor = new window.MediaStreamTrackProcessor({ track });
                    const reader = media_processor.readable.getReader();
                    // console.log(reader)
                    while (true) {
                        const result = await reader.read();
                        if (result.done) break;

                        let frame = result.value;

                        let canvas = document.querySelector(".canvas");
                        let ctx = canvas.getContext("2d");

                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        // value is a VideoFrame
                        ctx.drawImage(frame, 0, 0);

                        frame.close();
                    }
                }
            )
    }

    return (
        <div className="Video" id={styles.videoContainer}>
            <div id={styles.mainContainer}>
                <div id={styles.titleContainer}>
                    <h1 id={styles.title}>W!z Video Sync</h1>
                </div>
                {
                    !isSync ?
                        <div className={styles.buttonsContainer}>
                            <button className={styles.buttons} onClick={() => onClick()}>Start Sync</button>
                        </div>
                        :
                        <div id={styles.descContainer}>
                            <p id={styles.description}>
                                Syncing video...
                            </p>
                        </div>
                }
                <div id={styles.canvasContainer}>
                    <canvas className="canvas" width="160" height="90" id={styles.canvas}></canvas>
                </div>
                <div id={styles.descContainer}>
                    <p id={styles.description}>
                        Connected at {ip}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Video;