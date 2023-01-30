import React from "react";

const ActivityItemDescription = React.memo(({ children }: { children: any }) => {
  let text = children;
  text = text.replace(",", "<span class='text-gray-light'>,</span>");
  text = text.replace(/you/, "<span class='text-green'>you</span>");
  text = text.replace(/by/, "<span class='text-gray-light'>by</span>");
  text = text.replace(/to/, "<span class='text-gray-light'>to</span>");
  text = text.replace(/from/, "<span class='text-gray-light'>from</span>");

  return <div className="body-medium" dangerouslySetInnerHTML={{ __html: text }} />;
});
ActivityItemDescription.displayName = "ActivityItemDescription";

export default ActivityItemDescription;
