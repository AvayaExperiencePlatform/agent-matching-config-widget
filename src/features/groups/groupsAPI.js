const widgetAPI = window.WS.widgetAPI();

export function getGroups() {
  const groupMembers = {};
  const teamData = widgetAPI.getTeamData();
  const groups = Array.from(
    new Set(
      teamData.team
        .filter((user) => !user.isSelf)
        .map((user) => user.groups)
        .flat()
    )
  );
  groups.forEach((group) => {
    groupMembers[group] = {};
    teamData.team.forEach((user) => {
      if (user.groups.includes(group)) {
        let member = { isLoaded: false, id: user.userHandle };
        member.user = {
          userId: user.userHandle,
          firstName: user.firstName,
          lastName: user.lastName,
          displayName: user.displayName,
          groups: user.groups,
        };
        groupMembers[group][user.userHandle] = member;
      }
    });
  });
  return { groups, groupMembers };
}
