const formatName = (member) => {
  return member.name === "" ? `Családtag #${member.id}` : member.name;
};

export default formatName;
