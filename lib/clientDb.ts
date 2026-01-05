import { schema } from "@/instant.schema";
import { init } from "@instantdb/react-native";
import Constants from "expo-constants";

const appId =
  Constants.expoConfig?.extra?.instantAppId ||
  process.env.EXPO_PUBLIC_INSTANT_APP_ID;

if (!appId) {
  throw new Error(
    "Missing INSTANT_APP_ID. Please set EXPO_PUBLIC_INSTANT_APP_ID in your .env file or app.json extra.instantAppId"
  );
}

// Initialize InstantDB client with schema for type safety
export const clientDb = init({ appId, schema });
