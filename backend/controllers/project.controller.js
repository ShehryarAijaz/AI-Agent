import Project from "../models/project.model";
import projectService from "../services/project.service";

export const createProjectController = async (req, res) => {
    try {
        const { name, userId } = req.body;
        const project = await projectService.createProject({ name, userId });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}