import Entry from './Entry';

export default function(props) {
    const total = props.good + props.neutral + props.bad;
    const average = (1 * props.good + 0 * props.neutral -1 * props.bad) / total;
    const positiveProportion = props.good / total;
    return (
        <div>
            <h1>statistics</h1>
            <div>
                <Entry name="good" votes={props.good} />
                <Entry name="neutral" votes={props.neutral} />
                <Entry name="bad" votes={props.bad} />
            </div>
            <div>
                <p>all {total}</p>
                <p>average {average}</p>
                <p>positive {positiveProportion * 100}%</p>
            </div>
        </div>
    )
}