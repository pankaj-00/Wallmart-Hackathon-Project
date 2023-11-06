import 'package:appapap/pallete.dart';
import 'package:flutter/material.dart';
bool isempty(String msg){
  if(msg==''){return false;}else{return true;}

}
class ChatBubble extends StatelessWidget {
  final String message; // The message to display inside the bubble
  // final String align; // The height of the bubble
  // final double width; // The width of the bubble
  final Color color; // The color of the bubble
  final EdgeInsetsGeometry
      padding; // The padding between the edge of the bubble and the contents
  final BorderRadiusGeometry borderRadius; // The border radius of the bubble
  final bool showShadow; // Whether to show a shadow behind the bubble
  final bool isUser;


  const ChatBubble({
    super.key,
    required this.isUser,
    required this.message,
    // required this.height,
    // required this.width,
    required this.color,
    required this.padding,
    required this.borderRadius,
    required this.showShadow,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: const EdgeInsets.fromLTRB(50, 10, 50, 0),
      decoration: BoxDecoration(
        border: Border.all(color: Pallete.borderColor),
        color: color,
        borderRadius:  BorderRadius.only(
            topRight:isUser? Radius.zero:Radius.circular(20),
            topLeft: isUser?Radius.circular(20):Radius.zero,
            bottomLeft: Radius.circular(20),
            bottomRight: Radius.circular(20)),
        boxShadow: showShadow
            ? [
                BoxShadow(
                  offset: Offset(0, 2),
                  blurRadius: 4,
                  spreadRadius: 0,
                  color: Colors.black.withOpacity(0.2),
                ),
              ]
            : null,
      ),
      // height: height,

      padding: padding,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // isUser?Spacer():SizedBox(width: 0,),
          // Padding(
          //   padding: const EdgeInsets.only(left: 8),
          //   child: const CircleAvatar(
          //     backgroundColor: Colors.white,
          //     radius: 20,
          //     child: Icon(Icons.person),
          //   ),
          // ),
          Expanded(
            flex: 1,
            child: Padding(
              padding: const EdgeInsets.all(8),
              child: Text(

                style: TextStyle(
                    color: Pallete.mainFontColor,
                    fontFamily: "Cera Pro",
                    fontSize: 18),
                message,
                textAlign: isUser? TextAlign.end:TextAlign.start,
                softWrap: true,
              ),
            ),
          ),
          // isUser?SizedBox(width: 0,):Spacer(),
        ],
      ),
    );
  }
}
