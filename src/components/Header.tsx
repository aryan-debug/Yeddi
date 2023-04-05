import Link from "next/link";
import styles from "./styles/header.module.css";
import { Inter } from 'next/font/google'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Button from "./Button";

const inter = Inter({subsets: ["latin"]});

export default function Header(){
    const [profileClicked, setProfileClicked] = useState(false);

    const {data: session} = useSession();
    return(
        <div className={`${styles.header} ${inter.className}`}>
            <h2 className={styles.logo}>Yeddi</h2>
            <div className={styles.search_bar_container}>
                <input className={styles.search_bar} placeholder="Search"/>
                <FontAwesomeIcon icon={faSearch} size="xl" className={styles.search_icon}/>
            </div>
            {session?.user ? 
                <div className={styles.right}>
                    <Link href="/category/create"><Button text="Create"/></Link>
                    <div className = {styles.profile_container}>
                        <div className = {styles.image_container} onClick={() => setProfileClicked((prevState) => !prevState)}>
                        {session?.user.image ? 
                            <Image src = {session.user.image} alt = "user profile" width={50} height={50} style={{borderRadius: "50%"}}/> 
                            : 
                        <FontAwesomeIcon icon = {faUser} style={{width:"50px", height:"50px"}}/>
                        }
                        </div>
                        {profileClicked && <button onClick={() => signOut()} className = {styles.sign_out}>Sign Out</button>}
                    </div>
                </div>
            :
            <div className={styles.auth_links}>
                <Link href={"/api/auth/signin"}>Log In</Link>
            </div>
            }
        </div>
    )
}