import { i } from "@instantdb/react-native";

// Define your app's schema using Instant's core schema builder.
// NOTE: Make sure you have @instantdb/core installed:
//   npm install @instantdb/core
export const schema = i.schema({
  entities: {
    $users: i.entity({
      // Used for magic code auth; optional because user may sign in with other methods later
      email: i.string().unique().indexed().optional(),
    }),
  },
});

export type AppSchema = typeof schema;

export default schema;
