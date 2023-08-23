import 'package:appapap/pallete.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
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
        SizedBox(
          height: 20,
        ),
        Column(
          children: [
            Container(
              margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 35),
              decoration: const BoxDecoration(
                  color: Colors.amberAccent,
                  borderRadius: BorderRadius.all(Radius.circular(15))),
              height: 80,
              child: const Padding(
                padding: EdgeInsets.all(20),
                child: Text(
                  "convAI agent",
                  style: TextStyle(fontSize: 25, fontFamily: "Cera Pro"),
                ),
              ),
            )
          ],
        )
      ]),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Pallete.firstSuggestionBoxColor,
        onPressed: () {},
        child: const Icon(Icons.mic),

      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      flo
    );
  }
}
