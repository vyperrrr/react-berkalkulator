import PropTypes from "prop-types";
import TabButton from "./components/TabButton";

const FamilyMemberTabs = ({ members, setMembers }) => {
  function handleAddMember() {}

  return (
    <div>
      <ul className="flex gap-2">
        {members.map((member) => (
          <li key={member.id}>
            <TabButton>{member.name}</TabButton>
          </li>
        ))}
        <button
          className="py-2 px-4 bg-secondary text-white rounded-md font-semibold"
          onClick={handleAddMember}
        >
          +
        </button>
      </ul>
    </div>
  );
};

FamilyMemberTabs.propTypes = {
  members: PropTypes.arrayOf({ id: PropTypes.number, name: PropTypes.string }),
  setMembers: PropTypes.func,
};

export default FamilyMemberTabs;
