import { Tabs, IconButton } from "@radix-ui/themes";
import { PlusIcon, ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

import MemberContext from "../../store/MemberContext";
import { useContext } from "react";

const FamilyMemberTabs = () => {
  const { members, selectedMember, addMember, setIsSelected, setName } =
    useContext(MemberContext);

  const currentIndex = selectedMember
    ? members.findIndex((member) => member.id === selectedMember?.id)
    : -1;

  const handleLeftClick = () => {
    if (members.length === 0) return;
    const previousIndex =
      currentIndex > 0 ? currentIndex - 1 : members.length - 1;
    handleSelectMember(members[previousIndex].id);
  };

  const handleRightClick = () => {
    if (members.length === 0) return;
    const nextIndex = (currentIndex + 1) % members.length;
    handleSelectMember(members[nextIndex].id);
  };

  const rotatedMembers =
    currentIndex >= 0
      ? [...members.slice(currentIndex), ...members.slice(0, currentIndex)]
      : members;

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
      <span>
        <IconButton onClick={handleLeftClick} className="cursor-pointer">
          <ArrowLeftIcon width="18" height="18" />
        </IconButton>
      </span>
      <Tabs.List className="flex-grow">
        {rotatedMembers.map((member) => {
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
        <IconButton onClick={handleRightClick} className="cursor-pointer">
          <ArrowRightIcon width="18" height="18" />
        </IconButton>
        <IconButton onClick={handleAddMember} className="cursor-pointer">
          <PlusIcon width="18" height="18" />
        </IconButton>
      </span>
    </Tabs.Root>
  );
};

export default FamilyMemberTabs;
