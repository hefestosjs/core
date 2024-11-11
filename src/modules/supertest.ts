import supertest from "supertest";
import { APP } from "../server";

export const Supertest = supertest(APP);
