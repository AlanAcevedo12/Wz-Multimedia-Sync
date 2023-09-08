import { sendMessagesColor, sendMessagesRGB } from "../../utilities/sendMessage";
import { useEffect, useState } from "react";
import styles from "./Audio.module.css";

function Audio({ ip }) {
    const [tick, setTick] = useState(0);
    const [buffer, setBuffer] = useState(null);
    const [actualColor, setActualColor] = useState("#000000");
    const [isSync, setIsSync] = useState(false);
    const PORCENTAJE = 256;


    //ver dispositivos multimedia
    useEffect(() => {
        const devices = navigator.mediaDevices
            .enumerateDevices()
            .then(disp => {
                disp.forEach((d, i) => {
                    if (d.kind === "audiooutput")
                        console.log("audio", d, i)
                })
            })
    }, [])

    //reloj de 250ms
    useEffect(() => {
        setTimeout(() => {
            if (tick === 1) setTick(0)
            else setTick(tick + 1)
        }, 250);
    }, [tick])

    //Se envia el brillo a la lampara
    useEffect(() => {
        if (buffer) {
            let a = Math.round((buffer / PORCENTAJE) * 100);
            sendMessagesRGB({ a, ip });
        }
    }, [tick])

    //----------------------------------------------------------------------------------------------------------
    //Dibuja en pantalla
    function drawAudio(analyser) {
        let canvas = document.querySelector("canvas");
        let ctx = canvas.getContext("2d");
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;
        requestAnimationFrame(() => drawAudio(analyser));
        const bufferLength = analyser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);
        const barWidth = (WIDTH / bufferLength);
        let x = 0;
        analyser.getByteFrequencyData(dataArray);
        ctx.fillStyle = "#1a1e29";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // all the magic
        let dataArray2 = dataArray[4]
        setBuffer(dataArray2);
        dataArray.forEach((decibel, index) => {
            const c = index / bufferLength;
            const r = decibel + 25 * c;
            const g = 250 * c;
            const b = 250;
            let a = decibel / 10;
            a = a * 4;
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(x, HEIGHT - decibel, barWidth, decibel);
            x += barWidth + 1;
        });
    };

    //Inicializa el analyser
    const initAnalyser = async () => {
        const context = new AudioContext();
        const analyser = context.createAnalyser();
        navigator.mediaDevices.getDisplayMedia({
            audio: { deviceId: "default", kind: "audiooutput" }
        })
            .then(
                (stream) => {
                    let source = context.createMediaStreamSource(stream);
                    source.connect(analyser);
                    analyser.fftSize = 32;
                }
            )
        return analyser;
    };

    //Captura el click
    async function onClick() {
        const analyser = await initAnalyser();
        // dibujar
        drawAudio(analyser);
        setIsSync(true)
    };

    //----------------------------------------------------------------------------------------------------------

    //Cambio colores
    function colorOnChangeHandler(e) {
        const color = e.target.value
        const r = parseInt(color.substr(1, 2), 16)
        const g = parseInt(color.substr(3, 2), 16)
        const b = parseInt(color.substr(5, 2), 16)
        sendMessagesRGB({ r, g, b, ip });
        setActualColor(e.target.value)
    }

    return (
        <div className="Audio" id={styles.audioContainer}>
            <div id={styles.mainContainer}>
                <div id={styles.titleContainer}>
                    <h1 id={styles.title}>W!z Audio Sync</h1>
                </div>
                {
                    !isSync ?
                        <div className={styles.buttonsContainer}>
                            <button className={styles.buttons} onClick={() => onClick()}>Start Sync</button>
                        </div>
                        :
                        <div id={styles.descContainer}>
                            <p id={styles.description}>
                                Syncing audio...
                            </p>
                        </div>
                }
                <div id={styles.canvasContainer}>
                    <canvas id={styles.canvas} width="800" height="300"></canvas>
                </div>
                <div id={styles.descContainer}>
                    <p id={styles.description}>
                        Choose a light color
                    </p>
                </div>
                <div className={styles.buttonsContainer}>
                    <button className={styles.colorButtons}
                        onClick={() => { sendMessagesColor("red", ip); setActualColor("#ff0000") }}>
                        Red
                    </button>
                    <button className={styles.colorButtons}
                        onClick={() => { sendMessagesColor("green", ip); setActualColor("#00ff00") }}>
                        Green
                    </button>
                    <button className={styles.colorButtons}
                        onClick={() => { sendMessagesColor("blue", ip); setActualColor("#0000ff") }}>
                        Blue
                    </button>
                    <button className={styles.colorButtons}
                        onClick={() => { sendMessagesColor("yellow", ip); setActualColor("#f0d002") }}>
                        Yellow
                    </button>
                    <button className={styles.colorButtons}
                        onClick={() => { sendMessagesColor("pink", ip); setActualColor("#ff3232") }}>
                        Pink
                    </button>
                </div>
                <div className={styles.buttonsContainer}>
                    <button className={styles.colorButtons}
                        onClick={() => { sendMessagesColor("orange", ip); setActualColor("#ff4600") }}>
                        Orange
                    </button>
                    <button className={styles.colorButtons}
                        onClick={() => { sendMessagesColor("purple", ip); setActualColor("#aa00ff") }}>
                        Purple
                    </button>
                    <button className={styles.colorButtons}
                        onClick={() => { sendMessagesColor("aqua", ip); setActualColor("#00ffff") }}>
                        Aqua
                    </button>
                    <button className={styles.colorButtons}
                        onClick={() => { sendMessagesColor("coldWhite", ip); setActualColor("#ffffff") }}>
                        Cold White
                    </button>
                    <button className={styles.colorButtons}
                        onClick={() => { sendMessagesColor("warmWhite", ip); setActualColor("#dbd6cb") }}>
                        Warm White
                    </button>
                </div>
                <div id={styles.descContainer}>
                    <p id={styles.description}>
                        Or pick one by yourself
                    </p>
                </div>
                <div id={styles.inputContainer}>
                    <input type="color" onChange={(e) => colorOnChangeHandler(e)} value={actualColor} />
                </div>
            </div>
        </div>
    );
}





export default Audio;