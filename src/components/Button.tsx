import styles from "../styles/button.module.css";

type Props = {
    text: string;
};

export default function Button({text}: Props){
    return (
        <button className={styles.button}>{text}</button>
    )
}   