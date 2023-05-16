import React from "react";
import { useDropDetailContext } from "../../DropContext";
import Img from "components/Img";

const TeamMember = ({ member }: any) => {
  return (
    <div className="flex flex-col gap-5 border border-white border-opacity-10 rounded-md p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
            <Img src={member.image} />
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="text-h5 text-white">{member.name}</h5>
            <div className="text-headline-02 text-white text-opacity-50">{member.label}</div>
          </div>
        </div>
      </div>
      <div className="body-medium text-white">{member.text}</div>
    </div>
  );
};
const Team = () => {
  const { dropDetail } = useDropDetailContext();

  return (
    <div className="grid grid-cols-2 gap-5">
      {dropDetail.team.map((member: any, i: number) => (
        <TeamMember key={i} member={member} />
      ))}
    </div>
  );
};

export default Team;
