import apiClient from "./apiClient";

export const createTeam = async (teamName) => {
  return apiClient.post("/teams/create", { name: teamName });
};

export const joinTeam = async (team_code) => {
  return apiClient.post("/teams/join", { team_code });
};

export const teamDetails = async () => {
  return apiClient.get("/teams/get");
};

export const submitProject = async (projectData) => {
  return apiClient.post("/teams/project/submit", projectData);
}