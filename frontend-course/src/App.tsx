interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {  
  backgroundMaterial: string;
  kind: "background"
}

interface CourseAttributes extends CoursePartDescription {
  requirements: string[];
  kind: 'special'
}

type CourseParts = CoursePartBasic | CoursePartGroup | CoursePartBackground | CourseAttributes;

const courseParts: CourseParts[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
];

interface HeaderType {
  name: string
}

interface ContentType {
  courseParts: CourseParts[];
}

interface TotalType {
  totalExercises: number
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ course }: { course: CourseParts }): JSX.Element => {
  switch (course.kind) {
    case 'basic':
      return (
        <div>
          <p><strong>{course.name} {course.exerciseCount}</strong> <br /><em>{course.description}</em></p>
        </div>
      );
    case 'group':
      return (
        <div>
          <p><strong>{course.name} {course.exerciseCount}</strong> <br /><em>project exercises {course.groupProjectCount}</em></p>
        </div>
      );
    case 'background':
      return (
        <div>
          <strong>{course.name} {course.exerciseCount}</strong> <br /><em>{course.description}</em> <br />
          submit to <a href={course.backgroundMaterial}>{course.backgroundMaterial}</a>
        </div>
      );
    case "special":
      return (
        <div>
          <strong>{course.name} {course.exerciseCount}</strong> <br /><em>{course.description}</em><br />
          required skills: {course.requirements.join(', ')}
        </div>
      )
    default:
      return assertNever(course);
  }
};

const Header = (props: HeaderType): JSX.Element => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  )
}

const Content = (props: ContentType): JSX.Element => {
  return (
    <>
      {props.courseParts.map((course, index) => (
        <Part key={index} course={course} />
      ))}
    </>
  );
};

const Total = (props: TotalType): JSX.Element => {
  return (
    <p>Number of exercises {props.totalExercises}</p>
  )
} 

const App = () => {
  const courseName = "Half Stack application development";
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courseParts}/>
      <Total totalExercises={totalExercises}/>
    </div>
  );
};

export default App;
