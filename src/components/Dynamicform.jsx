import { useState } from "react";
import { useDispatch } from "react-redux";
import { addData } from "../store/slices/slicer";

export default function Dynamicform({ fields }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      // Clear the error for the specific field when it changes
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateField = (field, value) => {
    if (field.required && !value.trim()) {
      return `${field.label} is required`;
    }
    if (field.name === "name" && !value.trim()) {
      return "Name cannot be empty or just whitespace";
    }
    if (field.type === "number") {
      if (isNaN(value)) {
        return `${field.label} must be a valid number`;
      }
      if (field.name === "age") { // Assuming the field name for age is "age"
        if ( value > 100 || value <0) {
          return "Age must be less than 100 and greater than 0";
        }
      }
    }
    if (field.type === "text" && value.length > 100) {
      return `${field.label} must be at most 100 characters`;
    }
    if (field.minLength && value.length < field.minLength) {
      return `${field.label} must be at least ${field.minLength} characters`;
    }
    if (field.maxLength && value.length > field.maxLength) {
      return `${field.label} must be at most ${field.maxLength} characters`;
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = {};

    // Validate each field
    fields.forEach((field) => {
      const value = formData[field.name] || (field.type === "boolean" ? false : "");
      const error = validateField(field, value);
      if (error) {
        newErrors[field.name] = error;
        formIsValid = false;
      }
    });

    if (formIsValid) {
      const processedFormData = fields.reduce((acc, field) => {
        if (field.type === "boolean") {
          acc[field.name] = formData[field.name] || false;
        } else {
          acc[field.name] = formData[field.name];
        }
        return acc;
      }, {});
      dispatch(addData(processedFormData));
      setFormData({});
    } else {
      setErrors(newErrors);
    }
  };

  const handleCancel = () => {
    setFormData({});
    setErrors({});
  };

  return (
    <div className="flex flex-col">
      <h1>Dynamic Form Builder</h1>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => {
          switch (field.type) {
            case "text":
            case "number":
              return (
                <div key={index} className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    placeholder={field.placeholder || ""}
                    maxLength={255} // Limiting to 255 characters for text fields
                  />
                  {errors[field.name] && (
                    <span className="text-red-500 text-sm">{errors[field.name]}</span>
                  )}
                </div>
              );
            case "boolean":
              return (
                <div key={index} className="mb-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData[field.name] || false}
                      onChange={(e) => handleChange(field.name, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900">
                      {field.label || ""}
                    </span>
                  </label>
                  {errors[field.name] && (
                    <span className="text-red-500 text-sm">{errors[field.name]}</span>
                  )}
                </div>
              );
            case "single-select":
              return (
                <div key={index} className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    {field.label}
                  </label>
                  <select
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg bg-gray-50"
                  >
                    <option value="">Select an option</option>
                    {field.options.map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors[field.name] && (
                    <span className="text-red-500 text-sm">{errors[field.name]}</span>
                  )}
                </div>
              );
            case "multi-select":
              return (
                <div key={index} className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    {field.label}
                  </label>
                  <select
                    value={formData[field.name] || []}
                    onChange={(e) =>
                      handleChange(
                        field.name,
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                    multiple
                    className="w-full p-3 border-2 border-gray-200 rounded-lg bg-gray-50"
                  >
                    {field.options.map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors[field.name] && (
                    <span className="text-red-500 text-sm">{errors[field.name]}</span>
                  )}
                </div>
              );
            default:
              return null;
          }
        })}
        <div className="flex space-x-2">
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-lg"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="p-3 bg-gray-500 text-white rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
