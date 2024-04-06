import { Tabs, IconButton } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";

import MemberContext from "../../store/MemberContext";
import { useContext } from "react";

import formatName from "../../utils/nameFormatter";

const FamilyMemberTabs = () => {
  const { members, addMember, setIsSelected } = useContext(MemberContext);

  const handleSelectMember = (id) => {
    setIsSelected(id, true);
  };

  const handleAddMember = () => addMember();

  return (
    <Tabs.Root defaultValue="account" className="relative">
      <Tabs.List>
        {members.map((member) => (
          <Tabs.Trigger
            key={member.id}
            value={member.id}
            onClick={() => handleSelectMember(member.id)}
          >
            {formatName(member)}
          </Tabs.Trigger>
        ))}
        <IconButton onClick={handleAddMember} className="absolute right-0">
          <PlusIcon width="18" height="18" />
        </IconButton>
      </Tabs.List>
    </Tabs.Root>
  );
};

export default FamilyMemberTabs;
