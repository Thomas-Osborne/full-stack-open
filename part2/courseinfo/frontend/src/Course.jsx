import Header from './Header';
import Content from './Content';
import Total from './Total';

export default function Course(props) {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}