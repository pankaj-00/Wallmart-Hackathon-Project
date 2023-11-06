import 'dart:convert' as convert;

import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'dart:async';

import 'package:audioplayers/audioplayers.dart';


Future<String> returnAudio(String llmreply) async {
  Uri apiUrl = Uri.parse('https://api.genny.lovo.ai/api/v1/tts/sync');

  final Map<String, String> headers = {
    'accept': 'application/json',
    'content-type': 'application/json',
    'X-API-KEY': '6bfb4358-1a5b-4366-ab80-92d526b5ac68',
  };

  final Map<String, dynamic> body = {
    'speed': 1.5,
    'text': llmreply,
    'speaker': '63b40781241a82001d51b916'
  };
  try {
    final audio = await http.post(
      apiUrl,
      headers: headers,
      body: convert.jsonEncode(body),
    );
    if (audio.statusCode == 201) {
      Map<String, dynamic> jsonResponse = convert.jsonDecode(audio.body);
      return jsonResponse['data'][0]['urls'][0].toString();
    } else {
      return 'Request failed with status: ${audio.statusCode}.';
    }
  } catch (error) {
    return error.toString();
  }
}

// Future<String> fetchSpeech(String prompt) async {
//   try {
//     final uri = Uri.parse("https://1bc4-106-220-130-22.ngrok-free.app/convAI");
//     final response = await http.post(uri,
//         body: convert.jsonEncode({'query': prompt,}),
//         headers: {'Content-type': 'application/json'});
//     print(response.body);
//     if(response.statusCode==200){
//       print("response gotten");
//       return response.body.toString();
//     }
//     else{
//       return "error";
//     }
//   } catch (e) {
//     return e.toString();
//   }
//   // if(response.statusCode==200){
//   //   print(response.body);
//   //
//   // }
//   // else{
//   //   print("no response");
//   // }
// }
