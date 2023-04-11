import React, { ChangeEvent, useState } from "react"

export default function CategoryPost(){
    const [file, setFile] = useState<File>();

    async function uploadFile(event: React.SyntheticEvent){
        event.preventDefault();
        if(file){
            const formData = new FormData();
            formData.append("file", file);
            await fetch("/api/category/post", {
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

    return <div>
        <h1>Post A Video</h1>
        <form method="POST" onSubmit={(event: React.SyntheticEvent) => uploadFile(event)} encType="multipart/form-data">
        <input type="file" id="myFile" name="filename" onChange={handleChange}/>
        <input type="submit"/>
        </form>
    </div>
}