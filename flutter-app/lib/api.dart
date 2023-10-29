import 'dart:convert' as convert;

import 'package:http/http.dart' as http;
Future<dynamic> fetchResponse()async{
final uri =Uri.parse("https://fa66-152-57-182-232.ngrok-free.app/");
final response =await http.post(uri,body: convert.jsonEncode({'query':'who are you'}),headers:{'Content-type':'application/json'} );
if(response.statusCode==200){
  return response.body;
}
else{
  print("hello");
}
}