"use client";

import { useAuth } from "@/utils/Provider/AuthProvider";
import SidebarLink from "./SideBarLinks";

const Sidebar = () => {
  const user = useAuth();

  if (!user.currentUser) return null;

  const { uid } = user.currentUser;

  return (
    <div
      className={`from-orange-400  md:relative md:block hidden h-fit overflow-scroll bg-gradient-to-br  to-orange-600 w-[50%] md:z-[40] md:w-full col-end-1 
    row-span-10 px-8 text-white `}
    >
      <SidebarLink uid={uid} />
    </div>
  );
};

export default Sidebar;

/*
@ Favorites and Shortlist: Allow users to save their favorite name suggestions or create a shortlist for easy reference and comparison.

Naming History: Keep a record of past naming sessions and suggestions for users to revisit or continue working on later.

Guided Wizard: Implement a step-by-step wizard that guides users through the naming process, ensuring they cover essential aspects and criteria.

Collaboration Tools: Enable users to invite team members or stakeholders to collaborate within the dashboard, share feedback, and collectively decide on names.

Progress Tracking: Show progress indicators or milestones to give users a sense of advancement in the naming process.

Name Availability Checker: Provide a tool to quickly check domain availability and social media handles for selected names directly from the dashboard.

Naming Brief Creation: Allow users to create and save naming briefs specifying requirements, preferences, and target audience details for future reference.

User Profiles: Enable users to create profiles where they can manage multiple naming projects, preferences, and settings.

AI Suggestions Filter: Offer filtering options based on criteria like tone (fun, professional), length, language, or industry relevance to narrow down suggestions.

Educational Resources: Provide tutorials, articles, or FAQs within the dashboard to assist users in understanding naming strategies and best practices.

Export and Share: Allow users to export their naming suggestions or share them via email or social media directly from the dashboard.

Customization Options: Enable users to customize the dashboard layout, theme, or display preferences based on their preferences.

Real-time Collaboration: Implement real-time editing and commenting features, allowing multiple users to work on naming projects simultaneously.

Community Engagement: Integrate a community forum or space within the dashboard where users can seek advice, share experiences, or ask for naming suggestions.

Analytics and Insights: Provide data analytics or insights on naming trends, popularity, or success rates of different types of names.


*/
