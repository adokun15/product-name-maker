import React from "react";
import Card from "./Card";

const ProjectHistory = () => {
  const dummy_data = [
    { projectId: 1, projectName: "project 1" },
    { projectId: 2, projectName: "project 2" },
    { projectId: 3, projectName: "project 2" },
    { projectId: 4, projectName: "project 2" },
    { projectId: 5, projectName: "project 2" },
  ];
  return (
    <div className="mt-8">
      <h1
        className="text-5xl border-1 border-solid
       border-orange-500"
      >
        Saved Projects
      </h1>
      <article className="my-7">
        {dummy_data.length !== 0 && (
          <>
            {dummy_data.map((data) => (
              <Card
                key={data.projectId}
                className="lg:w-[80%] w-[75%] min-h-[5rem] flex justify-between py-[5px] bg-gray-300 px-5 lg:my-[2rem] my-5"
              >
                <p className="text-xl font-bold">{data.projectName}</p>
                <button className="px-4 bg-orange-500 ">view</button>
              </Card>
            ))}
          </>
        )}
      </article>
    </div>
  );
};

export default ProjectHistory;
