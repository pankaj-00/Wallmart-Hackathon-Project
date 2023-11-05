import 'package:appapap/api.dart';
import 'package:appapap/speech-api.dart';
import 'package:speech_to_text/speech_recognition_result.dart';
import 'package:appapap/pallete.dart';
import 'package:flutter/material.dart';
import 'package:speech_to_text/speech_to_text.dart';
import 'package:audioplayers/audioplayers.dart';
import 'chatbubble.dart';
// ...

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  SpeechToText speechToText = SpeechToText();
  String lastWords = '';
  String reply = '';
  String audioUrl='';
  bool isListening = false;
  @override
  void initState() {
    super.initState();
    initSpeechToText();
  }

  Future<void> initSpeechToText() async {
    await speechToText.initialize();
    setState(() {
      print("inited");
    });
  }

  void onSpeechResult(SpeechRecognitionResult result) {
    setState(() {
      lastWords = result.recognizedWords;
    });
  }

  Future<void> startListening() async {
    await speechToText.listen(onResult: onSpeechResult);
    setState(() {
      print("2");
    });
  }

  Future<void> stopListening() async {
    await speechToText.stop();

    reply=await fetchResponse(lastWords);
    print("sending to lovo");
    audioUrl =await returnAudio(reply);
    var player=AudioPlayer();
    await player.play(UrlSource(audioUrl));
    setState(() {

    });
  }

  @override
  void dispose() {
    super.dispose();
    speechToText.stop();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text("ConvAI"),
        leading: const Icon(Icons.menu),
      ),
      body: Column(children: [
        Stack(
          children: [
            Center(
              child: Container(
                height: 120,
                width: 120,
                margin: const EdgeInsets.only(top: 4),
                decoration: const BoxDecoration(
                    color: Pallete.assistantCircleColor,
                    shape: BoxShape.circle),
              ),
            ),
            Center(
              child: Container(
                height: 125,
                width: 125,
                decoration: const BoxDecoration(
                    shape: BoxShape.circle,
                    image: DecorationImage(
                        image:
                            AssetImage('assets/images/virtualAssistant.png'))),
              ),
            )
          ],
        ),
        // chat bubble
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 10),
          margin: const EdgeInsets.fromLTRB(40, 30, 40, 0),
          decoration: BoxDecoration(
              borderRadius: const BorderRadius.only(
                  topLeft: Radius.zero,
                  topRight: Radius.circular(20),
                  bottomLeft: Radius.circular(20),
                  bottomRight: Radius.circular(20)),
              border: Border.all(
                color: Pallete.borderColor,
              )),
          child: const Padding(
            padding: EdgeInsets.symmetric(vertical: 10),
            child: Text(
              'How may i help u',
              style: TextStyle(
                  color: Pallete.mainFontColor,
                  fontFamily: "Cera Pro",
                  fontSize: 25),
            ),
          ),
        ),
        const SizedBox(
          height: 20,
        ),
        Column(
          children: [
        //     Container(
        //       margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 35),
        //       decoration: const BoxDecoration(
        //           color: Colors.amberAccent,
        //           borderRadius: BorderRadius.all(Radius.circular(15))),
        //       height: 80,
        //       child: const Padding(
        //         padding: EdgeInsets.all(20),
        //         child: Text(
        //           "convAI agent",
        //           style: TextStyle(fontSize: 25, fontFamily: "Cera Pro"),
        //         ),
        //       ),
        //     )
        //   ],
        // ),

            ChatBubble(
              isUser: true,
              message: lastWords,
              // height: 60,

              color: Theme.of(context).scaffoldBackgroundColor,
              padding: const EdgeInsets.all(10),
              borderRadius: BorderRadius.circular(20),
              showShadow: false,
            ),
            ChatBubble(
              isUser: false,
              message: reply,
              // height: 60,
              color: Theme.of(context).scaffoldBackgroundColor,
              padding: const EdgeInsets.all(10),
              borderRadius: BorderRadius.circular(20),
              showShadow: false,
            ),


          ]),]),
        floatingActionButton: FloatingActionButton(
        backgroundColor: Pallete.firstSuggestionBoxColor,
        onPressed: () {
          print("onpressed");
        },
        child: GestureDetector(
          onTapDown: (details) async {
            if (!isListening) {
              var available = await speechToText.initialize();
              if (available) {
                setState(() {
                  isListening = true;
                  startListening();
                });
              }
            }
          },
          onTapUp: (details) {
            setState(() {
              isListening = false;
            });
            stopListening();
          },
          child: Icon(Icons.mic),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }
}

//backup button logic
// onPressed: () async {
//   if (await speechToText.hasPermission && speechToText.isNotListening) {
//     // print('1');
//     startListening();
//     print('1');
//   } else if (speechToText.isListening) {
//     stopListening();
//
//     print('2');
//     // setState(()async {
//     //   final player = AudioPlayer();
//     //   await player.play(UrlSource(reply));
//     // });
//   } else {
//     initSpeechToText();
//     print('3');
//   }
// },
