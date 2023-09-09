import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Landing({ ip, setIp }) {
    const [bulbs, setBulbs] = useState([]);

    useEffect(() => {
        async function fetch() {
            try {
                let { data } = await axios.get("http://localhost:3001/getBulbs")
                setBulbs(data);
            } catch (e) {
                console.log(e);
            }
        }
        fetch();
    }, [])

    useEffect(() => {
        if (!bulbs.length) return;
        let coincidencia = bulbs.filter((b) => b.ip === ip)
        if (coincidencia.length === 0) {
            localStorage.setItem("ip", bulbs[0]?.ip);
            setIp(bulbs[0]?.ip)
        }
    }, [bulbs])

    function onChangeHandler(e) {
        setIp(e.target.value);
        localStorage.setItem("ip", e.target.value);
    }

    return (
        <div id={styles.landingContainer}>
            <div id={styles.titleContainer}>
                <h1 id={styles.title}>
                    W!z Multimedia Sync
                </h1>
            </div>
            <div id={styles.descContainer}>
                <p id={styles.description}>
                    ¿What kind of synchronization do you want?
                </p>
            </div>
            <div id={styles.mainContainer}>
                <div className={styles.buttons}>
                    <Link to="/audio">
                        <button className={styles.link}>Audio</button>
                    </Link>
                </div>
                <div className={styles.buttons}>
                    <Link to="/video">
                        <button className={styles.link}>Video</button>
                    </Link>
                </div>
            </div>
            <div id={styles.descContainer}>
                <p id={styles.description}>
                    Select your device Ip.
                    <br />
                    If it not appears, check that is plugged in and restart the app.
                </p>
            </div>
            <select id={styles.ipSelect} onChange={onChangeHandler} value={ip}>
                {
                    bulbs?.map((b, k) => {
                        if (b.ip === ip) {
                            <option className={styles.ipOption} value={b.ip} key={k}>
                                {b.ip}
                            </option>
                        }
                        return (
                            <option className={styles.ipOption} value={b.ip} key={k}>
                                {b.ip}
                            </option>
                        )

                    })
                }
                {
                    // console.log(bulbs)
                }
            </select>
        </div>
    );
}

export default Landing;