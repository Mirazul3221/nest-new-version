"use client";
import { useState } from "react";

export default function AddExperience() {
  const [sections, setSections] = useState([
    { id: Date.now(), title: "", description: "", experience: "" },
  ]);

  const handleAddSection = () => {
    setSections([
      ...sections,
      { id: Date.now(), title: "", description: "", experience: "" },
    ]);
  };

  const handleDeleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleChange = (id, field, value) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  return (
    <div className="mx-auto mt-5 p-5 bg-white rounded-lg shadow-md">
      {sections.map((section) => (
        <div key={section.id} className="mb-4 border p-4 rounded-lg relative">
          <label className="block mb-1 text-sm font-semibold">Title</label>
          <input
            type="text"
            value={section.title}
            onChange={(e) => handleChange(section.id, "title", e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />

          <label className="block mb-1 text-sm font-semibold">Description</label>
          <textarea
            value={section.description}
            onChange={(e) =>
              handleChange(section.id, "description", e.target.value)
            }
            className="w-full p-2 border rounded mb-2"
          ></textarea>

          <label className="block mb-1 text-sm font-semibold">
            Total Experience
          </label>
          <input
            type="text"
            value={section.experience}
            onChange={(e) =>
              handleChange(section.id, "experience", e.target.value)
            }
            className="w-full p-2 border rounded mb-2"
          />

          {/* Delete Button */}
          {sections.length > 1 && (
            <button
              onClick={() => handleDeleteSection(section.id)}
              className="absolute top-2 right-2 p-2 text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          )}
        </div>
      ))}

      {/* Add Section Button */}
      <button
        onClick={handleAddSection}
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md mt-3"
      >
        Add Section
      </button>
    </div>
  );
}
