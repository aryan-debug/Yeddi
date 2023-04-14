import { useSession } from "next-auth/react"
import { GetServerSideProps } from 'next'
import clientPromise from "../../lib/mongodb";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import styles from "../styles/homepage.module.css"

interface Props {
  posts: string[][],
}


export default function Home(props: Props) {
  const { data: session } = useSession()
  const posts = props.posts
  console.log(posts)
  return (
    <div className={styles.video_container}>
      {posts.map((post, index) => {
          console.log(post);
          return <video className={styles.video} controls key = {index}>
                  <source src={`../uploads/${post}`}></source>
                </video>
        }
      )}
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  if(session){
    const client = await clientPromise;
    const db = client.db("yeddi");
    const user = await db.collection("users").findOne({_id: session.user.sub})
    const followed = user?.followed;
    const categories = await Promise.all(followed.map(async (category: string) => await db.collection("categories").findOne({name: category})))
    const posts = categories.map((category) => category.posts).flat()
    return {props: {posts}}
  }
  return {props: {message: "hello"}}
}