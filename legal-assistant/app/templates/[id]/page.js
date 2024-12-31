import React from "react";
// Import all the form components
import LeaseNewForm from "@/app/components/LeaseNewForm";
import NameChangeForm from "@/app/components/NameChange";
import PropertySale from "@/app/components/PropertySale";
// import DeclarationForm from "./DeclarationForm";
// import PropertyForm from "./PropertyForm";
// import WillComponent from "./WillComponent";

const Template = async ({ params }) => {
  const { id: templateName } = await params // Fetch template id from URL
  console.log(templateName);

  return (
    <>
      <div className="my-[4rem] container mx-auto px-4">
        {templateName === 'lease' && <LeaseNewForm />}
        {templateName === 'name-change' && <NameChangeForm />}
        {templateName === 'property' && <PropertySale />}
        {templateName === 'will' && <LeaseNewForm />}

      </div>
    </>
  );
};

export default Template;