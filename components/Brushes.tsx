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
            value: 0,
        },
        {
            name: "Start",
            value: 3,
        },
        {
            name: "End",
            value: 4,
        },
        {
            name: "Wall",
            value: 5,
        }
    ]

    const clases = [
        styles.empty,
        styles.visited,
        styles.path,
        styles.start,
        styles.end,
        styles.wall,
      ];
    return (
        <div className={styles.brushes}>
            {
                brushes.map((b) => {
                    return (
                        <div
                            key={b.value}
                            className={`${styles.brush} ${brush === b.value ? styles.active : ""} ${clases[b.value]}`}
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