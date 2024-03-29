import StatisticLine from './StatisticLine';

export default function(props) {
    const total = props.good + props.neutral + props.bad;
    const average = (1 * props.good + 0 * props.neutral -1 * props.bad) / total;
    const positiveProportion = props.good / total;
    return (
        <div>
            <h1>statistics</h1>
            {total 
                ? 
                    <div>
                        <table>
                            <StatisticLine text="good" value={props.good} />
                            <StatisticLine text="neutral" value={props.neutral} />
                            <StatisticLine text="bad" value={props.bad} />
                            <StatisticLine text="total" value={total} />
                            <StatisticLine text="average" value={average} />
                            <StatisticLine text="positive" value={`${positiveProportion * 100}%`}/>
                        </table>
                        <div>
                            <p>all {total}</p>
                            <p>average {average}</p>
                            <p>positive {positiveProportion * 100}%</p>
                        </div>
                    </div>
                :
                    <div>
                        No feedback given
                    </div>
            }    
        </div>
    )
}