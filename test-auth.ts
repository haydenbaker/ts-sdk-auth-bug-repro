import { ExampleClient, GetThingCommand } from "@example/client";
import { HttpApiKeyAuthLocation } from "@smithy/types";

console.log("Testing API key authentication...\n");

// Create client with api key auth configured (no bearer token auth)
const client = new ExampleClient({
  endpoint: "http://localhost:3000",
  apiKey: { apiKey: "test-api-key" },
});

try {
  // This should use API key auth, but will fail because bearer token auth is attempted first and throws an error instead 
  // of failing and continuing the auth chain
  await client.send(new GetThingCommand({ id: "123" }));
} catch (error: any) {
  if (error.message?.includes("Profile") || error.message?.includes("token")) {
    console.error(error);
    process.exit(1);
  }
  // Expected: connection refused since there's no server, but it got past auth resolution
  if (error.code === "ECONNREFUSED") {
    console.error("Success.");
    process.exit(0);
  }
  console.error("Unexpected error:", error);
  process.exit(1);
}
