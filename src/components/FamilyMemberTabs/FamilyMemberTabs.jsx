import { Tabs, IconButton } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";

import MemberContext from "../../store/MemberContext";
import { useContext } from "react";

const FamilyMemberTabs = () => {
  const { members, addMember, setIsSelected } = useContext(MemberContext);

  console.log(members);

  return (
    <Tabs.Root defaultValue="account" className="relative mb-4">
      <Tabs.List>
        {members.map((member) => (
          <Tabs.Trigger
            key={member.id}
            value={member.id}
            onClick={() => setIsSelected(member.id, true)}
          >
            {member.name === "" ? `New Member #${member.id}` : member.name}
          </Tabs.Trigger>
        ))}
        <IconButton onClick={() => addMember()} className="absolute right-0">
          <PlusIcon width="18" height="18" />
        </IconButton>
      </Tabs.List>
    </Tabs.Root>
  );
};

export default FamilyMemberTabs;
