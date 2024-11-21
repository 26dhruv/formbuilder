import { useSelector } from "react-redux";

export default function DataTable({ fields }) {
  const formData = useSelector((state) => state.data);
  console.log(formData);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Submitted Form Data</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            {fields.map((field) => (
              <th
                key={field.name}
                className="p-3 bg-gray-100 border-b text-left text-sm font-medium text-gray-700"
              >
                {field.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {formData.length === 0 ? (
            <tr>
              <td colSpan={fields.length} className="p-4 text-center">
                No data submitted yet.
              </td>
            </tr>
          ) : (
            formData.map((data, index) => (
              <tr key={index}>
                {fields.map((field) => (
                  <td
                    key={field.name}
                    className="p-3 border-b text-sm text-gray-700"
                  >
                    {Array.isArray(data[field.name])
                      ? data[field.name].join(", ") // For multi-select fields
                      : typeof data[field.name] === "boolean"
                        ? data[field.name]
                          ? "Yes"
                          : "No"
                        : data[field.name]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
