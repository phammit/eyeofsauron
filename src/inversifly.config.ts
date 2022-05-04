import { Container } from 'inversify';
import "reflect-metadata";
import { TestUserService } from "./util/testUserService";

const container = new Container();

container.bind<TestUserService>(TestUserService).to(TestUserService);
//container.bind

export default container;