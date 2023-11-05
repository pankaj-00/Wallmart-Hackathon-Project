import 'dart:convert' as convert;

import 'package:http/http.dart' as http;

Future<String> fetchResponse(String prompt) async {
  try {
    final uri = Uri.parse("https://7551-103-97-166-34.ngrok-free.app/");
    final response = await http.post(uri,
        body: convert.jsonEncode({'query': prompt}),
        headers: {'Content-type': 'application/json'});

    if (response.statusCode == 200) {
      print("response gotten");
      print(response.body);

      return convert.jsonDecode(response.body)['result'].toString();
      return response.body.toString();
    } else {
      return "error";
    }
  } catch (e) {
    return e.toString();
  }
  // if(response.statusCode==200){
  //   print(response.body);
  //
  // }
  // else{
  //   print("no response");
  // }
}
