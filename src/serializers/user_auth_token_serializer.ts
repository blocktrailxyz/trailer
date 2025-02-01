import { Serializer } from "jsonapi-serializer";
import User from "models/user";

// JSON:API Serializer for User Authentication
const UserAuthTokenSerializer = new Serializer("users", {
  attributes: ["displayName", "emojicon"],
  keyForAttribute: "camelCase",
  dataMeta: (user: User) => ({
    accessToken: user.jwtToken(),
  }),

  // transform(record: User) {
  //   return {
  //     ...record.get(),
  //     jwtToken: record.jwtToken(), // Include method result in response
  //   };
  // },
});

export default UserAuthTokenSerializer;