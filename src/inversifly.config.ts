import { Container } from 'inversify';
import "reflect-metadata";
import { TestUserService, TestUserServiceTYPE } from "./util/testUserService";
//???need to import TYPES for TestUserService

const container = new Container();

container.bind<TestUserServiceTYPE>(TestUserService).to(TestUserService);
//container.bind

export default container;