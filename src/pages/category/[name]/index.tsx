import { GetServerSideProps } from 'next'
import clientPromise from "../../../../lib/mongodb";
import styles from "../../../styles/category.module.css"
import { Inter } from 'next/font/google';
import button_styles from "../../../styles/button.module.css"
import Link from 'next/link';

const inter = Inter({subsets: ["latin"]});

interface Props {
    name: string
}


function Category(props: Props){

    return(
        <div className={styles.category_container}>
            <div className={styles.left}>
                <div className={styles.category_logo}></div>
                <h2 className={`${styles.category_heading} ${inter.className}`}>{props.name}</h2>
            </div>
            <div className={styles.buttons}>
                <Link href={`/category/${props.name}/post`}><button className = {button_styles.button}>Post</button></Link>
                <button className = {button_styles.button}>Follow</button>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const category_name = context.params?.name;
    const client = await clientPromise;
    const db = client.db("yeddi");
    const category_exists = await db.collection("categories").countDocuments({name: category_name}) > 0
    if(!category_exists){
        return{
            notFound: true
        }
    }
    return {
        props: { name: category_name }
      }
}

export default Category
