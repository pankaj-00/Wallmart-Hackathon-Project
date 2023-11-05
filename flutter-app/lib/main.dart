import 'package:appapap/home_page.dart';
import 'package:appapap/pallete.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData.light(useMaterial3: true),

      home:  HomePage(),
    );
  }
}

    // .copyWith(scaffoldBackgroundColor: Pallete.whiteColor)