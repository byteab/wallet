package com.wallet;
import android.os.Bundle;
import com.zoontek.rnbootsplash.RNBootSplash;

import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState); // or super.onCreate(null) with react-native-screens
    RNBootSplash.init(R.drawable.bootsplash, MainActivity.this); // display the generated bootsplash.xml drawable over our MainActivity
  }
}
