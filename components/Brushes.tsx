import { cells } from "@/logic/cells";
import styles from "../styles/Options.module.scss";

const Brushes = (
    { brush, changeBrush }:
    {
        brush: number;
        changeBrush: (brush: number) => void;
    }
) => {
    const brushes = [
        {
            name: "Empty",
            value: cells.empty.id,
            class: cells.empty.class,
        },
        {
            name: "Start",
            value: cells.start.id,
            class: cells.start.class,
        },
        {
            name: "End",
            value: cells.end.id,
            class: cells.end.class,
        },
        {
            name: "Wall",
            value: cells.wall.id,
            class: cells.wall.class,
        }
    ]

   
    return (
        <div className={styles.brushes}>
            {
                brushes.map((b) => {
                    return (
                        <div
                            key={b.value}
                            className={`${styles.brush} ${brush === b.value ? styles.active : ""} ${b.class}`}
                            onClick={() => changeBrush(b.value)}
                           
                            >       
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Brushes;