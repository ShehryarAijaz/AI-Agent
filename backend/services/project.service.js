import Project from "../models/project.model.js";

export const createProject = async ({
    name, userId
}) => {
    if (!userId) {
        throw new Error("User ID is required");
    }
    if (!name) {
        throw new Error("Project name is required");
    }

    const project = await Project.create({
        name, users: [userId]
    });

    return project;
}
