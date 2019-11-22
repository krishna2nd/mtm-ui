// const HostPrefix = "https://ms-tagmanager.azurewebsites.net";
const HostPrefix = "";

export const Triggers = `${HostPrefix}/triggers`;
export const Tags = `${HostPrefix}/tags`;
export const Variables = `${HostPrefix}/variables`;

export const TriggersWithId = (id: number) => `${Triggers}/${id}`;
export const TagsWithId = (id: number) => `${Tags}/${id}`;
export const VariablesWithId = (id: number) => `${Variables}/${id}`;
