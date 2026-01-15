$version: "2"

namespace com.example

use aws.protocols#restJson1
use aws.api#service

@restJson1
@httpBearerAuth
@httpApiKeyAuth(name: "Authorization", in: "header", scheme: "Key")
@auth([httpBearerAuth, httpApiKeyAuth])
@service(sdkId: "Example")
service ExampleService {
    version: "2024-01-01"
    operations: [GetThing]
}

@http(method: "GET", uri: "/things/{id}")
@readonly
operation GetThing {
    input := {
        @required
        @httpLabel
        id: String
    }
    output := {
        id: String
        name: String
    }
}
