interface CoursePartBase {
  name: string;
  exerciseCount: number;
  kind: string;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  kind: "group";
  groupProjectCount: number;
}

interface CoursePartBackground extends CoursePartDescription {
  kind: "background";
  backgroundMaterial: string;
}

interface CoursePartSpecial extends CoursePartDescription {
  kind: "special";
  requirements: string[];
}

type CoursePart = | CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;


const Header = (props: { courseName: string }): JSX.Element => {
  return <h1>{props.courseName}</h1>
};

const Content = (props: { courseParts: CoursePart[] }): JSX.Element => {
  return (
    <>
      {props.courseParts.map((coursePart) => (
        <Part key={coursePart.name} coursePart={coursePart} />
      ))}
    </>
  );
};

const Part = (props: { coursePart: CoursePart }): JSX.Element => {
  switch (props.coursePart.kind) {
    case "basic": 
      return (
        <>
          <h3>
            {props.coursePart.name} {props.coursePart.exerciseCount}
          </h3>
          <p>{props.coursePart.description}</p>
        </>
      );
    
    case "special":
      return (
        <div key={props.coursePart.name}>
          <h3>{props.coursePart.name} {props.coursePart.exerciseCount}</h3>
          <p>{props.coursePart.description}</p>
          <p>required skills: {props.coursePart.requirements.map(req => {
            return `${req}, `
          })}</p>
        </div>
      )
    case "group": 
      return (
        <>
          <h3>
            {props.coursePart.name} {props.coursePart.exerciseCount}
          </h3>
          <p>project exercises {props.coursePart.groupProjectCount}</p>
        </>
      );
    
    case "background": 
      return (
        <>
          <h3>
            {props.coursePart.name} {props.coursePart.exerciseCount}
          </h3>
          <p>{props.coursePart.description}</p>
          <p> {props.coursePart.backgroundMaterial}</p>
        </>
      );
    
    default: 
      return <></>
    
  }
};

const Total = ( props: { courseParts: CoursePart[] }) => (
  <p>
    Number of exercises {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);


const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
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

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;