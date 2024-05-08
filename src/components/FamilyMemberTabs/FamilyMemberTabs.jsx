import { Tabs, IconButton } from "@radix-ui/themes";
import { PlusIcon, ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

import MemberContext from "../../store/MemberContext";
import { useContext } from "react";

const FamilyMemberTabs = () => {
  const { members, selectedMember, addMember, setIsSelected, setName } =
    useContext(MemberContext);

  const handleSelectMember = (id) => {
    setIsSelected(id, true);
  };

  const handleAddMember = () => addMember();

  return (
    <Tabs.Root
      value={selectedMember ? selectedMember.id : null}
      orientation="horizontal"
      className="flex items-center"
    >
      <Tabs.List className="flex-grow">
        {members.map((member) => {
          return (
            <Tabs.Trigger
              key={member.id}
              value={member.id}
              onClick={() => handleSelectMember(member.id)}
            >
              {member.name}
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>
      <span className="flex gap-x-2">
        <IconButton onClick={handleAddMember} className="cursor-pointer">
          <PlusIcon width="18" height="18" />
        </IconButton>
      </span>
    </Tabs.Root>
  );
};

export default FamilyMemberTabs;
