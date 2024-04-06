const formatName = (member) => {
  return member.name === "" ? `Placeholder #${member.id}` : member.name;
};

export default formatName;
