import { Application } from './application.model';

class ApplicationService {
    async create(createDto: any): Promise<Application> {
        const application = new Application();
        application.id = createDto.id;
        application.username = createDto.username;
        application.message = createDto.message;
        application.preferences = createDto.preferences;

        application.game = 1 as any;
        return application.save();
    }

    async getAll(): Promise<Application[]> {
        return Application.find();
    }

    async getById(id: number): Promise<Application> {
        return Application.findOneByOrFail({ id });
    }

    async delete(id: number): Promise<Application> {
        const application = await this.getById(id);
        return application.remove();
    }
}

export default new ApplicationService();
