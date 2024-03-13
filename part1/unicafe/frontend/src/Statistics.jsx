import Entry from './Entry';

export default function(props) {
    return (
        <div>
            <h1>statistics</h1>
            <div>
                <Entry name="good" votes={props.good} />
                <Entry name="neutral" votes={props.neutral} />
                <Entry name="bad" votes={props.bad} />
            </div>
        </div>
    )
}