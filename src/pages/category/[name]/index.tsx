import { GetServerSideProps } from 'next'
import clientPromise from "../../../../lib/mongodb";
import styles from "../../../styles/category.module.css"
import { Inter } from 'next/font/google';
import button_styles from "../../../styles/button.module.css"
import Link from 'next/link';
import { useRouter } from 'next/router'

const inter = Inter({subsets: ["latin"]});

interface Props {
    name: string,
    posts: string[]
}


function Category(props: Props){
    const router = useRouter()

    function followCategory(){
        const data = {category_name: router.query.name}
        fetch("/api/category/follow", {method: "POST", body: JSON.stringify(data)});
    }


    return(
        <div className={styles.category_container}>
            <div className={styles.info}>
                <div className={styles.left}>
                    <div className={styles.category_logo}></div>
                    <h2 className={`${styles.category_heading} ${inter.className}`}>{props.name}</h2>
                </div>
                <div className={styles.buttons}>
                    <Link href={`/category/${props.name}/post`}><button className = {button_styles.button}>Post</button></Link>
                    <button className = {button_styles.button} onClick={() => followCategory()}>Follow</button>
                </div>
            </div>
            <div className={styles.video_container}>
                {props.posts.map((post, index) => {
                    return <video className={styles.video} controls key = {index}>
                                <source src={`../uploads/${post}`}></source>
                           </video>
                }
                )}
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const category_name = context.params?.name;
    const client = await clientPromise;
    const db = client.db("yeddi");
    const collection = db.collection("categories")
    const category_exists = await collection.countDocuments({name: category_name}) > 0
    if(!category_exists){
        return{
            notFound: true
        }
    }

    const query = await collection.findOne({name: category_name}, {projection: {posts: 1, _id: 0}});
    const posts = query?.posts;
    console.log(posts)
    return {
        props: { name: category_name, posts }
      }
}

export default Category
