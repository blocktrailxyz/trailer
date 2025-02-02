import { faker } from "@faker-js/faker/.";
import {Factory} from "./factory";
import Taxonomy from "models/taxonomy";

export const taxonomyFactory = new Factory<Partial<Taxonomy>>(() => {
  const name = faker.commerce.department();
  return {
    name
  };
});