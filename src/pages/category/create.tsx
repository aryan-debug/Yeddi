
import styles from "../../styles/create_category.module.css";
import button_style from "../../styles/button.module.css";

import { Inter } from 'next/font/google'
import { useState } from "react";

const inter = Inter({subsets: ["latin"]});

export default function CreateCategory(){
    const [name, setName] = useState("");
    const data = {name};

    async function sendRequest(){
        await fetch("/api/category/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
    }

    return (
        <div className={`${styles.container} ${inter.className}`}>
            <h1 className = {styles.heading}>Create a Category</h1>
            <div className={styles.input_container}>
                <label>Name</label>
                <input onChange={(e) => setName(e.target.value)}></input>
            </div>
            <button className={`${button_style.button} ${styles.button}`} onClick={() => sendRequest()}>Create</button>
        </div>
    )
}