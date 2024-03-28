import PropTypes from "prop-types";
import TabButton from "./components/TabButton";

const FamilyMemberTabs = ({ members }) => {
  return (
    <div>
      <ul className="flex gap-2">
        {members.map((member) => (
          <li key={member.id}>
            <TabButton>{member.name}</TabButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

FamilyMemberTabs.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object),
  setMembers: PropTypes.func,
};

export default FamilyMemberTabs;
