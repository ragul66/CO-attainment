import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import edit from "../../assets/edit.svg";
import del from "../../assets/delete.svg";

export default function ViewCourse() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { bundleId } = useParams();
  const { courseId } = useParams();
  const { semesterId } = useParams();

  const [courselist, setCourselist] = useState(null);

  const fetchCourse = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API
        }/course/${bundleId}/${semesterId}/${courseId}/${user.userId}`
      );
      const data = await response.json();
      setCourselist(data);
    } catch (error) {
      console.log("error while fetching:", error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 my-4">
          {courselist ? courselist.title : "Title"}
        </h2>
        <div className="overflow-x-auto">
          {courselist ? (
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4 text-left font-medium">
                    Student Name
                  </th>
                  <th className="py-2 px-4 text-left font-medium">Roll No</th>
                  {courselist.rows.map((row, index) => (
                    <th key={index} className="py-2 px-4 text-left font-medium">
                      {row}
                    </th>
                  ))}
                  <th className="py-2 px-4 text-left font-medium">Average</th>
                  <th className="py-2 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courselist.students.map((student, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{student.name}</td>
                    <td className="py-2 px-4">{student.rollno}</td>
                    {courselist.rows.map((row, index) => (
                      <td key={index} className="py-2 px-4">
                        {student.scores[row]}
                      </td>
                    ))}
                    <td className="py-2 px-4">{student.averageScore}</td>
                    <td className="py-2 px-4 flex flex-row gap-4 items-center">
                      <img className="cursor-pointer" src={edit} />
                      <img className="cursor-pointer" src={del} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
