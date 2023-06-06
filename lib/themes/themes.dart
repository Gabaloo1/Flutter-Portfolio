import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Themes {
  static final lightTheme = ThemeData(
    brightness: Brightness.light,
    primaryColor: Colors.black,
    textTheme: GoogleFonts.poppinsTextTheme()
        .apply(bodyColor: Colors.black, displayColor: Colors.black),
    scaffoldBackgroundColor: Colors.white,
    colorScheme: ColorScheme.fromSwatch().copyWith(secondary: Colors.black),
  );

  static final darkTheme = ThemeData(
    brightness: Brightness.dark,
    primaryColor: Colors.white,
    cardTheme: CardTheme(color: Colors.black),
    textTheme: GoogleFonts.poppinsTextTheme()
        .apply(bodyColor: Colors.white60, displayColor: Colors.white60),
    scaffoldBackgroundColor: Color.fromRGBO(22, 22, 22, 1),
    colorScheme: ColorScheme.fromSwatch().copyWith(secondary: Colors.white),
  );
  //scaffoldBackgroundColor: Colors.black);
}
