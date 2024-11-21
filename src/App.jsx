import "./App.css";
import DataTable from "./components/DataTable";
import Dynamicform from "./components/Dynamicform";

function App() {
  const fields = [
    { name: "name", label: "FirstName", type: "text" },
    { name: "age", label: "Age", type: "number" },
    { name: "subscribe", label: "Subscribe to Newsletter", type: "boolean" },
    {
      name: "gender",
      label: "Gender",
      type: "single-select",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
    },
    {
      name: "hobbies",
      label: "Hobbies",
      type: "multi-select",
      options: [
        { value: "reading", label: "Reading" },
        { value: "traveling", label: "Traveling" },
        { value: "sports", label: "Sports" },
      ],
    },
  ];

  return (
    <>
      <div className="flex flex-row">
        <Dynamicform fields={fields} />
        <DataTable fields={fields} />
      </div>
    </>
  );
}

export default App;
