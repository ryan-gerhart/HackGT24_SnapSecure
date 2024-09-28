const apiUrl = "https://vrsa-headset-data-trasnfer-5ac2a0526531.herokuapp.com/data"; // Updated to include /data endpoint

@component
export class HttpRequest extends BaseScriptComponent {
  @input
  rsm: RemoteServiceModule;

  @input
  textToSend: string;
    
  private jsonToSend: string;
  onAwake() {
//    this.createEvent("OnStartEvent").bind(() => {
//      
//    });
  }
    //
  public sendJSON(json: string) {
        print('sendJSON invoked');
        this.jsonToSend = json;
        this.sendRequest();
  }

  private sendRequest() {
    print("Running GetExample");

    // Debugging: Print the value of textToSend
    print("textToSend: " + this.textToSend);

    // Debugging: Check if rsm is assigned
    if (!this.rsm) {
      print("Error: RemoteServiceModule (rsm) is not assigned.");
      return;
    }

    let request = RemoteServiceHttpRequest.create();
    request.url = apiUrl;
    request.method = RemoteServiceHttpRequest.HttpRequestMethod.Post;
    request.body = this.jsonToSend; // Create JSON payload
    print(request.body);
    request.setHeader("Content-Type", "application/json"); // Set content type to JSON

    // Handle response and errors
    this.rsm.performHttpRequest(request, function (response) {
      if (response.statusCode === 200) {
        print("Response: " + response.body);
      } else {
        print("Error: " + response.statusCode + " - " + response.body);
      }
    });
  }
}