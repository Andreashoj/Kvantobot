const getUsers = async guild => {
  const users = await guild.fetchMembers();
  const usersIds = users.members
    .map(r => r.user)
    .filter(user => user.bot !== true);

  return usersIds;
};

exports.getUsers = getUsers;
