import React from "react";
// Import all the form components
import LeaseForm from "@/app/components/LeaseForm";
import LeaseNewForm from "@/app/components/LeaseNewForm";
// import DeclarationForm from "./DeclarationForm";
// import PropertyForm from "./PropertyForm";
// import WillComponent from "./WillComponent";

const Template = async ({ params }) => {
  const { id: templateName } = await params // Fetch template id from URL
  console.log(templateName);

  return (
    <>
      <div className="mt-[8rem] container mx-auto px-4">
        {templateName === 'lease' && <LeaseNewForm />}
        {templateName === 'name-change' && <LeaseNewForm />}
        {templateName === 'property' && <LeaseNewForm />}
        {templateName === 'will' && <LeaseNewForm />}

      </div>
    </>
  );
};

export default Template;