import React, { ChangeEvent, useState } from "react"
import { useRouter } from 'next/router'
import styles from "../../../styles/post_video.module.css";
import { Inter } from "next/font/google";
import button_style from "../../../styles/button.module.css";

const inter = Inter({subsets: ["latin"]});

export default function CategoryPost(){
    const [file, setFile] = useState<File>();
    const router = useRouter()
    const { name } = router.query;
    async function uploadFile(event: React.SyntheticEvent){
        event.preventDefault();
        if(file){
            const formData = new FormData();
            formData.append("file", file);
            if(name){
                formData.append("categoryName", name.toString());
            }
            const response = await fetch("/api/category/post", {
                method: "POST",
                body: formData,
            })
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        if(e.target.files){
            setFile(e.target.files[0]);
        }
    }

    return <div className={`${inter.className} ${styles.form_container}`}>
        <h1 className={styles.heading}>Upload A Video</h1>
        <h3 className={styles.category_name}>{router.query.name}</h3>
        <form method="POST" className = {styles.category_form} onSubmit={(event: React.SyntheticEvent) => uploadFile(event)} encType="multipart/form-data">
            <input className={styles.file_input} type="file" id="myFile" name="filename" onChange={handleChange} />
            <button type="submit" className={button_style.button}>Upload</button>
        </form>
    </div>
}